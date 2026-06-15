// ═══════════════════════════════════════════════════════════════════
//  COLEÇÃO PHOTOCILA — ARQUIVO DE DADOS
// ═══════════════════════════════════════════════════════════════════
//
//  Este é o ÚNICO arquivo que você precisa editar para gerir a galeria.
//  Aqui ficam: seus dados de contato, os tamanhos/molduras/preços,
//  e a lista de fotografias.
//
//  Regra de ouro: NÃO apague vírgulas, chaves { } ou colchetes [ ].
//  Eles são a "pontuação" que o site usa para entender os dados.
//  Se algo quebrar, geralmente é uma vírgula faltando.
//
// ═══════════════════════════════════════════════════════════════════


// ───────────────────────────────────────────────────────────────────
//  1. SEUS DADOS  — usados no rodapé e no botão de WhatsApp
// ───────────────────────────────────────────────────────────────────
export const PERFIL = {
  nome: "Priscila Corrêa",
  instagram: "@photocila",
  // Número no formato internacional, só dígitos: 55 + DDD + número.
  // Exemplo de SP: "5511999999999"
  whatsapp: "5511977871502",
};


// ───────────────────────────────────────────────────────────────────
//  2. TAMANHOS  — edite os preços (em reais) à vontade
// ───────────────────────────────────────────────────────────────────
export const TAMANHOS = [
  { id: "polaroid", label: "Polaroid",  dim: "—",            preco: 45  },
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
//  4. AS FOTOGRAFIAS
// ───────────────────────────────────────────────────────────────────
//
//  Para ADICIONAR uma foto: copie um bloco inteiro { ... } abaixo,
//  cole logo após o último (antes do colchete ] que fecha a lista),
//  ponha uma vírgula entre eles, e troque os valores.
//
//  Para REMOVER uma foto: apague o bloco { ... } dela inteiro
//  (e a vírgula que sobra).
//
//  O que cada campo significa:
//    id    → identificador único, sem espaços nem acentos (ex: "reflexo-paulista")
//    titulo→ nome da obra
//    local → cidade, estado
//    ano   → ano do registro
//    serie → a qual série pertence (aparece na ficha)
//    texto → texto curatorial curto, na sua voz
//    img   → link da imagem (cole aqui o link gerado pelo Cloudinary)
//
// ───────────────────────────────────────────────────────────────────
export const COLECAO = [
  {
    id: "luta-em-festa",
    titulo: "Luta em Festa",
    local: "São Paulo, SP",
    ano: 2025,
    serie: "Orgulho",
    texto:
      "Os leques abertos contra o sol, a multidão que ocupa a avenida. Aqui a luta não pede licença: ela vira festa, e a festa vira território. Presença coletiva que recusa o apagamento — o corpo na rua como manifesto.",
    img: "https://res.cloudinary.com/dajbcvlcu/image/upload/f_auto,q_auto/_MG_1532_j5ea1j",
  },
  {
    id: "theatro-municipal",
    titulo: "Theatro Municipal",
    local: "São Paulo, SP",
    ano: 2025,
    serie: "Território",
    texto:
      "A arquitetura como memória pública. O Theatro permanece — testemunha de um centro que insiste em ser de todos. Pedra, sombra e a luz baixa de fim de tarde.",
    img: "https://res.cloudinary.com/dajbcvlcu/image/upload/f_auto,q_auto/Theatro_akmem3",
  },
  {
    id: "rastros-em-movimento",
    titulo: "Rastros em Movimento",
    local: "São Paulo, SP",
    ano: 2026,
    serie: "Um Olhar em Movimento",
    texto:
      "O corpo que atravessa deixa rastro. A imagem não congela o instante — ela testemunha a travessia. Luz como memória viva, tempo que respira dentro do quadro.",
    img: "https://res.cloudinary.com/dajbcvlcu/image/upload/f_auto,q_auto/20260309_183622_zgywh1",
  },
  {
    id: "reflexos-da-noite",
    titulo: "Reflexos da Noite",
    local: "São Paulo, SP",
    ano: 2025,
    serie: "Um Olhar em Movimento",
    texto:
      "A cidade noturna se duplica na água e na luz. Reflexo é também resistência: o que se vê duas vezes não se esquece. Atmosfera, deslocamento, a noite como matéria visual.",
    img: "https://res.cloudinary.com/dajbcvlcu/image/upload/f_auto,q_auto/20251212_192918_xuvsy6",
  },
];
