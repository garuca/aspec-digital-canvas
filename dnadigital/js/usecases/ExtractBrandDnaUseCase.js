// ============================================================
// ASPEC IA — ExtractBrandDna Use Case
// ============================================================

import { AIGateway } from '../gateways/AIGateway.js';
import { BrandRepository } from '../repositories/BrandRepository.js';
import { BrandDna } from '../entities/BrandDna.js';
import { WebScraperService } from '../services/WebScraperService.js';

export class ExtractBrandDnaUseCase {
  /**
   * Execute the brand DNA extraction flow
   *
   * 1. Optionally scrape the company website
   * 2. Combine website data with user description
   * 3. Call AI provider to extract DNA
   * 4. Create BrandDna entity
   * 5. Save to repository
   * 6. Return the DNA
   *
   * @param {string} companyName - Company name
   * @param {string} description - Company description
   * @param {string} userId - Current user ID
   * @param {Function} onProgress - Progress callback (optional)
   * @param {string} websiteUrl - Optional company website URL
   * @returns {Promise<BrandDna>}
   */
  static async execute(companyName, description, userId, onProgress = () => {}, websiteUrl = '') {
    try {
      let enrichedDescription = description || '';
      let logoUrl = '';

      // Step 0: Scrape website if URL provided
      if (websiteUrl && websiteUrl.trim()) {
        onProgress('scraping', 'Acessando site da empresa...');
        try {
          const siteData = await WebScraperService.extractFromUrl(websiteUrl);
          const siteText = WebScraperService.formatForPrompt(siteData);
          enrichedDescription = enrichedDescription ? `${enrichedDescription}\n\n${siteText}` : siteText;
          logoUrl = siteData.logoCandidates?.[0]?.url || '';
          onProgress('scraping_done', 'Dados do site extraídos com sucesso!');
        } catch (err) {
          console.warn('[ExtractBrandDna] Website scraping failed:', err.message);
          onProgress('scraping_warn', `Site não acessível (${err.message}). Continuando com a descrição...`);
          // Continue without website data — it's optional
        }
      }

      // Step 1: Start analysis
      onProgress('analyzing', 'Analisando descrição da empresa...');

      // Step 2: Call AI provider
      onProgress('extracting', 'Extraindo DNA com inteligência artificial...');
      const dnaJson = await AIGateway.extractBrandDna(enrichedDescription);

      // Step 3: Create entity
      onProgress('processing', 'Processando dados do DNA...');
      const brandDna = BrandDna.fromGeminiResponse(dnaJson, companyName, userId, logoUrl);

      // Step 4: Save to repository
      onProgress('saving', 'Salvando DNA digital...');
      const saved = await BrandRepository.saveBrand(brandDna);

      // Step 5: Complete
      onProgress('completed', 'DNA extraído com sucesso!');

      return saved;
    } catch (error) {
      onProgress('error', error.message);
      throw error;
    }
  }
}
