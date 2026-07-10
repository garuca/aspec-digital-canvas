// ============================================================
// ASPEC IA — GeneratePost Use Case
// ============================================================

import { AIGateway } from '../gateways/AIGateway.js';
import { ImagenGateway } from '../gateways/ImagenGateway.js';
import { BrandRepository } from '../repositories/BrandRepository.js';
import { PostRepository } from '../repositories/PostRepository.js';
import { InstagramPost } from '../entities/InstagramPost.js';

export class GeneratePostUseCase {
  /**
   * Execute the post generation flow
   *
   * 1. Fetch brand DNA
   * 2. Generate caption + image prompt via AI
   * 3. Generate image via Imagen
   * 4. Save to history
   * 5. Return complete post
   *
   * @param {string} userPrompt - User's post description
   * @param {string} userId - Current user ID
   * @param {Function} onProgress - Progress callback
   * @param {Object} options - Platform and format options (optional)
   * @returns {Promise<InstagramPost>}
   */
  static async execute(userPrompt, userId, onProgress = () => {}, options = {}) {
    try {
      // Step 1: Fetch brand DNA
      onProgress('fetching_dna', 'Carregando DNA da marca...');
      const brandDna = await BrandRepository.getBrand(userId);

      if (!brandDna) {
        throw new Error('DNA da marca não encontrado. Cadastre sua empresa primeiro.');
      }

      // Step 2: Generate content via AI
      onProgress('generating_caption', 'Criando legenda com IA...');
      const content = await AIGateway.generatePostContent(
        brandDna, 
        userPrompt, 
        options.referenceImageDescription || '',
        options.platform || 'Instagram',
        options.format || 'Post (Feed)'
      );

      // Step 3: Generate image
      onProgress('generating_image', 'Gerando imagem...');
      const imagePrompt = content.prompt_imagem || content.prompt_imagem_en;
      const imageUrl = await ImagenGateway.generateImage(imagePrompt);

      // Step 4: Create entity
      onProgress('saving', 'Salvando no histórico...');
      const post = new InstagramPost({
        brandId: brandDna.id,
        userPrompt,
        caption: content.legenda,
        imageUrl,
        imagePromptEn: imagePrompt
      });

      // Step 5: Save to repository
      const saved = await PostRepository.savePost(post);

      // Step 6: Complete
      onProgress('completed', 'Post gerado com sucesso!');

      return saved;
    } catch (error) {
      onProgress('error', error.message);
      throw error;
    }
  }
}
