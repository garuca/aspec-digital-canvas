// ============================================================
// ASPEC IA — InstagramPost Entity
// ============================================================

export class InstagramPost {
  constructor({
    id = null,
    brandId = null,
    userPrompt = '',
    caption = '',
    imageUrl = '',
    imagePromptEn = '',
    createdAt = null
  } = {}) {
    this.id = id;
    this.brandId = brandId;
    this.userPrompt = userPrompt;
    this.caption = caption;
    this.imageUrl = imageUrl;
    this.imagePromptEn = imagePromptEn;
    this.createdAt = createdAt || new Date().toISOString();
  }

  /**
   * Create from Supabase row
   */
  static fromSupabase(row) {
    return new InstagramPost({
      id: row.id,
      brandId: row.brand_id,
      userPrompt: row.prompt,
      caption: row.caption,
      imageUrl: row.image_url,
      imagePromptEn: row.image_prompt,
      createdAt: row.created_at
    });
  }

  /**
   * Convert to Supabase row format
   */
  toSupabase() {
    const data = {
      brand_id: this.brandId,
      prompt: this.userPrompt,
      caption: this.caption,
      image_url: this.imageUrl,
      image_prompt: this.imagePromptEn
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
      brandId: this.brandId,
      userPrompt: this.userPrompt,
      caption: this.caption,
      imageUrl: this.imageUrl,
      imagePromptEn: this.imagePromptEn,
      createdAt: this.createdAt
    };
  }

  /**
   * Get formatted date
   */
  getFormattedDate() {
    if (!this.createdAt) return '';
    const date = new Date(this.createdAt);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
