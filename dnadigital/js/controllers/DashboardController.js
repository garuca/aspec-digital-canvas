// ============================================================
// ASPEC IA — Dashboard Controller
// ============================================================

import { BrandRepository } from '../repositories/BrandRepository.js';
import { PostRepository } from '../repositories/PostRepository.js';
import { sanitizeHtml } from '../utils/helpers.js';

export class DashboardController {
  constructor(app) {
    this.app = app;
    this.brandDna = null;
    this.postCount = 0;
  }

  async render() {
    const container = document.getElementById('app');

    // Show loading
    container.innerHTML = this._getLayoutTemplate('<div class="page-content"><div class="loading-spinner mx-auto" style="margin-top:100px"></div></div>');

    try {
      const userId = this._getUserId();
      this.brandDna = await BrandRepository.getBrand(userId);

      if (!this.brandDna) {
        this.app.navigate('#/dnadigital');
        return;
      }

      const posts = await PostRepository.getHistory(this.brandDna.id);
      this.postCount = posts.length;

      container.innerHTML = this._getLayoutTemplate(this._getContentTemplate());
      this.app.updateSidebar('dashboard');
      this._bindEvents();
    } catch (error) {
      this.app.showToast('error', `Erro ao carregar dashboard: ${error.message}`);
    }
  }

  _getLayoutTemplate(content) {
    return `
      <div class="app-layout">
        ${this.app.getSidebarHtml('dashboard')}
        <main class="main-content">
          <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <div class="sidebar-overlay" id="sidebar-overlay"></div>

          <header class="page-header">
            <div class="page-header-left">
              <h1 class="page-title">Dashboard</h1>
              <p class="page-subtitle">Visão geral da sua marca</p>
            </div>
            <a href="#/gerador" class="btn btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Novo Post
            </a>
          </header>

          ${content}
        </main>
      </div>
    `;
  }

  _getContentTemplate() {
    const dna = this.brandDna;

    return `
      <div class="page-content animate-fade-in-up">
        <!-- Metrics Cards -->
        <div class="dashboard-grid stagger-children">
          <div class="dash-card">
            <div class="dash-card-header">
              <span class="dash-card-title">Empresa</span>
              <div class="dash-card-icon primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              </div>
            </div>
            <div class="dash-card-value">${sanitizeHtml(dna.companyName)}</div>
            <div class="dash-card-description">${sanitizeHtml(dna.niche)}</div>
          </div>

          <div class="dash-card">
            <div class="dash-card-header">
              <span class="dash-card-title">Posts Gerados</span>
              <div class="dash-card-icon accent">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              </div>
            </div>
            <div class="dash-card-value">${this.postCount}</div>
            <div class="dash-card-description">publicações criadas com IA</div>
          </div>

          <div class="dash-card">
            <div class="dash-card-header">
              <span class="dash-card-title">Tom de Voz</span>
              <div class="dash-card-icon warning">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
              </div>
            </div>
            <div class="dash-card-value">${dna.voiceTone.length}</div>
            <div class="dash-card-description">${dna.voiceTone.slice(0, 3).join(', ')}</div>
          </div>
        </div>

        <!-- Brand DNA Details -->
        <div class="brand-dna-section">
          <h3>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            DNA Digital
          </h3>

          <div class="brand-info-grid stagger-children">
            <!-- Proposta de Valor -->
            <div class="brand-info-card">
              <div class="brand-info-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Proposta de Valor
              </div>
              <div class="brand-info-value">${sanitizeHtml(dna.valueProposition)}</div>
            </div>

            <!-- Paleta de Cores -->
            <div class="brand-info-card">
              <div class="brand-info-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
                Paleta de Cores
              </div>
              <div class="brand-palette">
                <div class="brand-palette-item">
                  <div class="brand-palette-swatch" style="background-color: ${dna.colorPalette.primary}" title="${dna.colorPalette.primary}"></div>
                  <span class="brand-palette-name">Primária</span>
                  <span class="brand-palette-hex">${dna.colorPalette.primary}</span>
                </div>
                <div class="brand-palette-item">
                  <div class="brand-palette-swatch" style="background-color: ${dna.colorPalette.secondary}" title="${dna.colorPalette.secondary}"></div>
                  <span class="brand-palette-name">Secundária</span>
                  <span class="brand-palette-hex">${dna.colorPalette.secondary}</span>
                </div>
                <div class="brand-palette-item">
                  <div class="brand-palette-swatch" style="background-color: ${dna.colorPalette.accent}" title="${dna.colorPalette.accent}"></div>
                  <span class="brand-palette-name">Detalhe</span>
                  <span class="brand-palette-hex">${dna.colorPalette.accent}</span>
                </div>
              </div>
              ${dna.colorPalette.justification ? `
                <div class="brand-palette-justification">
                  💡 ${sanitizeHtml(dna.colorPalette.justification)}
                </div>
              ` : ''}
            </div>

            <!-- Tom de Voz -->
            <div class="brand-info-card">
              <div class="brand-info-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
                Tom de Voz
              </div>
              <div class="brand-voice-tags">
                ${dna.voiceTone.map((tone) => `<span class="brand-voice-tag">${sanitizeHtml(tone)}</span>`).join('')}
              </div>
            </div>

            <!-- Elementos Visuais -->
            <div class="brand-info-card">
              <div class="brand-info-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                Diretrizes Visuais
              </div>
              <div class="brand-info-value">${sanitizeHtml(dna.visualElements)}</div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <h3 style="margin-bottom: var(--space-4);">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          Ações Rápidas
        </h3>
        <div class="quick-actions stagger-children">
          <a href="#/gerador" class="quick-action-card">
            <div class="quick-action-icon primary">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </div>
            <div class="quick-action-text">
              <h4>Criar Post</h4>
              <p>Gerar legenda e imagem com IA</p>
            </div>
          </a>
          <a href="#/historico" class="quick-action-card">
            <div class="quick-action-icon accent">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div class="quick-action-text">
              <h4>Histórico</h4>
              <p>Ver todas as publicações</p>
            </div>
          </a>
          <a href="#/dnadigital" class="quick-action-card">
            <div class="quick-action-icon primary">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </div>
            <div class="quick-action-text">
              <h4>Editar DNA</h4>
              <p>Atualizar dados da marca</p>
            </div>
          </a>
        </div>
      </div>
    `;
  }

  _bindEvents() {
    this.app.bindSidebarEvents();
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
