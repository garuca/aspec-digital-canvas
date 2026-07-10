// ============================================================
// ASPEC IA — Imagen Gateway
// ============================================================

/**
 * ImagenGateway
 *
 * Responsável por gerar imagens a partir de prompts.
 *
 * NOTA MVP: A API do Imagen 3 via Vertex AI requer autenticação
 * OAuth2/Service Account que não funciona no front-end.
 *
 * Para o MVP, este gateway retorna um placeholder ou pode ser
 * configurado para usar um proxy backend.
 *
 * Quando você tiver um endpoint backend configurado, basta
 * atualizar IMAGEN_ENDPOINT abaixo.
 */

// ⚠️ CONFIGURE SEU ENDPOINT AQUI (proxy backend para Imagen 3)
const IMAGEN_ENDPOINT = '';

export class ImagenGateway {
  /**
   * Generate image from English prompt
   * @param {string} promptEn - Image prompt in English
   * @returns {Promise<string>} Image URL
   */
  static async generateImage(promptEn) {
    // If a backend endpoint is configured, use it
    if (IMAGEN_ENDPOINT) {
      return ImagenGateway._generateViaBackend(promptEn);
    }

    // MVP fallback: generate a placeholder image
    return ImagenGateway._generatePlaceholder(promptEn);
  }

  /**
   * Generate via backend proxy
   */
  static async _generateViaBackend(promptEn) {
    const response = await fetch(IMAGEN_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: promptEn,
        aspectRatio: '1:1',
        numberOfImages: 1
      })
    });

    if (!response.ok) {
      throw new Error(`Imagen API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.imageUrl || data.url || data.images?.[0]?.url;
  }

  /**
   * Generate a styled placeholder image using canvas
   * Creates a gradient image with brand colors as fallback
   */
  static _generatePlaceholder(promptEn) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1080;
      const ctx = canvas.getContext('2d');

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#1A1A2E');
      gradient.addColorStop(0.5, '#16213E');
      gradient.addColorStop(1, '#0F3460');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Decorative circles
      const circles = [
        { x: 200, y: 200, r: 150, color: 'rgba(124, 58, 237, 0.2)' },
        { x: 880, y: 300, r: 200, color: 'rgba(59, 130, 246, 0.15)' },
        { x: 500, y: 800, r: 180, color: 'rgba(6, 214, 160, 0.15)' },
        { x: 800, y: 900, r: 120, color: 'rgba(124, 58, 237, 0.1)' },
      ];

      circles.forEach(({ x, y, r, color }) => {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });

      // Central glow
      const glow = ctx.createRadialGradient(540, 540, 0, 540, 540, 400);
      glow.addColorStop(0, 'rgba(124, 58, 237, 0.15)');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // AI icon placeholder
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      ctx.arc(540, 440, 80, 0, Math.PI * 2);
      ctx.fill();

      // Sparkle icon
      ctx.fillStyle = 'rgba(139, 92, 246, 0.6)';
      ctx.font = '48px serif';
      ctx.textAlign = 'center';
      ctx.fillText('✦', 540, 455);

      // Text
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = '500 20px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('ASPEC IA', 540, 560);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.font = '16px Inter, sans-serif';
      ctx.fillText('Imagem gerada com IA', 540, 590);

      // Prompt preview (truncated)
      const maxChars = 60;
      const truncated = promptEn.length > maxChars
        ? promptEn.substring(0, maxChars) + '...'
        : promptEn;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.font = '14px Inter, sans-serif';
      ctx.fillText(truncated, 540, 640);

      // Bottom branding bar
      ctx.fillStyle = 'rgba(124, 58, 237, 0.3)';
      ctx.fillRect(0, canvas.height - 4, canvas.width, 4);

      const dataUrl = canvas.toDataURL('image/png');
      resolve(dataUrl);
    });
  }
}
