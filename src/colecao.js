// ═══════════════════════════════════════════════════════════════════
//  COLEÇÃO PHOTOCILA — ARQUIVO DE DADOS
// ═══════════════════════════════════════════════════════════════════
//
//  Este é o ÚNICO arquivo que você precisa editar para gerir a galeria.
//  Aqui ficam: seus dados de contato, os tamanhos/molduras/preços,
//  as SÉRIES e a lista de fotografias.
//
//  Regra de ouro: NÃO apague vírgulas, chaves { } ou colchetes [ ].
//  Eles são a "pontuação" que o site usa para entender os dados.
//  Se algo quebrar, geralmente é uma vírgula faltando ou sobrando.
//
// ═══════════════════════════════════════════════════════════════════


// ───────────────────────────────────────────────────────────────────
//  1. SEUS DADOS  — usados no rodapé e no botão de WhatsApp
// ───────────────────────────────────────────────────────────────────
export const PERFIL = {
  nome: "Priscila Corrêa",
  instagram: "@photocila",
  // Número no formato internacional, só dígitos: 55 + DDD + número.
  // Exemplo: "5511999999999"
  whatsapp: "5511977871502",
  // Foto sua para a página Sobre.
  // Cole aqui o link gerado pelo Cloudinary (igual às fotos da coleção).
  // Enquanto estiver vazio (""), aparece um espaço reservado elegante.
  foto: "",
};


// ───────────────────────────────────────────────────────────────────
//  2. TAMANHOS  — edite os preços (em reais) à vontade
// ───────────────────────────────────────────────────────────────────
export const TAMANHOS = [
  { id: "polaroid", label: "Polaroid",   dim: "—",            preco: 45  },
  { id: "10x15",    label: "10 × 15 cm", dim: "10 × 15 cm",   preco: 90  },
  { id: "a4",       label: "A4",         dim: "21 × 29,7 cm", preco: 180 },
  { id: "a3",       label: "A3",         dim: "29,7 × 42 cm", preco: 320 },
];


// ───────────────────────────────────────────────────────────────────
//  3. MOLDURAS  — "add" é o valor somado ao preço do tamanho
// ───────────────────────────────────────────────────────────────────
export const MOLDURAS = [
  { id: "none",  label: "Sem moldura",    add: 0   },
  { id: "black", label: "Moldura preta",  add: 120 },
  { id: "white", label: "Moldura branca", add: 120 },
];


// ───────────────────────────────────────────────────────────────────
//  4. SÉRIES TEMÁTICAS
// ───────────────────────────────────────────────────────────────────
//
//  Cada série é uma "gaveta" que agrupa fotografias por tema.
//
//  Para ADICIONAR uma série nova:
//    1. Copie um bloco { ... } abaixo e cole antes do colchete ]
//    2. Dê um id único, sem espaços e sem acentos (ex: "novos-mundos")
//    3. Escreva o nome e a descrição da série
//    4. Lembre de adicionar uma vírgula após o bloco anterior
//    5. Depois, em COLECAO (seção 5), inclua fotos com serieId igual ao id que você criou
//
//  Para REMOVER uma série: apague o bloco inteiro e a vírgula que sobrar.
//  (Certifique-se de mover ou remover as fotos associadas antes.)
//
//  O que cada campo significa:
//    id          → identificador único (sem espaços, sem acentos)
//    nome        → nome exibido na galeria
//    descricao   → texto curto de apresentação da série (1-2 frases)
//
// ───────────────────────────────────────────────────────────────────
export const SERIES = [
  {
    id: "presenca-e-territorio",
    nome: "Presença e Território",
    descricao: "Imagens sobre corpos que ocupam espaços públicos — a cidade como palco de resistência e pertencimento.",
  },
  {
    id: "vestigios",
    nome: "Vestígios",
    descricao: "O que permanece depois que as pessoas partem. Marcas, rastros, sinais de presença em espaços que guardam memória.",
  },
  {
    id: "afetos",
    nome: "Afetos",
    descricao: "Encontros, gestos e laços capturados no instante em que acontecem. O afeto como forma de habitar o mundo.",
  },
  {
    id: "resistencia",
    nome: "Resistência",
    descricao: "Corpos e vozes que persistem. Fotografias de movimentos, celebrações e disputas pelo direito de existir.",
  },
  {
    id: "palco",
    nome: "Palco",
    descricao: "Performances, rituais e cenas onde o cotidiano se transforma em espetáculo. A vida como encenação.",
  },
  {
    id: "devaneios-manuscritos",
    nome: "Devaneios Manuscritos",
    descricao: "Uma série especial que entrelaça fotografia e escrita. Imagens que carregam texto — ou textos que viram imagem.",
  },
];


// ───────────────────────────────────────────────────────────────────
//  5. AS FOTOGRAFIAS
// ───────────────────────────────────────────────────────────────────
//
//  Para ADICIONAR uma foto:
//    1. Copie um bloco { ... } abaixo
//    2. Cole antes do colchete ] que fecha a lista
//    3. Ponha uma vírgula após o bloco anterior
//    4. Preencha os campos com os dados da foto
//
//  Para REMOVER uma foto: apague o bloco { ... } inteiro
//    (e a vírgula que sobrar antes ou depois).
//
//  Para ADICIONAR uma foto a uma série nova:
//    Basta preencher o campo serieId com o id da série desejada
//    (exatamente como está escrito na seção SERIES acima).
//
//  O que cada campo significa:
//    id       → identificador único, sem espaços nem acentos (ex: "reflexo-paulista")
//    titulo   → nome da obra
//    local    → cidade, estado
//    ano      → ano do registro
//    serieId  → a qual série pertence — deve ser igual ao "id" de uma série em SERIES
//    texto    → texto curatorial curto, na sua voz
//    img      → link da imagem (cole aqui o link gerado pelo Cloudinary)
//
// ───────────────────────────────────────────────────────────────────
export const COLECAO = [
  {
    id: "luta-em-festa",
    titulo: "Luta em Festa",
    local: "São Paulo, SP",
    ano: 2026,
    serieId: "presenca-e-territorio",
    texto:
      "Os leques abertos contra o sol, a multidão que ocupa a avenida. Aqui a luta não pede licença: ela vira festa, e a festa vira território. Presença coletiva que recusa o apagamento — o corpo na rua como manifesto.",
    img: "https://res.cloudinary.com/dajbcvlcu/image/upload/f_auto,q_auto/_MG_1532_j5ea1j",
  },
  {
    id: "theatro-municipal",
    titulo: "Theatro Municipal",
    local: "São Paulo, SP",
    ano: 2025,
    serieId: "presenca-e-territorio",
    texto:
      "A arquitetura como memória pública. O Theatro permanece — testemunha de um centro que insiste em ser de todos. Pedra, sombra e a luz baixa de fim de tarde.",
    img: "https://res.cloudinary.com/dajbcvlcu/image/upload/f_auto,q_auto/Theatro_akmem3",
  },
  {
    id: "rastros-em-movimento",
    titulo: "Rastros em Movimento",
    local: "São Paulo, SP",
    ano: 2026,
    serieId: "presenca-e-territorio",
    texto:
      "O corpo que atravessa deixa rastro. A imagem não congela o instante — ela testemunha a travessia. Luz como memória viva, tempo que respira dentro do quadro.",
    img: "https://res.cloudinary.com/dajbcvlcu/image/upload/f_auto,q_auto/20260309_183622_zgywh1",
  },
  {
    id: "reflexos-da-noite",
    titulo: "Reflexos da Noite",
    local: "São Paulo, SP",
    ano: 2026,
    serieId: "presenca-e-territorio",
    texto:
      "A cidade noturna se duplica na água e na luz. Reflexo é também resistência: o que se vê duas vezes não se esquece. Atmosfera, deslocamento, a noite como matéria visual.",
    img: "https://res.cloudinary.com/dajbcvlcu/image/upload/f_auto,q_auto/20251212_192918_xuvsy6",
  },
];
