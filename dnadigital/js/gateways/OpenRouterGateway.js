// ============================================================
// ASPEC IA — OpenRouter Gateway (DeepSeek)
// ============================================================

import { getOpenRouterApiKey, getOpenRouterEndpoint, OPENROUTER_MODELS, isOpenRouterConfigured } from '../config/ai.js';
import { PromptService } from '../services/PromptService.js';
import { extractJsonFromText } from '../utils/helpers.js';
import { isValidDnaResponse, isValidPostResponse } from '../utils/validators.js';

export class OpenRouterGateway {

  /** Max retry attempts for rate-limited requests */
  static MAX_RETRIES = 3;

  /**
   * Fetch with automatic retry on 429 (rate limit) errors.
   * Uses exponential backoff: 1s → 2s → 4s.
   */
  static async _fetchWithRetry(model, messages) {
    const endpoint = getOpenRouterEndpoint();
    const apiKey = getOpenRouterApiKey();

    for (let attempt = 0; attempt <= OpenRouterGateway.MAX_RETRIES; attempt++) {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'ASPEC IA'
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.3,
          max_tokens: 2048,
          response_format: { type: 'json_object' }
        })
      });

      if (response.status === 429 && attempt < OpenRouterGateway.MAX_RETRIES) {
        const waitMs = Math.pow(2, attempt) * 1000;
        console.warn(`[OpenRouterGateway] Rate limited (429). Retrying in ${waitMs / 1000}s... (attempt ${attempt + 1}/${OpenRouterGateway.MAX_RETRIES})`);
        await new Promise(resolve => setTimeout(resolve, waitMs));
        continue;
      }

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(`OpenRouter API error: ${error.error?.message || response.statusText}`);
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
    if (!isOpenRouterConfigured()) {
      throw new Error('OpenRouter API key não configurada');
    }

    const prompt = PromptService.getBrandDnaPrompt(description);

    const response = await OpenRouterGateway._fetchWithRetry(
      OPENROUTER_MODELS.DNA,
      [
        { role: 'system', content: 'You are a brand planner expert. Always respond with valid JSON only, no markdown, no extra text.' },
        { role: 'user', content: prompt }
      ]
    );

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;

    if (!text) {
      throw new Error('Resposta vazia do OpenRouter/DeepSeek');
    }

    const json = extractJsonFromText(text);
    if (!json) {
      throw new Error('Não foi possível extrair JSON da resposta do DeepSeek');
    }

    if (!isValidDnaResponse(json)) {
      throw new Error('Resposta do DeepSeek com formato inválido para DNA');
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
    if (!isOpenRouterConfigured()) {
      throw new Error('OpenRouter API key não configurada');
    }

    const prompt = PromptService.getPostContentPrompt(brandDna, userPrompt, referenceImageDescription, platform, format);

    const response = await OpenRouterGateway._fetchWithRetry(
      OPENROUTER_MODELS.POST,
      [
        { role: 'system', content: `You are an expert ${platform} content creator for businesses. Always respond with valid JSON only, no markdown, no extra text.` },
        { role: 'user', content: prompt }
      ]
    );

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;

    if (!text) {
      throw new Error('Resposta vazia do OpenRouter/DeepSeek');
    }

    const json = extractJsonFromText(text);
    if (!json) {
      throw new Error('Não foi possível extrair JSON da resposta do DeepSeek');
    }

    if (!isValidPostResponse(json)) {
      throw new Error('Resposta do DeepSeek com formato inválido para post');
    }

    return json;
  }

  /**
   * Describe an image using meta-llama/llama-3.2-11b-vision-instruct:free with openrouter/free fallback
   * @param {string} base64Data - Base64 encoded image content (data:image/...)
   * @returns {Promise<string>} Text description of the image
   */
  static async describeImage(base64Data) {
    if (!isOpenRouterConfigured()) {
      throw new Error('OpenRouter API key não configurada');
    }

    const endpoint = getOpenRouterEndpoint();
    const apiKey = getOpenRouterApiKey();
    const modelsToTry = [
      'google/gemini-2.5-flash:free',
      'meta-llama/llama-3.2-11b-vision-instruct:free',
      'openrouter/free'
    ];

    let lastError;

    for (const model of modelsToTry) {
      try {
        console.log(`[OpenRouterGateway] Describing image with model: ${model}`);
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': window.location.origin,
            'X-Title': 'ASPEC IA'
          },
          body: JSON.stringify({
            model: model,
            messages: [
              {
                role: 'user',
                content: [
                  {
                    type: 'text',
                    text: `Analise a imagem de referência fornecida e extraia um briefing visual estruturado e detalhado para a criação de novos posts profissionais para redes sociais de empresas (Instagram, LinkedIn, etc.), com foco em clonar a sua estrutura.

Responda ÚNICA E EXCLUSIVAMENTE com um JSON no seguinte formato, sem markdown e sem outras explicações adicionais:
{
  "tipo_imagem": "arte_grafica_post" | "fotografia_comercial" | "outro",
  "estilo_estetica": "Estilo estético e atmosfera geral (ex: corporativo moderno, colagem digital, tecnológico)",
  "diagramacao_layout": {
    "grid_estrutura": "Descrição precisa do grid (ex: assimétrico, dividido em 2 colunas, sobreposição de elementos)",
    "posicionamento_elementos": "Onde está cada elemento (ex: logo no topo esquerdo, título grande no cabeçalho, lista de tópicos na coluna esquerda, imagem de smartphone na direita, rodapé com CTA sólido)",
    "elementos_geometricos_graficos": "Linhas, conectores, formas geométricas, molduras ou grafismos de fundo que estruturam a composição"
  },
  "paleta_cores_originais": {
    "predominantes": ["cor de fundo 1", "cor 2"],
    "destaques_e_acentos": ["cor destaque 1", "cor destaque 2"],
    "aplicacao": "Onde cada cor é usada (ex: laranja no botão de CTA e palavra-chave do título, branco no fundo)"
  },
  "tipografia_hierarquia": {
    "titulo": "Estilo da fonte de título (ex: All Caps, sem serifa, pesada bold) e cor",
    "corpo_texto": "Estilo da fonte do corpo (ex: sem serifa, pesos variados) e cor",
    "alinhamentos": "Direção e alinhamento dos textos na composição"
  },
  "conteudo_textual_e_icones": {
    "titulos_e_textos_detectados": ["Textos ou títulos aproximados que aparecem na imagem"],
    "secoes_de_texto": ["Quais seções de conteúdo existem, ex: Cabeçalho, Lista de Serviços, Benefícios, CTA, Rodapé"],
    "icones_e_ilustracoes": "Lista de ícones detectados e onde estão posicionados"
  },
  "fotografia_produtos": "Detalhes de produtos físicos, pessoas, telas, smartphones ou objetos integrados na imagem",
  "briefing_de_clonagem": "Instruções passo a passo detalhadas para recriar o layout visual idêntico mudando apenas o tema e as cores"
}`
                  },
                  {
                    type: 'image_url',
                    image_url: {
                      url: base64Data
                    }
                  }
                ]
              }
            ]
          })
        });

        if (!response.ok) {
          const error = await response.json().catch(() => ({}));
          throw new Error(error.error?.message || response.statusText);
        }

        const data = await response.json();
        const text = data.choices?.[0]?.message?.content;
        if (text) {
          const json = extractJsonFromText(text);
          if (json) {
            return JSON.stringify(json, null, 2);
          }
          return text.trim();
        }
        throw new Error('Resposta vazia');
      } catch (err) {
        lastError = err;
        console.warn(`[OpenRouterGateway] Model ${model} failed:`, err.message);
      }
    }

    throw new Error(`Erro ao analisar imagem com modelo Free: ${lastError?.message || 'Erro desconhecido'}`);
  }
}
