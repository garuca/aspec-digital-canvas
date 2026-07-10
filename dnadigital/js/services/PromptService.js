// ============================================================
// ASPEC IA — Prompt Service
// Templates de prompts para o Gemini
// ============================================================

export class PromptService {
  /**
   * Prompt para extrair DNA da marca
   */
  static getBrandDnaPrompt(companyDescription) {
    return `Você é um Brand Planner sênior especializado em posicionamento de marcas digitais.

Analise a seguinte descrição de empresa e/ou os metadados do site (se fornecidos) e extraia o DNA Digital completo da marca.

DESCRIÇÃO DA EMPRESA:
"""
${companyDescription}
"""

INSTRUÇÕES:
1. Determine o nome da empresa/marca (a partir do site ou descrição)
2. Crie uma descrição concisa e profissional da empresa
3. Identifique o nicho de mercado principal
4. Defina a proposta de valor única
5. Determine o tom de voz ideal (lista de 3 a 5 adjetivos)
6. Defina uma paleta de cores (primária, secundária, detalhe) e explique a justificativa
7. Determine a logo oficial da marca a partir da lista de CANDIDATOS A LOGO ENCONTRADOS (se fornecidos)
8. Defina a fonte primária da marca (para títulos, headings, h1, h2, etc.)
9. Defina a fonte secundária da marca (para corpo de texto, parágrafos, etc.)
10. Defina a cor primária para os títulos e cabeçalhos (cor da fonte primária)
11. Defina a cor padrão para os textos e parágrafos (cor da fonte secundária)
12. Descreva elementos visuais recomendados para a identidade

REGRAS:
- Retorne SOMENTE JSON válido, sem markdown, sem explicações
- As cores devem ser em formato hexadecimal (#XXXXXX)
- O tom de voz deve ser uma lista de strings
- A justificativa da paleta deve explicar a psicologia das cores escolhidas
- Os elementos visuais devem descrever estilo fotográfico e gráfico recomendado
- Se houver DADOS EXTRAÍDOS DO SITE na descrição, analise os "CANDIDATOS A LOGO ENCONTRADOS" e escolha a URL que melhor representa a logo da empresa. Retorne essa URL em "logo_url".
- Se houver "CORES EXTRAÍDAS DIRETAMENTE DO ARQUIVO DA LOGO DA MARCA", use obrigatoriamente a cor mais marcante e dominante dessa logo como a COR PRIMÁRIA da marca. A logo tem o peso mais alto na identidade visual!
- Se houver "CORES ENCONTRADAS NO SITE", utilize-as para compor as cores secundária e detalhe da paleta.
- Se houver "FONTES/TIPOGRAFIA IDENTIFICADAS PARA TÍTULOS (H1, H2, etc.)", use a primeira delas como "font_family" (fonte primária). Caso contrário, selecione uma fonte limpa e marcante para títulos.
- Se houver "FONTES/TIPOGRAFIA IDENTIFICADAS PARA TEXTO DE CORPO", use a primeira delas como "font_family_secondary" (fonte secundária). Caso contrário, use uma fonte complementar legível.
- Se houver "CORES DE TEXTO ENCONTRADAS NO SITE", use a primeira cor escura ou contrastante identificada para títulos como "font_color" (cor da fonte primária).
- Se houver "CORES DE TEXTO ENCONTRADAS NO SITE", use a cor de texto padrão identificada para parágrafos como "font_color_secondary" (cor da fonte secundária, ex: #334155 ou #475569).
- Cruze as informações do site com a descrição fornecida para gerar um DNA mais preciso.

Retorne exatamente neste formato JSON:
{
  "nome_empresa": "",
  "descricao_empresa": "",
  "nicho": "",
  "proposta_valor": "",
  "tom_de_voz": [],
  "logo_url": "",
  "paleta_cores": {
    "primaria": "#",
    "secundaria": "#",
    "detalhe": "#",
    "justificativa": ""
  },
  "font_family": "",
  "font_family_secondary": "",
  "font_color": "",
  "font_color_secondary": "",
  "elementos_visuais": ""
}`;
  }
  /**
   * Prompt para gerar conteúdo de post (legenda + prompt de imagem)
   */
  static getPostContentPrompt(brandDna, userPrompt, referenceImageDescription = '', platform = 'Instagram', format = 'Post (Feed)') {
    let referenceSection = '';
    if (referenceImageDescription) {
      referenceSection = `

IMAGEM DE REFERÊNCIA CRIATIVA (DIRETRIZ DE LAYOUT E ESTRUTURA DETALHADA):
A descrição estruturada da imagem que o usuário enviou como referência (obtida via análise de computador) é:
"""
${referenceImageDescription}
"""

REGRAS CRÍTICAS DE DIAGRAMAÇÃO E CONSISTÊNCIA VISUAL:
- **CONSISTÊNCIA E CLONAGEM ESTRUTURAL**: Você deve clonar e preservar a exata estrutura de diagramação, o grid do layout, a disposição espacial e a geometria descritas na imagem de referência ("diagramacao_layout"). Se a referência é dividida em 2 colunas com uma lista de diferenciais na esquerda e um smartphone na direita, a nova imagem final gerada DEVE ter exatamente a mesma divisão espacial de 2 colunas com o novo conteúdo na esquerda e o smartphone na direita. Se a referência possui elementos geométricos pontilhados, linhas de conexão finas ou grafismos circulares no fundo, inclua exatamente esses mesmos elementos geométricos pontilhados, linhas de conexão e grafismos no fundo do novo post.
- **SUBSTITUA APENAS CONTEÚDO, CORES E FONTES**:
  1. **Conteúdo**: Altere os textos, títulos, tópicos de serviços/diferenciais e imagens de tela para refletir a nova solicitação do usuário ("${userPrompt}").
  2. **Cores**: Substitua as cores originais da referência pelas cores oficiais da marca (${brandDna.colorPalette.primary}, ${brandDna.colorPalette.secondary}, ${brandDna.colorPalette.accent}) respeitando a mesma lógica de aplicação (onde havia cor de destaque na referência, use a cor de detalhe/accent da marca; onde havia cor de fundo predominante, use a cor primária/segundária da marca).
  3. **Tipografia**: Substitua as fontes originais pelas fontes oficiais da marca (${brandDna.colorPalette.fontFamily} e ${brandDna.colorPalette.fontFamilySecondary}) nos respectivos títulos e textos explicativos.
- **CONTEÚDO DA LEGENDA (COPYWRITING)**: Se a descrição da referência indicar seções de texto estruturadas (cabeçalho, lista de tópicos/benefícios, chamada de ação, rodapé), você **deve** usar exatamente a mesma estrutura para organizar o texto da legenda final ("legenda"). Escreva os textos finais de copywriting correspondentes à solicitação do usuário, sem metadados descritivos como 'No cabeçalho...' ou 'Na coluna...'.`;
    }

    return `Você é um Diretor de Arte sênior e Copywriter especialista em mídias sociais (Instagram, LinkedIn, Facebook, TikTok).

OBJETIVO:
Gerar uma publicação (legenda + prompt de imagem) altamente profissional para a plataforma **${platform}** no formato **${format}**.
O resultado visual não deve ser um folheto/flyer de papel impresso físico, mas sim uma arte de post digital otimizada e limpa para redes sociais corporativas.

DNA DA MARCA:
- Empresa: ${brandDna.companyName}
- Nicho: ${brandDna.niche}
- Proposta de valor: ${brandDna.valueProposition}
- Tom de voz: ${brandDna.voiceTone.join(', ')}
- Cores da marca: Primária ${brandDna.colorPalette.primary}, Secundária ${brandDna.colorPalette.secondary}, Detalhe ${brandDna.colorPalette.accent}
- Estilo visual: ${brandDna.visualElements}

SOLICITAÇÃO DO USUÁRIO:
"""
${userPrompt}
"""${referenceSection}

INSTRUÇÕES:
1. Crie uma legenda profissional adaptada e otimizada especificamente para a plataforma ${platform} e formato ${format}, focando no público corporativo/empresarial.
2. Crie um prompt detalhado para geração de imagem (no mesmo idioma da solicitação do usuário) que respeite as diretrizes de formato solicitadas (Stories/Reels = 9:16 vertical; Feed Post/Carrossel = 1:1 quadrado).

REGRAS PARA LEGENDA (POSTAGENS EMPRESARIAIS):
- **Otimização de Canal**: Adapte a linguagem e estrutura do texto especificamente para a plataforma ${platform} e o formato ${format}.
- **Copywriting Persuasivo (AIDA/PAS)**: Estruture a legenda para atrair a atenção do público corporativo, gerar interesse nos benefícios ou soluções, e incentivar uma ação (CTA). Foque nas dores e aspirações de negócios da audiência.
- **Linguagem e Tom Profissional Moderno**: Use português brasileiro impecável, mantendo a autoridade e sobriedade de uma marca corporativa, mas com escrita dinâmica, acessível, engajadora e inspiradora. Evite gírias informais excessivas ou jargões desnecessários.
- **Legibilidade e Escaneabilidade**: Crie parágrafos curtos (como máximo 2 a 3 linhas por parágrafo) e utilize espaçamento duplo entre eles para facilitar a leitura rápida. Use marcadores (bullet points ou emojis profissionais sutis) para elencar recursos, benefícios ou diferenciais.
- **Call to Action (CTA) Estratégico**: Finalize com uma chamada de ação profissional, clara e convidativa, adaptada ao canal (ex: "Fale com nossos especialistas", "Acesse o link na bio").
- **Hashtags de Negócios e Nicho**: Insira 5 a 8 hashtags corporativas pertinentes ao final, separadas do corpo do texto por uma linha em branco, combinando termos do nicho da empresa e a marca.
- **Sem Descrições de Layout**: A legenda deve conter única e exclusivamente os textos finais prontos para publicação. Sob nenhuma circunstância a legenda deve descrever o layout visual, cores, posições de elementos ou geometria da imagem.

REGRAS PARA PROMPT DE IMAGEM:
- Prompt no mesmo idioma da solicitação do usuário (não traduza para o inglês).
- **ESTRUTURA VISUAL E DIAGRAMAÇÃO DO POST DIGITAL:**
  - O prompt deve descrever o layout completo de uma postagem digital profissional (Graphic Design Social Media Post Layout) otimizada para a plataforma ${platform} e formato ${format}.
  - Se a imagem de referência for uma **arte gráfica ou infográfico estruturado**: o prompt da imagem final **deve clonar e descrever a diagramação estruturada e o posicionamento espacial exatos da imagem de referência** no campo "prompt_imagem". Mapeie a disposição geométrica da referência para o layout do post digital de ${platform} no formato ${format}: use a exata posição dos elementos descritos no JSON de referência (como logotipo, títulos, blocos de texto divididos em colunas, imagens integradas de smartphones/telas, botões de ação e elementos no rodapé), adaptando os tópicos de texto e ícones para o novo serviço do usuário ("${userPrompt}"), mas conservando a distribuição espacial, o grid, as formas geométricas de conexão e a estrutura da referência.
  - Se a imagem de referência for uma **fotografia comercial** sem elementos de texto (ou se não houver imagem de referência): o estilo deve ser **Commercial Photography / Realistic 3D Rendering**, com composição limpa, iluminação suave, e **sem textos ou tipografia na imagem**, retratando ambientes de negócios modernos e realistas que evitem visual de IA artificial.
- **CORES E TIPOGRAFIA DA MARCA:** Incorporar a paleta de cores corporativas nos elementos visuais, fundos, caixas de destaque, ícones e botões: Primária ${brandDna.colorPalette.primary}, Secundária ${brandDna.colorPalette.secondary}, Detalhe ${brandDna.colorPalette.accent}. Para os textos explicativos, títulos e elementos de copywriting na imagem, use as seguintes fontes e cores de tipografia oficiais da identidade visual da empresa:
  - Fonte Principal (para Títulos): ${brandDna.colorPalette.fontFamily || 'sans-serif'} (Cor da Fonte: ${brandDna.colorPalette.fontColor || '#1F2937'})
  - Fonte Secundária (para Corpo/Descrições): ${brandDna.colorPalette.fontFamilySecondary || 'sans-serif'} (Cor da Fonte: ${brandDna.colorPalette.fontColorSecondary || '#4B5563'}).
- **APLICAÇÃO OBRIGATÓRIA DE TIPOGRAFIA NO PROMPT DE IMAGEM:** O prompt final de imagem gerado no campo "prompt_imagem" **deve citar e exigir explicitamente** a renderização das fontes da marca. Escreva textualmente as instruções de fonte no prompt de imagem, por exemplo: "...com títulos estilizados na fonte principal ${brandDna.colorPalette.fontFamily || 'sans-serif'}..." e "...textos secundários utilizando a fonte secundária ${brandDna.colorPalette.fontFamilySecondary || 'sans-serif'}...". Nunca omita o nome das fontes no prompt de imagem final.
- **ENQUADRAMENTO:** Adaptar enquadramento e orientação descritos no prompt de acordo com o formato (Stories/Reels = vertical image framing 9:16; Feed Post/Carrossel = square image framing 1:1).
- **QUALIDADE:** Alta qualidade, 4K, fotorrealista para fotos / vetorial profissional de alta definição para elementos gráficos.

Responda SOMENTE JSON válido, sem markdown:
{
  "legenda": "",
  "prompt_imagem": ""
}`;
  }
}
