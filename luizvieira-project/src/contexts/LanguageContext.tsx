import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en';

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  pt: {
    // Header
    nav_home: "Início",
    nav_about: "Sobre",
    nav_experiences: "Experiências",
    nav_catalog: "Catálogo",
    nav_blog: "Blog",
    nav_contact: "Contato",
    
    // Hero
    hero_badge: "Cigar Concierge",
    hero_title_1: "Charutos,",
    hero_title_2: "Cultura",
    hero_title_3: "e Tradição",
    hero_subtitle: "Experiências sofisticadas, produtos premium e consultoria especializada para quem aprecia as coisas refinadas da vida.",
    hero_btn_experiences: "Ver Experiências",
    hero_btn_catalog: "Catálogo Premium",
    hero_stat_tobacco: "Tabaco",
    hero_stat_tasting: "Degustação",
    hero_stat_consulting: "Consultoria",
    
    // About
    about_title: "Sobre Don Luiz",
    about_p1: "Meu nome é Luiz Vieira. Minha história com o charuto começou em 2018, não apenas como um hábito, mas como uma busca por algo mais profissional — ritual, presença e significado.",
    about_p2: "O que começou como apreciação, rapidamente se tornou vocação. Em 2020, passei a atuar profissionalmente, mergulhando na cultura do charuto com seriedade, disciplina e respeito pela tradição. Em 2023, dei mais um passo na minha formação ao ingressar no curso de International Cigar Sommelier pela IACS, ampliando minha visão técnica e sensorial sobre o universo dos charutos premium.",
    about_p3: "Ao longo dessa jornada, estive à frente da maior charutaria do Centro-Oeste do Brasil, onde refinei meu olhar para seleção, conservação e curadoria de produtos — sempre com foco na experiência, e não apenas no produto. Hoje, atuo como cigar concierge em eventos de alto nível, atendendo desde a FAB até embaixadas, empresários, políticos e influenciadores.",
    about_quote: "\"Mais do que servir charutos, conduzo experiências. Seja em um casamento, aniversário ou encontro corporativo, meu trabalho é transformar momentos comuns em rituais memoráveis — onde cada detalhe carrega intenção, elegância e identidade. Porque, no fim, um bom charuto nunca foi apenas sobre fumar. É sobre o tempo que se escolhe viver.\"",
    
    // Experiences
    exp_title: "Experiências Exclusivas",
    exp_subtitle: "Transforme seus eventos em momentos memoráveis com consultoria especializada",
    exp_btn_more: "Ver detalhes",
    exp_btn_less: "Fechar",
    exp_1_title: "Casamentos",
    exp_1_tag: "Elegância e Memórias.",
    exp_1_label1: "Experiência Exclusiva",
    exp_1_desc1: "Crie um momento sofisticado e exclusivo para seus convidados. Consultoria completa de seleção, apresentação e degustação.",
    exp_1_label2: "Personalização",
    exp_1_desc2: "✨ Charutos personalizados disponíveis com nomes dos noivos",
    exp_2_title: "Aniversários",
    exp_2_tag: "Celebrações Únicas.",
    exp_2_label1: "Celebre com elegância",
    exp_2_desc1: "Experiências personalizadas que refletem o gosto e a sofisticação do aniversariante.",
    exp_2_label2: "Personalização",
    exp_2_desc2: "✨ Charutos personalizados com o nome do aniversariante",
    exp_3_title: "Eventos Corporativos",
    exp_3_tag: "Networking Premium.",
    exp_3_label1: "Excelência e Detalhes",
    exp_3_desc1: "Impressione clientes e parceiros com uma experiência premium que comunica excelência e atenção aos detalhes.",
    exp_3_label2: "Personalização",
    exp_3_desc2: "✨ Charutos personalizados para sua empresa",
    exp_4_title: "Confrarias",
    exp_4_tag: "Cultura e Tradição.",
    exp_4_label1: "Grupos e Degustação",
    exp_4_desc1: "Para grupos que apreciam a qualidade. Experiências temáticas e educativas sobre a cultura do charuto.",
    
    // Catalog Section
    cat_badge: "Catálogo Premium",
    cat_desc: "Seleção cuidadosa de charutos premium, acessórios de luxo e experiências exclusivas para quem entende e valoriza a qualidade.",
    cat_btn: "Ver Catálogo Completo",
    
    // Blog
    blog_title: "Diário do Concierge",
    blog_subtitle: "Artigos, dicas de harmonização e novidades sobre o universo dos charutos premium.",
    blog_read: "Ler artigo",
    blog_read_time: "de leitura",
    blog_by: "Por",
    blog_prev: "Anterior",
    blog_next: "Próximo",
    blog_author_desc: "Cigar Concierge e Sommelier",
    
    // Footer
    footer_desc: "Consultoria especializada em charutos premium e experiências exclusivas.",
    footer_nav: "Navegação",
    footer_social: "Fique Atualizado",
    footer_social_desc: "Receba informações sobre novos produtos e experiências.",
    footer_dev_by: "Desenvolvido by",
    footer_agency: "Aspec Soluções em Tecnologia",
    
    // Catalog Page
    catalog_back: "Voltar para Início",
    catalog_title: "Catálogo Completo",
    catalog_origin: "Origem",
    catalog_buy_btn: "Comprar via WhatsApp",
    catalog_greeting: "Olá Luiz, gostaria de saber mais sobre",
  },
  en: {
    // Header
    nav_home: "Home",
    nav_about: "About",
    nav_experiences: "Experiences",
    nav_catalog: "Catalog",
    nav_blog: "Blog",
    nav_contact: "Contact",
    
    // Hero
    hero_badge: "Cigar Concierge",
    hero_title_1: "Cigars,",
    hero_title_2: "Culture",
    hero_title_3: "and Tradition",
    hero_subtitle: "Sophisticated experiences, premium products, and specialized consulting for those who appreciate the finer things in life.",
    hero_btn_experiences: "View Experiences",
    hero_btn_catalog: "Premium Catalog",
    hero_stat_tobacco: "Tobacco",
    hero_stat_tasting: "Tasting",
    hero_stat_consulting: "Consulting",
    
    // About
    about_title: "About Don Luiz",
    about_p1: "My name is Luiz Vieira. My history with cigars began in 2018, not just as a habit, but as a search for something more professional — ritual, presence, and meaning.",
    about_p2: "What began as an appreciation quickly became a calling. In 2020, I started working professionally, immersing myself in cigar culture with seriousness, discipline, and respect for tradition. In 2023, I took another step in my training by joining the International Cigar Sommelier course by IACS, expanding my technical and sensory vision of the premium cigar universe.",
    about_p3: "Throughout this journey, I have managed the largest cigar shop in the Center-West of Brazil, where I refined my eye for product selection, conservation, and curation — always focusing on the experience, not just the product. Today, I work as a cigar concierge at high-level events, serving everyone from the FAB to embassies, businessmen, politicians, and influencers.",
    about_quote: "\"More than serving cigars, I conduct experiences. Whether at a wedding, birthday, or corporate meeting, my job is to transform ordinary moments into memorable rituals — where every detail carries intention, elegance, and identity. Because, in the end, a good cigar has never been just about smoking. It's about the time you choose to live.\"",
    
    // Experiences
    exp_title: "Exclusive Experiences",
    exp_subtitle: "Transform your events into memorable moments with specialized consulting",
    exp_btn_more: "View details",
    exp_btn_less: "Close",
    exp_1_title: "Weddings",
    exp_1_tag: "Elegance and Memories.",
    exp_1_label1: "Exclusive Experience",
    exp_1_desc1: "Create a sophisticated and exclusive moment for your guests. Complete consulting on selection, presentation, and tasting.",
    exp_1_label2: "Customization",
    exp_1_desc2: "✨ Personalized cigars available with the couple's names",
    exp_2_title: "Birthdays",
    exp_2_tag: "Unique Celebrations.",
    exp_2_label1: "Celebrate with elegance",
    exp_2_desc1: "Personalized experiences that reflect the taste and sophistication of the birthday person.",
    exp_2_label2: "Customization",
    exp_2_desc2: "✨ Personalized cigars with the birthday person's name",
    exp_3_title: "Corporate Events",
    exp_3_tag: "Premium Networking.",
    exp_3_label1: "Excellence and Details",
    exp_3_desc1: "Impress clients and partners with a premium experience that communicates excellence and attention to detail.",
    exp_3_label2: "Customization",
    exp_3_desc2: "✨ Personalized cigars for your company",
    exp_4_title: "Cigar Clubs",
    exp_4_tag: "Culture and Tradition.",
    exp_4_label1: "Groups and Tasting",
    exp_4_desc1: "For groups that appreciate quality. Thematic and educational experiences about cigar culture.",
    
    // Catalog Section
    cat_badge: "Premium Catalog",
    cat_desc: "Careful selection of premium cigars, luxury accessories, and exclusive experiences for those who understand and value quality.",
    cat_btn: "View Full Catalog",
    
    // Blog
    blog_title: "Concierge's Diary",
    blog_subtitle: "Articles, pairing tips, and news about the premium cigar universe.",
    blog_read: "Read article",
    blog_read_time: "read",
    blog_by: "By",
    blog_prev: "Previous",
    blog_next: "Next",
    blog_author_desc: "Cigar Concierge and Sommelier",
    
    // Footer
    footer_desc: "Specialized consulting in premium cigars and exclusive experiences.",
    footer_nav: "Navigation",
    footer_social: "Stay Updated",
    footer_social_desc: "Receive information about new products and experiences.",
    footer_dev_by: "Developed by",
    footer_agency: "Aspec Soluções em Tecnologia",
    
    // Catalog Page
    catalog_back: "Back to Home",
    catalog_title: "Full Catalog",
    catalog_origin: "Origin",
    catalog_buy_btn: "Buy via WhatsApp",
    catalog_greeting: "Hello Luiz, I would like to know more about",
  }
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
