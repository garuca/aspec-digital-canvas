# Graph Report - .  (2026-07-08)

## Corpus Check
- Large corpus: 148 files · ~1,573,791 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 424 nodes · 742 edges · 39 communities (22 shown, 17 thin omitted)
- Extraction: 86% EXTRACTED · 14% INFERRED · 0% AMBIGUOUS · INFERRED: 104 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- App Core + Supabase
- Moto App Portfolio Screens
- AI Gateway + Providers
- Brand DNA Extraction
- Moto Fintech Mobile UI
- SEO Papers + Swift Curriculum
- Package Dependencies
- Post Controller UI
- Design System + Deploy
- DNA Controller Extraction
- App Shell + Routing
- Login Controller Auth
- BV Client Portfolio
- SL Mandic Client Portfolio
- Dashboard Controller
- Itau Client Chat UI
- Imagen Gateway API
- Appmax Client Logo
- Easy Client Logo
- EstrelaBet Client Logo
- Kovi Client Logo
- Opencode Plugin Config
- Opencode Plugin Pkg
- Graphify Plugin Script
- Moto PIX Screen
- Gabriel Team Photo
- Weliton Team Photo
- Slide Navigation Logic
- WhatsApp Redirect
- Graphify Tool
- Logo Assets
- Swift Tutorial
- Profile Photo
- Reference Image
- Robots Config
- Swift Preview

## God Nodes (most connected - your core abstractions)
1. `PostController` - 19 edges
2. `DnaController` - 17 edges
3. `WebScraperService` - 17 edges
4. `getSupabase()` - 14 edges
5. `BrandRepository` - 14 edges
6. `PostRepository` - 14 edges
7. `sanitizeHtml()` - 14 edges
8. `App` - 13 edges
9. `isSupabaseConfigured()` - 13 edges
10. `LoginController` - 11 edges

## Surprising Connections (you probably didn't know these)
- `Post Generator Tool` --semantically_similar_to--> `ASPEC IA Platform`  [INFERRED] [semantically similar]
  gerador-post.html → dnadigital/index.html
- `Plano de Otimizações SEO – ASPEC` --conceptually_related_to--> `ASPEC`  [INFERRED]
  Plano de Otimizações SEO – ASPEC.pdf → swift/inscricao.html
- `SEO Quick Wins - Melhorias Imediatas para o Site da ASPEC` --conceptually_related_to--> `ASPEC`  [INFERRED]
  SEO Quick Wins - Melhorias Imediatas para o Site da ASPEC.pdf → swift/inscricao.html
- `ASPEC Organization` --conceptually_related_to--> `ASPEC IA Platform`  [INFERRED]
  index.html → dnadigital/index.html
- `ASPEC Organization` --conceptually_related_to--> `Post Generator Tool`  [INFERRED]
  index.html → gerador-post.html

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **ASPEC Design System Foundations** — design_system_technical_brutalism, design_system_color_palette, design_system_typography_system, design_system_aspec_design_system [EXTRACTED 1.00]
- **ASPEC Main Site Core Concepts** — index_aspec_organization, index_aspec_methodology, index_diagnostic_framework, index_aspec_services, index_client_portfolio [EXTRACTED 1.00]
- **Swift Learning Materials** — swift_inscricao_formacao_master_swift, swift_matriz_swift_curriculum, swift_swift_getstarted_presentation, swift_swift_presentation_intro, temp_swift_intro_w3schools [INFERRED 0.95]
- **SEO Optimization Documents** — plano_de_otimizacoes_seo_aspec, seo_quick_wins_aspec, swift_inscricao_aspec [INFERRED 0.85]
- **Client Logos Portfolio Section** — clientes_appmax_entity, clientes_bv_entity, clientes_easy_entity, clientes_estrelabet_entity, clientes_slmandic_entity, clientes_itau_entity, clientes_kovi_entity [INFERRED 0.95]
- **BV Bank Project Portfolio Assets** — portfolio_bv_bv_projeto_aspec1_webp, portfolio_bv_bv_projeto_aspec2_webp, portfolio_bv_bv_projeto_aspec3_webp, portfolio_bv_bv_projeto_aspec4_webp, portfolio_bv_bv_projeto_aspec5_webp, clientes_bv_entity [INFERRED 0.95]
- **SL Mandic Project Portfolio Assets** — portfolio_slmandic_unnamed_1_webp, portfolio_slmandic_unnamed_2_webp, portfolio_slmandic_unnamed_3_webp, portfolio_slmandic_unnamed_webp, clientes_slmandic_entity [INFERRED 0.95]
- **Payment and Money Movement Flows** — portfolio_moto_adicionar_dinheiroo, portfolio_moto_boleto, portfolio_moto_boleto_1, portfolio_moto_boleto_2, portfolio_moto_cartao, portfolio_moto_cobrar_boleto, portfolio_moto_cobrar_boleto_alt [INFERRED 0.85]
- **Profile and Settings Management** — portfolio_moto_configuracoes, portfolio_moto_alterar_foto_do_perfil, portfolio_moto_alterar_senha, portfolio_moto_dados_pessoais, portfolio_moto_dados_pessoais_1, portfolio_moto_dados_pessoais_2, portfolio_moto_compartilhe_sua_conta [INFERRED 0.85]
- **Onboarding and Help Features** — portfolio_moto_confirme_seu_cadastro, portfolio_moto_confirme_seu_cadastro_ativo, portfolio_moto_confirme_seu_cadastro_ativo_1, portfolio_moto_central_de_ajuda, portfolio_moto_cursos, portfolio_moto_cursos_1 [INFERRED 0.85]
- **Authentication Flow Screens** — portfolio_moto_login_login_screen, portfolio_moto_login_ativo_login_active, portfolio_moto_login_1_login_variant1, portfolio_moto_login_2_login_variant2, portfolio_moto_login_3_login_variant3, portfolio_moto_login_5_login_variant5, portfolio_moto_envie_me_um_codigo_de_uso_unico_para_fazer_login_one_time_code, portfolio_moto_insira_a_senha_password_entry, portfolio_moto_impressao_digital_fingerprint_auth [INFERRED 0.95]
- **Financing & Payment Processing Flow** — portfolio_moto_financiamento_financing, portfolio_moto_financioamento_1_financing_variant, portfolio_moto_em_processamento_processing, portfolio_moto_em_processamento_1_processing_variant1, portfolio_moto_em_processamento_2_processing_variant2 [INFERRED 0.85]
- **Detail Information Screens** — portfolio_moto_detalhes_da_conta_account_details, portfolio_moto_detalhes_da_conta_1_account_details_variant, portfolio_moto_detalhes_do_curso_course_details, portfolio_moto_detalhes_do_curso_1_course_details_variant [INFERRED 0.75]
- **Information Validation Flow (6 Screens)** — portfolio_moto_validando_informacoes, portfolio_moto_validando_informacoes_1, portfolio_moto_validando_informacoes_2, portfolio_moto_validando_informacoes_3, portfolio_moto_validando_informacoes_4, portfolio_moto_validando_informacoes_5 [INFERRED 0.85]
- **PIX Payment Screens** — portfolio_moto_pix___envio, portfolio_moto_pix_envio, portfolio_moto_pix_1, portfolio_moto_pix___bancos [INFERRED 0.85]
- **Receive Money Screens** — portfolio_moto_receber, portfolio_moto_receber_1, portfolio_moto_receber_2, portfolio_moto_receber_3 [INFERRED 0.85]

## Communities (39 total, 17 thin omitted)

### Community 0 - "App Core + Supabase"
Cohesion: 0.08
Nodes (16): getCurrentUser(), getSupabase(), isSupabaseConfigured(), onAuthStateChange(), signIn(), signOut(), signUp(), InstagramPost (+8 more)

### Community 1 - "Moto App Portfolio Screens"
Cohesion: 0.06
Nodes (52): Adicionar Dinheiro (Add Money), Alterar Foto do Perfil (Change Profile Photo), Alterar Senha (Change Password), Moto (Modal) Fintech Mobile App, Authentication Flow (Login, Biometric, One-Time Code, Password), Boleto (Payment Slip - Main), Boleto (Payment Slip - Step 1), Boleto (Payment Slip - Step 2) (+44 more)

### Community 2 - "AI Gateway + Providers"
Cohesion: 0.10
Nodes (25): AI_PROVIDERS, getActiveProvider(), getOpenRouterApiKey(), getOpenRouterEndpoint(), isOpenRouterConfigured(), OPENROUTER_MODELS, PROVIDER_INFO, setActiveProvider() (+17 more)

### Community 3 - "Brand DNA Extraction"
Cohesion: 0.11
Nodes (4): BrandDna, AIGateway, WebScraperService, ExtractBrandDnaUseCase

### Community 4 - "Moto Fintech Mobile UI"
Cohesion: 0.09
Nodes (31): Account Management, Activity Log / Suas Atividades, Moto Fintech App, Information Validation Flow, Motorcycle Maintenance Tracking, Manutenção (Maintenance Screen), Minha Conta (My Account Screen), Moto (Motorcycle Main Screen) (+23 more)

### Community 5 - "SEO Papers + Swift Curriculum"
Cohesion: 0.09
Nodes (28): Plano de Otimizações SEO – ASPEC, SEO Quick Wins - Melhorias Imediatas para o Site da ASPEC, ASPEC, Brutalist Design System, Concorrência e Persistência Modernas, Master Swift Curriculum (40 módulos, 900h+), DevOps, CI/CD e App Store Connect, Enrollment Form Handler (FormSubmit.co) (+20 more)

### Community 6 - "Package Dependencies"
Cohesion: 0.08
Nodes (25): author, bugs, url, dependencies, lucide, description, devDependencies, autoprefixer (+17 more)

### Community 7 - "Post Controller UI"
Cohesion: 0.23
Nodes (3): PostController, copyToClipboard(), sanitizeHtml()

### Community 8 - "Design System + Deploy"
Cohesion: 0.12
Nodes (17): GitHub Pages Build and Deploy Workflow, ASPEC Design System, Brutalist Component Showcase, Chat Simulator Component, ASPEC Color Palette, Marquee Banner Component, Technical Brutalism, ASPEC Typography System (+9 more)

### Community 12 - "BV Client Portfolio"
Cohesion: 0.25
Nodes (8): BV Logo Grayscale, BV Logo Color, BV Client, BV Project Screenshot 1, BV Project Screenshot 2, BV Project Screenshot 3, BV Project Screenshot 4, BV Project Screenshot 5

### Community 13 - "SL Mandic Client Portfolio"
Cohesion: 0.29
Nodes (7): SL Mandic Logo Grayscale, SL Mandic Logo Color, SL Mandic Client, SL Mandic Project Image 1, SL Mandic Project Image 2, SL Mandic Project Image 3, SL Mandic Project Image 4

### Community 15 - "Itau Client Chat UI"
Cohesion: 0.40
Nodes (5): Itau Logo Grayscale, Itau Logo Color, Itau Client, Inteligencia Itau Chat Banking Concept, Itau Chat UI Mockup

### Community 17 - "Appmax Client Logo"
Cohesion: 0.67
Nodes (3): Appmax Logo Grayscale, Appmax Logo Color, Appmax Client

### Community 18 - "Easy Client Logo"
Cohesion: 0.67
Nodes (3): Easy Logo Grayscale, Easy Logo Color, Easy Client

### Community 19 - "EstrelaBet Client Logo"
Cohesion: 0.67
Nodes (3): EstrelaBet Logo Grayscale, EstrelaBet Logo Color, EstrelaBet Client

### Community 20 - "Kovi Client Logo"
Cohesion: 0.67
Nodes (3): Kovi Logo Grayscale, Kovi Logo Color, Kovi Client

### Community 24 - "Moto PIX Screen"
Cohesion: 0.67
Nodes (3): App Moto Digital Bank for Delivery Drivers, App Moto PIX Navigation Screen, PIX Navigation Flow

### Community 25 - "Gabriel Team Photo"
Cohesion: 0.67
Nodes (3): Gabriel Team Member, Gabriel Team Photo, Gabriel Team Photo JPG

### Community 26 - "Weliton Team Photo"
Cohesion: 0.67
Nodes (3): Weliton Team Member, Weliton Team Photo, Weliton Team Photo JPG

## Ambiguous Edges - Review These
- `Frame 63 (UI Component)` → `Home (Home Screen)`  [AMBIGUOUS]
  portfolio/moto/Frame 63.png · relation: conceptually_related_to
- `Group 102 (UI Component)` → `Home (Home Screen)`  [AMBIGUOUS]
  portfolio/moto/Group 102.png · relation: conceptually_related_to
- `Group 43 (UI Component)` → `Home (Home Screen)`  [AMBIGUOUS]
  portfolio/moto/Group 43.png · relation: conceptually_related_to

## Knowledge Gaps
- **109 isolated node(s):** `$schema`, `plugin`, `@opencode-ai/plugin`, `DEFAULT_GENERATION_CONFIG`, `name` (+104 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Frame 63 (UI Component)` and `Home (Home Screen)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Group 102 (UI Component)` and `Home (Home Screen)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Group 43 (UI Component)` and `Home (Home Screen)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `PostController` connect `Post Controller UI` to `App Core + Supabase`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `DnaController` connect `DNA Controller Extraction` to `App Core + Supabase`, `AI Gateway + Providers`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Moto (Modal) Fintech Mobile App` (e.g. with `Authentication Flow (Login, Biometric, One-Time Code, Password)` and `Detalhes do Curso (Course Details)`) actually correct?**
  _`Moto (Modal) Fintech Mobile App` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `$schema`, `plugin`, `@opencode-ai/plugin` to the rest of the system?**
  _114 weakly-connected nodes found - possible documentation gaps or missing edges._