// ============================================================
// ASPEC IA — DNA Controller
// ============================================================

import { ExtractBrandDnaUseCase } from '../usecases/ExtractBrandDnaUseCase.js';
import { BrandRepository } from '../repositories/BrandRepository.js';
import { validateForm } from '../utils/validators.js';
import { sanitizeHtml } from '../utils/helpers.js';
import { AI_PROVIDERS, PROVIDER_INFO, getActiveProvider, setActiveProvider } from '../config/ai.js';

export class DnaController {
  constructor(app) {
    this.app = app;
    this.currentStep = 1; // 1: website search, 2: manual details, 3: extracting, 4: preview/edit
    this.extractedDna = null;
  }

  render() {
    const container = document.getElementById('app');
    container.innerHTML = this._getTemplate();
    this._bindEvents();
  }

  _getTemplate() {
    return `
      <div class="dna-page">
        <!-- Progress Steps -->
        <div class="dna-progress">
          <div class="dna-step ${this.currentStep >= 1 ? 'active' : ''} ${this.currentStep > 2 ? 'completed' : ''}">
            <div class="dna-step-indicator">${this.currentStep > 2 ? '✓' : '1'}</div>
            <span class="dna-step-label">Dados</span>
          </div>
          <div class="dna-step-connector ${this.currentStep >= 3 ? 'active' : ''}"></div>
          <div class="dna-step ${this.currentStep >= 3 ? 'active' : ''} ${this.currentStep > 3 ? 'completed' : ''}">
            <div class="dna-step-indicator">${this.currentStep > 3 ? '✓' : '2'}</div>
            <span class="dna-step-label">Extração IA</span>
          </div>
          <div class="dna-step-connector ${this.currentStep >= 4 ? 'active' : ''}"></div>
          <div class="dna-step ${this.currentStep >= 4 ? 'active' : ''}">
            <div class="dna-step-indicator">3</div>
            <span class="dna-step-label">Confirmar</span>
          </div>
        </div>

        <!-- Main Card -->
        <div class="dna-card">
          ${this.currentStep === 1 ? this._getWebsiteFormTemplate() : ''}
          ${this.currentStep === 2 ? this._getManualFormTemplate() : ''}
          ${this.currentStep === 3 ? this._getExtractingTemplate() : ''}
          ${this.currentStep === 4 ? this._getPreviewTemplate() : ''}
        </div>
      </div>
    `;
  }

  _getWebsiteFormTemplate() {
    return `
      <div class="dna-card-header">
        <div class="dna-card-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        </div>
        <h2>Site da Empresa</h2>
        <p>Informe o site da sua empresa para extrairmos automaticamente todas as informações visuais e de posicionamento.</p>
      </div>

      <form class="dna-form" id="dna-website-form" novalidate>
        <div class="form-group">
          <label class="form-label" for="company-website">Endereço do Site</label>
          <div class="form-input-with-icon">
            <svg class="form-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            <input type="url" id="company-website" class="form-input form-input--has-icon" placeholder="Ex: www.suaempresa.com.br" autocomplete="url">
          </div>
          <span class="form-hint">Nossa IA acessará o site, lerá o conteúdo, as fontes, as cores e a logo para você.</span>
          <span class="form-error hidden" id="company-website-error"></span>
        </div>

        <div class="form-group">
          <label class="form-label">Provedor de IA</label>
          <div class="ai-provider-selector" id="ai-provider-selector">
            ${Object.entries(PROVIDER_INFO).map(([key, info]) => `
              <button type="button" class="ai-provider-option ${getActiveProvider() === key ? 'active' : ''}" data-provider="${key}">
                <span class="ai-provider-icon">${info.icon}</span>
                <div class="ai-provider-text">
                  <span class="ai-provider-name">${info.name}</span>
                  <span class="ai-provider-desc">${info.description}</span>
                </div>
              </button>
            `).join('')}
          </div>
        </div>

        <div class="dna-form-actions" style="flex-direction: row; gap: var(--space-4)">
          <button type="button" class="btn btn-outline btn-lg" id="skip-website-btn" style="flex: 1">
            Não tenho site / Avançar
          </button>
          <button type="submit" class="btn btn-primary btn-lg" id="extract-website-btn" style="flex: 1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span>Analisar e Extrair com IA</span>
          </button>
        </div>
      </form>
    `;
  }

  _getManualFormTemplate() {
    return `
      <div class="dna-card-header">
        <div class="dna-card-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        </div>
        <h2>DNA Digital da sua Marca</h2>
        <p>Preencha os dados abaixo sobre a sua empresa para criarmos o perfil da marca com IA.</p>
      </div>

      <form class="dna-form" id="dna-manual-form" novalidate>
        <div class="form-group">
          <label class="form-label" for="company-name">Nome da Empresa <span class="required">*</span></label>
          <input type="text" id="company-name" class="form-input" placeholder="Ex: ASPEC Tecnologia" autocomplete="organization">
          <span class="form-error hidden" id="company-name-error"></span>
        </div>

        <div class="form-group">
          <label class="form-label" for="company-description">Descreva sua empresa <span class="required">*</span></label>
          <textarea id="company-description" class="form-textarea" placeholder="Conte sobre sua empresa: o que faz, para quem, quais são os diferenciais, qual problema resolve, qual é o público-alvo...

Quanto mais detalhes, melhor será o DNA extraído pela IA."></textarea>
          <span class="form-hint">Mínimo 50 caracteres. Seja detalhista!</span>
          <span class="form-error hidden" id="company-description-error"></span>
        </div>

        <div class="form-group">
          <label class="form-label">Provedor de IA</label>
          <div class="ai-provider-selector" id="ai-provider-selector">
            ${Object.entries(PROVIDER_INFO).map(([key, info]) => `
              <button type="button" class="ai-provider-option ${getActiveProvider() === key ? 'active' : ''}" data-provider="${key}">
                <span class="ai-provider-icon">${info.icon}</span>
                <div class="ai-provider-text">
                  <span class="ai-provider-name">${info.name}</span>
                  <span class="ai-provider-desc">${info.description}</span>
                </div>
              </button>
            `).join('')}
          </div>
        </div>

        <div class="dna-form-actions" style="flex-direction: row; gap: var(--space-4)">
          <button type="button" class="btn btn-outline btn-lg" id="back-to-website-btn" style="flex: 1">
            Voltar
          </button>
          <button type="submit" class="btn btn-primary btn-lg" id="extract-manual-btn" style="flex: 1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span>Extrair DNA com IA</span>
          </button>
        </div>
      </form>
    `;
  }

  _getExtractingTemplate() {
    return `
      <div class="dna-extracting">
        <div class="dna-ai-orb">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        </div>
        <h3>Extraindo DNA Digital</h3>
        <p>Nossa IA está analisando sua empresa e criando o perfil completo da marca...</p>
        <div class="dna-extract-steps" id="extract-steps">
          <div class="dna-extract-step" id="step-scraping">
            <svg class="dna-extract-step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            <span>Analisando site da empresa</span>
          </div>
          <div class="dna-extract-step" id="step-analyzing">
            <svg class="dna-extract-step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <span>Analisando descrição</span>
          </div>
          <div class="dna-extract-step" id="step-extracting">
            <svg class="dna-extract-step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span>Extraindo DNA com IA</span>
          </div>
          <div class="dna-extract-step" id="step-processing">
            <svg class="dna-extract-step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            <span>Processando dados</span>
          </div>
          <div class="dna-extract-step" id="step-saving">
            <svg class="dna-extract-step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            <span>Salvando DNA</span>
          </div>
        </div>
      </div>
    `;
  }

  _getPreviewTemplate() {
    const dna = this.extractedDna;
    if (!dna) return '<p>Erro ao carregar preview</p>';

    const voiceToneValue = dna.voiceTone.join(', ');

    return `
      <div class="dna-preview">
        <div class="dna-preview-header">
          <div class="dna-preview-badge">✓ DNA Extraído — Edite os campos abaixo</div>
        </div>

        <!-- Logo -->
        <div class="dna-preview-section dna-edit-section">
          <div class="dna-preview-label">Logo da Marca</div>
          <div class="dna-logo-edit">
            <div class="dna-logo-preview" id="logo-preview">
              ${dna.logoUrl
                ? `<img src="${dna.logoUrl}" alt="Logo" id="logo-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
                : ''}
              <div class="dna-logo-placeholder" style="${dna.logoUrl ? 'display:none' : 'display:flex'}">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                <span>Sem logo</span>
              </div>
            </div>
            <div class="dna-logo-input-group">
              <input type="url" id="edit-logo-url" class="form-input form-input--has-icon form-input--sm" value="${sanitizeHtml(dna.logoUrl)}" placeholder="URL da logo (https://...)">
              <span class="form-hint">Cole a URL da imagem da logo</span>
            </div>
          </div>
        </div>

        <!-- Company Name -->
        <div class="dna-preview-section dna-edit-section">
          <label class="dna-preview-label" for="edit-company-name">Nome da Empresa</label>
          <input type="text" id="edit-company-name" class="form-input form-input--sm" value="${sanitizeHtml(dna.companyName)}">
        </div>

        <!-- Description -->
        <div class="dna-preview-section dna-edit-section">
          <label class="dna-preview-label" for="edit-company-description">Descrição da Empresa</label>
          <textarea id="edit-company-description" class="form-textarea form-textarea--sm" rows="3" placeholder="Insira uma descrição concisa da sua empresa...">${sanitizeHtml(dna.colorPalette.companyDescription || '')}</textarea>
        </div>

        <!-- Niche -->
        <div class="dna-preview-section dna-edit-section">
          <label class="dna-preview-label" for="edit-niche">Nicho</label>
          <input type="text" id="edit-niche" class="form-input form-input--sm" value="${sanitizeHtml(dna.niche)}">
        </div>

        <!-- Value Proposition -->
        <div class="dna-preview-section dna-edit-section">
          <label class="dna-preview-label" for="edit-value-proposition">Proposta de Valor</label>
          <textarea id="edit-value-proposition" class="form-textarea form-textarea--sm" rows="3">${sanitizeHtml(dna.valueProposition)}</textarea>
        </div>

        <!-- Voice Tone -->
        <div class="dna-preview-section dna-edit-section">
          <label class="dna-preview-label" for="edit-voice-tone">Tom de Voz</label>
          <input type="text" id="edit-voice-tone" class="form-input form-input--sm" value="${sanitizeHtml(voiceToneValue)}" placeholder="Profissional, Inovador, Acessível">
          <span class="form-hint">Separe os adjetivos por vírgula</span>
        </div>

        <!-- Color Palette -->
        <div class="dna-preview-section dna-edit-section">
          <div class="dna-preview-label">Paleta de Cores</div>
          <div class="dna-edit-colors">
            <div class="dna-edit-color-item">
              <input type="color" id="edit-color-primary" class="dna-edit-color-picker" value="${dna.colorPalette.primary}">
              <div class="dna-edit-color-info">
                <span class="dna-color-label">Primária</span>
                <input type="text" id="edit-color-primary-hex" class="dna-edit-color-hex-input" value="${dna.colorPalette.primary}" maxlength="7">
              </div>
            </div>
            <div class="dna-edit-color-item">
              <input type="color" id="edit-color-secondary" class="dna-edit-color-picker" value="${dna.colorPalette.secondary}">
              <div class="dna-edit-color-info">
                <span class="dna-color-label">Secundária</span>
                <input type="text" id="edit-color-secondary-hex" class="dna-edit-color-hex-input" value="${dna.colorPalette.secondary}" maxlength="7">
              </div>
            </div>
            <div class="dna-edit-color-item">
              <input type="color" id="edit-color-accent" class="dna-edit-color-picker" value="${dna.colorPalette.accent}">
              <div class="dna-edit-color-info">
                <span class="dna-color-label">Detalhe</span>
                <input type="text" id="edit-color-accent-hex" class="dna-edit-color-hex-input" value="${dna.colorPalette.accent}" maxlength="7">
              </div>
            </div>
          </div>
          <div class="dna-edit-section" style="margin-top: var(--space-3)">
            <label class="dna-preview-label" for="edit-color-justification" style="font-size:0.75rem">Justificativa das Cores</label>
            <textarea id="edit-color-justification" class="form-textarea form-textarea--sm" rows="2">${sanitizeHtml(dna.colorPalette.justification || '')}</textarea>
          </div>
        </div>

        <!-- Typography & Text Color -->
        <div class="dna-preview-section dna-edit-section">
          <div class="dna-preview-label">Tipografia & Texto</div>
          <div class="dna-edit-typography">
            <div class="dna-typography-row">
              <div class="dna-typography-field">
                <label class="dna-preview-label" for="edit-font-family" style="font-size:0.75rem">Fonte Primária (Títulos)</label>
                <input type="text" id="edit-font-family" class="form-input form-input--sm" value="${sanitizeHtml(dna.colorPalette.fontFamily || 'Inter, sans-serif')}" placeholder="Ex: Inter, Space Mono">
              </div>
              <div class="dna-typography-field">
                <label class="dna-preview-label" for="edit-font-color" style="font-size:0.75rem">Cor do Título</label>
                <div class="dna-edit-color-item" style="margin-top: 4px">
                  <input type="color" id="edit-color-text" class="dna-edit-color-picker" value="${dna.colorPalette.fontColor || '#1F2937'}">
                  <div class="dna-edit-color-info">
                    <input type="text" id="edit-color-text-hex" class="dna-edit-color-hex-input" value="${dna.colorPalette.fontColor || '#1F2937'}" maxlength="7">
                  </div>
                </div>
              </div>
            </div>
            <div class="dna-typography-row" style="margin-top: var(--space-3)">
              <div class="dna-typography-field">
                <label class="dna-preview-label" for="edit-font-family-secondary" style="font-size:0.75rem">Fonte Secundária (Texto)</label>
                <input type="text" id="edit-font-family-secondary" class="form-input form-input--sm" value="${sanitizeHtml(dna.colorPalette.fontFamilySecondary || 'Inter, sans-serif')}" placeholder="Ex: Inter, sans-serif">
              </div>
              <div class="dna-typography-field">
                <label class="dna-preview-label" for="edit-font-color-secondary" style="font-size:0.75rem">Cor do Corpo</label>
                <div class="dna-edit-color-item" style="margin-top: 4px">
                  <input type="color" id="edit-color-text-secondary" class="dna-edit-color-picker" value="${dna.colorPalette.fontColorSecondary || '#4B5563'}">
                  <div class="dna-edit-color-info">
                    <input type="text" id="edit-color-text-secondary-hex" class="dna-edit-color-hex-input" value="${dna.colorPalette.fontColorSecondary || '#4B5563'}" maxlength="7">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Visual Elements -->
        <div class="dna-preview-section dna-edit-section">
          <label class="dna-preview-label" for="edit-visual-elements">Elementos Visuais</label>
          <textarea id="edit-visual-elements" class="form-textarea form-textarea--sm" rows="3">${sanitizeHtml(dna.visualElements)}</textarea>
        </div>

        <div class="dna-form-actions">
          <button class="btn btn-outline" id="dna-redo">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
            Refazer
          </button>
          <button class="btn btn-accent btn-lg" id="dna-confirm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Salvar e continuar
          </button>
        </div>
      </div>
    `;
  }

  _bindEvents() {
    // Provedor de IA selector (common to step 1 and step 2)
    const setupProviderSelector = () => {
      document.querySelectorAll('.ai-provider-option').forEach(btn => {
        btn.addEventListener('click', () => {
          const provider = btn.dataset.provider;
          setActiveProvider(provider);
          document.querySelectorAll('.ai-provider-option').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
      });
    };

    if (this.currentStep === 1) {
      setupProviderSelector();

      const form = document.getElementById('dna-website-form');
      form?.addEventListener('submit', (e) => this._handleWebsiteExtract(e));

      document.getElementById('skip-website-btn')?.addEventListener('click', () => {
        this.currentStep = 2;
        this.render();
      });
    }

    if (this.currentStep === 2) {
      setupProviderSelector();

      const form = document.getElementById('dna-manual-form');
      form?.addEventListener('submit', (e) => this._handleManualExtract(e));

      document.getElementById('back-to-website-btn')?.addEventListener('click', () => {
        this.currentStep = 1;
        this.render();
      });
    }

    if (this.currentStep === 4) {
      document.getElementById('dna-redo')?.addEventListener('click', () => {
        this.currentStep = 1;
        this.extractedDna = null;
        this.render();
      });

      document.getElementById('dna-confirm')?.addEventListener('click', async () => {
        await this._handleSaveEdits();
      });

      // Color picker <-> hex input sync
      this._bindColorSync('edit-color-primary', 'edit-color-primary-hex');
      this._bindColorSync('edit-color-secondary', 'edit-color-secondary-hex');
      this._bindColorSync('edit-color-accent', 'edit-color-accent-hex');
      this._bindColorSync('edit-color-text', 'edit-color-text-hex');
      this._bindColorSync('edit-color-text-secondary', 'edit-color-text-secondary-hex');

      // Logo URL preview
      const logoInput = document.getElementById('edit-logo-url');
      logoInput?.addEventListener('input', () => {
        const url = logoInput.value.trim();
        const preview = document.getElementById('logo-preview');
        if (!preview) return;
        const existingImg = preview.querySelector('img');
        const placeholder = preview.querySelector('.dna-logo-placeholder');

        if (url) {
          if (existingImg) {
            existingImg.src = url;
            existingImg.style.display = '';
          } else {
            const img = document.createElement('img');
            img.src = url;
            img.alt = 'Logo';
            img.onerror = () => { img.style.display = 'none'; if (placeholder) placeholder.style.display = 'flex'; };
            img.onload = () => { if (placeholder) placeholder.style.display = 'none'; };
            preview.insertBefore(img, placeholder);
          }
          if (placeholder) placeholder.style.display = 'none';
        } else {
          if (existingImg) existingImg.style.display = 'none';
          if (placeholder) placeholder.style.display = 'flex';
        }
      });
    }
  }

  /**
   * Sync color picker and hex text input
   */
  _bindColorSync(pickerId, hexId) {
    const picker = document.getElementById(pickerId);
    const hex = document.getElementById(hexId);
    if (!picker || !hex) return;

    picker.addEventListener('input', () => {
      hex.value = picker.value.toUpperCase();
    });

    hex.addEventListener('input', () => {
      const val = hex.value.trim();
      if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
        picker.value = val;
      }
    });
  }

  /**
   * Read edited values and save updated DNA
   */
  async _handleSaveEdits() {
    const dna = this.extractedDna;
    if (!dna) return;

    // Read all values from form
    dna.companyName = document.getElementById('edit-company-name')?.value?.trim() || dna.companyName;
    dna.niche = document.getElementById('edit-niche')?.value?.trim() || dna.niche;
    dna.valueProposition = document.getElementById('edit-value-proposition')?.value?.trim() || dna.valueProposition;
    dna.visualElements = document.getElementById('edit-visual-elements')?.value?.trim() || dna.visualElements;
    dna.logoUrl = document.getElementById('edit-logo-url')?.value?.trim() || '';

    // Voice tone from comma-separated string
    const voiceToneStr = document.getElementById('edit-voice-tone')?.value?.trim() || '';
    dna.voiceTone = voiceToneStr.split(',').map(t => t.trim()).filter(t => t.length > 0);

    // Colors & Typography
    dna.colorPalette = {
      primary: document.getElementById('edit-color-primary-hex')?.value?.trim() || dna.colorPalette.primary,
      secondary: document.getElementById('edit-color-secondary-hex')?.value?.trim() || dna.colorPalette.secondary,
      accent: document.getElementById('edit-color-accent-hex')?.value?.trim() || dna.colorPalette.accent,
      fontFamily: document.getElementById('edit-font-family')?.value?.trim() || dna.colorPalette.fontFamily || 'Inter, sans-serif',
      fontFamilySecondary: document.getElementById('edit-font-family-secondary')?.value?.trim() || dna.colorPalette.fontFamilySecondary || 'Inter, sans-serif',
      fontColor: document.getElementById('edit-color-text-hex')?.value?.trim() || dna.colorPalette.fontColor || '#1F2937',
      fontColorSecondary: document.getElementById('edit-color-text-secondary-hex')?.value?.trim() || dna.colorPalette.fontColorSecondary || '#4B5563',
      companyDescription: document.getElementById('edit-company-description')?.value?.trim() || dna.colorPalette.companyDescription || '',
      justification: document.getElementById('edit-color-justification')?.value?.trim() || ''
    };

    try {
      // Save updated DNA
      await BrandRepository.updateBrand(dna);
      this.app.showToast('success', 'DNA Digital salvo com sucesso!');
      this.app.navigate('#/dashboard');
    } catch (error) {
      this.app.showToast('error', `Erro ao salvar: ${error.message}`);
    }
  }

  async _handleWebsiteExtract(e) {
    e.preventDefault();

    const websiteUrl = document.getElementById('company-website')?.value?.trim() || '';

    // Validate website URL
    if (!websiteUrl) {
      this._showErrors({ 'company-website': 'Por favor, insira o endereço do site ou clique em Avançar.' });
      return;
    }

    if (!/^(https?:\/\/)?[\w.-]+\.[a-z]{2,}/i.test(websiteUrl)) {
      this._showErrors({ 'company-website': 'Formato de site inválido. Ex: www.empresa.com.br' });
      return;
    }

    this.tempWebsiteUrl = websiteUrl;

    // Switch to extracting state
    this.currentStep = 3;
    this.render();

    try {
      const userId = this._getUserId();

      this.extractedDna = await ExtractBrandDnaUseCase.execute(
        "", // Name extracted from site
        "", // Description extracted from site
        userId,
        (step, message) => this._updateProgress(step, message),
        websiteUrl
      );

      // Switch to preview edit form
      this.currentStep = 4;
      this.render();
    } catch (error) {
      console.error('[DnaController] Website extraction failed:', error);
      this.app.showToast('warning', `Não conseguimos acessar o site via robô (bloqueado por CORS/Cloudflare). Digite os dados manualmente.`);
      this.currentStep = 2; // Redirect to manual inputs
      this.render();
    }
  }

  async _handleManualExtract(e) {
    e.preventDefault();

    const companyName = document.getElementById('company-name')?.value?.trim();
    const description = document.getElementById('company-description')?.value?.trim();

    // Validate
    const validation = validateForm({
      'company-name': {
        value: companyName,
        rules: [{ type: 'required', message: 'Nome da empresa é obrigatório' }]
      },
      'company-description': {
        value: description,
        rules: [
          { type: 'required', message: 'Descrição é obrigatória' },
          { type: 'minLength', min: 50, message: 'Descreva com pelo menos 50 caracteres' }
        ]
      }
    });

    if (!validation.isValid) {
      this._showErrors(validation.errors);
      return;
    }

    // Switch to extracting state (hide scraping step because no website)
    this.currentStep = 3;
    this.render();

    const scrapingStep = document.getElementById('step-scraping');
    if (scrapingStep) scrapingStep.style.display = 'none';

    try {
      const userId = this._getUserId();

      this.extractedDna = await ExtractBrandDnaUseCase.execute(
        companyName,
        description,
        userId,
        (step, message) => this._updateProgress(step, message),
        this.tempWebsiteUrl || ""
      );

      // Switch to preview edit form
      this.currentStep = 4;
      this.render();
    } catch (error) {
      this.app.showToast('error', `Erro na extração: ${error.message}`);
      this.currentStep = 2;
      this.render();
    }
  }

  _updateProgress(step, message) {
    const stepMap = {
      scraping: 'step-scraping',
      scraping_done: 'step-scraping',
      scraping_warn: 'step-scraping',
      analyzing: 'step-analyzing',
      extracting: 'step-extracting',
      processing: 'step-processing',
      saving: 'step-saving'
    };

    const stepId = stepMap[step];
    if (!stepId) return;

    // Handle scraping warning
    if (step === 'scraping_warn') {
      const el = document.getElementById(stepId);
      if (el) {
        el.classList.remove('active');
        el.classList.add('completed', 'warning');
        const span = el.querySelector('span');
        if (span) span.textContent = 'Site não acessível (continuando...)';
      }
      return;
    }

    if (step === 'scraping_done') {
      const el = document.getElementById(stepId);
      if (el) {
        el.classList.remove('active');
        el.classList.add('completed');
      }
      return;
    }

    // Mark previous steps as completed
    const steps = ['step-scraping', 'step-analyzing', 'step-extracting', 'step-processing', 'step-saving'];
    const currentIndex = steps.indexOf(stepId);

    steps.forEach((id, index) => {
      const el = document.getElementById(id);
      if (!el || el.style.display === 'none') return;
      el.classList.remove('active');
      if (!el.classList.contains('completed') && !el.classList.contains('warning')) {
        if (index < currentIndex) el.classList.add('completed');
      }
      if (index === currentIndex) el.classList.add('active');
    });
  }

  _showErrors(errors) {
    for (const [field, message] of Object.entries(errors)) {
      const input = document.getElementById(field);
      const errorEl = document.getElementById(`${field}-error`);
      if (input) input.classList.add('error');
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.remove('hidden');
      }
    }
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
