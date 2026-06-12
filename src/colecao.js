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
    id: "reflexo-paulista",
    titulo: "Reflexo na Avenida Paulista",
    local: "São Paulo, SP",
    ano: 2025,
    serie: "SP Pride",
    texto:
      "Durante a SP Pride, a cidade se dobra sobre si mesma. O vidro de um edifício devolve a multidão à rua. Quem ocupa também é ocupado pelo espaço — presença que recusa o esquecimento.",
    img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "theatro-municipal",
    titulo: "Theatro Municipal",
    local: "São Paulo, SP",
    ano: 2025,
    serie: "Território",
    texto:
      "A arquitetura como memória pública. O Theatro permanece — testemunha de um centro que insiste em ser de todos. Pedra, sombra e a luz baixa de fim de tarde.",
    img: "https://res.cloudinary.com/dajbcvlcu/image/upload/f_auto,q_auto/Theatro_wamfvo",
  },
  {
    id: "leques-parada",
    titulo: "Leques da Parada",
    local: "São Paulo, SP",
    ano: 2025,
    serie: "Afeto coletivo",
    texto:
      "Gesto e som. O leque abre o ar e marca o corpo no espaço. Afeto que se faz coletivo, território que se faz festa.",
    img: "https://images.unsplash.com/photo-1561612217-e1d5e3a9b8d6?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "salvador",
    titulo: "Salvador",
    local: "Salvador, BA",
    ano: 2024,
    serie: "Território",
    texto:
      "A primeira capital, a luz dura do Nordeste. Salvador como raiz e como presente — memória negra que ocupa e resiste no cotidiano da cidade.",
    img: "https://images.unsplash.com/photo-1574870111867-089730e5a72b?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "bandeira-manifestacao",
    titulo: "Bandeira em manifestação",
    local: "São Paulo, SP",
    ano: 2025,
    serie: "Presença",
    texto:
      "O pano levantado contra o céu. A bandeira não decora: convoca. Registro de um instante em que o corpo coletivo toma a rua e o ar.",
    img: "https://images.unsplash.com/photo-1591189824344-9c4f2e2a5e2b?q=80&w=1600&auto=format&fit=crop",
  },
];
