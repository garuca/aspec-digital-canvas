# Sistema de Design ASPEC (Design System)

Este documento descreve as diretrizes de design, a identidade visual e os componentes reutilizáveis do projeto **ASPEC**. A marca combina uma estética de alta tecnologia com o **Brutalismo Digital**, transmitindo precisão técnica, velocidade e robustez.

---

## 1. Princípios de Design

### Brutalismo Técnico
* **Cantos Retos (`border-radius: 0`)**: Absolutamente nenhum elemento possui cantos arredondados. Isso é garantido no CSS global (`* { border-radius: 0 !important; }`).
* **Bordas Fortes e Visíveis**: Divisores e contornos de componentes usam a cor `border` (`#E2E8F0`) ou pretas para demarcar os limites de forma explícita.
* **Alto Contraste**: Uso de cores sólidas e contrastantes que garantem legibilidade imediata e uma atmosfera técnica.

### Foco em Acessibilidade
* **Indicadores de Foco**: Todos os elementos interativos possuem o indicador `:focus-visible` customizado (`outline: 2px solid #FF6B2C; outline-offset: 2px;`) para garantir navegação por teclado excelente.
* **Hierarquia Legível**: O texto flui de forma natural com tamanhos contrastantes e pesos bem marcados.

---

## 2. Paleta de Cores

As cores da ASPEC são divididas em cores de marca (primária e variações), neutras e de feedback:

| Categoria | Nome | Hex | Classe Tailwind | Aplicação |
| :--- | :--- | :--- | :--- | :--- |
| **Marca** | Laranja Primário | `#FF6B2C` | `bg-primary` / `text-primary` | Botões primários, links ativos, badges de destaque, focos. |
| **Marca** | Primário Hover | `#E55A1B` | `bg-primary-hover` | Estado hover de botões primários. |
| **Marca** | Primário Light | `#FFF0EA` | `bg-primary-light` | Fundo de badges, caixas de destaque de textos. |
| **Neutras** | Fundo Principal | `#F4F7FA` | `bg-background` | Fundo geral da página. |
| **Neutras** | Fundo Card / Seção | `#FFFFFF` | `bg-white` | Fundo de seções de conteúdo e cards. |
| **Neutras** | Borda | `#E2E8F0` | `border-border` | Divisores, contorno de cards, inputs e tabelas. |
| **Texto** | Slate 950 (Escuro) | `#020617` | `text-slate-950` | Títulos grandes, textos em destaque extremo. |
| **Texto** | Slate 900 (Corpo) | `#0f172a` | `text-slate-900` | Textos gerais, títulos de cards. |
| **Texto** | Slate 600 (Secundário)| `#475569` | `text-slate-600` | Subtítulos, parágrafos explicativos, links normais. |
| **Texto** | Slate 500 (Suave) | `#64748b` | `text-slate-500` | Textos pequenos de rodapé, números de pilares. |
| **Feedback**| Verde Sucesso | `#25D366` | `bg-[#25D366]` | Botão flutuante do WhatsApp, ícones de sucesso. |

---

## 3. Tipografia

O sistema utiliza duas famílias de fontes importadas do Google Fonts:
1. **Inter** (Sans-serif) para legibilidade no corpo do texto.
2. **Space Mono** (Monospace) para o tom técnico (títulos, links de navegação, botões, números e tags).

### Regras de Aplicação

* **Títulos Principais (H1, H2, H3)**:
  * **Classe**: `font-mono font-bold uppercase tracking-tight`
  * **Uso**: Títulos de seções, hero banner.
  * **Exemplo**: `DESENVOLVIMENTO DE SOFTWARE E INTELIGÊNCIA ARTIFICIAL`

* **Navegação, Botões e Links**:
  * **Classe**: `font-mono text-xs font-bold tracking-wider uppercase`
  * **Uso**: Menu do cabeçalho, botões de ação, links do menu de rodapé.

* **Metadados, Tags e Números**:
  * **Classe**: `font-mono text-[10px] sm:text-xs font-bold tracking-widest`
  * **Uso**: Identificadores de etapas (ex: "PILAR 01"), badges de categorias, contadores.

* **Texto de Leitura (Corpo, parágrafos)**:
  * **Classe**: `font-sans text-slate-600 leading-relaxed`
  * **Uso**: Parágrafos de texto corrido, descrições de cards, FAQs.

---

## 4. Componentes Padrão

### A. Botões (Buttons)
* **Primário (Preenchido)**:
  * Classes: `bg-primary hover:bg-primary-hover text-white font-mono text-sm font-bold tracking-wider px-6 py-3 border border-primary transition-all duration-300`
  * Comportamento: Cor sólida laranja, com hover escurecido (`#E55A1B`).
* **Secundário (Brutalista / Inverso)**:
  * Classes: `bg-slate-50 hover:bg-primary hover:text-white border border-border hover:border-primary font-mono text-xs font-bold tracking-wider transition-colors duration-300`
  * Comportamento: Fundo cinza claro, inverte para laranja no hover com texto branco.
* **Ícone em Ação**:
  * Adicionar `<i data-lucide="arrow-up-right" class="ml-2 w-4 h-4"></i>` usando a biblioteca Lucide.

### B. Badges e Tags
* **Badge Primário (Light)**:
  * Classes: `text-xs font-mono font-bold text-primary px-3 py-1 bg-primary-light uppercase`
* **Badge Escuro (Status/Categoria)**:
  * Classes: `text-xs font-mono font-bold text-white bg-slate-800 px-3 py-1 uppercase`

### C. Cards
* **Card Padrão de Serviço/Diferencial**:
  * Classes: `p-8 bg-white border-r border-b border-border hover:shadow-lg transition-shadow group`
  * Geralmente dispostos em grid sem espaçamento entre si, de modo que compartilhem as bordas (layout de tabela de grid brutalista).
* **Card Informativo de Depoimento / Destaque**:
  * Classes: `bg-primary-light border-l-4 border-primary p-5 font-sans italic text-slate-800 leading-relaxed`

### D. Elementos de Formulário (Forms)
* **Campos de Texto/E-mail/Telefone**:
  * Classes: `w-full px-4 py-3 border border-border focus:border-primary focus:outline-none bg-slate-50 text-sm`
* **Dropdowns (Selects)**:
  * Classes: `w-full px-4 py-3 border border-border focus:border-primary focus:outline-none bg-slate-50 text-sm text-slate-600`
* **Labels**:
  * Classes: `block font-mono text-xs font-bold text-slate-700 uppercase mb-2`

### E. Componentes Especiais
* **Marquee Banner (Texto Deslizante)**:
  * Utiliza animação de keyframes `@keyframes marquee` no CSS e classes Tailwind `.animate-marquee`. Pausa no hover.
* **Simulador de Chat**:
  * Balões de chat alinhados à direita (usuário, com fundo `bg-primary`) e à esquerda (IA/sistema, com fundo `bg-slate-800`).

---

## 5. Convenções de Código CSS e Tailwind
* **Imports**: Sempre pré-conectar com `fonts.googleapis.com` e carregar as fontes `Inter` e `Space Mono`.
* **Tailwind Watcher**: O build compila através do script `npm run dev` que roda o watcher do Tailwind CSS:
  `tailwindcss -i src/input.css -o css/output.css -w`
