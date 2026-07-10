// ============================================================
// ASPEC IA — AI Provider Configuration
// Manages provider selection: Gemini vs OpenRouter (DeepSeek)
// ============================================================

export const AI_PROVIDERS = {
  GEMINI: 'gemini',
  OPENROUTER: 'openrouter'
};

export const PROVIDER_INFO = {
  [AI_PROVIDERS.GEMINI]: {
    name: 'Google Gemini',
    icon: '✦',
    description: 'Gemini 2.0 Flash',
    color: '#4285F4'
  },
  [AI_PROVIDERS.OPENROUTER]: {
    name: 'DeepSeek (OpenRouter)',
    icon: '🐋',
    description: 'DeepSeek V3',
    color: '#536DFE'
  }
};

// ── OpenRouter Configuration ──
const OPENROUTER_API_KEY = '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';
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1/chat/completions';

export const OPENROUTER_MODELS = {
  DNA: 'deepseek/deepseek-chat-v3-0324',         // DeepSeek V3 for DNA extraction
  POST: 'deepseek/deepseek-chat-v3-0324'          // DeepSeek V3 for post generation
};

/**
 * Get current AI provider from localStorage
 * @returns {string} Provider key
 */
export function getActiveProvider() {
  return localStorage.getItem('aspec_ia_ai_provider') || AI_PROVIDERS.OPENROUTER;
}

/**
 * Set active AI provider
 * @param {string} provider - Provider key from AI_PROVIDERS
 */
export function setActiveProvider(provider) {
  if (!Object.values(AI_PROVIDERS).includes(provider)) {
    throw new Error(`Invalid AI provider: ${provider}`);
  }
  localStorage.setItem('aspec_ia_ai_provider', provider);
}

/**
 * Check if OpenRouter is configured
 */
export function isOpenRouterConfigured() {
  return OPENROUTER_API_KEY && OPENROUTER_API_KEY !== 'YOUR_OPENROUTER_API_KEY';
}

/**
 * Get OpenRouter API key
 */
export function getOpenRouterApiKey() {
  return OPENROUTER_API_KEY;
}

/**
 * Get OpenRouter endpoint
 */
export function getOpenRouterEndpoint() {
  return OPENROUTER_BASE_URL;
}
