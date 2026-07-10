// ============================================================
// ASPEC IA — Brand Repository
// ============================================================

import { getSupabase, isSupabaseConfigured } from '../config/supabase.js';
import { BrandDna } from '../entities/BrandDna.js';
import { generateUUID } from '../utils/helpers.js';

const LOCAL_STORAGE_KEY = 'aspec_ia_brand';

export class BrandRepository {
  /**
   * Save brand DNA
   * @param {BrandDna} brandDna
   * @returns {Promise<BrandDna>}
   */
  static async saveBrand(brandDna) {
    if (isSupabaseConfigured()) {
      return BrandRepository._saveToSupabase(brandDna);
    }
    return BrandRepository._saveToLocalStorage(brandDna);
  }

  /**
   * Get brand DNA by user ID
   * @param {string} userId
   * @returns {Promise<BrandDna|null>}
   */
  static async getBrand(userId) {
    if (isSupabaseConfigured()) {
      return BrandRepository._getFromSupabase(userId);
    }
    return BrandRepository._getFromLocalStorage();
  }

  /**
   * Update brand DNA
   * @param {BrandDna} brandDna
   * @returns {Promise<BrandDna>}
   */
  static async updateBrand(brandDna) {
    if (isSupabaseConfigured()) {
      return BrandRepository._updateInSupabase(brandDna);
    }
    return BrandRepository._saveToLocalStorage(brandDna);
  }

  // ── Supabase Methods ──

  static async _saveToSupabase(brandDna) {
    const sb = getSupabase();
    const { data, error } = await sb
      .from('brands')
      .insert(brandDna.toSupabase())
      .select()
      .single();

    if (error) throw new Error(`Erro ao salvar marca: ${error.message}`);
    return BrandDna.fromSupabase(data);
  }

  static async _getFromSupabase(userId) {
    const sb = getSupabase();
    const { data, error } = await sb
      .from('brands')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // No rows
      throw new Error(`Erro ao buscar marca: ${error.message}`);
    }
    return data ? BrandDna.fromSupabase(data) : null;
  }

  static async _updateInSupabase(brandDna) {
    const sb = getSupabase();
    const { data, error } = await sb
      .from('brands')
      .update(brandDna.toSupabase())
      .eq('id', brandDna.id)
      .select()
      .single();

    if (error) throw new Error(`Erro ao atualizar marca: ${error.message}`);
    return BrandDna.fromSupabase(data);
  }

  // ── LocalStorage Fallback ──

  static _saveToLocalStorage(brandDna) {
    if (!brandDna.id) {
      brandDna.id = generateUUID();
    }
    if (!brandDna.userId) {
      brandDna.userId = 'local-user';
    }
    brandDna.createdAt = brandDna.createdAt || new Date().toISOString();
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(brandDna.toJson()));
    return brandDna;
  }

  static _getFromLocalStorage() {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!stored) return null;
    try {
      const json = JSON.parse(stored);
      return new BrandDna(json);
    } catch {
      return null;
    }
  }
}
