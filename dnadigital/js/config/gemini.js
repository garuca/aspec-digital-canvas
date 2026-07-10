// ============================================================
// ASPEC IA — Gemini API Configuration
// ============================================================

// ⚠️ CONFIGURE SUA API KEY AQUI
const GEMINI_API_KEY = 'AIzaSyBS-_-pMbEhpL-OeaQBwWC0D7Ik3Kwtgko';

// Model endpoints
const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

// Models used
export const MODELS = {
  DNA: 'gemini-2.0-flash',        // Fast model for DNA extraction
  POST: 'gemini-2.5-flash'        // More capable model for post generation
};

/**
 * Check if Gemini API is configured
 */
export function isGeminiConfigured() {
  return GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY';
}

/**
 * Get the API key
 */
export function getGeminiApiKey() {
  return GEMINI_API_KEY;
}

/**
 * Build endpoint URL for a model
 */
export function getGeminiEndpoint(model, action = 'generateContent') {
  return `${GEMINI_BASE_URL}/${model}:${action}?key=${GEMINI_API_KEY}`;
}

/**
 * Default generation config
 */
export const DEFAULT_GENERATION_CONFIG = {
  temperature: 0.7,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 2048,
};

/**
 * Stricter config for JSON responses
 */
export const JSON_GENERATION_CONFIG = {
  temperature: 0.3,
  topK: 20,
  topP: 0.9,
  maxOutputTokens: 2048,
  responseMimeType: 'application/json'
};
