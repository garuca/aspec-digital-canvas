# ASPEC Digital Canvas - Design System

## Sumário

1. [Visão Geral](#1-visão-geral)
2. [Projeto e Estrutura](#2-projeto-e-estrutura)
3. [Sistema de Cores](#3-sistema-de-cores)
4. [Tipografia](#4-tipografia)
5. [Sistema de Espaçamento](#5-sistema-de-espaçamento)
6. [Sombras e Efeitos](#6-sombras-e-efeitos)
7. [Animações](#7-animações)
8. [Padrões de Componentes](#8-padrões-de-componentes)
9. [Biblioteca de Componentes UI](#9-biblioteca-de-componentes-ui)
10. [Rotasy Páginas](#10-rotas-e-páginas)
11. [Design Systems por Produto](#11-design-systems-por-produto)
12. [Ativos Visuais](#12-ativos-visuais)

---

## 1. Visão Geral

Este documento descreve o Design System completo utilizado no projeto ASPEC Digital Canvas (aspec.ia.br). O projeto é uma plataforma multi-produto que hospeda landing pages para diferentes clientes, cada uma com sua própria identidade visual dentro de um sistema unificado.

O Design System é baseado em **Tailwind CSS** com personalizações através de CSS custom properties e utiliza **shadcn/ui** como biblioteca de componentes base.

---

## 2. Projeto e Estrutura

### 2.1 Estrutura de Diretórios

```
src/
├── App.tsx                    # Roteamento principal
├── App.css                   # Estilos globais do App
├── main.tsx                  # Entry point com LanguageProvider
├── index.css                 # Estilos globais (design tokens)
├── assets/                   # Imagens e logos
├── components/
│   ├── Header.tsx            # Header com navegação
│   ├── Footer.tsx            # Footer completo
│   ├── HeroSection.tsx       # Seção hero principal
│   ├── DifferentialsSection.tsx
│   ├── ClientsSection.tsx
│   ├── CultureSection.tsx
│   ├── PortfolioSection.tsx  # Portfólio com DESIGN/TECHNOLOGY
│   ├── ServicesSection.tsx
│   ├── TeamSection.tsx       # Cards 3D flip
│   ├── TestimonialsSection.tsx
│   ├── FaqSection.tsx
│   ├── CtaSection.tsx
│   ├── SchoolNavigatorSection.tsx  # Tema espaço
│   ├── ImobiliáriaSection.tsx       # MBDS
│   ├── AlfaCenterSection.tsx       # Corporativo
│   ├── LevyHero.tsx
│   ├── LevyServices.tsx
│   ├── LevyQuoteForm.tsx
│   ├── Modal components/
│   │   ├── ProjectModal.tsx
│   │   ├── SocialmediaModal.tsx
│   │   ├── BVModal.tsx
│   │   ├── ArticleModal.tsx
│   │   └── ...
│   ├── LanguageSelector.tsx
│   ├── NavLink.tsx
│   └── ui/                   # shadcn/ui components (50+)
├── hooks/
│   ├── useScrollReveal.ts    # Animação por scroll
│   ├── useScrollAnimation.ts
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── context/
│   └── LanguageContext.tsx
├── lib/
│   └── utils.ts
└── utils/
    ├── basePath.ts
    └── paths.ts
```

### 2.2 Rotas

| Rota | Página | Descrição |
|------|--------|-----------|
| `/` | Index.tsx | Landing page principal ASPEC |
| `/school` | SchoolPage.tsx | School Navigator - plataforma educacional |
| `/imobiliaria` | ImobiliariaPage.tsx | Imobiliária com MBDS |
| `/alfacenter` | AlfaCenterPage.tsx | Alfa Center - shopping center |
| `/levy` | LevyPage.tsx | Levy Transportes |
| `*` | NotFound.tsx | Página 404 |

---

## 3. Sistema de Cores

### 3.1 Cores Primárias ASPEC (Gradiente Roxo)

| Nome | Hex | Uso |
|------|-----|-----|
| Deep Purple | `#5B2EFF` | Marca primária, botões, destaques |
| Medium Purple | `#8B5CF6` | Acentos secundários |
| Light Purple | `#A855F7` | Highlights, cards |
| Pink | `#D946EF` | Gradientes, decorativo |
| Cyan | `#06B6D4` | Acento tech, links |

### 3.2 Cores de Background

| Nome | Hex | Uso |
|------|-----|-----|
| Background Dark | `hsl(0 0% 0%)` | Seções escuras principais |
| Surface Card | `#1A1A2E` | Cards, painéis |
| Surface Footer | `#030712` | Background do footer |
| Border Subtle | `#2D2D44` | Bordas sutis |

### 3.3 Cores de Texto

| Nome | Hex | Uso |
|------|-----|-----|
| Foreground | `hsl(0 0% 100%)` | Texto primário |
| Text Secondary | `#94A3B8` | Texto secundário |
| Text Muted | `#64748B` | Texto desabilitado/muted |

### 3.4 Cores Semânticas

| Nome | Hex | Uso |
|------|-----|-----|
| Destructive | `hsl(0 84% 60%)` | Erros, avisos |
| Success | `#22C55E` | Estados de sucesso |
| Warning | `#F59E0B` | Avisos |
| WhatsApp Green | `#25D366` | Botões WhatsApp |

### 3.5 Paletas por Produto

#### School Navigator (Tema Espaço/Escuro)
- Background: `#030014` (quase preto)
- Gradiente: `#5B2EFF` → `#D946EF`

#### Imobiliária (MBDS - Microsoft Style)
- Primary: `#0078D6` (Microsoft Blue)
- Background: `#0D0D0D`
- Light: `#F8F8F8`
- Text Gray: `#767676`
- Dark Gray: `#696969`

#### Alfa Center (Corporativo/Branco)
- Primary Orange: `#F6931E`
- Navy: `#1B365D`
- White: `#FFFFFF`
- Light Gray: `#F4F7F6`
- Gray: `#666666`
- Dark Gray: `#333333`

#### Levy Transportes
- Primary Blue: `#1a365d` / `#2B6CB0`
- Accent Orange: `#F69906` / `#DD6B06`
- Footer Navy: `#1a365d`

---

## 4. Tipografia

### 4.1 Famílias de Fontes

| Família | Pesos | Uso |
|----------|-------|-----|
| **Poppins** | 400, 500, 600, 700 | Títulos e display |
| **Inter** | 300, 400, 500, 600 | Corpo de texto |
| **Exo** | 300, 400, 500, 600, 700 | Elementos UI, navegação |
| **Montserrat** | 400, 500, 600, 700 | Página Alfa Center |

### 4.2 Escala de Tamanho

| Classe | Valor | Uso |
|--------|-------|-----|
| text-xs | 12px | Labels pequenos |
| text-sm | 14px | Texto secundário |
| text-base | 16px | Corpo base |
| text-lg | 18px | Texto destacado |
| text-xl | 20px | Subtítulos |
| text-2xl | 24px | Títulos pequenos |
| text-3xl | 28px | Títulos personalizados |
| text-4xl | 32px / 36px | Títulos de seção |
| text-5xl | 48px | Títulos grandes |
| text-6xl | 60px | Hero titles |
| text-7xl | 72px | Display titles |

### 4.3 Line Heights

- Tight: 1.0-1.1 (títulos)
- Normal: 1.5 (corpo)
- Relaxed: 1.6-1.75 (descrições)

### 4.4 Letter Spacing

| Valor | Uso |
|-------|-----|
| 0 | Normal |
| 0.05em | Wide |
| 0.1em | Wider |
| 0.2em | Widest (labels uppercase) |

---

## 5. Sistema de Espaçamento

### 5.1 Padrão Tailwind

| Classe | Valor | Uso |
|--------|-------|-----|
| p-2 | 8px | Padding apertado |
| p-4 | 16px | Padding padrão |
| p-6 | 24px | Padding de seção |
| p-8 | 32px | Padding de card |
| p-10 | 40px | Containers grandes |

### 5.2 Espaçamentos Customizados

| Uso | Valor |
|-----|-------|
| Seção vertical | 80px / 96px / 100px |
| Max-width container | 1200px / 1280px |
| Gap (cards) | 24px |
| Gap (grid items) | 32px / 48px |

### 5.3 Border Radius

| Nome | Valor | Uso |
|------|-------|-----|
| sm | 6px / 8px | Elementos pequenos |
| md | 12px | Botões, cards |
| lg | 16px / 20px | Cards grandes |
| xl | 24px / 28px | Modais |
| 2xl | 32px | Feature cards |
| full | 9999px | Pills, avatares |
| none | 0px | Estilo MBDS (2px border-radius) |

---

## 6. Sombras e Efeitos

### 6.1 Sombras de Card

```css
/* Card tema escuro */
box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 60px rgba(91, 46, 255, 0.15);

/* Card tema claro */
box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);

/* Hover glow */
--glow-violet: 0 0 30px rgba(168, 85, 247, 0.3);

/* Alfa Center */
box-shadow: 0 8px 24px rgba(0,0,0,0.12)
box-shadow: 0 4px 12px rgba(0,0,0,0.05)
```

### 6.2 Backdrop Filters

```css
backdrop-filter: blur(20px)  /* Efeito glass */
backdrop-filter: blur(25px)  /* Backdrop modal */
backdrop-filter: blur(10px)   /* Painéis pequenos */
```

### 6.3 Efeitos Especiais

```css
/* Brilho galáxia */
width: 500px;
height: 500px;
background: radial-gradient(circle, rgba(91, 46, 255, 0.15) 0%, rgba(168, 85, 247, 0.1) 30%, transparent 70%);
filter: blur(60px);

/* Estrelas cintilantes */
animation: twinkle 2-5s ease-in-out infinite;

/* Trilha de meteoro */
background: linear-gradient(90deg, rgba(255, 255, 255, 0.8), rgba(168, 85, 247, 0.3), transparent);
```

---

## 7. Animações

### 7.1 Keyframes

| Nome | Duração | Efeito |
|------|---------|--------|
| fadeInUp | 0.6s | Opacidade + Y translate |
| float | 6s | Y + rotação |
| float-slow | 8s | Deriva lenta |
| float-drift | 7s | Deriva complexa |
| orbit | 20-50s | Rotação em torno de ponto |
| pulse-glow | 4s | Scale + opacidade |
| drift-sideways | 9s | X/Y/rotação |
| twinkle | 2-5s | Piscar opacidade |
| shimmer | 2s | Sweep de luz |
| scroll-bounce | 2s | Y bounce |
| cta-pulse | 4s | Scale pulse |

### 7.2 Classes de Animação

```css
.animate-float           /* 6s float animation */
.animate-float-slow      /* 8s slow float */
.animate-float-drift     /* 7s drift */
.animate-drift-sideways   /* 9s */
.animate-pulse-glow      /* 4s pulse */
.animate-orbit           /* 20s orbit */

/* Delays de float */
.float-delay-1 to .float-delay-6
.float-delay-neg-1 to .float-delay-neg-3
```

### 7.3 Scroll Reveal

```css
.scroll-animate {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.scroll-animate.visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 8. Padrões de Componentes

### 8.1 Padrões de Card

#### Service Card (Tema Claro)
```css
border: 1px solid rgba(91, 46, 255, 0.1);
border-radius: 20px;
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
/* Hover: translateY(-10px), border-color change, gradient overlay */
```

#### Service Card (Tema Escuro)
```css
background: linear-gradient(145deg, rgba(26, 26, 46, 0.8), rgba(15, 15, 30, 0.9));
border: 1px solid rgba(91, 46, 255, 0.15);
border-radius: 20px;
/* Top gradient line on hover */
```

#### Pillar Card
```css
border-radius: 20px;
padding: 32px 24px;
border: 1px solid rgba(0, 0, 0, 0.06);
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
/* Top border gradient on hover */
```

#### Team Card
```css
perspective: 1000px;
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: 24px;
/* 3D transform on hover */
```

#### Portfolio Card
```css
border-radius: 3xl;
border: 1px solid rgba(255,255,255,0.05);
/* Neon strip at bottom */
/* Glow effect */
```

### 8.2 Padrões de Botão

#### Gradient Button
```css
class="bg-gradient-aspec"
padding: px-8 py-4
border-radius: rounded-xl / rounded-2xl
shadow-lg shadow-purple-500/30
hover: shadow-purple-500/50
```

#### Hero Button
```css
class="border-white/20"
bg-white/10 (on hover)
```

#### WhatsApp Button
```css
border: 1px solid rgba(118, 118, 118, 0.2)
bg: gradient-to-r from-purple-600 via-pink-500 to-purple-600
hover bg: gradient-to-r from-green-500 to-emerald-500
```

### 8.3 Padrões de Modal

#### Project Modal
```css
.project-modal-overlay
.project-modal-container (height: 100vh)
.project-modal-header
.project-modal-thumbnails
.project-modal-scroll-area
.project-modal-content (padding: 100px 120px)
```

#### Socialmedia Modal
```css
.socialmedia-modal-overlay
.socialmedia-modal-tabs (tabs for Carousels/Banners)
.socialmedia-carrossel-slide (width: 320px)
.socialmedia-lightbox-overlay
```

#### SL Mandic / BV Modal
```css
.slmandic-modal-container / .bv-modal-container
max-width: 1200px
height: 90vh, max-height: 800px
.slmandic-stats (4-column grid)
```

#### Article Modal
```css
.article-modal-overlay
.article-progress-bar
.article-modal-container (rounded-3xl)
.article-body (max-width: 800px)
```

### 8.4 Padrões de Seção

#### Dark Section
```css
.dark-section {
  background: linear-gradient(180deg, #0a0a1a 0%, #050510 50%, #020208 100%);
}
.dark-grid-pattern {
  background-image: linear-gradient(rgba(91, 46, 255, 0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(91, 46, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
}
```

#### Light Section
```css
.light-section {
  background: linear-gradient(180deg, #ffffff 0%, #fafafa 50%, #f5f5f5 100%);
}
.dot-pattern {
  background-image: radial-gradient(circle, #d1d5db 1px, transparent 1px);
  background-size: 24px 24px;
}
```

#### Geometric Divider
```css
.geometric-divider { height: 120px; overflow: hidden; }
.geometric-divider::before/::after {
  background: linear-gradient(to bottom right, transparent 49.5%, #000 50%, #000 50.5%, transparent 51%);
  background-size: 60px 120px;
}
```

---

## 9. Biblioteca de Componentes UI

### 9.1 shadcn/ui Components (50+)

Baseado em **Radix UI**.

#### Core Components
- `button.tsx` - Variants: default, destructive, outline, ghost, link, gradient, hero
- `input.tsx` - Com focus ring styling
- `card.tsx`
- `badge.tsx`
- `label.tsx`
- `checkbox.tsx`
- `select.tsx`
- `textarea.tsx`
- `slider.tsx`

#### Layout Components
- `accordion.tsx`
- `collapsible.tsx`
- `tabs.tsx`
- `separator.tsx`
- `sheet.tsx` - Drawer

#### Feedback Components
- `alert.tsx`
- `alert-dialog.tsx`
- `toast.tsx`
- `toaster.tsx`
- `progress.tsx`

#### Overlay Components
- `dialog.tsx`
- `alert-dialog.tsx`
- `popover.tsx`
- `tooltip.tsx`
- `context-menu.tsx`
- `menubar.tsx`
- `dropdown-menu.tsx`
- `navigation-menu.tsx`

### 9.2 Sistema de Ícones

- **Biblioteca**: Lucide React
- **Tamanhos**: 
  - 14px (small)
  - 16-18px (medium)
  - 20-24px (large)
  - 28-32px (xlarge)

---

## 10. Rotas e Páginas

| Rota | Página | Tema |
|------|--------|------|
| `/` | Index.tsx | ASPEC purple gradient |
| `/school` | SchoolPage.tsx | Space dark |
| `/imobiliaria` | ImobiliariaPage.tsx | MBDS blue |
| `/alfacenter` | AlfaCenterPage.tsx | Light corporate |
| `/levy` | LevyPage.tsx | Navy/orange |
| `*` | NotFound.tsx | - |

---

## 11. Design Systems por Produto

### 11.1 ASPEC Principal (Landing Page)

**Filosofia**: Premium, tech-forward, gradients roxos com efeitos de glow

**Cores**:
- Primary: `#5B2EFF` (gradient to `#D946EF`)
- Background: `#000000` to `#0a0a1a`
- Text: White with purple accents

**Tipografia**: Poppins (headings), Inter (body)

**Estilo de Border Radius**: Suave (12-20px)

---

### 11.2 School Navigator

**Filosofia**: Espaço cósmico, escuro, partículas flutuantes

**Cores**:
- Background: `#030014` (quase preto)
- Accent: Purple gradient (`#5B2EFF` → `#D946EF`)
- Stars/particles: White with varying opacity

**Tipografia**: Poppins (display), Inter (body)

**Elementos Visuais**:
- Galaxy glow effects
- Star twinkling animations
- Meteor trails
- Grid patterns sutis

---

### 11.3 Imobiliária (MBDS)

**Filosofia**: Microsoft Design Language, flat, profissional

**Cores**:
- Primary: `#0078D6`
- Background: `#0D0D0D`
- Light: `#F8F8F8`
- Text Gray: `#767676`
- Dark Gray: `#696969`

**Tipografia**: Inter (toda)

**Estilo de Border Radius**: Sharp (2px max)

**Elementos distintivos**:
- Flat design
- Border-based interactions
- Simple shadows
- Microsoft-style icons

---

### 11.4 Alfa Center

**Filosofia**: Corporativo claro, laranja vibrante sobre branco

**Cores**:
- Primary: `#F6931E` (laranja)
- Navy: `#1B365D`
- Background: White/Light Gray
- Text: Dark Gray `#333333`

**Tipografia**: Montserrat (toda)

**Estilo de Border Radius**: Moderado (5-8px)

**Elementos distintivos**:
- Clean white backgrounds
- Orange CTAs
- Corporate feel
- Simple shadows

---

### 11.5 Levy Transportes

**Filosofia**: Transportadora robusta, azul marinho com laranja

**Cores**:
- Primary Blue: `#1a365d` / `#2B6CB0`
- Accent Orange: `#F69906` / `#DD6B06`
- Footer: `#1a365d`

**Tipografia**: Poppins/Inter

**Estilo de Border Radius**: Arredondado (8px, full)

**Elementos distintivos**:
- Hero com imagem de caminhão
- Formulário de orçamento
- Cards de serviços com ícones
- WhatsApp integration

---

## 12. Ativos Visuais

### 12.1 Estrutura de Assets

```
public/
├── logo_aspec.png              # Logo principal ASPEC
├── favicon.ico, favicon.svg    # Favicons
├── clientes/                   # Logos de clientes (7 pares gray/color)
├── illustrations/               # 12 SVGs de estratégia/mindmap
├── logos/                      # Logos adicionais
├── portfolio/
│   ├── luna/                   # Projeto Luna
│   ├── socialmedia/            # Social Media Manager
│   ├── taskmaster/             # TaskMaster
│   ├── virtus/                # Virtus
│   ├── slmandic/              # SL Mandic
│   ├── bv/                    # BV
│   ├── itau/                  # Itaú
│   ├── moto/                  # AppMoto
│   └── team/                  # Fotos da equipe (3)
├── melissa/                    # Projeto Melissa
├── radar/                     # Projeto Radar
├── vivid/                     # Projeto Vivid
├── vividsnow/                 # Projeto Vivid Snow
├── shadi/                     # Projeto Shadi
├── ximports/                  # Projeto XImports
└── medpluscomerciohospitalar/ # E-commerce MedPlus
```

### 12.2 Gradientes CSS

```css
/* Gradiente horizontal ASPEC */
--gradient-aspec: linear-gradient(90deg, #5B2EFF 0%, #A855F7 50%, #D946EF 100%);

/* Gradiente diagonal */
--gradient-aspec-diagonal: linear-gradient(135deg, #5B2EFF 0%, #D946EF 100%);

/* Background gradients */
linear-gradient(180deg, #0a0a1a 0%, #050510 50%, #020208 100%)
linear-gradient(145deg, rgba(26, 26, 46, 0.8), rgba(15, 15, 30, 0.9))

/* Button gradients */
.bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600
.bg-gradient-to-r from-green-500 to-emerald-500 (WhatsApp hover)
.bg-gradient-to-r from-[#F69906] to-[#DD6B06] (Levy)

/* Card glow */
linear-gradient(135deg, rgba(91, 46, 255, 0.1), rgba(217, 70, 239, 0.1))
radial-gradient(circle, rgba(91, 46, 255, 0.08) 0%, transparent 70%)
```

---

## 13. Decisões de Design Chave

### 13.1 Aplicação de Cores por Contexto

1. **ASPEC Brand (dark)**: `#5B2EFF` gradient with purple glows
2. **Imobiliaria MBDS**: Flat `#0078D6` on dark backgrounds
3. **Alfa Center**: `#F6931E` orange on white/light gray
4. **Levy**: `#F69906` orange on navy `#1a365d`

### 13.2 Filosofia de Border Radius

- **ASPEC**: Soft (12-20px) - amigável, moderno
- **MBDS (Imobiliaria)**: Sharp (2px) - profissional, técnico
- **Alfa Center**: Moderate (5-8px) - corporativo, limpo
- **Levy**: Rounded (8px, full) - amigável, acessível

### 13.3 Sistema de Ícones

- **Biblioteca**: Lucide React
- **Tamanhos**: 14px (small), 16-18px (medium), 20-24px (large), 28-32px (xlarge)

---

## 14. Hooks Customizados

### 14.1 useScrollReveal

```typescript
export function useScrollReveal(threshold = 0.1) {
  // IntersectionObserver-based reveal
  // Returns { ref, isVisible }
}
```

Utiliza IntersectionObserver API para detectar quando elementos entram no viewport e aplicar animações de fade-in com translação Y.

### 14.2 useScrollAnimation

Animações adicionais baseadas em scroll para efeitos mais complexos.

---

## 15. Conclusão

Este Design System foi desenvolvido para suportar múltiplos produtos com identidades visuais distintas, mantendo consistência técnica através de:

1. **Tailwind CSS** como sistema de utilitários
2. **shadcn/ui** como biblioteca de componentes base
3. **CSS Custom Properties** para tokens de design
4. **Gradientes** para identidade de marca
5. **Animações** para feedback e engajamento

O sistema permite que cada produto tenha sua própria paleta de cores e estilo, enquanto compartilha a mesma infraestrutura técnica e padrões de componentes.
