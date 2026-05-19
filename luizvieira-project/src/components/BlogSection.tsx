import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ArticleModal from "./ArticleModal";
import { useLanguage } from "@/contexts/LanguageContext";

const articles = [
  {
    category: "Educação",
    category_en: "Education",
    title: "Porque eu degusto charutos?",
    title_en: "Why do I taste cigars?",
    excerpt: "De vez em quando essa pergunta aparece para mim. O charuto é totalmente contra a cultura atual...",
    excerpt_en: "From time to time this question comes up. The cigar goes completely against current culture...",
    readTime: "5 min",
  },
  {
    category: "História",
    category_en: "History",
    title: "Churchill e o Charuto: A Calma no Meio do Caos",
    title_en: "Churchill and the Cigar: Calm Amidst Chaos",
    excerpt: "Winston Churchill não foi apenas um dos maiores líderes do século XX. Foi, também, um dos maiores símbolos do mundo do charuto...",
    excerpt_en: "Winston Churchill was not only one of the greatest leaders of the 20th century. He was also one of the greatest symbols of the cigar world...",
    readTime: "13 min",
  },
  {
    category: "História",
    category_en: "History",
    title: "O Verdadeiro Valor do Charuto: Tempo, Terra e Mãos",
    title_en: "The True Value of a Cigar: Time, Earth and Hands",
    excerpt: "Existe essa ideia meio aristocrática em torno do charuto... Mas o valor do charuto começa na terra.",
    excerpt_en: "There is this somewhat aristocratic idea surrounding cigars... But the true value of a cigar begins in the earth.",
    readTime: "14 min",
  },
  {
    category: "Dicas de Degustação",
    category_en: "Tasting Tips",
    title: "O charuto não é cigarro.",
    title_en: "A cigar is not a cigarette.",
    excerpt: "Charuto não é cigarro. Se fosse pra comparar, ele se parece muito mais com o vinho: tem tempo, tem história, tem camada...",
    excerpt_en: "A cigar is not a cigarette. If we were to compare, it is much more like wine: it takes time, has history, layers...",
    readTime: "12 min",
  },
  {
    category: "Reviews",
    category_en: "Reviews",
    title: "Plasencia Alma Fuerte",
    title_en: "Plasencia Alma Fuerte",
    excerpt: "O Plasencia Alma Fuerte é um charuto nicaraguense feito inteiramente com tabacos do país... intensidade média a forte.",
    excerpt_en: "The Plasencia Alma Fuerte is a Nicaraguan cigar made entirely with tobaccos from the country... medium to full strength.",
    readTime: "6 min",
  }
];

const BlogSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(1);
  const { t, language } = useLanguage();

  const handleArticleClick = (index: number) => {
    setSelectedArticle(index + 1);
    setModalOpen(true);
  };

  return (
    <>
      <section id="blog" className="py-32 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-6 h-[1px] bg-primary/60" />
              <span className="font-heading text-xs tracking-luxury text-primary uppercase">Cultura e Tradição</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl tracking-luxury uppercase mb-4">
              <span className="text-gold-gradient">{t('blog_title').split(' ')[0]}</span>
              <span className="text-foreground"> {t('blog_title').split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('blog_subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, i) => (
              <motion.article
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-500 p-8 cursor-pointer"
                onClick={() => handleArticleClick(i)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                        <div className="w-2 h-2 rotate-45 border border-primary/60" />
                      </div>
                      <span className="font-heading text-xs tracking-luxury text-primary uppercase">{language === 'en' ? article.category_en : article.category}</span>
                    </div>
                    <span className="text-muted-foreground text-xs">{article.readTime} {t('blog_read_time')}</span>
                  </div>
                  
                  <h3 className="font-heading text-xl text-foreground group-hover:text-gold-gradient transition-colors duration-300 mb-3">
                    {language === 'en' ? article.title_en : article.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {language === 'en' ? article.excerpt_en : article.excerpt}
                  </p>
                  
                  <div className="inline-flex items-center gap-2 text-primary text-sm font-heading tracking-luxury uppercase group-hover:gap-3 transition-all duration-300">
                    {t('blog_read')}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
                
                <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-primary/20 group-hover:border-primary/40 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-primary/10 group-hover:border-primary/30 transition-colors duration-500" />
              </motion.article>
            ))}
          </div>

        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </section>

      <ArticleModal isOpen={modalOpen} onClose={() => setModalOpen(false)} articleId={selectedArticle} />
    </>
  );
};

export default BlogSection;