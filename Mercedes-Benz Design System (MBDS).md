# Mercedes-Benz Design System (MBDS)

Este documento detalha os fundamentos e componentes do **Design System da Mercedes-Benz**, extraídos diretamente de seus repositórios oficiais de tokens e do site institucional. O sistema é projetado para oferecer uma experiência de marca coesa, luxuosa e tecnologicamente avançada em todas as plataformas digitais.

---

## 1. Fundamentos Visuais

### 1.1 Tipografia
A tipografia da Mercedes-Benz é um pilar central da sua identidade. O sistema utiliza fontes proprietárias desenvolvidas para legibilidade e elegância.

| Categoria | Família de Fonte | Uso Principal |
| :--- | :--- | :--- |
| **Títulos** | `MB Corpo A Title Cond` | Headlines grandes e chamadas de destaque. |
| **Texto** | `MB Corpo S Text` | Corpo de texto, botões e legendas. |

#### Escala de Tamanhos (Web)
Os tamanhos de fonte seguem uma escala semântica para garantir hierarquia visual clara:

| Token | Tamanho (px) | Altura de Linha (px) |
| :--- | :--- | :--- |
| `8xl` | 72px | 88px |
| `7xl` | 64px | 72px |
| `6xl` | 48px | 60px |
| `xxl` | 26px | 32px |
| `xl` | 24px | 28px |
| `l` | 20px | 24px |
| `m` | 18px | 20px |
| `s` | 16px | 16px |
| `xs` | 14px | - |

> **Nota:** O peso da fonte varia entre `Regular (400)` e `Bold (700)`.

---

### 1.2 Cores
O sistema de cores é dividido em cores de marca (Brand), cores base (Base) e cores de aplicação (Application).

#### Cores de Marca (Mercedes-Benz Grey)
| Escala | Hexadecimal | Uso |
| :--- | :--- | :--- |
| `900` | `#0D0D0D` | Texto principal e fundos escuros. |
| `500` | `#767676` | Texto secundário e bordas. |
| `50` | `#F8F8F8` | Fundos claros e superfícies. |

#### Paleta Global (Base)
| Família | Exemplo (500) | Descrição |
| :--- | :--- | :--- |
| **Neutral** | `#696969` | Escala de cinzas para interface geral. |
| **Blue** | `#0078D6` | Ações primárias e links. |
| **Red** | `#D92121` | Erros e estados destrutivos. |
| **Green** | `#198025` | Sucesso e confirmações. |
| **Yellow** | `#E8BD00` | Avisos e alertas. |

---

### 1.3 Espaçamento e Grid
O sistema de espaçamento é baseado em uma unidade base de **8px**, garantindo proporções matemáticas consistentes.

#### Escala de Espaçamento
*   **halfx:** 4px
*   **1x:** 8px
*   **2x:** 16px
*   **4x:** 32px
*   **8x:** 64px
*   **16x:** 128px

#### Grid e Breakpoints
O layout é responsivo e se adapta a diferentes tamanhos de tela:

| Breakpoint | Nome | Largura Mín. | Colunas | Gutter |
| :--- | :--- | :--- | :--- | :--- |
| `xs` | Phone | 320px | 4 | 16px |
| `m` | Tablet | 768px | 8 | 24px |
| `l` | Laptop | 1024px | 12 | 32px |
| `xxl` | Desktop | 1440px | 12 | 40px |

---

## 2. Componentes de Interface

### 2.1 Botões (Buttons)
Os botões seguem uma estrutura minimalista com foco na tipografia.
*   **Raio de Borda (Border Radius):** 2px (estilo retangular e preciso).
*   **Variantes:**
    *   `Outlined`: Borda fina com texto na cor de destaque.
    *   `Text`: Sem borda, apenas tipografia.
    *   `Plain`: Sem estilos de fundo ou borda até a interação.
*   **Cor Padrão:** Utiliza o token `{color.application.primary-variant}`.

### 2.2 Formulários (TextFields)
*   **Estados:** Focado (Focused), Erro (Error), Desabilitado (Disabled).
*   **Estilo:** Geralmente utiliza a variante `Outlined` para maior clareza.
*   **Labels:** Utilizam a fonte `MB Corpo S Text` com peso `Regular`.

---

## 3. Princípios de Design Digital

1.  **Luxo Moderno:** Uso generoso de espaço negativo e tipografia condensada para transmitir sofisticação.
2.  **Precisão Técnica:** Bordas com raios pequenos (2px) e alinhamentos rigorosos ao grid de 8px.
3.  **Contraste:** Alto contraste entre fundos (Branco/Preto) e tipografia para garantir acessibilidade e foco.
4.  **Responsividade:** Adaptação fluida entre experiências mobile e desktop através de tokens de escala.

---

Este documento foi gerado através da análise dos tokens de design e implementação técnica do site **mercedes-benz.com**. Para desenvolvedores, os tokens estão disponíveis via variáveis CSS customizadas (ex: `--color-brand-grey-900`).
