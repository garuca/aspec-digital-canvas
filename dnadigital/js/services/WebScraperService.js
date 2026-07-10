// ============================================================
// ASPEC IA — Web Scraper Service
// Fetches website content and extracts structured text
// ============================================================

export class WebScraperService {

  // CORS proxies to try in order (fallback chain)
  static CORS_PROXIES = [
    (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    (url) => `https://thingproxy.freeboard.io/fetch/${url}`,
    (url) => `https://yacdn.org/proxy/${url}`,
    (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
    (url) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`
  ];

  /**
   * Fetch and extract text content from a website URL
   * @param {string} url - The website URL to scrape
   * @returns {Promise<Object>} Extracted website data
   */
  static async extractFromUrl(url) {
    // Normalize URL
    const normalizedUrl = WebScraperService._normalizeUrl(url);

    // Fetch HTML through CORS proxy chain
    const html = await WebScraperService._fetchWithFallback(normalizedUrl);

    // Parse HTML to find stylesheets
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const stylesheetUrls = [];
    doc.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.includes('fonts.googleapis') && !href.includes('font-awesome') && !href.includes('bootstrap')) {
        try {
          const resolved = new URL(href, normalizedUrl).href;
          stylesheetUrls.push(resolved);
        } catch {}
      }
    });

    // Try fetching the main stylesheet
    let cssText = '';
    if (stylesheetUrls.length > 0) {
      try {
        cssText = await WebScraperService._fetchWithFallback(stylesheetUrls[0]);
      } catch (err) {
        console.warn('[WebScraper] Failed to fetch stylesheet:', err.message);
      }
    }

    // Extract logo candidates
    const logoCandidates = WebScraperService._getLogoCandidates(doc, normalizedUrl);

    // Extract colors directly from logo if it's SVG
    let logoColors = [];
    if (logoCandidates.length > 0 && logoCandidates[0].url.endsWith('.svg')) {
      try {
        logoColors = await WebScraperService._extractLogoColors(logoCandidates[0].url);
      } catch (err) {
        console.warn('[WebScraper] Failed to extract colors from SVG logo:', err.message);
      }
    }

    // Parse HTML and extract structured content
    const extracted = WebScraperService._parseHtml(html, normalizedUrl, cssText, doc, logoCandidates, logoColors);

    return extracted;
  }

  /**
   * Normalize URL (add protocol if missing)
   */
  static _normalizeUrl(url) {
    let normalized = url.trim();
    if (!/^https?:\/\//i.test(normalized)) {
      normalized = 'https://' + normalized;
    }
    return normalized;
  }

  /**
   * Try fetching through multiple CORS proxies
   */
  static async _fetchWithFallback(url) {
    let lastError;

    for (const proxyFn of WebScraperService.CORS_PROXIES) {
      try {
        const proxyUrl = proxyFn(url);
        const response = await fetch(proxyUrl, {
          headers: { 'Accept': 'text/html' },
          signal: AbortSignal.timeout(15000) // 15s timeout
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const text = await response.text();
        if (text && text.length > 100) {
          return text;
        }
        throw new Error('Response too short');
      } catch (err) {
        lastError = err;
        console.warn(`[WebScraper] Proxy failed, trying next...`, err.message);
        continue;
      }
    }

    throw new Error(`Não foi possível acessar o site. Verifique a URL e tente novamente. (${lastError?.message})`);
  }

  /**
   * Parse HTML and extract structured data
   * @param {string} html - Raw HTML string
   * @param {string} url - Original URL for context
   * @returns {Object} Structured extracted data
   */
  static _parseHtml(html, url, cssText = '', preparsedDoc = null, logoCandidates = [], logoColors = []) {
    const doc = preparsedDoc || new DOMParser().parseFromString(html, 'text/html');

    // Extract logo candidates, typography and text colors BEFORE removing noise elements
    const logoCands = logoCandidates.length > 0 ? logoCandidates : WebScraperService._getLogoCandidates(doc, url);
    const typography = WebScraperService._extractTypography(doc, html, cssText);
    const textColors = WebScraperService._extractTextColors(html, cssText);

    // Remove noise elements
    const noiseSelectors = [
      'script', 'style', 'noscript', 'iframe', 'svg', 'canvas',
      'nav', 'footer', 'header > nav', '.cookie-banner', '.cookie-consent',
      '[role="navigation"]', '[aria-hidden="true"]'
    ];
    noiseSelectors.forEach(sel => {
      doc.querySelectorAll(sel).forEach(el => el.remove());
    });

    // Extract structured data
    const data = {
      url,
      title: WebScraperService._getText(doc, 'title'),
      metaDescription: WebScraperService._getMeta(doc, 'description'),
      metaKeywords: WebScraperService._getMeta(doc, 'keywords'),
      ogTitle: WebScraperService._getMeta(doc, 'og:title', 'property'),
      ogDescription: WebScraperService._getMeta(doc, 'og:description', 'property'),
      headings: WebScraperService._getHeadings(doc),
      mainContent: WebScraperService._getMainContent(doc),
      links: WebScraperService._getNavLinks(doc),
      colors: WebScraperService._extractInlineColors(html, cssText),
      textColors,
      typography,
      logoCandidates: logoCands,
      logoColors
    };

    return data;
  }

  /**
   * Get text from a selector
   */
  static _getText(doc, selector) {
    const el = doc.querySelector(selector);
    return el?.textContent?.trim() || '';
  }

  /**
   * Get meta tag content
   */
  static _getMeta(doc, name, attr = 'name') {
    const el = doc.querySelector(`meta[${attr}="${name}"]`);
    return el?.getAttribute('content')?.trim() || '';
  }

  /**
   * Get logo candidate URLs from HTML
   */
  static _getLogoCandidates(doc, baseUrl) {
    const candidates = [];
    try {
      const base = new URL(baseUrl);
      const resolve = (href) => {
        if (!href) return null;
        try {
          return new URL(href, base).href;
        } catch {
          return null;
        }
      };

      const add = (url, source) => {
        const resolved = resolve(url);
        if (resolved && !candidates.some(c => c.url === resolved)) {
          candidates.push({ url: resolved, source });
        }
      };

      // 1. Try og:image (often the company logo/brand image)
      const ogImage = doc.querySelector('meta[property="og:image"]')?.getAttribute('content');
      if (ogImage) add(ogImage, 'og:image');

      // 2. Try apple-touch-icon (high-res logo)
      const appleIcon = doc.querySelector('link[rel="apple-touch-icon"]')?.getAttribute('href');
      if (appleIcon) add(appleIcon, 'apple-touch-icon');

      // 3. Try icon link tags of various sizes
      doc.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]').forEach(link => {
        const href = link.getAttribute('href');
        const sizes = link.getAttribute('sizes') || '';
        if (href) add(href, `favicon ${sizes}`.trim());
      });

      // 4. Try img elements with logo-related attributes
      doc.querySelectorAll('img').forEach(img => {
        const src = img.getAttribute('src');
        const cls = img.className || '';
        const id = img.id || '';
        const alt = img.getAttribute('alt') || '';
        
        if (src && !src.startsWith('data:')) {
          const isLogo = /logo/i.test(cls) || /logo/i.test(id) || /logo/i.test(alt) || /logo/i.test(src) ||
                         /brand/i.test(cls) || /brand/i.test(id) || /brand/i.test(alt);
          if (isLogo) {
            add(src, `img-tag (alt: ${alt})`);
          }
        }
      });

      // Fallbacks
      add('/favicon.ico', 'default favicon');

    } catch (err) {
      console.warn('[WebScraper] Logo candidates extraction failed:', err.message);
    }
    return candidates.slice(0, 10);
  }

  /**
   * Extract all headings (h1-h3)
   */
  static _getHeadings(doc) {
    const headings = [];
    doc.querySelectorAll('h1, h2, h3').forEach(h => {
      const text = h.textContent?.trim();
      if (text && text.length > 2 && text.length < 200) {
        headings.push({
          level: h.tagName,
          text
        });
      }
    });
    return headings.slice(0, 20); // Limit
  }

  /**
   * Extract main content text (paragraphs, lists, etc.)
   */
  static _getMainContent(doc) {
    // Prioritize <main>, <article>, or fallback to body
    const mainEl = doc.querySelector('main') || doc.querySelector('article') || doc.querySelector('[role="main"]') || doc.body;
    if (!mainEl) return '';

    const blocks = [];
    mainEl.querySelectorAll('p, li, blockquote, td, .about, .description, .text, [class*="content"], [class*="about"]').forEach(el => {
      const text = el.textContent?.trim();
      if (text && text.length > 20 && text.length < 1000) {
        // Avoid duplicates
        if (!blocks.some(b => b === text || text.includes(b) || b.includes(text))) {
          blocks.push(text);
        }
      }
    });

    // Limit total content to ~4000 chars for API efficiency
    let totalContent = '';
    for (const block of blocks) {
      if (totalContent.length + block.length > 4000) break;
      totalContent += block + '\n\n';
    }

    return totalContent.trim();
  }

  /**
   * Extract navigation links (reveals site structure/services)
   */
  static _getNavLinks(doc) {
    const links = [];
    doc.querySelectorAll('a').forEach(a => {
      const text = a.textContent?.trim();
      if (text && text.length > 2 && text.length < 60 && !text.includes('\n')) {
        const lower = text.toLowerCase();
        // Filter for relevant business links
        const relevant = ['sobre', 'about', 'serviço', 'service', 'produto', 'product',
          'solução', 'solution', 'contato', 'contact', 'quem somos', 'missão',
          'valores', 'portfolio', 'clientes', 'cases', 'blog', 'preço', 'price',
          'plano', 'plan', 'equipe', 'team', 'empresa', 'company', 'história'];
        if (relevant.some(r => lower.includes(r))) {
          links.push(text);
        }
      }
    });
    return [...new Set(links)].slice(0, 15);
  }

  /**
   * Extract hex, rgb, and rgba colors found in inline styles and CSS
   */
  static _extractInlineColors(html, cssText = '') {
    const combined = html + '\n' + cssText;
    const colors = {};
    
    // 1. Find hex colors (#FFFFFF, #e0e0e0)
    const hexRegex = /#[0-9A-Fa-f]{3,6}\b/g;
    const hexMatches = combined.match(hexRegex) || [];
    hexMatches.forEach(c => {
      let hex = c.toUpperCase();
      if (hex.length === 4) {
        hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
      }
      colors[hex] = (colors[hex] || 0) + 1;
    });

    // 2. Find rgb/rgba colors and convert to hex
    const rgbRegex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*[\d.]+)?\)/gi;
    let rgbMatch;
    while ((rgbMatch = rgbRegex.exec(combined)) !== null) {
      const r = parseInt(rgbMatch[1], 10);
      const g = parseInt(rgbMatch[2], 10);
      const b = parseInt(rgbMatch[3], 10);
      const hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
      colors[hex] = (colors[hex] || 0) + 1;
    }

    // List of common neutrals to deprioritize
    const neutrals = new Set([
      '#FFFFFF', '#000000', '#FFF', '#000',
      // Slate
      '#F8FAFC', '#F1F5F9', '#E2E8F0', '#CBD5E1', '#94A3B8', '#64748B', '#475569', '#334155', '#1E293B', '#0F172A', '#020617',
      // Gray
      '#F9FAFB', '#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF', '#71717A', '#52525B', '#3F3F46', '#27272A', '#18181B', '#09090B',
      // Zinc/Neutral/Stone
      '#FAFAFA', '#F4F4F5', '#E4E4E7', '#D4D4D8', '#A1A1AA', '#71717A', '#52525B', '#3F3F46', '#27272A', '#18181B', '#09090B',
      '#F5F5F5', '#E5E5E5', '#D4D4D4', '#A3A3A3', '#737373', '#525252', '#404040', '#262626', '#171717', '#0A0A0A',
      '#FAFAF9', '#F5F5F4', '#E7E5E4', '#D6D3D1', '#A8A29E', '#78716C', '#57534E', '#44403C', '#292524', '#1C1917', '#0C0A09',
      '#ECECEC', '#F9F9F9', '#CCCCCC', '#999999', '#666666', '#333333', '#EEEEEE'
    ]);

    // Sort by count descending, but push neutrals to the bottom
    return Object.entries(colors)
      .sort((a, b) => {
        const aIsNeutral = neutrals.has(a[0]);
        const bIsNeutral = neutrals.has(b[0]);
        if (aIsNeutral && !bIsNeutral) return 1;
        if (!aIsNeutral && bIsNeutral) return -1;
        return b[1] - a[1];
      })
      .slice(0, 30) // Return up to 30 colors
      .map(([color]) => color);
  }

  /**
   * Extract explicit text colors (color: #...)
   */
  static _extractTextColors(html, cssText = '') {
    const combined = html + '\n' + cssText;
    const colors = {};
    const colorRegex = /\bcolor\s*:\s*([^;!}]+)/gi;
    let match;
    while ((match = colorRegex.exec(combined)) !== null) {
      const val = match[1].trim();
      const hexMatch = val.match(/#[0-9A-Fa-f]{3,6}\b/);
      if (hexMatch) {
        let hex = hexMatch[0].toUpperCase();
        if (hex.length === 4) {
          hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
        }
        colors[hex] = (colors[hex] || 0) + 1;
      }
    }

    const neutrals = new Set(['#FFFFFF', '#FFF', '#000000', '#000']);
    return Object.entries(colors)
      .sort((a, b) => {
        const aIsNeutral = neutrals.has(a[0]);
        const bIsNeutral = neutrals.has(b[0]);
        if (aIsNeutral && !bIsNeutral) return 1;
        if (!aIsNeutral && bIsNeutral) return -1;
        return b[1] - a[1];
      })
      .slice(0, 10)
      .map(([color]) => color);
  }

  /**
   * Extract hex colors directly from SVG logo code
   */
  static async _extractLogoColors(logoUrl) {
    try {
      const svgText = await WebScraperService._fetchWithFallback(logoUrl);
      const colors = new Set();
      const hexRegex = /#[0-9A-Fa-f]{6}\b/g;
      const matches = svgText.match(hexRegex) || [];
      matches.forEach(c => {
        const upper = c.toUpperCase();
        if (!['#FFFFFF', '#000000', '#FFF', '#000'].includes(upper)) {
          colors.add(upper);
        }
      });
      return [...colors].slice(0, 5);
    } catch {
      return [];
    }
  }

  /**
   * Extract font families loaded or styled
   */
  static _extractTypography(doc, html, cssText = '') {
    const combined = html + '\n' + cssText;
    const headingFonts = new Set();
    const bodyFonts = new Set();
    const allFonts = new Set();

    // 1. Parse external stylesheet URLs (Google Fonts etc.)
    doc.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href.includes('fonts.googleapis.com') || href.includes('fonts.gstatic.com')) {
        try {
          const urlObj = new URL(href, 'https://example.com');
          const families = urlObj.searchParams.getAll('family');
          families.forEach(f => {
            const fontName = f.split(':')[0].replace(/\+/g, ' ').trim();
            if (fontName) allFonts.add(fontName);
          });
        } catch {}
      }
    });

    // 2. Parse headings selectors (h1, h2, h3, title, heading)
    const headingFontRegex = /(?:h1|h2|h3|h4|h5|h6|heading|title)[^{]*\{\s*[^}]*font-family\s*:\s*([^;!}]+)/gi;
    let match;
    while ((match = headingFontRegex.exec(combined)) !== null) {
      const fontVal = match[1].split(',')[0].replace(/['"\s]/g, '').trim();
      if (fontVal && fontVal.length > 2 && fontVal.length < 30) {
        const lower = fontVal.toLowerCase();
        const generics = ['inherit', 'initial', 'unset', 'sans-serif', 'serif', 'monospace', 'system-ui', '-apple-system', 'blinkmacsystemfont'];
        if (!generics.includes(lower)) {
          headingFonts.add(fontVal.charAt(0).toUpperCase() + fontVal.slice(1));
        }
      }
    }

    // 3. Parse body / text selectors
    const bodyFontRegex = /(?:body|html|p|\.text|\.body)[^{]*\{\s*[^}]*font-family\s*:\s*([^;!}]+)/gi;
    while ((match = bodyFontRegex.exec(combined)) !== null) {
      const fontVal = match[1].split(',')[0].replace(/['"\s]/g, '').trim();
      if (fontVal && fontVal.length > 2 && fontVal.length < 30) {
        const lower = fontVal.toLowerCase();
        const generics = ['inherit', 'initial', 'unset', 'sans-serif', 'serif', 'monospace', 'system-ui', '-apple-system', 'blinkmacsystemfont'];
        if (!generics.includes(lower)) {
          bodyFonts.add(fontVal.charAt(0).toUpperCase() + fontVal.slice(1));
        }
      }
    }

    // Fallback/General font-family matches
    const fontRegex = /font-family\s*:\s*([^;!}]+)/gi;
    while ((match = fontRegex.exec(combined)) !== null) {
      const fontVal = match[1].split(',')[0].replace(/['"\s]/g, '').trim();
      if (fontVal && fontVal.length > 2 && fontVal.length < 30) {
        const lower = fontVal.toLowerCase();
        const generics = ['inherit', 'initial', 'unset', 'sans-serif', 'serif', 'monospace', 'system-ui', '-apple-system', 'blinkmacsystemfont'];
        if (!generics.includes(lower)) {
          const capitalized = fontVal.charAt(0).toUpperCase() + fontVal.slice(1);
          allFonts.add(capitalized);
        }
      }
    }

    // Synthesize heading/body font sets
    const fallbackFonts = [...allFonts];
    if (headingFonts.size === 0 && fallbackFonts.length > 0) {
      headingFonts.add(fallbackFonts[0]);
    }
    if (bodyFonts.size === 0 && fallbackFonts.length > 0) {
      bodyFonts.add(fallbackFonts[1] || fallbackFonts[0]);
    }

    return {
      headings: [...headingFonts].slice(0, 3),
      body: [...bodyFonts].slice(0, 3)
    };
  }

  /**
   * Format extracted data into a readable summary for the AI
   * @param {Object} data - Extracted website data
   * @returns {string} Formatted text summary
   */
  static formatForPrompt(data) {
    const parts = [];

    parts.push(`=== DADOS EXTRAÍDOS DO SITE: ${data.url} ===`);

    if (data.title) {
      parts.push(`\nTÍTULO DO SITE: ${data.title}`);
    }

    if (data.metaDescription) {
      parts.push(`META DESCRIÇÃO: ${data.metaDescription}`);
    }

    if (data.metaKeywords) {
      parts.push(`PALAVRAS-CHAVE: ${data.metaKeywords}`);
    }

    if (data.ogTitle && data.ogTitle !== data.title) {
      parts.push(`TÍTULO SOCIAL: ${data.ogTitle}`);
    }

    if (data.ogDescription && data.ogDescription !== data.metaDescription) {
      parts.push(`DESCRIÇÃO SOCIAL: ${data.ogDescription}`);
    }

    if (data.headings.length > 0) {
      parts.push(`\nTÍTULOS E SEÇÕES DO SITE:`);
      data.headings.forEach(h => {
        parts.push(`  [${h.level}] ${h.text}`);
      });
    }

    if (data.links.length > 0) {
      parts.push(`\nSEÇÕES/SERVIÇOS IDENTIFICADOS: ${data.links.join(', ')}`);
    }

    if (data.colors.length > 0) {
      parts.push(`\nCORES ENCONTRADAS NO SITE (Estética geral): ${data.colors.join(', ')}`);
    }

    if (data.textColors && data.textColors.length > 0) {
      parts.push(`CORES DE TEXTO ENCONTRADAS NO SITE: ${data.textColors.join(', ')}`);
    }

    if (data.typography) {
      if (data.typography.headings && data.typography.headings.length > 0) {
        parts.push(`FONTES/TIPOGRAFIA IDENTIFICADAS PARA TÍTULOS (H1, H2, etc.): ${data.typography.headings.join(', ')}`);
      }
      if (data.typography.body && data.typography.body.length > 0) {
        parts.push(`FONTES/TIPOGRAFIA IDENTIFICADAS PARA TEXTO DE CORPO: ${data.typography.body.join(', ')}`);
      }
    }

    if (data.logoColors && data.logoColors.length > 0) {
      parts.push(`CORES EXTRAÍDAS DIRETAMENTE DO ARQUIVO DA LOGO DA MARCA: ${data.logoColors.join(', ')}`);
    }

    if (data.logoCandidates && data.logoCandidates.length > 0) {
      parts.push(`\nCANDIDATOS A LOGO ENCONTRADOS (Escolha a melhor URL de logo a partir destes):`);
      data.logoCandidates.forEach((c, idx) => {
        parts.push(`  Candidate #${idx + 1}: ${c.url} (Fonte: ${c.source})`);
      });
    }

    if (data.mainContent) {
      parts.push(`\nCONTEÚDO PRINCIPAL DO SITE:\n"""\n${data.mainContent}\n"""`);
    }

    return parts.join('\n');
  }
}
