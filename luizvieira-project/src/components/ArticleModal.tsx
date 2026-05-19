import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const articlesData = [
  {
    id: 1,
    title: "Porque eu degusto charutos?",
    title_en: "Why do I taste cigars?",
    author: "Luiz Vieira",
    category: "Educação",
    category_en: "Education",
    readTime: "5 min",
    content: `De vez em quando essa pergunta aparece para mim. Talvez você não tenha interesse em charutos, mas acredito que vale a pena ler até o final.

Eu não tenho interesse em convencer você a degustar charuto, longe disso. Mas acredito que você possa aprender algo comigo e levar um pouco de conhecimento desse hobby tão fascinante.

O charuto é totalmente contra a cultura atual. Estamos nos acostumando a uma vida apressada, na era da informação — vivemos entre Instagram e fast food, onde tudo precisa ser rápido e imediato.

E o charuto é algo que leva tempo. Ele leva tempo em todos os sentidos. Dependendo do processo de cura do tabaco e do envelhecimento, um charuto pode levar até cinco anos para chegar às nossas mãos.

Degustar um charuto não é algo rápido. Exige um pequeno ritual para ser feito da forma correta: o corte, o acendimento, as baforadas com a cadência certa. Tudo isso para extrair o melhor do charuto — muito diferente do cigarro, que é algo descartável.

O problema de nos acostumarmos com uma vida rápida e apressada é que nos esquecemos de que as coisas boas da vida levam tempo. Um bom livro leva tempo para ser lido. Uma boa comida leva tempo para ser preparada. O amadurecimento pessoal e a conquista das virtudes levam uma vida inteira.

O pinheiro é uma árvore que cresce rápido, enquanto o carvalho leva muito tempo. Mas qual das árvores é mais forte? Qual delas oferece mais abrigo aos pássaros? Qual delas tem mais valor quando é derrubada?

A vida é assim: as coisas levam tempo. E sentar com um charuto e um bom livro me ajuda a lembrar disso.

Hoje, como cigar concierge profissional...`,
    content_en: `From time to time this question comes up for me. Perhaps you have no interest in cigars, but I believe it is worth reading to the end.

I have no interest in convincing you to taste cigars, far from it. But I believe you might learn something from me and take away a bit of knowledge about this fascinating hobby.

The cigar goes completely against current culture. We are getting used to a hurried life, in the information age — we live between Instagram and fast food, where everything needs to be fast and immediate.

And a cigar is something that takes time. It takes time in every sense. Depending on the tobacco curing process and aging, a cigar can take up to five years to reach our hands.

Tasting a cigar is not something quick. It requires a small ritual to be done correctly: the cut, the lighting, the puffs with the right cadence. All of this to extract the best from the cigar — very different from a cigarette, which is something disposable.

The problem with getting used to a fast and hurried life is that we forget that the good things in life take time. A good book takes time to be read. A good meal takes time to be prepared. Personal maturation and the acquisition of virtues take a lifetime.

A pine tree is a tree that grows fast, while an oak takes a long time. But which of the trees is stronger? Which of them offers more shelter to birds? Which of them has more value when cut down?

Life is like that: things take time. And sitting down with a cigar and a good book helps me remember that.

Today, as a professional cigar concierge...`
  },
  {
    id: 2,
    title: "Churchill e o Charuto: A Calma no Meio do Caos",
    title_en: "Churchill and the Cigar: Calm Amidst Chaos",
    author: "Luiz Vieira",
    category: "História",
    category_en: "History",
    readTime: "13 min",
    content: `Winston Churchill não foi apenas um dos maiores líderes do século XX. Foi, também, um dos maiores símbolos do mundo do charuto.

Dizem que fumou mais de 250 mil ao longo da vida. Pode soar como exagero — e talvez seja — mas, no caso dele, o número quase perde importância diante do significado. Porque, para Churchill, o charuto nunca foi só um hábito. Era postura. Era presença. Era uma espécie de silêncio aceso entre um conflito e outro.

Sua história com o tabaco começou ainda jovem, no fim do século XIX, quando servia o exército britânico em Cuba. Foi ali, no calor da ilha, que ele conheceu os charutos que mudariam sua vida — especialmente o Julieta nº 2. Um encontro simples, quase casual… mas que ecoaria por décadas.

E nunca mais largou.

Com o tempo, o homem e o charuto se tornaram quase inseparáveis. A imagem é clássica: Churchill, firme, olhar decidido… e o charuto ali, entre os dedos ou repousando nos lábios, como se também observasse o mundo com ele.

A conexão foi tão forte que a vitola Julieta nº 2 acabou sendo rebatizada como "Churchill". Não é só um nome — é uma consagração. Hoje, marcas como Davidoff e a própria Romeo y Julieta mantêm linhas dedicadas a ele. Não apenas como homenagem… mas como continuidade de um legado.

Durante a Segunda Guerra Mundial, enquanto o mundo ardia — bombas, ruídos, tensão — lá estava ele. Sempre com seu fiel companheiro. Como se, em meio ao caos, o charuto fosse uma âncora. Uma pausa. Um pequeno território de controle num cenário onde quase nada era controlável.

Há algo de profundamente simbólico nisso.

Em um dos episódios marcantes, Churchill encontrou a Força Expedicionária Brasileira na Itália. Cumprimentou cada um dos brasileiros ali presentes. Um gesto simples, mas carregado de respeito — e, como tantas outras vezes, acompanhado por aquele traço já inseparável de sua figura: o charuto.

Até os últimos anos, nada mudou. Em reuniões diplomáticas ou nos momentos mais íntimos, pintando em Chartwell, ele seguia com o mesmo ritual. Como um velho amigo que não precisa dizer nada… apenas estar.

Porque, no fim, talvez seja isso.

Liderança exige calma. Exige tempo. Exige espaço pra pensar quando tudo ao redor pede pressa.

E o charuto, à sua maneira, ensina isso.

Ele não corre. Não grita. Não impõe.

Ele convida.

Talvez por isso Churchill tenha sido mais do que um charuteiro. Ele foi alguém que entendeu o tempo — e soube habitá-lo.

E como ele mesmo disse, em palavras que atravessam gerações, a luta continua até que, no tempo de Deus, com Sua força e poder, o bem avance e a libertação aconteça.

No fim das contas, fica o lembrete:

Com perseverança, com fé… e, quem sabe, com um charuto aceso entre os dedos, o homem encontra firmeza mesmo quando o mundo parece desmoronar.`,
    content_en: `Winston Churchill was not only one of the greatest leaders of the 20th century. He was also one of the greatest symbols of the cigar world.

They say he smoked over 250,000 throughout his life. It may sound like an exaggeration — and perhaps it is — but in his case, the number almost loses importance in the face of its meaning. Because, for Churchill, the cigar was never just a habit. It was posture. It was presence. It was a kind of lit silence between one conflict and another.

His history with tobacco began when he was young, at the end of the 19th century, while serving in the British army in Cuba. It was there, in the heat of the island, that he met the cigars that would change his life — especially the Julieta No. 2. A simple, almost casual encounter... but one that would echo for decades.

And he never let go.

Over time, the man and the cigar became almost inseparable. The image is classic: Churchill, firm, a determined look... and the cigar right there, between his fingers or resting on his lips, as if it were also observing the world with him.

The connection was so strong that the Julieta No. 2 vitola was eventually renamed "Churchill". It's not just a name — it's a consecration. Today, brands like Davidoff and Romeo y Julieta themselves maintain lines dedicated to him. Not just as a tribute... but as the continuation of a legacy.

During the Second World War, while the world burned — bombs, noise, tension — there he was. Always with his faithful companion. As if, amidst the chaos, the cigar was an anchor. A pause. A small territory of control in a scenario where almost nothing was controllable.

There is something deeply symbolic about that.

In one of the remarkable episodes, Churchill met the Brazilian Expeditionary Force in Italy. He greeted each of the Brazilians present there. A simple gesture, but loaded with respect — and, as so many other times, accompanied by that inseparable trait of his figure: the cigar.

Until his last years, nothing changed. In diplomatic meetings or in the most intimate moments, painting at Chartwell, he followed the same ritual. Like an old friend who doesn't need to say anything... just be there.

Because, in the end, perhaps that is it.

Leadership demands calm. It demands time. It demands space to think when everything around you calls for haste.

And the cigar, in its own way, teaches that.

It doesn't run. It doesn't shout. It doesn't impose.

It invites.

Perhaps that's why Churchill was more than a cigar smoker. He was someone who understood time — and knew how to inhabit it.

And as he himself said, in words that cross generations, the struggle continues until, in God's time, with His strength and power, the good advances and liberation happens.

At the end of the day, the reminder remains:

With perseverance, with faith... and, perhaps, with a lit cigar between the fingers, a man finds firmness even when the world seems to crumble.`
  },
  {
    id: 3,
    title: "O Verdadeiro Valor do Charuto: Tempo, Terra e Mãos",
    title_en: "The True Value of a Cigar: Time, Earth and Hands",
    author: "Luiz Vieira",
    category: "História",
    category_en: "History",
    readTime: "14 min",
    content: `Existe essa ideia meio aristocrática em torno do charuto — como se ele pertencesse a uma classe, a um certo tipo de gente, a um lugar específico à mesa. Mas, sendo bem sincero… o valor do charuto não mora aí.

Não está na marca estampada. Não está na anilha dourada. Não está no discurso bonito.

O valor do charuto começa muito antes disso. Começa na terra.

Começa na mão do homem que pisa no campo ainda cedo, que suja os dedos, que sente o peso da folha, que entende o tempo da natureza no olhar. O charuto nasce ali — no silêncio do cultivo, no calor do sol, no cuidado paciente de quem trabalha com algo vivo.

Um charuto simples… pode levar até quatro anos pra ficar pronto. Quatro anos. É tempo demais pra um mundo que quer tudo pra ontem. E talvez seja justamente por isso que ele carrega tanto valor. Porque ele desafia a pressa — quase como se dissesse, em silêncio: "aqui, o tempo ainda manda."

E não é só tempo. É processo. É precisão.

A Plasencia, por exemplo, fala em 537 processos manuais até o charuto chegar nas nossas mãos. Dá pra imaginar? São centenas de etapas onde cada detalhe importa — folha por folha, toque por toque, decisão por decisão.

Já a Davidoff segue outro caminho, mas com o mesmo respeito: só permite que torcedores com mais de 10 anos de experiência toquem nos seus charutos. Como se cada peça carregasse não só tabaco… mas uma década de prática, erro, acerto e sensibilidade.

No fim, tudo converge pra mesma coisa: mão humana. Olho treinado. Tempo respeitado.

É, de certa forma, o auge do trabalho manual. Tudo que o homem tem de mais honesto pra oferecer… passa pelas mãos dele antes de chegar até você.

E aí entra a tradição.

O charuto atravessa séculos. Desde os povos originários — lá atrás, muito antes de qualquer marca existir — já havia o ritual. Os taínos já entendiam que aquilo não era só consumo… era experiência. Era pausa. Era quase um gesto sagrado.

Hoje, claro, muita coisa mudou. Mas o essencial… não.

Você ainda corta. Você ainda acende. Você ainda degusta.

Sem pressa. Sem atalhos. Sem exagero.

Quando alguma marca tenta inventar demais, enfeitar demais, colocar firula demais… quase sempre perde a essência. Porque o charuto não precisa disso. Ele já carrega história suficiente.

Ele não é só feito como era antigamente. Ele é vivido como era antigamente.

E, no fim das contas, o valor tá exatamente aí: na tradição que atravessa gerações, no homem que suja a mão pra cultivar, no tempo que não se apressa, e nessa pequena obra — enrolada em tabaco — que chega até você carregando terra, história… e verdade.`,
    content_en: `There is this somewhat aristocratic idea surrounding the cigar — as if it belonged to a class, to a certain type of people, to a specific place at the table. But, to be quite honest... the value of the cigar does not reside there.

It's not in the stamped brand. It's not in the golden band. It's not in the beautiful speech.

The value of the cigar begins long before that. It begins in the earth.

It begins in the hand of the man who steps into the field early in the morning, who gets his fingers dirty, who feels the weight of the leaf, who understands the timing of nature in his eyes. The cigar is born there — in the silence of cultivation, in the heat of the sun, in the patient care of those who work with something alive.

A simple cigar... can take up to four years to be ready. Four years. That's too much time for a world that wants everything yesterday. And perhaps that is precisely why it carries so much value. Because it defies haste — almost as if saying, in silence: "here, time still rules."

And it's not just time. It's process. It's precision.

Plasencia, for example, speaks of 537 manual processes before the cigar reaches our hands. Can you imagine? There are hundreds of steps where every detail matters — leaf by leaf, touch by touch, decision by decision.

Davidoff, on the other hand, follows a different path, but with the same respect: it only allows rollers with more than 10 years of experience to touch their cigars. As if each piece carried not just tobacco... but a decade of practice, trial, error, and sensitivity.

In the end, everything converges to the same thing: human hands. A trained eye. Respected time.

It is, in a way, the pinnacle of manual labor. Everything most honest that a man has to offer... passes through his hands before reaching you.

And that's where tradition comes in.

The cigar spans centuries. Since the original peoples — way back, long before any brand existed — the ritual was already there. The Taínos already understood that it was not just consumption... it was an experience. It was a pause. It was almost a sacred gesture.

Today, of course, a lot has changed. But the essential... hasn't.

You still cut it. You still light it. You still taste it.

Without haste. Without shortcuts. Without exaggeration.

When a brand tries to invent too much, decorate too much, add too much fluff... it almost always loses its essence. Because the cigar doesn't need that. It already carries enough history.

It is not only made as it was in the past. It is lived as it was in the past.

And, at the end of the day, the value is exactly there: in the tradition that crosses generations, in the man who gets his hands dirty to cultivate, in the time that is not rushed, and in this small work of art — rolled in tobacco — that reaches you carrying earth, history... and truth.`
  },
  {
    id: 4,
    title: "O charuto não é cigarro.",
    title_en: "A cigar is not a cigarette.",
    author: "Luiz Vieira",
    category: "Dicas de Degustação",
    category_en: "Tasting Tips",
    readTime: "12 min",
    content: `Charuto não é cigarro. E, pra ser justo, também não é só fumaça — é experiência. Se fosse pra comparar, ele se parece muito mais com o vinho: tem tempo, tem história, tem camada… tem terroir. A harmonização, então, entra quase como um casamento. Não daqueles apressados, mas dos bons — construídos com calma. Dois elementos que caminham juntos, lado a lado. Um não tenta apagar o outro. Pelo contrário: um revela o melhor do outro.

E aí entra o jogo.

Você pode levar seu charuto pra dançar com um bom drink — um Negroni, por exemplo, com aquele amargor elegante que abraça a fumaça. Pode ir pra um destilado mais sério, como um whisky ou um conhaque, onde tudo fica mais denso, mais profundo. Ou até um bom café, que chega quase como um velho amigo: simples, direto e sempre bem-vindo.

Mas o ponto não é só com o quê. É como.

Existem três caminhos.

O primeiro é o contraste. É quando você junta opostos que, curiosamente, se entendem melhor do que muitos iguais por aí. Um charuto com notas de pimenta, por exemplo… e um chocolate 70%. Parece improvável — pimenta e cacau — mas, quando se encontram, acontece algo quase mágico. Um cutuca, o outro acalma. Um acende, o outro abraça.

O segundo é a similaridade. Aqui, não tem conflito — tem coro. Um charuto amadeirado com um bom bourbon americano… é como se os dois falassem a mesma língua. As notas se repetem, se reforçam, crescem. O sabor vai ficando mais cheio, mais redondo, quase como um eco que vai ganhando força.

E, pra mim, o mais interessante de todos: o afetivo.

Porque, no fim das contas, nem tudo precisa fazer sentido técnico pra fazer sentido na vida.

Talvez um Cuba Libre não seja a harmonização perfeita no papel. Mas e se foi em Havana, numa noite quente, com o som da cidade ao fundo, que você acendeu seu primeiro charuto? E se aquele gole doce, com gelo tilintando no copo — clink, clink — marcou um momento que ficou?

Pronto. Virou perfeito.

A memória entra na mesa. E quando ela entra… ninguém mais discute.

Porque o charuto não é só o que você sente no paladar. É o que você carrega junto com ele. O primeiro com um amigo. O primeiro com seu pai. Aquela conversa longa, sem pressa, onde o tempo parece dar uma pausa — quase como se dissesse: "fica mais um pouco".

No fundo, é simples.

O melhor harmonizador de um charuto não tá na garrafa, nem na xícara.

Tá na companhia.

Um bom amigo do lado… e o resto, meu caro, o resto é detalhe.`,
    content_en: `A cigar is not a cigarette. And, to be fair, it's not just smoke either — it's an experience. If we were to compare, it is much more like wine: it takes time, has history, layers... it has terroir. Pairing, then, comes in almost like a marriage. Not the rushed ones, but the good ones — built with calm. Two elements walking together, side by side. One does not try to erase the other. On the contrary: one reveals the best of the other.

And that's where the game begins.

You can take your cigar to dance with a good drink — a Negroni, for example, with that elegant bitterness that embraces the smoke. You can go for a more serious spirit, like a whisky or a cognac, where everything gets denser, deeper. Or even a good coffee, which arrives almost like an old friend: simple, direct, and always welcome.

But the point is not just with what. It's how.

There are three paths.

The first is contrast. It's when you bring together opposites that, curiously, understand each other better than many equals out there. A cigar with notes of pepper, for example... and a 70% dark chocolate. It seems unlikely — pepper and cocoa — but when they meet, something almost magical happens. One pokes, the other soothes. One ignites, the other embraces.

The second is similarity. Here, there is no conflict — there is a choir. A woody cigar with a good American bourbon... it's as if they speak the same language. The notes repeat, reinforce each other, grow. The flavor becomes fuller, rounder, almost like an echo gaining strength.

And, to me, the most interesting of all: the affective pairing.

Because, at the end of the day, not everything has to make technical sense to make sense in life.

Maybe a Cuba Libre is not the perfect pairing on paper. But what if it was in Havana, on a hot night, with the sound of the city in the background, that you lit your first cigar? And what if that sweet sip, with ice clinking in the glass — clink, clink — marked a moment that stayed?

There you go. It became perfect.

Memory joins the table. And when it joins... nobody argues anymore.

Because a cigar is not just what you feel on the palate. It's what you carry along with it. The first one with a friend. The first one with your father. That long conversation, unhurried, where time seems to pause — almost as if saying: "stay a little longer."

Deep down, it's simple.

The best pair for a cigar is not in the bottle, nor in the cup.

It's in the company.

A good friend by your side... and the rest, my friend, the rest is just details.`
  },
  {
    id: 5,
    title: "Plasencia Alma Fuerte",
    title_en: "Plasencia Alma Fuerte",
    author: "Luiz Vieira",
    category: "Reviews",
    category_en: "Reviews",
    readTime: "6 min",
    content: `O Plasencia Alma Fuerte é um charuto nicaraguense feito inteiramente com tabacos do país, incluindo folhas Criollo '98 cultivadas em regiões como Estelí, Condega, Jalapa e Ometepe. Produzido pela tradicional família Plasencia, com com cinco gerações dedicadas ao cultivo de tabaco. O charuto apresenta intensidade média a forte, excelente construção e capa Maduro escura e oleosa.

No paladar, entrega sabores ricos e intensos, com notas de chocolate amargo, ameixa, madeira e melaço, tornando-se um dos grandes destaques do mundo dos charutos premium.`,
    content_en: `The Plasencia Alma Fuerte is a Nicaraguan cigar made entirely with tobaccos from the country, including Criollo '98 leaves grown in regions like Estelí, Condega, Jalapa, and Ometepe. Produced by the traditional Plasencia family, with five generations dedicated to tobacco cultivation. The cigar features a medium to full strength, excellent construction, and a dark, oily Maduro wrapper.

On the palate, it delivers rich and intense flavors, with notes of dark chocolate, plum, wood, and molasses, making it one of the great highlights of the premium cigar world.`
  }
];

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  articleId?: number;
}

const ArticleModal = ({ isOpen, onClose, articleId = 1 }: ArticleModalProps) => {
  const [currentArticle, setCurrentArticle] = useState(articleId);
  const { t, language } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      setCurrentArticle(articleId);
    }
  }, [articleId, isOpen]);

  const current = articlesData.find(a => a.id === currentArticle) || articlesData[0];
  const hasPrev = currentArticle > 1;
  const hasNext = currentArticle < articlesData.length;

  const handlePrev = () => {
    if (hasPrev) setCurrentArticle(prev => prev - 1);
  };

  const handleNext = () => {
    if (hasNext) setCurrentArticle(prev => prev + 1);
  };

  const articleContent = language === 'en' ? current.content_en : current.content;
  const paragraphs = articleContent.split('\n\n');

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-background/95 backdrop-blur-xl z-50 overflow-y-auto"
          onClick={onClose}
        >
          <div className="min-h-screen flex items-start justify-center py-16 px-4">
            <motion.div
              key={currentArticle}
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute -top-4 right-0 md:-right-12 w-12 h-12 flex items-center justify-center border border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300 z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="bg-background border border-primary/20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/3 rounded-full blur-3xl" />
                
                <div className="relative z-10 p-8 md:p-16">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-px h-8 bg-primary/50" />
                    <div>
                      <span className="font-heading text-xs tracking-luxury text-primary uppercase">{language === 'en' ? current.category_en : current.category}</span>
                      <p className="text-muted-foreground text-xs mt-1">{current.readTime} {t('blog_read_time')}</p>
                    </div>
                  </div>

                  <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl leading-tight text-foreground mb-4">
                    {language === 'en' ? current.title_en : current.title}
                  </h1>

                  <div className="flex items-center gap-3 mb-12 pb-8 border-b border-primary/10">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-foreground font-heading text-sm tracking-luxury">{t('blog_by')}: {current.author}</p>
                      <p className="text-muted-foreground text-xs">Cigar Concierge</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {paragraphs.map((paragraph, i) => (
                      <div key={i}>
                        <p className="text-foreground/80 font-light leading-relaxed text-base">
                          {paragraph}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-16 pt-8 border-t border-primary/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-heading text-sm text-gold-gradient mb-2">{current.author}</p>
                        <p className="text-muted-foreground text-xs">{t('blog_author_desc')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              </div>

              <div className="flex justify-between mt-6">
                <button 
                  onClick={handlePrev}
                  disabled={!hasPrev}
                  className={`flex items-center gap-2 transition-colors ${hasPrev ? 'text-muted-foreground hover:text-primary cursor-pointer' : 'text-muted-foreground/30 cursor-not-allowed'}`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm">{t('blog_prev')}</span>
                </button>
                <span className="text-muted-foreground text-sm">{currentArticle} / {articlesData.length}</span>
                <button 
                  onClick={handleNext}
                  disabled={!hasNext}
                  className={`flex items-center gap-2 transition-colors ${hasNext ? 'text-muted-foreground hover:text-primary cursor-pointer' : 'text-muted-foreground/30 cursor-not-allowed'}`}
                >
                  <span className="text-sm">{t('blog_next')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArticleModal;