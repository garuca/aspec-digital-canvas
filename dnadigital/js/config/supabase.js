// ============================================================
// ASPEC IA — Supabase Configuration
// ============================================================

// ⚠️ CONFIGURE SUAS CREDENCIAIS AQUI
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

let supabaseClient = null;

/**
 * Initialize and return the Supabase client
 */
export function getSupabase() {
  if (supabaseClient) return supabaseClient;

  if (typeof window.supabase === 'undefined') {
    console.error('[Supabase] Library not loaded. Make sure the CDN script is included.');
    return null;
  }

  if (SUPABASE_URL === 'YOUR_SUPABASE_URL') {
    console.warn('[Supabase] Using placeholder credentials. Configure supabase.js with your real credentials.');
    return null;
  }

  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return supabaseClient;
}

/**
 * Check if Supabase is configured
 */
export function isSupabaseConfigured() {
  return SUPABASE_URL !== 'YOUR_SUPABASE_URL' && SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY';
}

/**
 * Get current authenticated user
 */
export async function getCurrentUser() {
  const sb = getSupabase();
  if (!sb) return null;

  try {
    const { data: { user } } = await sb.auth.getUser();
    return user;
  } catch {
    return null;
  }
}

/**
 * Sign up with email and password
 */
export async function signUp(email, password) {
  const sb = getSupabase();
  if (!sb) throw new Error('Supabase não configurado');

  const { data, error } = await sb.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

/**
 * Sign in with email and password
 */
export async function signIn(email, password) {
  const sb = getSupabase();
  if (!sb) throw new Error('Supabase não configurado');

  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

/**
 * Sign out
 */
export async function signOut() {
  const sb = getSupabase();
  if (!sb) return;

  await sb.auth.signOut();
}

/**
 * Listen for auth state changes
 */
export function onAuthStateChange(callback) {
  const sb = getSupabase();
  if (!sb) return null;

  return sb.auth.onAuthStateChange(callback);
}
