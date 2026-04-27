# ANÁLISE COMPLETA - SLMandic App
## Todas as Funcionalidades, Arquitetura e Problemas Resolvidos

**Data da Análise:** 28 de Março de 2026  
**Versão do App:** 3.0.17+4393  
**Flutter SDK:** ^3.9.0  
**Status:** Produção

---

## SUMÁRIO EXECUTIVO

O **SLMandic** é um aplicativo acadêmico/campus life desenvolvido em Flutter para a Universidade SL Mandic. É uma aplicação completa com **46 features**, **82 rotas**, **80+ entities**, **76+ use cases**, **60+ serviços core** e mais de **400 arquivos Dart**. Segue **Clean Architecture** com padrão **feature-based structure** e usa **GetX** para gerenciamento de estado.

---

## 📊 ESTATÍSTICAS DO PROJETO

| Métrica | Quantidade |
|---------|-----------|
| Features | 46 |
| Rotas | 82 |
| Entities/Models | 80+ |
| Use Cases | 76+ |
| Serviços Core | 60+ |
| Controllers | 50+ |
| Page Views | 60+ |
| Dependências | 50+ |
| Arquivos Dart | 400+ |

---

## 🎯 FUNCIONALIDADES PRINCIPAIS POR CATEGORIA

### 1. AUTENTICAÇÃO E ONBOARDING

#### **Feature: Login**
- **Localização:** `/lib/features/login/`
- **Problema Resolvido:** Autenticação segura com múltiplas estratégias (Firebase, AWS Cognito, Azure AD/Office 365)
- **Funcionalidades:**
  - Login com email/senha
  - Recuperação de senha
  - Autenticação multi-factor
  - Suporte a Office 365 (Azure AD)
  - JWT token management
  - Armazenamento seguro de tokens
- **APIs Integradas:**
  - Firebase Authentication
  - AWS Cognito
  - Azure AD (Office 365)
- **Rotas:** `/loading`, `/login`, `/recovery`

#### **Feature: Onboarding**
- **Localização:** `/lib/features/onboarding/`
- **Problema Resolvido:** Guiar novos usuários através da experiência inicial
- **Funcionalidades:**
  - Apresentação do app em slides
  - Educação sobre funcionalidades
  - Pré-configuração de preferências
- **Rotas:** `/onboarding`

#### **Feature: Permission Request**
- **Localização:** `/lib/features/onboarding_permission/`
- **Problema Resolvido:** Solicitar permissões necessárias no momento apropriado
- **Funcionalidades:**
  - Requisição de câmera
  - Requisição de galeria/foto
  - Requisição de notificações
  - Requisição de biometria
  - Requisição de calendário
- **Rotas:** `/onboarding-permission`

---

### 2. ACADÉMICO (Notas, Faltas, Calendário)

#### **Feature: Grades and Absences**
- **Localização:** `/lib/features/grades_and_absences/`
- **Problema Resolvido:** Permitir que estudantes acompanhem seu desempenho acadêmico em tempo real
- **Funcionalidades:**
  - Consulta de notas por disciplina
  - Visualização de faltas registradas
  - Cálculo automático de média
  - Histórico detalhado de avaliações
  - Filtro por período letivo
  - Detalhes de notas por avaliação
- **Dados Relacionados:**
  - `GradesAndAbsencesModel`
  - `ScoreModel` (notas)
  - `ExtraScoreModel` (notas extras)
  - `AbsencesModel` (faltas)
  - `UserCourseModel` (disciplinas)
- **Rotas:** `/grades-and-absences`, `/grades-and-absences-details`

#### **Feature: Calendar Sync**
- **Localização:** `/lib/features/sync_calendar/`
- **Problema Resolvido:** Sincronizar calendário acadêmico com calendário pessoal do estudante
- **Funcionalidades:**
  - Sincronização com Google Calendar
  - Importação de aulas
  - Importação de eventos
  - Configuração de notificações
  - Atribuição pessoal de calendário
- **Integrações:** Google Calendar API
- **Rotas:** `/sync-calendar`, `/assign-calendar`, `/configure-calendar`

#### **Feature: Classes and Events**
- **Localização:** `/lib/features/classes_and_events/`
- **Problema Resolvido:** Visualizar todas as aulas e eventos acadêmicos
- **Funcionalidades:**
  - Visualização em grid do calendário
  - Detalhes de aulas (horário, sala, professor)
  - Eventos especiais
  - Filtro por período
- **Rotas:** `/classes-and-events`

---

### 3. FINANCEIRO

#### **Feature: Financial**
- **Localização:** `/lib/features/financial/`
- **Problema Resolvido:** Gerenciar boletos, pagamentos e informações financeiras
- **Funcionalidades:**
  - Consulta de boletos pendentes
  - Visualização de código de barras
  - Cópia fácil de código de barras
  - Filtro por período (data vencimento, data emissão)
  - Status de pagamento
  - Histórico de pagamentos
  - Valor original e valor pago
- **Dados Relacionados:**
  - `BanksSlipModel`
  - `BanksSlipFilterModel`
  - `PaymentInformationModel`
- **Rotas:** `/financial`, `/payment-bill-barcode`, `/payment-information`

#### **Feature: Requirements (Requisições de Documentos)**
- **Localização:** `/lib/features/requirements/`
- **Problema Resolvido:** Permitir que estudantes solicitem documentos (histórico, comprovante, etc) sem ir à secretaria
- **Funcionalidades:**
  - Diferentes tipos de requisição (histórico, diploma, comprovante)
  - Histórico de requisições
  - Status do andamento
  - Estimativa de prazo
  - Interface por abas (tipos/histórico)
- **Dados Relacionados:**
  - `RequirementTypeModel`
  - `StudentRequirementModel`
- **Rotas:** `/requirement`, `/requirements-type`

#### **Feature: Requirements Shipping**
- **Localização:** `/lib/features/requirements_shipping/`
- **Problema Resolvido:** Rastrear envio de documentos solicitados
- **Funcionalidades:**
  - Rastreamento de envio
  - Detalhes de endereço
  - Data de envio
  - Status de entrega
  - Número de rastreamento
- **Dados Relacionados:**
  - `RequirementShippingModel`
  - `StepStatusModel`
- **Rotas:** `/requirements-shipping`, `/requirements-shipping-details`

---

### 4. SUPORTE E MANUTENÇÃO

#### **Feature: Request Maintenance**
- **Localização:** `/lib/features/request_maintenance/`
- **Problema Resolvido:** Permitir que alunos solicitem manutenção de infraestrutura (ar condicionado, iluminação, limpeza, etc)
- **Funcionalidades:**
  - Abertura de chamado de manutenção
  - Descrição detalhada do problema
  - Foto do problema (múltiplas fotos)
  - Localização no campus
  - Histórico de chamados
  - Status do chamado
- **Dados Relacionados:**
  - `MaintenanceInputModel`
- **Rotas:** `/request-maintenance`, `/request-maintenance-form`

#### **Feature: Request Maintenance Image/Photo Capture**
- **Localização:** `/lib/features/request_maintenance_take_picture/`
- **Problema Resolvido:** Capturar fotos do problema para melhor documentação
- **Funcionalidades:**
  - Captura em tempo real via câmera
  - Pré-visualização de foto
  - Edição básica (crop)
  - Múltiplas fotos
  - Suporte a galeria
- **Rotas:** `/take-photo`, `/crop-photo`

#### **Feature: Report Problem**
- **Localização:** `/lib/features/report_problem/`
- **Problema Resolvido:** Reportar problemas gerais com o app ou infraestrutura
- **Funcionalidades:**
  - Descrição do problema
  - Categoria de problema
  - Anexo de fotos
  - Envio de logs
  - Suporte offline (envia quando conectar)
- **Rotas:** `/report-problem`

---

### 5. CHAT E SUPORTE

#### **Feature: Chat**
- **Localização:** `/lib/features/chat/`
- **Problema Resolvido:** Comunicação em tempo real com suporte técnico
- **Funcionalidades:**
  - Chat em tempo real com suporte
  - Histórico de mensagens persistente
  - Anexo de arquivos/fotos
  - Notificações de mensagens
  - Status online/offline do suporte
  - Múltiplos canais de chat
- **Dados Relacionados:**
  - `ChatChannelModel`
  - `ChatMessageModel`
  - `MessagePreviewModel`
- **Integrações:** Firebase Realtime Database
- **Rotas:** `/chat`, `/contacts-list`, `/chat-messages`

#### **Feature: Zendesk Help Center**
- **Localização:** `/lib/features/zendesk_help_center/`
- **Problema Resolvido:** Acesso à base de conhecimento de suporte
- **Funcionalidades:**
  - Base de conhecimento Zendesk
  - Artigos de ajuda
  - Cursos educativos
  - Manuais
  - Contatos úteis
  - FAQs
  - Pesquisa dentro da base
- **Integrações:** Zendesk Messaging SDK
- **Rotas:** `/zendesk-help-center`, `/help`, `/help-courses`

---

### 6. NOTIFICAÇÕES

#### **Feature: Notifications**
- **Localização:** `/lib/features/notifications/`
- **Problema Resolvido:** Manter estudantes informados sobre eventos importantes (notas, requisições, mensagens, etc)
- **Funcionalidades:**
  - Centro de notificações
  - Notificações push
  - Notificações locais
  - Deep linking (abrir app em tela específica)
  - Histórico de notificações
  - Marcar como lido/não lido
  - Filtro e busca
  - Gerenciamento de preferências
  - 3 estados: App aberto, Background, Fechado
- **Dados Relacionados:**
  - `CustomNotification`
  - `StatusNotificationModel`
- **Integrações:** 
  - Firebase Messaging
  - Flutter Local Notifications
- **Rotas:** `/notifications`, `/notification-detail`, `/manage-notifications`

**Deep Linking Example:**
```json
{
  "data": {
    "action": "{\"OPEN\":{\"routeName\":\"/profile\"}}"
  }
}
```

---

### 7. PERFIL E CARTÃO DIGITAL

#### **Feature: Profile**
- **Localização:** `/lib/features/profile/`
- **Problema Resolvido:** Centralizar dados pessoais e acadêmicos do estudante
- **Funcionalidades:**
  - Foto de perfil (com captura/edição)
  - Dados pessoais
  - Informações acadêmicas
  - Contatos
  - Endereço
  - Histórico acadêmico
  - Edição de informações básicas
- **Rotas:** `/profile`, `/edit-photo`, `/take-photo`

#### **Feature: Physical Card (Cartão Digital)**
- **Localização:** `/lib/features/physical_card/`
- **Problema Resolvido:** Disponibilizar cartão digital de identificação
- **Funcionalidades:**
  - Cartão digital com foto
  - QR code para identificação
  - Dados acadêmicos
  - Validade do cartão
  - Download/impressão
  - Compartilhamento
  - Código de barras para biblioteca
- **Dados Relacionados:**
  - `PhysicalCardModel`
  - `DigitalCardModel`
- **Rotas:** `/digital-card`, `/qr-code`

---

### 8. CONFIGURAÇÕES

#### **Feature: Configurations**
- **Localização:** `/lib/features/configurations/`
- **Problema Resolvido:** Permitir customização da experiência do usuário
- **Funcionalidades:**
  - Alterar tema (claro/escuro/automático)
  - Mudar idioma (PT/EN/ES)
  - Informações do app (versão, build)
  - Termos de uso
  - Política de privacidade
  - Sobre o app
  - Logout
- **Rotas:** `/configurations`, `/change-theme`, `/change-language`, `/configuration-about-app`

---

### 9. MAPA E CAMPUS

#### **Feature: Campus Map**
- **Localização:** `/lib/features/campus_map/`
- **Problema Resolvido:** Ajudar estudantes a navegar pelo campus
- **Funcionalidades:**
  - Mapa interativo do campus
  - Marcadores de lugares
  - Zoom e pan
  - Tour virtual 360°
  - Informações de locais (endereço, horário)
  - Contatos de lugares
- **Dados Relacionados:**
  - `MapPlaceModel`
  - `MapVirtualTourModel`
- **Rotas:** `/campus-map`, `/places-list`, `/find-places`, `/virtual-tour`

#### **Feature: Find Places**
- **Localização:** `/lib/features/find_places/`
- **Problema Resolvido:** Buscar lugares específicos no campus
- **Funcionalidades:**
  - Busca de lugares
  - Filtro por tipo
  - Detalhes de localização
  - Horários de funcionamento
  - Contatos
- **Rotas:** `/find-places`

---

### 10. OFFICE 365 / AZURE AD

#### **Feature: Office 365 Onboarding**
- **Localização:** `/lib/features/request_office_365_*/`
- **Problema Resolvido:** Facilitar setup de acesso corporativo ao Office 365
- **Funcionalidades:**
  - Autenticação via Azure AD
  - Aceitação de termos
  - Seleção de email corporativo
  - Ativação de acesso
  - Confirmação de sucesso
- **Dados Relacionados:**
  - `Office365TermModel`
  - `Office365AccessStatusModel`
- **Integrações:** Azure AD (AAD OAuth)
- **Rotas:** `/request-office-365-onboarding`, `/request-office-365-terms`, `/request-office-365-select-email`, `/request-office-365-success`

---

### 11. CONTEÚDO E UTILITÁRIOS

#### **Feature: Home (Dashboard)**
- **Localização:** `/lib/features/home/`, `/lib/features/dashboard/`
- **Problema Resolvido:** Apresentar visão geral do status acadêmico
- **Funcionalidades:**
  - Resumo de notas recentes
  - Próximas provas/eventos
  - Boletos vencidos
  - Requisições pendentes
  - Atalhos rápidos
  - Banners promocionais
  - Bottom navigation
  - Sincronização de token de notificações
  - Verificação de versão mínima
- **Rotas:** `/home`, `/homeCalendar`, `/homeNotification`, `/homeMenu`

#### **Feature: Files**
- **Localização:** `/lib/features/files/`
- **Problema Resolvido:** Gerenciar arquivos do portal acadêmico
- **Funcionalidades:**
  - Listagem de arquivos
  - Download de arquivos
  - Visualização de arquivos
  - Compartilhamento
- **Dados Relacionados:**
  - `PortalFileModel`
- **Rotas:** `/files`

#### **Feature: Academic Support (NAP)**
- **Localização:** `/lib/features/academic_support/`, `/lib/features/nap/`
- **Problema Resolvido:** Acesso a recursos de apoio pedagógico
- **Funcionalidades:**
  - Informações de suporte acadêmico
  - Agendamento de orientações
  - Recursos educacionais
- **Rotas:** `/academic-support`, `/nap`

#### **Feature: Satisfaction Survey**
- **Localização:** `/lib/features/satisfaction_survey/`
- **Problema Resolvido:** Coletar feedback sobre satisfação dos alunos
- **Funcionalidades:**
  - Pesquisa de satisfação
  - Respostas com escala
  - Comentários abertos
  - Histórico de pesquisas
- **Rotas:** `/satisfaction-survey`, `/answer-satisfaction-survey`

---

## 🏗️ ARQUITETURA

### Clean Architecture
```
Feature
├── domain/
│   ├── entities/        → Objetos de negócio puros
│   ├── repositories/    → Contratos/interfaces abstratas
│   └── usecases/        → Lógica de negócio encapsulada
├── data/
│   ├── datasources/     → Implementações (Firebase, HTTP)
│   ├── models/          → DTOs que estendem entities
│   └── repositories/    → Implementações de contratos
└── presenter/
    ├── binding.dart     → Injeção de dependências (GetX)
    ├── controller.dart  → GetxController (estado/lógica)
    ├── page.dart        → UI (Widget principal)
    └── widgets/         → Componentes específicos
```

### Padrões de Design Utilizados
- **Repository Pattern** - Abstração de dados
- **Factory Pattern** - Criação de objetos
- **Strategy Pattern** - Error handling strategies
- **Observer Pattern** - Rx/Observable (GetX)
- **Singleton Pattern** - Controllers globais
- **Builder Pattern** - Construção de widgets
- **Dependency Injection** - Via GetX Bindings

### GetX Pattern
```dart
// Binding (DI)
class GradesBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut(() => GradesController());
  }
}

// Controller (Estado)
class GradesController extends GetxController {
  var grades = <Grade>[].obs;
  void loadGrades() => grades.value = [];
}

// View (UI)
class GradesPage extends GetWidget<GradesController> {
  @override
  Widget build(BuildContext context) {
    return Obx(() => ListView(
      children: controller.grades,
    ));
  }
}
```

---

## 📁 ESTRUTURA DE PASTAS

```
lib/
├── main.dart                    # Entry point Produção
├── main_qa.dart                 # Entry point QA
├── app.dart                     # App widget principal
│
├── core/                        # Funcionalidades compartilhadas
│   ├── routes/                  # Definição de 82 rotas
│   ├── services/                # 60+ serviços core
│   │   ├── notification/
│   │   ├── local/
│   │   ├── permission_service.dart
│   │   ├── firebase_*_service.dart
│   │   └── ... (muitos mais)
│   ├── bindings/                # Injeção de dependências
│   ├── design/                  # Cores, temas, tipografia
│   ├── user/                    # Controlador de usuário global
│   ├── widgets/                 # Componentes reutilizáveis
│   ├── translation/             # i18n (3 idiomas)
│   ├── security/                # JWT, tokens
│   ├── extensions/              # Extensões
│   └── ... (10+ pastas mais)
│
├── domain/                      # Entities e usecases globais
│   ├── entities/                # 80+ entities
│   └── usecases/                # 76+ usecases
│
├── features/                    # 46 features independentes
│   ├── login/
│   ├── grades_and_absences/
│   ├── financial/
│   ├── chat/
│   ├── notifications/
│   ├── profile/
│   ├── campus_map/
│   └── ... (40 features mais)
│
├── infra/                       # Implementações de baixo nível
│   ├── http/                    # HTTP adapter, strategies
│   ├── security/                # JWT, token management
│   ├── repositories/            # Implementações Firebase/HTTP
│   └── services/
│
├── presentation/                # Páginas e componentes globais
│   ├── app_config/
│   ├── pages/
│   └── components/
│
└── ui/                          # Design system compartilhado
    ├── components/
    ├── design/
    ├── fonts/
    └── pages/
```

---

## 🔐 SEGURANÇA

### Implementações de Segurança
- **JWT Token Management** - Gerenciamento seguro de tokens
- **Secure Token Storage** - Armazenamento criptografado
- **Biometric Authentication** - Autenticação por impressão digital/face
- **Screenshot Protection** - Proteção contra capturas de tela
- **HTTP Certificate Pinning** - Validação de certificados SSL
- **Crashlytics** - Monitoramento de erros em produção

### Permissões Gerenciadas
- **Camera** - Para fotos e scans
- **Photo Library** - Para selecionar fotos
- **Storage** - Para salvar arquivos
- **Notifications** - Para push notifications
- **Biometric** - Para autenticação biométrica
- **Calendar** - Para sincronizar calendário
- **Phone State** - Para verificar estado do telefone

---

## 🔔 SISTEMA DE NOTIFICAÇÕES

### Ciclo de Vida
1. **App Initialization** - Setup Firebase Messaging
2. **Token Generation** - Gera FCM token e salva em Firestore
3. **Notification Received** - Handler baseado em estado do app
   - App Open → Local Notification
   - Background → System Notification
   - Closed → System Notification
4. **Notification Opened** - Deep link para rota específica

### Funcionalidades
- Push notifications via Firebase
- Notificações locais
- Deep linking com parâmetros
- Gerenciamento de preferências
- Centro de notificações

---

## 🌐 INTERNACIONALIZAÇÃO

### Suporte a Idiomas
- **Portuguese Brazilian** (pt_BR) - Padrão
- **English** (en_US)
- **Spanish** (es_ES)

### Implementação
```dart
// Uso em widgets
Text(R.getString('hello'))  // Usa locale atual
```

### Componentes
- `ChangeLanguageController` - Gerencia idioma
- `Get.locale` - Controla locale
- `timeago` - Formatação de tempo relativo
- `intl` - Internacionalização

---

## 🎨 TEMAS E DESIGN

### Temas Suportados
- **Light Theme** - Tema claro
- **Dark Theme** - Tema escuro
- **System Theme** - Seguir preferência do sistema

### Fontes Customizadas
- **DMSans** - Fonte principal
- **MandicMap** - Ícones de mapa
- **MandicCardMenu** - Ícones de menu
- **MandicRequests** - Ícones de requisições
- **IconsCampusLife** - Ícones gerais
- **IconsMenuCampusLife** - Ícones de menu
- **IconsMapsCampusLife** - Ícones de mapas

### Cores
- Sistema definido em `MDColors`
- Estados de cores por hora do dia (morning, afternoon, evening, night)
- Design system incluído via custom package

---

## 🔄 SINCRONIZAÇÃO OFFLINE

### Funcionalidade Offline
```
1. Usuário sem conexão
   └─ Dados salvos localmente em GetStorage
2. Conexão restaurada
   └─ OfflineDataGlobalService acionado
3. Envio de dados pendentes
   ├─ Upload de imagens
   ├─ Envio de formulários
   └─ Limpeza de cache local
```

### Armazenamento Local
- **GetStorage** - Key-value storage (substituiu SharedPreferences)
- **File Storage** - Imagens e arquivos
- **Sincronização automática** ao retornar conexão

---

## 📡 INTEGRAÇÕES EXTERNAS

### Firebase Services
- **Firebase Core** - Base do Firebase
- **Firebase Auth** - Autenticação
- **Cloud Firestore** - Banco de dados em tempo real
- **Firebase Messaging** - Push notifications
- **Firebase Storage** - Armazenamento de arquivos
- **Firebase Crashlytics** - Relatório de crashes
- **Firebase Analytics** - Analytics
- **Firebase Remote Config** - Configurações remotas
- **Cloud Functions** - Funções serverless

### APIs Externas
- **AWS Cognito** - Autenticação alternativa
- **Azure AD (AAD OAuth)** - Office 365 / Corporativo
- **Google Calendar** - Sincronização de calendário
- **Zendesk** - Chat e suporte

### HTTP
- **Dio** (^5.7.0) - HTTP client com interceptadores
- **Pretty Dio Logger** - Debug HTTP
- **URL Launcher** - Abrir URLs

---

## 🛠️ SERVIÇOS CORE (60+)

### Autenticação
- `firebase_authentication_service.dart`
- `authenticate_by_user_service_http_adapter.dart`
- `local_authentication_service.dart`
- `biometry_service.dart`

### Segurança
- `jwt_adapter.dart`
- `token_manage_service.dart`
- `token_storage_service.dart`
- `secure_app_service.dart`

### Notificações
- `firebase_notification_service.dart`
- `notification_handler_service.dart`
- `flutter_local_notification_service.dart`

### Armazenamento
- `local_storage_service.dart`
- `file_storage_local_service.dart`
- `offline_data_global_service.dart`

### Configuração
- `firebase_remote_config_service.dart`
- `feature_flag_service.dart`
- `app_settings_service.dart`

### Sistema
- `permission_service.dart`
- `device_info_plugin_service.dart`
- `internet_connectivity_service.dart`
- `path_provider_service.dart`

### UI/Utilitários
- `alert_service.dart`
- `camera_service.dart`
- `widget_to_image_service.dart`
- `open_file_service.dart`
- `url_launcher_service.dart`
- `zendesk_service.dart`
- `deep_link_service.dart`
- `digital_card_service.dart`
- `firebase_crashlytics_service.dart`
- `firebase_logs_service.dart`
- `download_service.dart`

---

## 🔄 FLUXO DE AUTENTICAÇÃO

```
1. App.init()
   ├─ Initialize Widgets Binding
   ├─ Initialize Firebase
   ├─ Initialize GeneralBinding
   ├─ Initialize GetStorage
   └─ Initialize Deep Links

2. MainApp.init()
   ├─ Load Language
   ├─ Setup Remote Config
   └─ Setup Notifications

3. App Build
   ├─ Show Splash Screen
   ├─ Initialize Routes
   └─ Start LoginController

4. LoginController.handleUser()
   ├─ Check Firebase Auth
   ├─ If logged in → Go to Home
   ├─ If first time → Show Onboarding
   ├─ If permissions pending → Request Permissions
   └─ If not logged → Stay on Login

5. Home
   ├─ Initialize Dashboard
   ├─ Setup Notifications Listener
   ├─ Sync User Data
   └─ Show Navigation Menu
```

---

## ⚙️ GERENCIAMENTO DE ESTADO

### Controllers Principais
- **UserController** - Dados globais do usuário (Firebase listener)
- **LoginController** - Estado de login e autenticação
- **HomeController** - Estado da página home
- **ChangeThemeController** - Tema atual
- **ChangeLanguageController** - Idioma atual
- **NotificationsController** - Lista de notificações
- **[Feature]Controller** - Estado específico de cada feature

### Programação Reativa
```dart
// Variáveis reativas
var count = 0.obs;
final Rx<User> user = User.empty().obs;

// Listeners
user.listen((newUser) {
  print('Usuário atualizado: $newUser');
});

// Rebuilds automáticos
Obx(() => Text('${controller.count}'))
```

---

## 🚀 BUILD E DEPLOYMENT

### Flavors
- **QA** - Versão de teste
  - URL: `https://api-app.hml.slmandic.edu.br`
  - Emulação Firebase: Ativa
  - Debug: Ativo
- **PROD** - Versão de produção
  - URL: `https://api-prod...`
  - Emulação Firebase: Desativa
  - Release Build

### Comandos de Build
```bash
# QA
flutter run -t lib/main_qa.dart

# Prod
flutter run -t lib/main.dart

# Build APK
flutter build apk -t lib/main.dart

# Build iOS
flutter build ios -t lib/main.dart
```

### Versão Atual
- **App Version:** 3.0.17
- **Build Number:** 4393

---

## 🧪 TESTES

### Dependências de Teste
- `mocktail` (^1.0.4) - Mocking
- `test` (^1.16.8) - Testing
- `faker` (^2.1.0) - Fake data
- `grouped_list` (^6.0.0) - Test utilities

### Estrutura de Teste
```
test/
└─ [feature_name]/
   ├── presentation/
   │  └── [feature]_controller_test.dart
   ├── domain/
   │  └── usecases/
   │     └── [usecase]_test.dart
   └── data/
      └── repositories/
         └── [repository]_test.dart
```

---

## ⚡ PERFORMANCE E OTIMIZAÇÕES

### Otimizações Implementadas
- **Lazy Loading** - Controllers carregados sob demanda
- **Image Caching** - `cached_network_image`
- **Skeleton Loading** - Shimmer/Skeletonizer enquanto carrega
- **Offline Support** - Sincronização automática
- **Feature Flags** - Controle remoto de features
- **Analytics** - Monitoramento de uso

### Boas Práticas
```dart
// Lazy load controller
Get.lazyPut(() => ExpensiveController());

// Cache images
CachedNetworkImage(
  imageUrl: url,
  cacheManager: cacheManager,
);

// Skeleton while loading
Skeletonizer(
  enabled: isLoading,
  child: MyWidget(),
);
```

---

## 📦 DEPENDÊNCIAS PRINCIPAIS

### State Management
- `Get` (^4.6.6) - GetX para estado e navegação
- `GetStorage` (^2.1.1) - Armazenamento local
- `Provider` - State management alternativo

### Firebase (9 serviços)
- `firebase_core` (^3.12.1)
- `firebase_auth` (^5.3.2)
- `cloud_firestore` (^5.6.5)
- `firebase_messaging` (^15.1.4)
- `firebase_storage` (^12.4.4)
- `firebase_crashlytics` (^4.1.4)
- `firebase_analytics` (^11.1.0)
- `firebase_remote_config` (^5.1.4)

### HTTP & Networking
- `Dio` (^5.7.0)
- `HTTP` (^1.2.2)
- `pretty_dio_logger` (^1.1.1)

### Autenticação
- `aad_oauth` (^1.0.0)
- `jwt_decoder` (^2.0.1)
- `local_auth` (^2.1.6)

### UI & Design
- `flutter_svg` - SVG
- `lottie` - Animações
- `shimmer` (^3.0.0) - Skeleton loading
- `skeletonizer` (^2.1.0+1)
- `flutter_animate` (^4.5.2)
- `carousel_slider` (^5.0.0)
- `expandable` (^5.0.1)

### Câmera & Galeria
- `camera` (^0.11.0+2)
- `image_picker` (^1.0.8)
- `mobile_scanner` (^7.0.1)

### Utilidades
- `uuid` (^4.1.0)
- `brasil_fields` (^1.9.1)
- `dartz` (^0.10.1) - Functional programming
- `intl` (^0.18.1) - i18n
- `timeago` (^3.1.0)

### Permissões & Dispositivo
- `permission_handler` (^12.0.1)
- `device_info_plus` (^11.1.1)
- `connectivity_plus` (^6.1.2)

### Segurança
- `no_screenshot` (^0.3.1)
- `screenshot_callback` (^3.0.1)

### Custom Packages (Git)
- `design_system` - Design system customizado
- `business` - Lógica de negócio compartilhada
- `awesome_calendar` - Calendário customizado

---

## 🛑 TRATAMENTO DE ERROS

### Estratégias de Erro
- `GenericErrorHandlerStrategy` - Erros genéricos
- `AuthenticationServiceErrorHandlerStrategy` - Autenticação
- `AzureAuthErrorHandlerStrategy` - Azure/Office 365
- `FirebaseAuthErrorHandlerStrategy` - Firebase

### DTOs de Erro
- `MedicErrorDataResponseDTO` - Erro customizado
- `AuthenticationErrorDataResponseDTO` - Erro de autenticação
- `FirebaseErrorResponseDTO` - Erro Firebase
- `AzureADErrorResponseDTO` - Erro Azure

### Padrão de Resposta (Either)
```dart
// Uso com Dartz
Future<Either<Failure, User>> getUser() {
  // Return Left(Failure) ou Right(User)
}
```

---

## 📊 PROBLEMAS RESOLVIDOS

| Problema | Solução | Feature |
|----------|---------|---------|
| Alunos não sabem suas notas em tempo real | Consulta online de notas e faltas | Grades & Absences |
| Dificuldade em acompanhar calendário acadêmico | Sincronização com Google Calendar | Calendar Sync |
| Alunos perdem prazos de boletos | Notificações de boletos vencidos | Financial |
| Dificuldade em emitir documentos | Requisição online de documentos | Requirements |
| Perda de tempo em comunicação suporte | Chat em tempo real + Base de conhecimento | Chat + Zendesk |
| Alunos não acompanham manutenções | Abertura online de chamados | Request Maintenance |
| Cartão físico facilmente perdido | Cartão digital com QR code | Physical Card |
| Dificuldade de navegação no campus | Mapa interativo + Tour virtual | Campus Map |
| Acesso tardio ao Office 365 | Onboarding automático Office 365 | Office 365 Integration |
| Dados inconsistentes offline | Sincronização automática de dados | Offline Support |
| Falta de feedback sobre satisfação | Pesquisas integradas | Satisfaction Survey |
| Comunicação com alunos difícil | Push notifications com deep linking | Notifications System |

---

## 📈 ESTATÍSTICAS POR TIPO

### Por Feature Type
- **Acadêmico:** 6 features (Grades, Calendar, Classes)
- **Financeiro:** 4 features (Financial, Requirements)
- **Suporte:** 7 features (Maintenance, Report Problem, Chat, Zendesk)
- **Notificações:** 4 features
- **Perfil:** 4 features (Profile, Card, Photo)
- **Campus:** 4 features (Map, Places, Tour)
- **Configurações:** 3 features
- **Office 365:** 4 features
- **Conteúdo:** 4 features (Home, Files, Support, Survey)
- **Autenticação:** 3 features (Login, Onboarding, Permissions)

### Por Tamanho
- **Large (3+ screens):** 20 features
- **Medium (2 screens):** 16 features
- **Small (1 screen):** 10 features

---

## 🔐 FLUXO DE SEGURANÇA

```
1. Autenticação
   ├─ Firebase/AWS/Azure AD
   └─ JWT Token gerado

2. Armazenamento de Token
   └─ Secure Storage (criptografado)

3. Requisições HTTP
   ├─ Token adicionado em header
   └─ Certificado SSL validado

4. Token Expirado
   ├─ Refresh automático
   └─ Novo token obtido

5. Logout
   ├─ Token removido
   ├─ Cache local limpo
   └─ App volta ao login
```

---

## 📱 COMPATIBILIDADE

### Plataformas
- **iOS:** 14.2+
- **Android:** API 21+

### Requisitos
- **Flutter SDK:** ^3.9.0
- **Dart:** Compatível com Flutter SDK

### Dispositivos Suportados
- Smartphones iOS e Android
- Tablets (com responsive design)

---

## 🎯 CONCLUSÃO

O **SLMandic** é uma solução acadêmica completa que resolve diversos problemas enfrentados por universidades e estudantes:

1. **Problema:** Falta de acesso a informações acadêmicas em tempo real
   **Solução:** Consultas online de notas, faltas e calendário

2. **Problema:** Dificuldade em processos administrativos
   **Solução:** Requisição digital de documentos e acompanhamento

3. **Problema:** Comunicação inadequada entre instituição e alunos
   **Solução:** Chat, notificações push e base de conhecimento

4. **Problema:** Perda de cartão de identificação
   **Solução:** Cartão digital com QR code

5. **Problema:** Dificuldade de navegação no campus
   **Solução:** Mapa interativo e tour virtual

6. **Problema:** Sincronização de horários
   **Solução:** Sincronização automática com Google Calendar

7. **Problema:** Acesso a recursos corporativos
   **Solução:** Integração com Office 365/Azure AD

8. **Problema:** Indisponibilidade de dados offline
   **Solução:** Sincronização automática e suporte offline

A arquitetura em **Clean Architecture** com **feature-based structure** permite fácil manutenção, escalabilidade e adição de novas funcionalidades. O uso de **GetX** para estado e **Firebase** para backend garante performance e confiabilidade.

---

**Data da Análise:** 28 de Março de 2026  
**Versão Analisada:** 3.0.17+4393  
**Status:** Produção  
**Escopo:** Análise Completa
