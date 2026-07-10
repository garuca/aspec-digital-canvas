// ============================================================
// ASPEC IA — Validators
// ============================================================

/**
 * Validate email format
 */
export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Validate password strength (min 6 chars)
 */
export function isValidPassword(password) {
  return typeof password === 'string' && password.length >= 6;
}

/**
 * Validate required field (non-empty string)
 */
export function isRequired(value) {
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return value !== null && value !== undefined;
}

/**
 * Validate minimum length
 */
export function minLength(value, min) {
  return typeof value === 'string' && value.trim().length >= min;
}

/**
 * Validate max length
 */
export function maxLength(value, max) {
  return typeof value === 'string' && value.trim().length <= max;
}

/**
 * Validate hex color
 */
export function isValidHexColor(color) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

/**
 * Validate JSON structure from Gemini for DNA extraction
 */
export function isValidDnaResponse(json) {
  if (!json || typeof json !== 'object') return false;
  const required = ['nicho', 'proposta_valor', 'tom_de_voz', 'paleta_cores', 'elementos_visuais'];
  for (const key of required) {
    if (!(key in json)) return false;
  }
  if (!Array.isArray(json.tom_de_voz)) return false;
  if (!json.paleta_cores || typeof json.paleta_cores !== 'object') return false;
  const paletaKeys = ['primaria', 'secundaria', 'detalhe', 'justificativa'];
  for (const key of paletaKeys) {
    if (!(key in json.paleta_cores)) return false;
  }
  return true;
}

/**
 * Validate JSON structure from Gemini for post generation
 */
export function isValidPostResponse(json) {
  if (!json || typeof json !== 'object') return false;
  return 'legenda' in json && ('prompt_imagem' in json || 'prompt_imagem_en' in json);
}

/**
 * Validate form fields and return errors
 */
export function validateForm(fields) {
  const errors = {};

  for (const [name, config] of Object.entries(fields)) {
    const { value, rules } = config;

    for (const rule of rules) {
      if (rule.type === 'required' && !isRequired(value)) {
        errors[name] = rule.message || 'Campo obrigatório';
        break;
      }
      if (rule.type === 'email' && !isValidEmail(value)) {
        errors[name] = rule.message || 'Email inválido';
        break;
      }
      if (rule.type === 'password' && !isValidPassword(value)) {
        errors[name] = rule.message || 'Mínimo 6 caracteres';
        break;
      }
      if (rule.type === 'minLength' && !minLength(value, rule.min)) {
        errors[name] = rule.message || `Mínimo ${rule.min} caracteres`;
        break;
      }
      if (rule.type === 'maxLength' && !maxLength(value, rule.max)) {
        errors[name] = rule.message || `Máximo ${rule.max} caracteres`;
        break;
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
