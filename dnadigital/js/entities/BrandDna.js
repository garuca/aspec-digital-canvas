// ============================================================
// ASPEC IA — BrandDna Entity
// ============================================================

export class BrandDna {
  constructor({
    id = null,
    userId = null,
    companyName = '',
    niche = '',
    valueProposition = '',
    voiceTone = [],
    colorPalette = {
      primary: '#7C3AED',
      secondary: '#3B82F6',
      accent: '#06D6A0',
      fontFamily: 'Inter, sans-serif',
      fontColor: '#1F2937',
      fontFamilySecondary: 'Inter, sans-serif',
      fontColorSecondary: '#4B5563',
      companyDescription: '',
      justification: ''
    },
    visualElements = '',
    logoUrl = '',
    createdAt = null
  } = {}) {
    this.id = id;
    this.userId = userId;
    this.companyName = companyName;
    this.niche = niche;
    this.valueProposition = valueProposition;
    this.voiceTone = Array.isArray(voiceTone) ? voiceTone : [];
    this.colorPalette = colorPalette;
    this.visualElements = visualElements;
    this.logoUrl = logoUrl || '';
    this.createdAt = createdAt || new Date().toISOString();
  }

  /**
   * Create BrandDna from Supabase row
   */
  static fromSupabase(row) {
    return new BrandDna({
      id: row.id,
      userId: row.user_id,
      companyName: row.company_name,
      niche: row.niche,
      valueProposition: row.value_proposition,
      voiceTone: typeof row.voice_tone === 'string' ? JSON.parse(row.voice_tone) : row.voice_tone,
      colorPalette: typeof row.color_palette === 'string' ? JSON.parse(row.color_palette) : row.color_palette,
      visualElements: row.visual_elements,
      logoUrl: row.logo_url || '',
      createdAt: row.created_at
    });
  }

  /**
   * Create BrandDna from Gemini AI response
   */
  static fromGeminiResponse(json, companyName, userId, logoUrl = '') {
    return new BrandDna({
      userId,
      companyName: json.nome_empresa || companyName || '',
      niche: json.nicho || '',
      valueProposition: json.proposta_valor || '',
      voiceTone: json.tom_de_voz || [],
      colorPalette: {
        primary: json.paleta_cores?.primaria || '#7C3AED',
        secondary: json.paleta_cores?.secundaria || '#3B82F6',
        accent: json.paleta_cores?.detalhe || '#06D6A0',
        fontFamily: json.font_family || 'Inter, sans-serif',
        fontColor: json.font_color || '#1F2937',
        fontFamilySecondary: json.font_family_secondary || 'Inter, sans-serif',
        fontColorSecondary: json.font_color_secondary || '#4B5563',
        companyDescription: json.descricao_empresa || '',
        justification: json.paleta_cores?.justificativa || ''
      },
      visualElements: json.elementos_visuais || '',
      logoUrl: json.logo_url || logoUrl || ''
    });
  }

  /**
   * Convert to Supabase row format
   */
  toSupabase() {
    const data = {
      user_id: this.userId,
      company_name: this.companyName,
      niche: this.niche,
      value_proposition: this.valueProposition,
      voice_tone: this.voiceTone,
      color_palette: this.colorPalette,
      visual_elements: this.visualElements,
      logo_url: this.logoUrl || ''
    };
    if (this.id) data.id = this.id;
    return data;
  }

  /**
   * Convert to plain JSON
   */
  toJson() {
    return {
      id: this.id,
      userId: this.userId,
      companyName: this.companyName,
      niche: this.niche,
      valueProposition: this.valueProposition,
      voiceTone: this.voiceTone,
      colorPalette: this.colorPalette,
      visualElements: this.visualElements,
      logoUrl: this.logoUrl || '',
      createdAt: this.createdAt
    };
  }

  /**
   * Validate required fields
   */
  isValid() {
    return !!(this.companyName && this.niche && this.valueProposition);
  }
}
