// ============================================================
// ASPEC IA — Login Controller
// ============================================================

import { signIn, signUp, isSupabaseConfigured } from '../config/supabase.js';
import { validateForm } from '../utils/validators.js';
import { sanitizeHtml } from '../utils/helpers.js';

export class LoginController {
  constructor(app) {
    this.app = app;
    this.isLoginMode = true;
  }

  /**
   * Render login/cadastro page
   */
  render() {
    const container = document.getElementById('app');
    container.innerHTML = this._getTemplate();
    this._bindEvents();
  }

  _getTemplate() {
    return `
      <div class="auth-page">
        <!-- Left Visual Panel -->
        <div class="auth-visual">
          <div class="auth-orb auth-orb-1"></div>
          <div class="auth-orb auth-orb-2"></div>
          <div class="auth-visual-content">
            <div class="auth-visual-logo">IA</div>
            <h2>ASPEC <span class="text-gradient">IA</span></h2>
            <p>Automatize a criação de conteúdo para redes sociais com inteligência artificial.</p>
            <div class="auth-visual-features stagger-children">
              <div class="auth-feature">
                <div class="auth-feature-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <div class="auth-feature-text">
                  <strong>DNA Digital</strong>
                  Extraia a identidade da sua marca automaticamente
                </div>
              </div>
              <div class="auth-feature">
                <div class="auth-feature-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                </div>
                <div class="auth-feature-text">
                  <strong>Posts com IA</strong>
                  Legendas e imagens profissionais em segundos
                </div>
              </div>
              <div class="auth-feature">
                <div class="auth-feature-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                </div>
                <div class="auth-feature-text">
                  <strong>Consistência</strong>
                  Cada post respeita o DNA da sua marca
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Form Panel -->
        <div class="auth-form-panel">
          <div class="auth-form-container">
            <div class="auth-mobile-logo">IA</div>
            <div class="auth-header">
              <h1 id="auth-title">${this.isLoginMode ? 'Entrar' : 'Criar conta'}</h1>
              <p id="auth-subtitle">${this.isLoginMode ? 'Acesse sua plataforma de marketing com IA' : 'Comece a criar conteúdo incrível com IA'}</p>
            </div>

            <form class="auth-form" id="auth-form" novalidate>
              <div class="form-group" id="name-group" style="display: ${this.isLoginMode ? 'none' : 'flex'}">
                <label class="form-label" for="auth-name">Nome <span class="required">*</span></label>
                <div class="input-with-icon">
                  <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  <input type="text" id="auth-name" class="form-input" placeholder="Seu nome completo" autocomplete="name">
                </div>
                <span class="form-error hidden" id="name-error"></span>
              </div>

              <div class="form-group">
                <label class="form-label" for="auth-email">Email <span class="required">*</span></label>
                <div class="input-with-icon">
                  <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <input type="email" id="auth-email" class="form-input" placeholder="seu@email.com" autocomplete="email">
                </div>
                <span class="form-error hidden" id="email-error"></span>
              </div>

              <div class="form-group">
                <label class="form-label" for="auth-password">Senha <span class="required">*</span></label>
                <div class="input-with-icon">
                  <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <input type="password" id="auth-password" class="form-input" placeholder="Mínimo 6 caracteres" autocomplete="current-password">
                  <button type="button" class="password-toggle" id="toggle-password" aria-label="Mostrar senha">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                </div>
                <span class="form-error hidden" id="password-error"></span>
              </div>

              ${this.isLoginMode ? `
                <div class="auth-forgot">
                  <a href="#" id="forgot-password-link">Esqueceu a senha?</a>
                </div>
              ` : ''}

              <button type="submit" class="btn btn-primary btn-lg" id="auth-submit">
                <span id="auth-submit-text">${this.isLoginMode ? 'Entrar' : 'Criar conta'}</span>
                <div class="spinner hidden" id="auth-spinner"></div>
              </button>
            </form>

            <div class="auth-switch">
              ${this.isLoginMode
                ? 'Não tem conta? <a href="#" id="switch-mode">Criar conta</a>'
                : 'Já tem conta? <a href="#" id="switch-mode">Entrar</a>'
              }
            </div>
          </div>
        </div>
      </div>
    `;
  }

  _bindEvents() {
    // Form submit
    const form = document.getElementById('auth-form');
    form?.addEventListener('submit', (e) => this._handleSubmit(e));

    // Toggle mode
    const switchLink = document.getElementById('switch-mode');
    switchLink?.addEventListener('click', (e) => {
      e.preventDefault();
      this.isLoginMode = !this.isLoginMode;
      this.render();
    });

    // Toggle password visibility
    const toggleBtn = document.getElementById('toggle-password');
    toggleBtn?.addEventListener('click', () => {
      const input = document.getElementById('auth-password');
      if (input) {
        input.type = input.type === 'password' ? 'text' : 'password';
      }
    });

    // Real-time validation
    ['auth-email', 'auth-password', 'auth-name'].forEach((id) => {
      const input = document.getElementById(id);
      input?.addEventListener('blur', () => this._validateField(id));
    });
  }

  async _handleSubmit(e) {
    e.preventDefault();

    const email = document.getElementById('auth-email')?.value?.trim();
    const password = document.getElementById('auth-password')?.value;
    const name = document.getElementById('auth-name')?.value?.trim();

    // Validate
    const fields = {
      email: { value: email, rules: [{ type: 'required' }, { type: 'email' }] },
      password: { value: password, rules: [{ type: 'required' }, { type: 'password' }] }
    };

    if (!this.isLoginMode) {
      fields.name = { value: name, rules: [{ type: 'required', message: 'Nome é obrigatório' }] };
    }

    const validation = validateForm(fields);
    if (!validation.isValid) {
      this._showErrors(validation.errors);
      return;
    }

    // Show loading
    this._setLoading(true);

    try {
      if (isSupabaseConfigured()) {
        if (this.isLoginMode) {
          await signIn(email, password);
        } else {
          await signUp(email, password);
        }
      } else {
        // No Supabase: use localStorage mock auth
        localStorage.setItem('aspec_ia_user', JSON.stringify({
          id: 'local-user',
          email: sanitizeHtml(email),
          name: sanitizeHtml(name || email.split('@')[0])
        }));
      }

      // Check if user has brand DNA
      const { BrandRepository } = await import('../repositories/BrandRepository.js');
      const userId = this._getUserId();
      const brand = await BrandRepository.getBrand(userId);

      if (brand) {
        this.app.navigate('#/dashboard');
      } else {
        this.app.navigate('#/dnadigital');
      }

      this.app.showToast('success', this.isLoginMode ? 'Login realizado!' : 'Conta criada com sucesso!');
    } catch (error) {
      this.app.showToast('error', error.message || 'Erro ao autenticar');
    } finally {
      this._setLoading(false);
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

  _validateField(id) {
    const input = document.getElementById(id);
    const errorEl = document.getElementById(id.replace('auth-', '') + '-error');
    if (!input || !errorEl) return;

    let isValid = true;
    let message = '';

    if (id === 'auth-email') {
      const { isValidEmail } = { isValidEmail: (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) };
      if (!input.value.trim()) { isValid = false; message = 'Email é obrigatório'; }
      else if (!isValidEmail(input.value)) { isValid = false; message = 'Email inválido'; }
    } else if (id === 'auth-password') {
      if (!input.value) { isValid = false; message = 'Senha é obrigatória'; }
      else if (input.value.length < 6) { isValid = false; message = 'Mínimo 6 caracteres'; }
    } else if (id === 'auth-name') {
      if (!this.isLoginMode && !input.value.trim()) { isValid = false; message = 'Nome é obrigatório'; }
    }

    if (!isValid) {
      input.classList.add('error');
      errorEl.textContent = message;
      errorEl.classList.remove('hidden');
    } else {
      input.classList.remove('error');
      errorEl.classList.add('hidden');
    }
  }

  _showErrors(errors) {
    for (const [field, message] of Object.entries(errors)) {
      const input = document.getElementById(`auth-${field}`);
      const errorEl = document.getElementById(`${field}-error`);
      if (input) input.classList.add('error');
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.remove('hidden');
      }
    }
  }

  _setLoading(loading) {
    const btn = document.getElementById('auth-submit');
    const text = document.getElementById('auth-submit-text');
    const spinner = document.getElementById('auth-spinner');

    if (btn) btn.disabled = loading;
    if (text) text.textContent = loading
      ? (this.isLoginMode ? 'Entrando...' : 'Criando conta...')
      : (this.isLoginMode ? 'Entrar' : 'Criar conta');
    if (spinner) spinner.classList.toggle('hidden', !loading);
  }
}
