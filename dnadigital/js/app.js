// ============================================================
// ASPEC IA — Main Application (SPA Router + Bootstrap)
// ============================================================

import { LoginController } from './controllers/LoginController.js';
import { DnaController } from './controllers/DnaController.js';
import { DashboardController } from './controllers/DashboardController.js';
import { PostController } from './controllers/PostController.js';
import { isSupabaseConfigured } from './config/supabase.js';
import { sanitizeHtml, getInitials } from './utils/helpers.js';

class App {
  constructor() {
    this.controllers = {};
    this.currentRoute = null;
    this.toastTimeout = null;

    this._init();
  }

  _init() {
    // Listen for hash changes
    window.addEventListener('hashchange', () => this._onRouteChange());

    // Initial route
    if (!window.location.hash) {
      window.location.hash = '#/login';
    } else {
      this._onRouteChange();
    }
  }

  /**
   * Navigate to a route
   */
  navigate(hash) {
    window.location.hash = hash;
  }

  /**
   * Handle route changes
   */
  async _onRouteChange() {
    const hash = window.location.hash || '#/login';
    const route = hash.replace('#', '');
    this.currentRoute = route;

    // Ensure toast container exists
    this._ensureToastContainer();

    // Route mapping
    switch (route) {
      case '/':
      case '/login':
      case '/cadastro':
        this._getLoginController().isLoginMode = route !== '/cadastro';
        this._getLoginController().render();
        break;

      case '/dnadigital':
        if (!this._isAuthenticated()) {
          this.navigate('#/login');
          return;
        }
        new DnaController(this).render();
        break;

      case '/dashboard':
        if (!this._isAuthenticated()) {
          this.navigate('#/login');
          return;
        }
        await new DashboardController(this).render();
        break;

      case '/gerador':
        if (!this._isAuthenticated()) {
          this.navigate('#/login');
          return;
        }
        await new PostController(this).render('gerador');
        break;

      case '/historico':
        if (!this._isAuthenticated()) {
          this.navigate('#/login');
          return;
        }
        await new PostController(this).render('historico');
        break;

      default:
        // 404 fallback
        this.navigate('#/login');
        break;
    }
  }

  /**
   * Get or create login controller
   */
  _getLoginController() {
    if (!this.controllers.login) {
      this.controllers.login = new LoginController(this);
    }
    return this.controllers.login;
  }

  /**
   * Check if user is "authenticated"
   */
  _isAuthenticated() {
    if (isSupabaseConfigured()) {
      // Real auth check would be async, for now check localStorage
      return !!localStorage.getItem('aspec_ia_user');
    }
    return !!localStorage.getItem('aspec_ia_user');
  }

  /**
   * Get current user data
   */
  _getUser() {
    try {
      return JSON.parse(localStorage.getItem('aspec_ia_user')) || {};
    } catch {
      return {};
    }
  }

  // ── Sidebar ──

  /**
   * Get sidebar HTML template
   */
  getSidebarHtml(activeRoute = '') {
    const user = this._getUser();
    const name = user.name || user.email?.split('@')[0] || 'Usuário';
    const email = user.email || '';
    const initials = getInitials(name);

    return `
      <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
          <div class="sidebar-logo">
            <div class="sidebar-logo-icon">IA</div>
            <div class="sidebar-logo-text">
              <span class="sidebar-logo-name">ASPEC IA</span>
              <span class="sidebar-logo-tagline">Marketing com IA</span>
            </div>
          </div>
        </div>

        <nav class="sidebar-nav">
          <span class="sidebar-section-label">Principal</span>

          <a href="#/dashboard" class="sidebar-link ${activeRoute === 'dashboard' ? 'active' : ''}">
            <svg class="sidebar-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            Dashboard
          </a>

          <span class="sidebar-section-label">Ferramentas</span>

          <a href="#/gerador" class="sidebar-link ${activeRoute === 'gerador' ? 'active' : ''}">
            <svg class="sidebar-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Gerador de Posts
          </a>

          <a href="#/historico" class="sidebar-link ${activeRoute === 'historico' ? 'active' : ''}">
            <svg class="sidebar-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Histórico
          </a>

          <span class="sidebar-section-label">Configuração</span>

          <a href="#/dnadigital" class="sidebar-link ${activeRoute === 'dnadigital' ? 'active' : ''}">
            <svg class="sidebar-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            DNA Digital
          </a>
        </nav>

        <div class="sidebar-footer">
          <div class="sidebar-user">
            <div class="sidebar-user-avatar">${sanitizeHtml(initials)}</div>
            <div class="sidebar-user-info">
              <div class="sidebar-user-name">${sanitizeHtml(name)}</div>
              <div class="sidebar-user-email">${sanitizeHtml(email)}</div>
            </div>
            <button class="sidebar-logout" id="sidebar-logout" title="Sair">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </button>
          </div>
        </div>
      </aside>
    `;
  }

  /**
   * Update active state in sidebar
   */
  updateSidebar(activeRoute) {
    document.querySelectorAll('.sidebar-link').forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#/${activeRoute}`) {
        link.classList.add('active');
      }
    });
  }

  /**
   * Bind sidebar events (mobile toggle, logout)
   */
  bindSidebarEvents() {
    // Mobile menu toggle
    const toggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    toggle?.addEventListener('click', () => {
      sidebar?.classList.toggle('open');
      overlay?.classList.toggle('active');
    });

    overlay?.addEventListener('click', () => {
      sidebar?.classList.remove('open');
      overlay?.classList.remove('active');
    });

    // Logout
    document.getElementById('sidebar-logout')?.addEventListener('click', () => {
      localStorage.removeItem('aspec_ia_user');
      this.showToast('info', 'Sessão encerrada');
      this.navigate('#/login');
    });
  }

  // ── Toast System ──

  _ensureToastContainer() {
    if (!document.getElementById('toast-container')) {
      const container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
  }

  /**
   * Show a toast notification
   * @param {'success'|'error'|'warning'|'info'} type
   * @param {string} message
   * @param {number} duration - ms before auto-dismiss
   */
  showToast(type = 'info', message = '', duration = 4000) {
    this._ensureToastContainer();
    const container = document.getElementById('toast-container');

    const icons = {
      success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
      error: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
      warning: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-icon">${icons[type] || icons.info}</div>
      <div class="toast-content">
        <div class="toast-message">${sanitizeHtml(message)}</div>
      </div>
      <button class="toast-close" aria-label="Fechar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    `;

    container.appendChild(toast);

    // Close button
    toast.querySelector('.toast-close')?.addEventListener('click', () => {
      toast.classList.add('toast-exit');
      setTimeout(() => toast.remove(), 300);
    });

    // Auto dismiss
    setTimeout(() => {
      if (toast.parentElement) {
        toast.classList.add('toast-exit');
        setTimeout(() => toast.remove(), 300);
      }
    }, duration);
  }
}

// ── Bootstrap ──
document.addEventListener('DOMContentLoaded', () => {
  window.aspecApp = new App();
});
