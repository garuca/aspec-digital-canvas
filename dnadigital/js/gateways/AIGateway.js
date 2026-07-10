// ============================================================
// ASPEC IA — Unified AI Gateway
// Routes requests to the active provider (Gemini or OpenRouter)
// ============================================================

import { getActiveProvider, AI_PROVIDERS } from '../config/ai.js';
import { GeminiGateway } from './GeminiGateway.js';
import { OpenRouterGateway } from './OpenRouterGateway.js';

export class AIGateway {
  /**
   * Get the active gateway based on selected provider
   * @returns {typeof GeminiGateway | typeof OpenRouterGateway}
   */
  static _getGateway() {
    const provider = getActiveProvider();
    switch (provider) {
      case AI_PROVIDERS.OPENROUTER:
        return OpenRouterGateway;
      case AI_PROVIDERS.GEMINI:
      default:
        return GeminiGateway;
    }
  }

  /**
   * Extract brand DNA — delegates to active provider
   * @param {string} description
   * @returns {Promise<Object>}
   */
  static async extractBrandDna(description) {
    const gateway = AIGateway._getGateway();
    return gateway.extractBrandDna(description);
  }

  /**
   * Generate post content — delegates to active provider
   * @param {BrandDna} brandDna
   * @param {string} userPrompt
   * @param {string} referenceImageDescription
   * @returns {Promise<Object>}
   */
  static async generatePostContent(brandDna, userPrompt, referenceImageDescription = '', platform = 'Instagram', format = 'Post (Feed)') {
    const gateway = AIGateway._getGateway();
    return gateway.generatePostContent(brandDna, userPrompt, referenceImageDescription, platform, format);
  }

  /**
   * Describe a reference image using OpenRouter Gemini 1.5 Flash Free
   * @param {string} base64Data
   * @returns {Promise<string>}
   */
  static async describeImage(base64Data) {
    return OpenRouterGateway.describeImage(base64Data);
  }
}
