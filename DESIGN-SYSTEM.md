# ASPEC Digital Solutions — Design System

## 1. Visão Geral

**ASPEC** é uma agência de soluções digitais que combina DESIGN e TECNOLOGIA para transformar ideias em resultados. O design system captura a essência de um ambiente espacial criativo — escuro, com点缀 de luz, energia e movimento constante.

---

## 2. Filosofia de Design

### Conceito
**"Creative Space"** — Um espaço escuro e infinito onde ideias brilhantes emergem através de gradientes vibrantes e animações flutuantes. A sensação é de possibilidade ilimitada, energia criativa e precisão tecnológica.

### Princípios
- **Movimento Constante**: Elementos que flutuam, pulsam e evoluem
- **Contraste Dramático**: Fundos escuros com elementos de luz vibrantes
- **Energia Gradiente**: Transições suaves entre cores que transmitem progresso
- **Minimalismo Funcional**: Cada elemento tem propósito e espaço para respirar

---

## 3. Cores

### Paleta Primária

| Nome | Hex | Uso |
|------|-----|-----|
| Purple Deep | `#5B2EFF` | Gradientes, elementos principais |
| Purple Medium | `#8B5CF6` | Acentos secundários |
| Purple Light | `#A855F7` | Hover states, detalhes |
| Pink Vibrant | `#D946EF` | CTAs, destaques, energia |

### Paleta Tecnológica

| Nome | Hex | Uso |
|------|-----|-----|
| Cyan Deep | `#06B6D4` | Seção Technology |
| Cyan Medium | `#0891B2` | Acentos tech |
| Cyan Light | `#38BDF8` | Hover tech |
| Sky Blue | `#0EA5E9` | Detalhes |

### Neutros

| Nome | Hex | Uso |
|------|-----|-----|
| Background Dark | `#030014` | Fundo principal |
| Background Card | `#0F0A1F` | Cards, componentes |
| Surface | `#1A1033` | Superfícies elevadas |
| Border | `rgba(255,255,255,0.1)` | Bordas sutis |
| Text Primary | `#FFFFFF` | Títulos |
| Text Secondary | `#94A3B8` | Texto secundário |
| Text Muted | `#64748B` | Texto terciário |

### Paleta Light (Seção Abordagem)

| Nome | Hex | Uso |
|------|-----|-----|
| White | `#FFFFFF` | Fundo |
| Gray 900 | `#111827` | Texto principal |
| Gray 500 | `#6B7280` | Texto secundário |
| Purple 50 | `#F5F3FF` | Backgrounds sutis |
| Pink 50 | `#FDF2F8` | Acentos |

---

## 4. Tipografia

### Família
- **Headings**: Exo (Bold, Semi-bold)
- **Body**: Exo (Regular, Medium)

### Escala

| Elemento | Tamanho | Peso | Line Height |
|----------|---------|------|-------------|
| Hero H1 | 4rem (64px) | 800 | 1.1 |
| Section H2 | 3rem (48px) | 700 | 1.2 |
| Card H3 | 1.5rem (24px) | 700 | 1.3 |
| Body Large | 1.125rem (18px) | 400 | 1.6 |
| Body | 1rem (16px) | 400 | 1.6 |
| Small | 0.875rem (14px) | 500 | 1.5 |
| Caption | 0.75rem (12px) | 500 | 1.4 |

### Classes CSS
```css
.font-exo { font-family: 'Exo', sans-serif; }
.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.font-medium { font-weight: 500; }
.text-gradient-aspec {
  background: linear-gradient(135deg, #5B2EFF, #D946EF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## 5. Espaçamento

### Sistema de Grid
- **Container max-width**: 1280px (lg:px-8)
- **Gutter**: 32px (px-4 lg:px-8)
- **Breakpoints**:
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px

### Escalas de Espaçamento

| Token | Valor | Uso |
|-------|-------|-----|
| `space-xs` | 4px | Detalhes mínimos |
| `space-sm` | 8px | Entre elementos pequenos |
| `space-md` | 16px | Padding interno de cards |
| `space-lg` | 24px | Entre cards |
| `space-xl` | 32px | Entre seções pequenas |
| `space-2xl` | 48px | Entre seções |
| `space-3xl` | 64px | Margens de seção |
| `space-4xl` | 96px | Separadores grandes |

---

## 6. Animações

### Curvas de Easing
```css
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

### Animações de Entrada

| Nome | Propriedade | Duração | Easing |
|------|-------------|---------|--------|
| `fade-in` | opacity 0→1 | 600ms | ease-out |
| `slide-up` | translateY(30px→0) | 600ms | ease-out |
| `scale-in` | scale(0.9→1) | 400ms | ease-spring |

### Animações de Elementos Flutuantes

```css
/* Float lento */
.animate-float {
  animation: float 6s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

/* Float mais lento */
.animate-float-slow {
  animation: float 8s ease-in-out infinite;
  animation-delay: -2s;
}

/* Drift lateral */
.animate-drift-sideways {
  animation: drift-sideways 10s ease-in-out infinite;
}
@keyframes drift-sideways {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(30px); }
}

/* Float com drift */
.animate-float-drift {
  animation: float-drift 12s ease-in-out infinite;
}
@keyframes float-drift {
  0%, 100% { transform: translateY(0) translateX(0); }
  25% { transform: translateY(-15px) translateX(10px); }
  50% { transform: translateY(-5px) translateX(-10px); }
  75% { transform: translateY(-20px) translateX(5px); }
}
```

### Twinkling Stars

```css
@keyframes twinkle {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.5); }
}
```

### Pulse Glow

```css
@keyframes pulse-glow {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
}
```

---

## 7. Componentes

### 7.1 Botões

#### Primary Button
```html
<button className="
  px-6 py-3 
  bg-gradient-to-r from-purple-600 to-pink-600 
  rounded-xl 
  font-exo font-semibold text-white 
  hover:shadow-lg hover:shadow-purple-500/25 
  transition-all duration-300 
  hover:scale-105
">
  Texto do Botão
</button>
```

**Estados:**
- Default: Gradiente purple→pink, sombra sutil
- Hover: Scale 1.05, sombra mais pronunciada
- Active: Scale 0.98
- Disabled: Opacity 50%, cursor not-allowed

#### Secondary Button
```html
<button className="
  px-6 py-3 
  bg-white/5 border border-white/10 
  rounded-xl 
  font-exo font-semibold text-white 
  hover:bg-white/10 transition-all duration-300
">
  Texto do Botão
</button>
```

#### Icon Button
```html
<button className="
  w-10 h-10 
  rounded-full 
  bg-white/5 border border-white/10 
  flex items-center justify-center 
  text-gray-400 
  hover:text-white hover:bg-white/10 
  transition-all duration-300
">
  <Icon size={16} />
</button>
```

---

### 7.2 Cards

#### Card Flutuante (Dark)
```html
<div className="
  relative p-8 
  bg-gradient-to-br from-purple-950/50 to-pink-950/30 
  rounded-3xl 
  border border-purple-500/20 
  backdrop-blur-sm
  group
  hover:border-purple-500/40 
  transition-all duration-500
">
  <!-- Conteúdo -->
</div>
```

#### Card de Pilar (Light Section)
```html
<div className="
  relative p-8 
  bg-white rounded-2xl 
  shadow-lg shadow-purple-100/50 
  border border-purple-100
  group
  hover:shadow-xl hover:-translate-y-2 
  transition-all duration-300
">
  <div className="
    w-16 h-16 
    rounded-2xl 
    bg-gradient-to-br from-purple-500 to-pink-500 
    flex items-center justify-center 
    mb-6
    group-hover:scale-110 
    transition-transform duration-300
  ">
    <Icon className="text-white" size={28} />
  </div>
  <!-- Conteúdo -->
</div>
```

#### Card de Projeto (Portfolio)
```html
<div className="
  relative rounded-3xl overflow-hidden 
  bg-gradient-to-br from-purple-950/30 to-transparent 
  border border-purple-500/20
  p-8
  cursor-pointer
  hover:border-purple-500/40
  transition-all duration-500
">
  <div className="
    w-14 h-14 
    rounded-2xl 
    flex items-center justify-center
    transition-transform duration-300 
    group-hover:scale-110
  " style={{ background: `linear-gradient(135deg, ${color}, ${color}80)` }}>
    <Icon className="text-white" size={24} />
  </div>
  <!-- Conteúdo -->
</div>
```

---

### 7.3 Tags/Badges

#### Tag de Pill
```html
<span className="
  text-xs font-medium 
  px-3 py-1 
  rounded-full 
  bg-white/5 
  border border-white/10 
  text-gray-300
">
  Tag Text
</span>
```

#### Badge com Ícone
```html
<div className="
  inline-flex items-center gap-2 
  bg-gradient-to-r from-purple-100 to-pink-100 
  rounded-full px-5 py-2
">
  <Icon size={14} className="text-purple-600" />
  <span className="text-sm font-medium text-purple-700">Label</span>
</div>
```

---

### 7.4 Inputs

#### Input Field
```html
<input 
  className="
    w-full px-4 py-3 
    bg-white/5 border border-white/10 
    rounded-xl 
    font-exo text-white 
    placeholder:text-gray-500
    focus:outline-none focus:border-purple-500 
    focus:ring-2 focus:ring-purple-500/20
    transition-all duration-300
  "
  placeholder="Placeholder text"
/>
```

---

### 7.5 Dividers

#### Geometric Divider
```html
<div className="geometric-divider">
  <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
    <path 
      d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,90 1440,60 L1440,120 L0,120 Z" 
      fill="url(#gradient)"
    />
    <!-- Padrão geométrico -->
  </svg>
</div>
```

---

## 8. Padrões Visuais

### 8.1 Gradientes

```css
/* Gradiente Principal */
background: linear-gradient(135deg, #5B2EFF, #D946EF);

/* Gradiente Reverso */
background: linear-gradient(135deg, #D946EF, #5B2EFF);

/* Gradiente de Seção */
background: linear-gradient(180deg, #030014 0%, #1A1033 50%, #030014 100%);

/* Gradiente de Glow */
background: radial-gradient(circle at top right, #D946EF40, transparent 70%);
```

### 8.2 Efeitos de Glow

```css
/* Glow Padrão */
box-shadow: 0 0 40px rgba(91, 46, 255, 0.3);

/* Glow no Hover */
box-shadow: 0 0 60px rgba(217, 70, 239, 0.4);

/* Glow Sutil */
box-shadow: 0 0 20px rgba(91, 46, 255, 0.2);
```

### 8.3 Backdrop Blur

```css
backdrop-filter: blur(12px);
background: rgba(15, 10, 31, 0.7);
```

---

## 9. Layout

### Estrutura de Página

```
┌─────────────────────────────────────────┐
│              HEADER (fixed)              │
├─────────────────────────────────────────┤
│                                         │
│            HERO SECTION                 │
│         (100vh, dark, stars)            │
│                                         │
├─────────────────────────────────────────┤
│           SERVICES SECTION               │
│        (dark, floating cards)           │
├─────────────────────────────────────────┤
│    GEOMETRIC DIVIDER (light→dark)       │
├─────────────────────────────────────────┤
│           CULTURE SECTION               │
│        (light, pillars + blocks)        │
├─────────────────────────────────────────┤
│    GEOMETRIC DIVIDER (dark→light)       │
├─────────────────────────────────────────┤
│          PORTFOLIO SECTION              │
│      (dark, tabs: Design/Tech)          │
├─────────────────────────────────────────┤
│           CTA SECTION                   │
│        (gradient, centered)             │
├─────────────────────────────────────────┤
│             FOOTER                      │
│        (dark, minimal)                  │
└─────────────────────────────────────────┘
```

### Alturas de Seção
- Hero: `min-h-screen` (100vh)
- Services: `py-24` (96px top/bottom)
- Culture: `py-24` (96px top/bottom)
- Portfolio: `pt-0 pb-32` (0 top, 128px bottom)
- CTA: `py-20` (80px top/bottom)

---

## 10. Responsividade

### Breakpoints

| Breakpoint | Largura | Comportamento |
|------------|---------|---------------|
| Mobile | < 640px | 1 coluna, padding 16px |
| Tablet | 640-1023px | 2 colunas, padding 16px |
| Desktop | 1024px+ | 4 colunas, padding 32px |

### Grid Adaptativo

```css
/* Cards de Serviço */
grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4

/* Cards de Pilar */
grid-cols-1 md:grid-cols-2 lg:grid-cols-4

/* Cards de Portfolio */
grid-cols-1 md:grid-cols-2
```

---

## 11. Iconografia

### Biblioteca
**Lucide React** — Ícones consistentes, limpos e modernos.

### Tamanhos Padrão

| Uso | Tamanho |
|-----|---------|
| Nav Icons | 18px |
| Card Icons | 24px |
| Hero Icons | 32px |
| Section Icons | 40px |
| Feature Icons | 48px |

### Cores de Ícones
- Dark Section: `text-white`, `text-purple-400`
- Light Section: `text-purple-600`, `text-pink-600`

---

## 12. Imagens

### Placeholder Images
- `hero-bg.jpg` — Background do hero
- `culture-1.jpg` — Imagem de estratégia
- `culture-2.jpg` — Imagem de execução
- `aspec-logo.png` — Logo da empresa

### Tratamento de Imagens
```css
/* Imagens em Cards */
object-cover rounded-2xl max-h-[380px]

/* Hover Effect */
group-hover:scale-105 transition-transform duration-500
```

---

## 13. Estados de Interação

### Hover States
```css
/* Geral */
hover:scale-105 hover:-translate-y-2

/* Glow */
hover:shadow-lg hover:shadow-purple-500/25

/* Border */
hover:border-purple-500/40

/* Background */
hover:bg-white/10
```

### Active States
```css
:active:scale-95
```

### Focus States
```css
focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500
```

---

## 14. Convenções de Código

### Nomeação de Classes
- **Componentes**: kebab-case (`.hero-section`, `.service-card`)
- **Variantes**: BEM-like (`.btn--primary`, `.card--expanded`)
- **Animações**: snake-case (`.animate-float`, `.animate-twinkle`)

### Ordem de Classes (Tailwind)
1. Layout (flex, grid, position)
2. Sizing (width, height, padding, margin)
3. Visual (colors, borders, shadows)
6. Typography (font, text)
7. Animations

### Exemplo
```jsx
<div className="flex items-center justify-between p-6 bg-white rounded-xl shadow-lg">
```

---

## 15. Checklist de Implementação

### Nova Seção
- [ ] Definir modo (dark/light)
- [ ] Adicionar geometric-divider se mudar de modo
- [ ] Implementar Intersection Observer para animações
- [ ] Adicionar floating elements se dark mode
- [ ] Testar responsividade (mobile-first)

### Novo Componente
- [ ] Seguir estrutura de cores (dark/light)
- [ ] Implementar hover states
- [ ] Adicionar animações de entrada
- [ ] Garantir contraste WCAG AA

### Atualização de Copy
- [ ] Usar Exo font-family
- [ ] Headings: `font-exo font-bold`
- [ ] Body: `font-exo text-gray-400/600`

---

## 16. Recursos

### Fontes
- **Exo**: https://fonts.google.com/specimen/Exo

### Ícones
- **Lucide React**: https://lucide.dev/

### Gradientes de Referência
```css
/* ASPEC Primary */
--gradient-aspec: linear-gradient(135deg, #5B2EFF 0%, #D946EF 100%);

/* Design Accent */
--gradient-design: linear-gradient(135deg, #D946EF 0%, #A855F7 100%);

/* Tech Accent */
--gradient-tech: linear-gradient(135deg, #06B6D4 0%, #0891B2 100%);
```

---

*Versão 1.0 — Última atualização: Março 2026*
