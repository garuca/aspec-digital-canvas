// ============================================================
// ASPEC IA — Post Repository
// ============================================================

import { getSupabase, isSupabaseConfigured } from '../config/supabase.js';
import { InstagramPost } from '../entities/InstagramPost.js';
import { generateUUID } from '../utils/helpers.js';

const LOCAL_STORAGE_KEY = 'aspec_ia_posts';

export class PostRepository {
  /**
   * Save a post
   * @param {InstagramPost} post
   * @returns {Promise<InstagramPost>}
   */
  static async savePost(post) {
    if (isSupabaseConfigured()) {
      return PostRepository._saveToSupabase(post);
    }
    return PostRepository._saveToLocalStorage(post);
  }

  /**
   * Get post history by brand ID
   * @param {string} brandId
   * @returns {Promise<InstagramPost[]>}
   */
  static async getHistory(brandId) {
    if (isSupabaseConfigured()) {
      return PostRepository._getFromSupabase(brandId);
    }
    return PostRepository._getFromLocalStorage();
  }

  /**
   * Delete a post
   * @param {string} postId
   * @returns {Promise<void>}
   */
  static async deletePost(postId) {
    if (isSupabaseConfigured()) {
      return PostRepository._deleteFromSupabase(postId);
    }
    return PostRepository._deleteFromLocalStorage(postId);
  }

  // ── Supabase Methods ──

  static async _saveToSupabase(post) {
    const sb = getSupabase();
    const { data, error } = await sb
      .from('posts')
      .insert(post.toSupabase())
      .select()
      .single();

    if (error) throw new Error(`Erro ao salvar post: ${error.message}`);
    return InstagramPost.fromSupabase(data);
  }

  static async _getFromSupabase(brandId) {
    const sb = getSupabase();
    const { data, error } = await sb
      .from('posts')
      .select('*')
      .eq('brand_id', brandId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Erro ao buscar histórico: ${error.message}`);
    return (data || []).map((row) => InstagramPost.fromSupabase(row));
  }

  static async _deleteFromSupabase(postId) {
    const sb = getSupabase();
    const { error } = await sb
      .from('posts')
      .delete()
      .eq('id', postId);

    if (error) throw new Error(`Erro ao deletar post: ${error.message}`);
  }

  // ── LocalStorage Fallback ──

  static _saveToLocalStorage(post) {
    if (!post.id) {
      post.id = generateUUID();
    }
    post.createdAt = post.createdAt || new Date().toISOString();

    const posts = PostRepository._getAllFromLocalStorage();
    posts.unshift(post.toJson());

    let success = false;
    let attempts = 0;
    const maxAttempts = posts.length;

    while (!success && attempts < maxAttempts) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
        success = true;
      } catch (err) {
        // QuotaExceededError check across browsers (Code 22 for Chrome/Safari/Firefox, or NS_ERROR_DOM_QUOTA_REACHED)
        const isQuotaError = err.name === 'QuotaExceededError' || 
                             err.name === 'NS_ERROR_DOM_QUOTA_REACHED' || 
                             err.code === 22;

        if (isQuotaError) {
          console.warn('[PostRepository] LocalStorage quota exceeded. Evicting the oldest post from local history...');
          if (posts.length > 1) {
            posts.pop(); // Remove the oldest post
            attempts++;
          } else {
            console.error('[PostRepository] Single post payload exceeds the full storage quota!');
            throw new Error('A imagem gerada é muito grande para o armazenamento local do navegador. Por favor, limpe os dados do site ou configure o Supabase.');
          }
        } else {
          throw err;
        }
      }
    }

    return post;
  }

  static _getFromLocalStorage() {
    const posts = PostRepository._getAllFromLocalStorage();
    return posts.map((json) => new InstagramPost(json));
  }

  static _deleteFromLocalStorage(postId) {
    const posts = PostRepository._getAllFromLocalStorage();
    const filtered = posts.filter((p) => p.id !== postId);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
  }

  static _getAllFromLocalStorage() {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
}
