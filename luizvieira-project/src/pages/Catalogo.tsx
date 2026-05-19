import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

// Imports das imagens
import img1 from "@/assets/produtos/Montecristo-purito1_edbb2e41.jpg";
import img2 from "@/assets/produtos/MonteCristoN4_72943c71.webp";
import img3 from "@/assets/produtos/romeoyjulietamillefleurs_71f3921d.webp";
import img4 from "@/assets/produtos/JammMestro_rotated_0b10d5cf.png";
import img5 from "@/assets/produtos/JP50_rotated_2b7bc6bb.png";
import img6 from "@/assets/produtos/ChatGPTImage1_05_2026,15_20_30_7a088ec7.png";
import img7 from "@/assets/produtos/ToscanoClássicoPt5_rotated_180_f88265d5.png";
import img8 from "@/assets/produtos/ToscanoClássicound_rotated_180_98fe4a53.png";
import img9 from "@/assets/produtos/charuto_arturo_fuente_rosado_magnum_r52_unidade_1330_1_eeb988783917ec192bb8f13b4f90da04_729357b2.webp";
import img10 from "@/assets/produtos/ChatGPTImage25_03_2026,16_44_04_2aeef81f.png";
import img11 from "@/assets/produtos/ValentinoSiestoSunGrown_rotated_715f171e.png";
import img12 from "@/assets/produtos/VegafinaYearoftheSnake_rotated_180_2c022182.png";
import img13 from "@/assets/produtos/SobremesaBruléeBlue_rotated_d9781539.png";
import img14 from "@/assets/produtos/VegaFina198844_f4578802.png";
import img15 from "@/assets/produtos/CAOBraziliaGol_e56ce56e.png";
import img16 from "@/assets/produtos/charuto_cao_consigliere_associate_unidade_3476_1_a7d67e70f720e37f03d538f8583b5ca4_da5c59de.webp";
import img17 from "@/assets/produtos/JoyadeNicaraguaTorpedo_rotated_180_d5f74843.png";
import img18 from "@/assets/produtos/RosalonesRR546_rotated_180_8b8be690.png";
import img19 from "@/assets/produtos/charuto_alec_bradley_prensado_churchill_unidade_1_20250808113200_db39c666c966_245b2b30.webp";
import img20 from "@/assets/produtos/MaçaricoHitpremiumMetalAdvanceMidnight_6ea63c23.png";
import img21 from "@/assets/produtos/TesouraSommelierCharuto_05cbf6bb.png";
import img22 from "@/assets/produtos/PortaCharutoFibradeCarbono_26180374.png";
import img23 from "@/assets/produtos/images_901336da.jfif";
import img24 from "@/assets/produtos/umidor_para_25_charutos_preto_com_higrometro_digit_2_20260409145302_4dd804a5a7fc_adae1ae5.webp";
import img25 from "@/assets/produtos/ChatGPTImage27_04_2026,12_14_30_396470f2.png";

const products = [
  { id: 1, name: "MonteCristo Purito pt 5", origin: "Cuba", origin_en: "Cuba", price: "R$ 176", desc: "Os purito são pequenas cigarrilhas que entregam a experiência de um charuto tradicional com mais praticidade.", desc_en: "Puritos are small cigarillos that deliver the experience of a traditional cigar with more practicality.", category: "Charutos", image: img1 },
  { id: 2, name: "Montecristo N4", origin: "Cuba", origin_en: "Cuba", price: "R$ 220", desc: "Montecristo N4 é o charuto mais vendido do mundo, conhecido pelo equilíbrio e fortaleza média.", desc_en: "Montecristo No. 4 is the best-selling cigar in the world, known for its balance and medium strength.", category: "Charutos", image: img2 },
  { id: 3, name: "Romeo y Julieta Mille Fleurs", origin: "Cuba", origin_en: "Cuba", price: "R$ 140", desc: "Mille Fleurs (mil flores) é um charuto suave, aromático e muito agradável.", desc_en: "Mille Fleurs (thousand flowers) is a mild, aromatic, and very pleasant cigar.", category: "Charutos", image: img3 },
  { id: 4, name: "Jamm Maestro", origin: "Brasil", origin_en: "Brazil", price: "R$ 105", desc: "O primeiro charuto figurado da linha premium da Jamm apresenta acabamento moderno e formato exclusivo.", desc_en: "The first figurado cigar from Jamm's premium line features a modern finish and an exclusive shape.", category: "Charutos", image: img4 },
  { id: 5, name: "Jamm JP50", origin: "Brasil", origin_en: "Brazil", price: "R$ 82", desc: "Charutos artesanais feitos com tabacos Mata Fina e Cubra Ligeiro. Intensidade média.", desc_en: "Handcrafted cigars made with Mata Fina and Cubra Ligeiro tobaccos. Medium intensity.", category: "Charutos", image: img5 },
  { id: 6, name: "Jamm Culebras", origin: "Brasil", origin_en: "Brazil", price: "R$ 200", desc: "O Jamm Culebras se destaca pelo formato trançado tradicional e elegant.", desc_en: "The Jamm Culebras stands out for its traditional and elegant braided shape.", category: "Charutos", image: img6 },
  { id: 7, name: "Toscano Clássico pt 5", origin: "Itália", origin_en: "Italy", price: "R$ 270", desc: "Ícone dos charutos italianos. De visual torto, utiliza tabaco Kentucky.", desc_en: "An icon of Italian cigars. With a crooked look, it uses Kentucky tobacco.", category: "Charutos", image: img7 },
  { id: 8, name: "Toscano Clássico und", origin: "Itália", origin_en: "Italy", price: "R$ 55", desc: "Ícone dos charutos italianos. De visual torto, utiliza tabaco Kentucky.", desc_en: "An icon of Italian cigars. With a crooked look, it uses Kentucky tobacco.", category: "Charutos", image: img8 },
  { id: 9, name: "Arturo Fuente Rosado Magnum R56", origin: "República Dominicana", origin_en: "Dominican Republic", price: "R$ 300", desc: "Charuto premium de formato robusto que entrega uma experiência rica e elegante.", desc_en: "Premium robusto-shaped cigar that delivers a rich and elegant experience.", category: "Charutos", image: img9 },
  { id: 10, name: "Don Emmanuel Anunnaki KI Robusto", origin: "República Dominicana", origin_en: "Dominican Republic", price: "R$ 180", desc: "Força média e bem equilibrada, com mistura de sete tipos de tabaco.", desc_en: "Medium and well-balanced strength, featuring a blend of seven types of tobacco.", category: "Charutos", image: img10 },
  { id: 11, name: "Valentino Habano Robusto", origin: "República Dominicana", origin_en: "Dominican Republic", price: "R$ 280", desc: "Charuto premiado, com maturação mínima de 8 anos.", desc_en: "Award-winning cigar, with a minimum aging of 8 years.", category: "Charutos", image: img11 },
  { id: 12, name: "Vegafina Year of the Snake", origin: "República Dominicana", origin_en: "Dominican Republic", price: "R$ 220", desc: "Edição do Ano Novo Chinês de 2025 criada para celebrar o Ano da Cobra.", desc_en: "2025 Chinese New Year Edition created to celebrate the Year of the Snake.", category: "Charutos", image: img12 },
  { id: 13, name: "Sobremesa Brulée Blue", origin: "República Dominicana", origin_en: "Dominican Republic", price: "R$ 170", desc: "Produzido por um dos maiores master blenders do mundo, entrega elegância.", desc_en: "Produced by one of the greatest master blenders in the world, delivering pure elegance.", category: "Charutos", image: img13 },
  { id: 14, name: "VegaFina 1988 44", origin: "República Dominicana", origin_en: "Dominican Republic", price: "R$ 118", desc: "Homenagem à inauguração da fábrica, o melhor blend da Vegafina.", desc_en: "A tribute to the factory's inauguration, considered the best VegaFina blend.", category: "Charutos", image: img14 },
  { id: 15, name: "CAO Brazilia Gol", origin: "Nicarágua", origin_en: "Nicaragua", price: "R$ 105", desc: "Charuto encorpado que se destaca pela capa brasileira de Arapiraca.", desc_en: "Full-bodied cigar that stands out for its Brazilian Arapiraca wrapper.", category: "Charutos", image: img15 },
  { id: 16, name: "CAO Consigliere Associate", origin: "Nicarágua", origin_en: "Nicaragua", price: "R$ 80", desc: "(CAO Consigliere Associate)", desc_en: "(CAO Consigliere Associate)", category: "Charutos", image: img16 },
  { id: 17, name: "Joya de Nicaragua Torpedo", origin: "Nicarágua", origin_en: "Nicaragua", price: "R$ 100", desc: "Formato torpedo, com boa progressão de força e sabor.", desc_en: "Torpedo format, with an excellent progression of strength and flavor.", category: "Charutos", image: img17 },
  { id: 18, name: "Rosalones RR546", origin: "Nicarágua", origin_en: "Nicaragua", price: "R$ 85", desc: "Perfil de sabor suave a médio, excelente relação custo-benefício.", desc_en: "Mild to medium flavor profile, offering an excellent cost-benefit ratio.", category: "Charutos", image: img18 },
  { id: 19, name: "Alec Bradley Prensado Churchill", origin: "Honduras", origin_en: "Honduras", price: "R$ 100", desc: "Charuto altamente premiado, eleito o melhor do ano pela Cigar Aficionado.", desc_en: "Highly awarded cigar, voted cigar of the year by Cigar Aficionado.", category: "Charutos", image: img19 },
  { id: 20, name: "Maçarico HIT PREMIUM METAL ADVANCE MIDNIGHT", origin: "", origin_en: "", price: "R$ 200", desc: "Maçarico premium de metal com acabamento midnight.", desc_en: "Premium metal torch lighter with a midnight finish.", category: "Acessórios", image: img20 },
  { id: 21, name: "Tesoura Sommelier Charuto", origin: "", origin_en: "", price: "R$ 400", desc: "Tesoura sommelier profissional para charutos.", desc_en: "Professional sommelier cigar scissors.", category: "Acessórios", image: img21 },
  { id: 22, name: "Porta Charuto Fibra de Carbono", origin: "", origin_en: "", price: "R$ 539", desc: "Porta charuto em fibra de carbono com acabamento premium.", desc_en: "Carbon fiber cigar case with a premium finish.", category: "Acessórios", image: img22 },
  { id: 23, name: "Cortador Clássico Metal", origin: "", origin_en: "", price: "R$ 130", desc: "Cortador clássico full metal, precisão e elegância.", desc_en: "Classic full-metal cutter, precision and elegance.", category: "Acessórios", image: img23 },
  { id: 24, name: "Umidor 25 Charutos", origin: "", origin_en: "", price: "R$ 690", desc: "Caixa umidora Hit com mostrador digital, capacidade para até 25 charutos.", desc_en: "Hit humidor box with digital display, capacity for up to 25 cigars.", category: "Acessórios", image: img24 },
  { id: 25, name: "Kit S.T. Dupont – Slimmy + Cigar Cutter Stand", origin: "França", origin_en: "France", price: "R$ 12.000", desc: "Isqueiro ultrafino e cortador de charutos duplo funcional.", desc_en: "Ultra-slim lighter and dual-functional cigar cutter.", category: "Acessórios", image: img25 },
];

const Catalogo = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-32 pb-20 container mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-gold-gradient transition-colors mb-12">
          <ArrowLeft size={16} />
          <span className="font-heading text-sm uppercase tracking-luxury">{t('catalog_back')}</span>
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-heading text-3xl md:text-5xl tracking-luxury uppercase text-gold-gradient mb-6">
            {t('catalog_title')}
          </h1>
          <div className="divider-gold w-48 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, i) => {
            const message = encodeURIComponent(`${t('catalog_greeting')} ${product.name}.`);
            const whatsappUrl = `https://api.whatsapp.com/send/?phone=5562982343386&text=${message}&type=phone_number&app_absent=0`;
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
                className="group flex flex-col bg-card/50 border border-primary/10 rounded overflow-hidden hover:border-primary/40 hover:shadow-gold transition-all duration-500"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-white relative p-4 flex items-center justify-center">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center">
                    {product.category !== "Charutos" && (
                      <span className="font-heading text-xs uppercase tracking-luxury text-primary bg-background/90 border border-primary/20 px-3 py-1 rounded backdrop-blur-md shadow-lg">
                        {language === 'en' && product.category === 'Acessórios' ? 'Accessories' : product.category}
                      </span>
                    )}
                    <span className="font-heading text-sm text-gold-gradient font-bold bg-background/90 border border-primary/20 px-3 py-1 rounded backdrop-blur-md shadow-lg">
                      {product.price}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-heading text-lg text-foreground mb-2">{product.name}</h3>
                  {product.origin && (
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-3">{t('catalog_origin')}: {language === 'en' ? product.origin_en : product.origin}</p>
                  )}
                  <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6 flex-1">
                    {language === 'en' ? product.desc_en : product.desc}
                  </p>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors py-3 px-4 rounded-sm"
                  >
                    <MessageCircle size={18} />
                    <span className="font-heading text-xs uppercase tracking-widest">{t('catalog_buy_btn')}</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Catalogo;
