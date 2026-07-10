// ============================================================
// ASPEC IA — Gemini Gateway
// ============================================================

import { getGeminiEndpoint, MODELS, JSON_GENERATION_CONFIG, isGeminiConfigured } from '../config/gemini.js';
import { PromptService } from '../services/PromptService.js';
import { extractJsonFromText } from '../utils/helpers.js';
import { isValidDnaResponse, isValidPostResponse } from '../utils/validators.js';

export class GeminiGateway {

  /** Max retry attempts for rate-limited requests */
  static MAX_RETRIES = 3;

  /**
   * Fetch with automatic retry on 429 (rate limit) errors.
   * Uses exponential backoff: 1s → 2s → 4s.
   * @param {string} endpoint - API endpoint URL
   * @param {Object} body - Request body
   * @returns {Promise<Response>} Successful response
   */
  static async _fetchWithRetry(endpoint, body) {
    for (let attempt = 0; attempt <= GeminiGateway.MAX_RETRIES; attempt++) {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.status === 429 && attempt < GeminiGateway.MAX_RETRIES) {
        const waitMs = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
        console.warn(`[GeminiGateway] Rate limited (429). Retrying in ${waitMs / 1000}s... (attempt ${attempt + 1}/${GeminiGateway.MAX_RETRIES})`);
        await new Promise(resolve => setTimeout(resolve, waitMs));
        continue;
      }

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(`Gemini API error: ${error.error?.message || response.statusText}`);
      }

      return response;
    }
  }

  /**
   * Extract brand DNA from company description
   * @param {string} description - Company description text
   * @returns {Promise<Object>} Structured DNA JSON
   */
  static async extractBrandDna(description) {
    if (!isGeminiConfigured()) {
      // Return mock data for development
      return GeminiGateway._mockDnaResponse(description);
    }

    const prompt = PromptService.getBrandDnaPrompt(description);
    const endpoint = getGeminiEndpoint(MODELS.DNA);

    const response = await GeminiGateway._fetchWithRetry(endpoint, {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: JSON_GENERATION_CONFIG
    });

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error('Resposta vazia do Gemini');
    }

    const json = extractJsonFromText(text);
    if (!json) {
      throw new Error('Não foi possível extrair JSON da resposta do Gemini');
    }

    if (!isValidDnaResponse(json)) {
      throw new Error('Resposta do Gemini com formato inválido para DNA');
    }

    return json;
  }

  /**
   * Generate post content (caption + image prompt)
   * @param {BrandDna} brandDna - Brand DNA object
   * @param {string} userPrompt - User's post description
   * @returns {Promise<Object>} Object with legenda and prompt_imagem_en
   */
  static async generatePostContent(brandDna, userPrompt, referenceImageDescription = '', platform = 'Instagram', format = 'Post (Feed)') {
    if (!isGeminiConfigured()) {
      return GeminiGateway._mockPostResponse(userPrompt);
    }

    const prompt = PromptService.getPostContentPrompt(brandDna, userPrompt, referenceImageDescription, platform, format);
    const endpoint = getGeminiEndpoint(MODELS.POST);

    const response = await GeminiGateway._fetchWithRetry(endpoint, {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: JSON_GENERATION_CONFIG
    });

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error('Resposta vazia do Gemini');
    }

    const json = extractJsonFromText(text);
    if (!json) {
      throw new Error('Não foi possível extrair JSON da resposta do Gemini');
    }

    if (!isValidPostResponse(json)) {
      throw new Error('Resposta do Gemini com formato inválido para post');
    }

    return json;
  }

  /**
   * Mock DNA response for development without API key
   */
  static _mockDnaResponse(description) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          nicho: 'Marketing Digital e Tecnologia',
          proposta_valor: 'Automatizar a criação de conteúdo visual profissional para redes sociais utilizando inteligência artificial, mantendo a identidade visual consistente da marca.',
          tom_de_voz: ['Profissional', 'Inovador', 'Acessível', 'Confiante'],
          paleta_cores: {
            primaria: '#7C3AED',
            secundaria: '#3B82F6',
            detalhe: '#06D6A0',
            justificativa: 'O violeta transmite inovação e criatividade, o azul passa confiança e profissionalismo, e o verde-ciano representa crescimento e resultados. Juntas, essas cores posicionam a marca como uma solução tecnológica premium e confiável.'
          },
          elementos_visuais: 'Fotografia comercial com iluminação de estúdio, composições limpas e minimalistas, gradientes suaves, ícones geométricos, tipografia moderna sans-serif. Evitar imagens genéricas de banco. Priorizar cenas reais com produtos e pessoas em ambientes profissionais.'
        });
      }, 2000);
    });
  }

  /**
   * Mock post response for development without API key
   */
  static _mockPostResponse(userPrompt) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          legenda: `✨ ${userPrompt}\n\nDescubra como a inteligência artificial pode transformar a presença digital da sua marca. Cada post é criado com base no DNA da sua empresa, garantindo consistência e profissionalismo em cada publicação.\n\n🚀 Resultados reais com tecnologia de ponta.\n\n#MarketingDigital #InteligênciaArtificial #ConteúdoDigital #Inovação #SocialMedia`,
          prompt_imagem: `Professional commercial photography for Instagram post about "${userPrompt}". Clean composition with studio lighting, warm color grading. Modern minimalist scene with subtle violet (#7C3AED) and cyan (#06D6A0) accent colors. No text on image. 4K quality, photorealistic, square format 1:1. Professional brand photography style with bokeh background.`,
          prompt_imagem_en: `Professional commercial photography for Instagram post about "${userPrompt}". Clean composition with studio lighting, warm color grading. Modern minimalist scene with subtle violet (#7C3AED) and cyan (#06D6A0) accent colors. No text on image. 4K quality, photorealistic, square format 1:1. Professional brand photography style with bokeh background.`
        });
      }, 3000);
    });
  }
}
