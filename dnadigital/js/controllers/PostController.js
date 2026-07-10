// ============================================================
// ASPEC IA — Post Controller (Gerador + Histórico)
// ============================================================

import { GeneratePostUseCase } from '../usecases/GeneratePostUseCase.js';
import { BrandRepository } from '../repositories/BrandRepository.js';
import { PostRepository } from '../repositories/PostRepository.js';
import { AIGateway } from '../gateways/AIGateway.js';
import { sanitizeHtml, copyToClipboard, downloadImage, timeAgo } from '../utils/helpers.js';

export class PostController {
  constructor(app) {
    this.app = app;
    this.brandDna = null;
    this.currentPost = null;
    this.isGenerating = false;
    this.mode = 'gerador'; // 'gerador' or 'historico'
    this.referenceImageBase64 = null;
  }

  async render(mode = 'gerador') {
    this.mode = mode;
    const container = document.getElementById('app');

    container.innerHTML = this._getLayoutTemplate('<div class="page-content"><div class="loading-spinner mx-auto" style="margin-top:100px"></div></div>');

    try {
      const userId = this._getUserId();
      this.brandDna = await BrandRepository.getBrand(userId);

      if (!this.brandDna) {
        this.app.navigate('#/dnadigital');
        return;
      }

      if (this.mode === 'historico') {
        await this._renderHistorico();
      } else {
        this._renderGerador();
      }

      this.app.updateSidebar(this.mode);
      this.app.bindSidebarEvents();
    } catch (error) {
      this.app.showToast('error', `Erro: ${error.message}`);
    }
  }

  // ── Gerador ──

  _renderGerador() {
    const container = document.getElementById('app');
    container.innerHTML = this._getLayoutTemplate(this._getGeradorContent());
    this.app.updateSidebar('gerador');
    this._bindGeradorEvents();
    this.app.bindSidebarEvents();
  }

  _getGeradorContent() {
    const dna = this.brandDna;

    return `
      <header class="page-header">
        <div class="page-header-left">
          <h1 class="page-title">Gerador de Posts</h1>
          <p class="page-subtitle">Crie conteúdo profissional com inteligência artificial</p>
        </div>
      </header>

      <div class="page-content">
        <div class="gerador-container animate-fade-in-up">
          <!-- Input Panel -->
          <div class="gerador-input-panel">
            <div class="gerador-prompt-card">
              <h3>✨ Descreva seu post</h3>
              <p>O que você gostaria de publicar? Nossa IA criará a legenda e a imagem baseadas no DNA da sua marca.</p>

              <div class="form-group">
                <textarea id="post-prompt" class="form-textarea gerador-textarea" placeholder="Ex: Promoção de Inverno, Lançamento de produto novo, Dica sobre marketing digital..."></textarea>
              </div>

              <!-- Optimization Selectors -->
              <div class="gerador-options-grid" style="display: flex; gap: var(--space-4); margin-bottom: var(--space-4);">
                <div class="form-group" style="flex: 1; margin-bottom: 0;">
                  <label class="form-label" for="post-platform">Plataforma</label>
                  <select id="post-platform" class="form-select form-select--sm" style="width: 100%; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); border-radius: var(--border-radius-sm); padding: var(--space-2);">
                    <option value="Instagram">Instagram</option>
                    <option value="TikTok">TikTok</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Facebook">Facebook</option>
                  </select>
                </div>
                <div class="form-group" style="flex: 1; margin-bottom: 0;">
                  <label class="form-label" for="post-format">Formato</label>
                  <select id="post-format" class="form-select form-select--sm" style="width: 100%; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); border-radius: var(--border-radius-sm); padding: var(--space-2);">
                    <option value="Post (Feed)">Post (Feed)</option>
                    <option value="Stories / Reels">Stories / Reels</option>
                    <option value="Carrossel">Carrossel</option>
                  </select>
                </div>
              </div>

              <!-- Reference Image Upload -->
              <div class="form-group" style="margin-bottom: var(--space-4);">
                <label class="form-label">Imagem de Referência (Opcional)</label>
                <div class="gerador-image-upload-zone" id="image-upload-zone" style="border: 2px dashed var(--color-border); border-radius: var(--border-radius-md); padding: var(--space-4); text-align: center; cursor: pointer; position: relative; transition: border-color 0.2s;">
                  <input type="file" id="post-reference-image" accept="image/*" style="display: none;">
                  <div class="upload-zone-content" id="upload-zone-content" style="display: flex; flex-direction: column; align-items: center; gap: var(--space-2); color: var(--color-text-muted);">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    <span style="font-size: 0.875rem;">Clique ou arraste uma imagem aqui</span>
                  </div>
                  <div class="upload-zone-preview" id="upload-zone-preview" style="display: none; position: relative; justify-content: center; align-items: center;">
                    <img id="reference-thumbnail" src="" alt="Thumbnail" style="max-height: 120px; border-radius: var(--border-radius-sm); border: 1px solid var(--color-border);">
                    <button type="button" id="btn-remove-reference" style="position: absolute; top: -8px; right: -8px; width: 24px; height: 24px; border-radius: 50%; background: var(--color-danger); color: white; border: none; font-size: 1rem; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">×</button>
                  </div>
                </div>
              </div>

              <div class="gerador-suggestions">
                <span class="gerador-suggestions-label">Sugestões rápidas:</span>
                <div class="gerador-suggestions-list">
                  <button class="gerador-suggestion" data-prompt="Promoção de Inverno">❄️ Promoção de Inverno</button>
                  <button class="gerador-suggestion" data-prompt="Lançamento de novo produto">🚀 Novo Produto</button>
                  <button class="gerador-suggestion" data-prompt="Dica profissional do setor">💡 Dica Profissional</button>
                  <button class="gerador-suggestion" data-prompt="Bastidores da empresa">🎬 Bastidores</button>
                  <button class="gerador-suggestion" data-prompt="Depoimento de cliente satisfeito">⭐ Depoimento</button>
                </div>
              </div>

              <button class="btn btn-primary gerador-generate-btn" id="generate-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <span id="generate-btn-text">Gerar Post com IA</span>
                <div class="spinner hidden" id="generate-spinner"></div>
              </button>
            </div>

            <!-- DNA Mini Summary -->
            <div class="gerador-dna-summary">
              <div class="gerador-dna-summary-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <span>DNA Ativo</span>
              </div>
              <div class="gerador-dna-mini-palette">
                <div class="gerador-dna-mini-swatch" style="background-color: ${dna.colorPalette.primary}"></div>
                <div class="gerador-dna-mini-swatch" style="background-color: ${dna.colorPalette.secondary}"></div>
                <div class="gerador-dna-mini-swatch" style="background-color: ${dna.colorPalette.accent}"></div>
              </div>
              <div class="gerador-dna-mini-info">
                <strong>${sanitizeHtml(dna.companyName)}</strong> · ${sanitizeHtml(dna.niche)}<br>
                Tom: ${dna.voiceTone.slice(0, 3).join(', ')}
              </div>
            </div>
          </div>

          <!-- Output Panel -->
          <div class="gerador-output-panel" id="output-panel">
            ${this.currentPost ? this._getResultTemplate() : this._getEmptyTemplate()}
          </div>
        </div>
      </div>
    `;
  }

  _getEmptyTemplate() {
    return `
      <div class="gerador-empty">
        <svg class="gerador-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        <h4>Seu post aparecerá aqui</h4>
        <p>Descreva o que deseja publicar e clique em "Gerar Post com IA"</p>
      </div>
    `;
  }

  _getLoadingTemplate() {
    return `
      <div class="gerador-loading">
        <div class="gerador-loading-orb">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        </div>
        <h4>Criando seu post...</h4>
        <p>Aguarde enquanto nossa IA trabalha na sua publicação</p>
        <div class="gerador-loading-steps" id="loading-steps">
          <div class="gerador-loading-step" id="gen-step-ref" style="display: none;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span>Analisando imagem de referência...</span>
          </div>
          <div class="gerador-loading-step" id="gen-step-dna">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m-7-7h6m6 0h6"/></svg>
            <span>Carregando DNA da marca...</span>
          </div>
          <div class="gerador-loading-step" id="gen-step-caption">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            <span>Criando legenda com IA...</span>
          </div>
          <div class="gerador-loading-step" id="gen-step-image">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            <span>Gerando imagem...</span>
          </div>
          <div class="gerador-loading-step" id="gen-step-save">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/></svg>
            <span>Salvando no histórico...</span>
          </div>
        </div>
      </div>
    `;
  }

  _getResultTemplate() {
    const post = this.currentPost;

    return `
      <div class="gerador-result">
        <div class="gerador-result-header">
          <h4>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Post Gerado
          </h4>
          <div class="gerador-result-actions">
            <button class="btn btn-sm btn-ghost" id="download-image-btn" title="Download imagem">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </button>
          </div>
        </div>

        <div class="gerador-image-preview">
          ${post.imageUrl
            ? `<img src="${post.imageUrl}" alt="Post gerado para ${sanitizeHtml(post.userPrompt)}">`
            : `<div class="gerador-image-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                <span>Imagem não disponível</span>
              </div>`
          }
        </div>

        <div class="gerador-caption-section">
          <div class="gerador-caption-label">
            Legenda
            <button class="gerador-caption-copy" id="copy-caption-btn">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              Copiar
            </button>
          </div>
          <div class="gerador-caption-text">${sanitizeHtml(post.caption)}</div>
        </div>

        <div class="gerador-prompt-section">
          <div class="gerador-caption-label">
            Prompt da Imagem
            <button class="gerador-caption-copy" id="copy-prompt-btn">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              Copiar
            </button>
          </div>
          <div class="gerador-prompt-used">${sanitizeHtml(post.imagePromptEn)}</div>
        </div>
      </div>
    `;
  }

  _bindGeradorEvents() {
    // Generate button
    document.getElementById('generate-btn')?.addEventListener('click', () => this._handleGenerate());

    // Suggestions
    document.querySelectorAll('.gerador-suggestion').forEach((btn) => {
      btn.addEventListener('click', () => {
        const textarea = document.getElementById('post-prompt');
        if (textarea) textarea.value = btn.dataset.prompt;
      });
    });

    // Reference image drag & drop / upload triggers
    const uploadZone = document.getElementById('image-upload-zone');
    const fileInput = document.getElementById('post-reference-image');

    uploadZone?.addEventListener('click', (e) => {
      if (e.target.id === 'btn-remove-reference' || e.target.closest('#btn-remove-reference')) return;
      if (!this.referenceImageBase64) {
        fileInput?.click();
      }
    });

    fileInput?.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (file) {
        this._readReferenceImage(file);
      }
    });

    uploadZone?.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadZone.style.borderColor = 'var(--color-accent)';
    });

    uploadZone?.addEventListener('dragleave', () => {
      uploadZone.style.borderColor = 'var(--color-border)';
    });

    uploadZone?.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadZone.style.borderColor = 'var(--color-border)';
      const file = e.dataTransfer?.files?.[0];
      if (file && file.type.startsWith('image/')) {
        this._readReferenceImage(file);
      }
    });

    document.getElementById('btn-remove-reference')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this._removeReferenceImage();
    });

    // Copy & download (if result is shown)
    document.getElementById('copy-caption-btn')?.addEventListener('click', async () => {
      if (this.currentPost) {
        const ok = await copyToClipboard(this.currentPost.caption);
        this.app.showToast(ok ? 'success' : 'error', ok ? 'Legenda copiada!' : 'Erro ao copiar');
      }
    });

    document.getElementById('copy-prompt-btn')?.addEventListener('click', async () => {
      if (this.currentPost) {
        const ok = await copyToClipboard(this.currentPost.imagePromptEn);
        this.app.showToast(ok ? 'success' : 'error', ok ? 'Prompt copiado!' : 'Erro ao copiar');
      }
    });

    document.getElementById('download-image-btn')?.addEventListener('click', async () => {
      if (this.currentPost?.imageUrl) {
        await downloadImage(this.currentPost.imageUrl, `aspec-ia-${Date.now()}.png`);
        this.app.showToast('success', 'Download iniciado!');
      }
    });

    // Enter key in textarea
    document.getElementById('post-prompt')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this._handleGenerate();
      }
    });
  }

  _readReferenceImage(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.referenceImageBase64 = e.target.result;
      
      const content = document.getElementById('upload-zone-content');
      const preview = document.getElementById('upload-zone-preview');
      const thumb = document.getElementById('reference-thumbnail');
      
      if (content) content.style.display = 'none';
      if (preview) preview.style.display = 'flex';
      if (thumb) thumb.src = this.referenceImageBase64;
    };
    reader.readAsDataURL(file);
  }

  _removeReferenceImage() {
    this.referenceImageBase64 = null;
    const fileInput = document.getElementById('post-reference-image');
    if (fileInput) fileInput.value = '';
    
    const content = document.getElementById('upload-zone-content');
    const preview = document.getElementById('upload-zone-preview');
    const thumb = document.getElementById('reference-thumbnail');
    
    if (content) content.style.display = 'flex';
    if (preview) preview.style.display = 'none';
    if (thumb) thumb.src = '';
  }

  async _handleGenerate() {
    const textarea = document.getElementById('post-prompt');
    const prompt = textarea?.value?.trim();

    const platform = document.getElementById('post-platform')?.value || 'Instagram';
    const format = document.getElementById('post-format')?.value || 'Post (Feed)';

    if (!prompt) {
      this.app.showToast('warning', 'Descreva o post desejado');
      textarea?.focus();
      return;
    }

    if (this.isGenerating) return;
    this.isGenerating = true;

    // Show loading in output panel
    const outputPanel = document.getElementById('output-panel');
    if (outputPanel) outputPanel.innerHTML = this._getLoadingTemplate();

    // Show reference image step in loading if image is loaded
    if (this.referenceImageBase64) {
      const refStep = document.getElementById('gen-step-ref');
      if (refStep) refStep.style.display = 'flex';
    }

    // Disable button
    const btn = document.getElementById('generate-btn');
    const btnText = document.getElementById('generate-btn-text');
    const spinner = document.getElementById('generate-spinner');
    if (btn) btn.disabled = true;
    if (btnText) btnText.textContent = 'Gerando...';
    if (spinner) spinner.classList.remove('hidden');

    try {
      const userId = this._getUserId();

      // Step 0: Describe image if reference is uploaded
      let referenceImageDescription = "";
      if (this.referenceImageBase64) {
        this._updateGenerationProgress('gen_ref');
        try {
          referenceImageDescription = await AIGateway.describeImage(this.referenceImageBase64);
          console.log('[PostController] Reference Image Description:', referenceImageDescription);
        } catch (err) {
          console.warn('[PostController] Reference image description failed:', err.message);
          this.app.showToast('warning', 'Não foi possível analisar a imagem de referência, prosseguindo com o post normal.');
        }
      }

      this.currentPost = await GeneratePostUseCase.execute(
        prompt,
        userId,
        (step) => this._updateGenerationProgress(step),
        {
          platform,
          format,
          referenceImageDescription
        }
      );

      // Show result
      if (outputPanel) {
        outputPanel.innerHTML = this._getResultTemplate();
        this._bindGeradorEvents(); // Rebind copy/download
      }

      // Reset image reference after successful generation
      this._removeReferenceImage();

      this.app.showToast('success', 'Post gerado com sucesso!');
    } catch (error) {
      this.app.showToast('error', `Erro: ${error.message}`);
      if (outputPanel) outputPanel.innerHTML = this._getEmptyTemplate();
    } finally {
      this.isGenerating = false;
      if (btn) btn.disabled = false;
      if (btnText) btnText.textContent = 'Gerar Post com IA';
      if (spinner) spinner.classList.add('hidden');
    }
  }

  _updateGenerationProgress(step) {
    const stepMap = {
      gen_ref: 'gen-step-ref',
      fetching_dna: 'gen-step-dna',
      generating_caption: 'gen-step-caption',
      generating_image: 'gen-step-image',
      saving: 'gen-step-save'
    };

    const stepId = stepMap[step];
    if (!stepId) return;

    // Build the list of active steps based on reference image presence
    const steps = [];
    if (this.referenceImageBase64) {
      steps.push('gen-step-ref');
    }
    steps.push('gen-step-dna', 'gen-step-caption', 'gen-step-image', 'gen-step-save');
    
    const currentIndex = steps.indexOf(stepId);

    steps.forEach((id, index) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.remove('active', 'completed');
      if (index < currentIndex) el.classList.add('completed');
      if (index === currentIndex) el.classList.add('active');
    });
  }

  // ── Histórico ──

  async _renderHistorico() {
    const container = document.getElementById('app');
    const posts = await PostRepository.getHistory(this.brandDna.id);
    container.innerHTML = this._getLayoutTemplate(this._getHistoricoContent(posts));
    this.app.updateSidebar('historico');
    this._bindHistoricoEvents(posts);
    this.app.bindSidebarEvents();
  }

  _getHistoricoContent(posts) {
    return `
      <header class="page-header">
        <div class="page-header-left">
          <h1 class="page-title">Histórico</h1>
          <p class="page-subtitle">${posts.length} publicação${posts.length !== 1 ? 'ções' : ''} gerada${posts.length !== 1 ? 's' : ''}</p>
        </div>
        <a href="#/gerador" class="btn btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Novo Post
        </a>
      </header>

      <div class="page-content">
        <div class="historico-grid animate-fade-in-up stagger-children">
          ${posts.length === 0 ? `
            <div class="empty-state historico-empty">
              <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <div class="empty-state-title">Nenhum post ainda</div>
              <div class="empty-state-description">Crie seu primeiro post com IA no Gerador</div>
              <a href="#/gerador" class="btn btn-primary">Criar primeiro post</a>
            </div>
          ` : posts.map((post) => `
            <div class="historico-card" data-post-id="${post.id}">
              <div class="historico-card-image">
                ${post.imageUrl
                  ? `<img src="${post.imageUrl}" alt="${sanitizeHtml(post.userPrompt)}" loading="lazy">`
                  : `<div style="width:100%;height:100%;background:var(--color-surface-hover);display:flex;align-items:center;justify-content:center;color:var(--color-text-muted);"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/></svg></div>`
                }
              </div>
              <div class="historico-card-content">
                <div class="historico-card-prompt">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ${sanitizeHtml(post.userPrompt)}
                </div>
                <div class="historico-card-caption">${sanitizeHtml(post.caption)}</div>
                <div class="historico-card-footer">
                  <span class="historico-card-date">${timeAgo(post.createdAt)}</span>
                  <div class="historico-card-actions">
                    <button class="historico-card-action copy-action" data-caption="${encodeURIComponent(post.caption)}" title="Copiar legenda">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    </button>
                    <button class="historico-card-action delete delete-action" data-post-id="${post.id}" title="Excluir">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  _bindHistoricoEvents(posts) {
    // Copy caption
    document.querySelectorAll('.copy-action').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const caption = decodeURIComponent(btn.dataset.caption);
        const ok = await copyToClipboard(caption);
        this.app.showToast(ok ? 'success' : 'error', ok ? 'Legenda copiada!' : 'Erro ao copiar');
      });
    });

    // Delete post
    document.querySelectorAll('.delete-action').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        if (confirm('Tem certeza que deseja excluir este post?')) {
          try {
            await PostRepository.deletePost(btn.dataset.postId);
            this.app.showToast('success', 'Post excluído');
            await this._renderHistorico();
          } catch (error) {
            this.app.showToast('error', `Erro: ${error.message}`);
          }
        }
      });
    });
  }

  // ── Layout ──

  _getLayoutTemplate(content) {
    return `
      <div class="app-layout">
        ${this.app.getSidebarHtml(this.mode)}
        <main class="main-content">
          <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <div class="sidebar-overlay" id="sidebar-overlay"></div>
          ${content}
        </main>
      </div>
    `;
  }

  _getUserId() {
    try {
      const user = JSON.parse(localStorage.getItem('aspec_ia_user'));
      return user?.id || 'local-user';
    } catch {
      return 'local-user';
    }
  }
}
