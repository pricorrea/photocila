import React, { useState, useEffect } from "react";
import { PERFIL, TAMANHOS, MOLDURAS, SERIES, COLECAO } from "./colecao";

// ─────────────────────────────────────────────────────────────────
// PHOTOCILA — Galeria editorial de fotografia documental
// Os DADOS ficam em colecao.js. Este arquivo é a interface.
// ─────────────────────────────────────────────────────────────────

const SERIF = '"Cormorant Garamond", "Times New Roman", Georgia, serif';
const SANS  = '"Inter", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif';

const brl = (n) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// Monta o link de WhatsApp com a mensagem já preenchida
function linkWhatsApp(foto, tamanho, moldura, total) {
  const msg =
    `Olá, Priscila! Tenho interesse nesta fotografia:\n\n` +
    `• Obra: ${foto.titulo} (${foto.local}, ${foto.ano})\n` +
    `• Tamanho: ${tamanho.label}\n` +
    `• Moldura: ${moldura.label}\n` +
    `• Valor: ${brl(total)}\n\n` +
    `Pode me passar os próximos passos?`;
  return `https://wa.me/${PERFIL.whatsapp}?text=${encodeURIComponent(msg)}`;
}

// Retorna as fotos de uma série específica
function fotosDaSerie(serieId) {
  return COLECAO.filter((p) => p.serieId === serieId);
}

// ─────────────────────────────────────────────────────────────────
// APP — roteador simples por estado
// ─────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState({ page: "home" });

  useEffect(() => window.scrollTo({ top: 0 }), [view]);

  const nav = {
    home:     ()          => setView({ page: "home" }),
    colecoes: ()          => setView({ page: "colecoes" }),
    serie:    (serieId)   => setView({ page: "serie", serieId }),
    photo:    (id)        => setView({ page: "photo", id }),
    sobre:    ()          => setView({ page: "sobre" }),
  };

  return (
    <div style={{ background: "#fff", color: "#0a0a0a", minHeight: "100vh", fontFamily: SANS, WebkitFontSmoothing: "antialiased" }}>
      <Fonts />
      <Header nav={nav} />

      {view.page === "home"     && <Home nav={nav} />}
      {view.page === "colecoes" && <Colecoes nav={nav} />}
      {view.page === "serie"    && <SeriePage serieId={view.serieId} nav={nav} />}
      {view.page === "photo"    && (
        <PhotoPage
          photo={COLECAO.find((p) => p.id === view.id)}
          nav={nav}
        />
      )}
      {view.page === "sobre"    && <Sobre nav={nav} />}

      <Footer />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// HEADER
// ─────────────────────────────────────────────────────────────────
function Header({ nav }) {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.86)", backdropFilter: "saturate(180%) blur(12px)", borderBottom: "1px solid #ededed" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 32px", display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <button onClick={nav.home} style={{ ...reset, fontWeight: 600, fontSize: 15, letterSpacing: "0.32em" }}>PHOTOCILA</button>
        <nav style={{ display: "flex", gap: 28 }}>
          <NavLink onClick={nav.colecoes}>Coleções</NavLink>
          <NavLink onClick={nav.sobre}>Sobre</NavLink>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ children, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ ...reset, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", opacity: h ? 1 : 0.55, transition: "opacity .3s" }}>
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────
// HOME
// ─────────────────────────────────────────────────────────────────
function Home({ nav }) {
  const hero = COLECAO.find((p) => p.id === "luta-em-festa") || COLECAO[0];

  return (
    <main>
      {/* Texto de abertura */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 32px 72px", textAlign: "center" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.34em", textTransform: "uppercase", opacity: 0.5, margin: "0 0 36px" }}>Fotografia documental</p>

        <h1 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(40px, 8vw, 92px)", lineHeight: 1.02, letterSpacing: "-0.01em", margin: "0 0 28px" }}>
          Fotografias sobre presença,<br />território e memória.
        </h1>

        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(16px, 2.2vw, 20px)", opacity: 0.65, maxWidth: 640, margin: "0 auto 44px", lineHeight: 1.7 }}>
          Uma coleção de imagens produzidas entre cidades, encontros, celebrações e deslocamentos.
          Fotografias que observam as formas de ocupar o espaço e os vestígios deixados por quem
          passa por ele. Explorar a galeria é percorrer diferentes narrativas sobre permanência,
          pertencimento e transformação.
        </p>

        <Underlined onClick={nav.colecoes}>Explorar a galeria</Underlined>
      </section>

      {/* Foto de destaque */}
      {hero && <FullBleed photo={hero} onClick={() => nav.photo(hero.id)} />}

      {/* Vitrine de séries */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "120px 32px 80px" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.34em", textTransform: "uppercase", opacity: 0.5, margin: "0 0 16px" }}>Coleções</p>
        <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(28px, 4vw, 46px)", margin: "0 0 64px", letterSpacing: "-0.01em" }}>Séries temáticas</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2px" }}>
          {SERIES.map((serie) => {
            const fotos = fotosDaSerie(serie.id);
            const capa  = fotos[0];
            return (
              <SerieCard key={serie.id} serie={serie} capa={capa} onClick={() => nav.serie(serie.id)} />
            );
          })}
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────
// COLEÇÕES — lista todas as séries
// ─────────────────────────────────────────────────────────────────
function Colecoes({ nav }) {
  return (
    <main style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 32px 100px" }}>
      <div style={{ marginBottom: 64 }}>
        <p style={{ fontSize: 11, letterSpacing: "0.34em", textTransform: "uppercase", opacity: 0.5, margin: "0 0 16px" }}>Galeria</p>
        <h1 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(30px, 5vw, 52px)", margin: 0, letterSpacing: "-0.01em" }}>Coleções</h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "56px 40px" }}>
        {SERIES.map((serie) => {
          const fotos = fotosDaSerie(serie.id);
          const capa  = fotos[0];
          return (
            <SerieCard key={serie.id} serie={serie} capa={capa} onClick={() => nav.serie(serie.id)} showDesc />
          );
        })}
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────
// CARD DE SÉRIE — usado na Home e em Coleções
// ─────────────────────────────────────────────────────────────────
function SerieCard({ serie, capa, onClick, showDesc }) {
  const [h, setH] = useState(false);
  const temFotos = !!capa;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{ ...reset, textAlign: "left", cursor: "pointer", width: "100%" }}
    >
      {/* Imagem ou placeholder "Em breve" */}
      <div style={{ width: "100%", overflow: "hidden", background: "#f6f6f6", aspectRatio: "4 / 3", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        {temFotos ? (
          <img
            src={capa.img}
            alt={serie.nome}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: h ? "scale(1.03)" : "scale(1)", transition: "transform 1.1s cubic-bezier(.16,1,.3,1)", filter: h ? "none" : "grayscale(8%)" }}
          />
        ) : (
          <div style={{ textAlign: "center", padding: "32px" }}>
            <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 17, opacity: 0.38, margin: "0 0 6px" }}>Em breve</p>
            <p style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.25, margin: 0 }}>Série em construção</p>
          </div>
        )}
      </div>

      {/* Nome e descrição */}
      <div style={{ marginTop: 16 }}>
        <span style={{
          fontFamily: SERIF, fontStyle: "italic", fontSize: 20, display: "inline-block",
          marginBottom: showDesc ? 8 : 0,
          borderBottom: "1px solid",
          borderColor: h ? "rgba(10,10,10,0.6)" : "transparent",
          transition: "border-color .3s",
          paddingBottom: 1,
        }}>{serie.nome}</span>
        {showDesc && (
          <p style={{ fontSize: 13, opacity: 0.55, lineHeight: 1.6, margin: "8px 0 4px" }}>{serie.descricao}</p>
        )}
        {temFotos && (
          <span style={{ fontSize: 11, letterSpacing: "0.06em", opacity: 0.35, display: "block" }}>
            {fotosDaSerie(serie.id).length} {fotosDaSerie(serie.id).length === 1 ? "fotografia" : "fotografias"}
          </span>
        )}
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────
// PÁGINA DE SÉRIE — fotos de uma série específica
// ─────────────────────────────────────────────────────────────────
function SeriePage({ serieId, nav }) {
  const serie = SERIES.find((s) => s.id === serieId);
  const fotos = fotosDaSerie(serieId);

  if (!serie) return null;

  return (
    <main style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 32px 100px" }}>
      {/* Voltar */}
      <Underlined small onClick={nav.colecoes}>← Coleções</Underlined>

      {/* Cabeçalho da série */}
      <div style={{ margin: "48px 0 64px" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.34em", textTransform: "uppercase", opacity: 0.5, margin: "0 0 16px" }}>Série</p>
        <h1 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(30px, 5vw, 52px)", margin: "0 0 20px", letterSpacing: "-0.01em" }}>{serie.nome}</h1>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(16px, 2vw, 20px)", opacity: 0.65, maxWidth: 560, lineHeight: 1.6, margin: 0 }}>{serie.descricao}</p>
      </div>

      {/* Fotos ou aviso "Em breve" */}
      {fotos.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "56px 40px" }}>
          {fotos.map((p) => (
            <GalleryItem key={p.id} photo={p} onClick={() => nav.photo(p.id)} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "80px 32px" }}>
          <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(20px, 3vw, 28px)", opacity: 0.4, margin: "0 0 16px" }}>Esta série está em construção.</p>
          <p style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.25 }}>As fotografias serão publicadas em breve.</p>
        </div>
      )}
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────
// FOTO INDIVIDUAL — mantém a ficha de catálogo de museu
// ─────────────────────────────────────────────────────────────────
function PhotoPage({ photo, nav }) {
  const [tam, setTam] = useState(TAMANHOS[2]);
  const [mol, setMol] = useState(MOLDURAS[0]);
  if (!photo) return null;

  const total  = tam.preco + mol.add;
  const serie  = SERIES.find((s) => s.id === photo.serieId);
  const outras = COLECAO.filter((p) => p.id !== photo.id && p.serieId === photo.serieId).slice(0, 2);

  return (
    <main style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 32px 60px" }}>
      {/* Voltar para a série */}
      <Underlined small onClick={() => nav.serie(photo.serieId)}>← {serie ? serie.nome : "Coleções"}</Underlined>

      <div className="photo-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.5fr) minmax(280px, 1fr)", gap: 72, marginTop: 40, alignItems: "start" }}>
        {/* Imagem */}
        <div style={{ background: "#f6f6f6" }}>
          <img src={photo.img} alt={photo.titulo} style={{ width: "100%", display: "block", objectFit: "cover" }} />
        </div>

        {/* Ficha de catálogo */}
        <div style={{ position: "sticky", top: 96 }}>
          <h1 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(28px, 4vw, 40px)", margin: "0 0 6px", lineHeight: 1.1 }}>{photo.titulo}</h1>
          <p style={{ fontSize: 13, letterSpacing: "0.04em", opacity: 0.55, margin: "0 0 28px" }}>{photo.local}, {photo.ano}</p>
          <p style={{ fontFamily: SERIF, fontSize: 18, lineHeight: 1.6, opacity: 0.82, margin: "0 0 40px" }}>{photo.texto}</p>

          <Spec label="Série">{serie ? serie.nome : photo.serieId}</Spec>
          <Spec label="Edição">Tiragem limitada · numerada e assinada</Spec>
          <Spec label="Impressão">Fine art, papel algodão</Spec>

          <div style={{ height: 1, background: "#ededed", margin: "32px 0" }} />

          <FieldLabel>Tamanho</FieldLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
            {TAMANHOS.map((s) => <Chip key={s.id} active={tam.id === s.id} onClick={() => setTam(s)}>{s.label}</Chip>)}
          </div>

          <FieldLabel>Moldura</FieldLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}>
            {MOLDURAS.map((f) => <Chip key={f.id} active={mol.id === f.id} onClick={() => setMol(f)}>{f.label}</Chip>)}
          </div>

          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 24 }}>
            <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.5 }}>{tam.dim !== "—" ? tam.dim : "Polaroid"}</span>
            <span style={{ fontFamily: SERIF, fontSize: 30, fontWeight: 500 }}>{brl(total)}</span>
          </div>

          <a href={linkWhatsApp(photo, tam, mol, total)} target="_blank" rel="noopener noreferrer"
            style={{ display: "block", textAlign: "center", padding: "16px", background: "#0a0a0a", color: "#fff", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", transition: "opacity .3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.78")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
            Adquirir pelo WhatsApp
          </a>
          <p style={{ fontSize: 11, opacity: 0.4, textAlign: "center", marginTop: 14, letterSpacing: "0.03em" }}>Produção sob encomenda · combinamos tudo na conversa</p>
        </div>
      </div>

      {/* Outras fotos da mesma série */}
      {outras.length > 0 && (
        <div style={{ marginTop: 120 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", opacity: 0.5, marginBottom: 40 }}>Na mesma série</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "40px" }}>
            {outras.map((p) => <GalleryItem key={p.id} photo={p} onClick={() => nav.photo(p.id)} />)}
          </div>
        </div>
      )}
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────
// SOBRE
// ─────────────────────────────────────────────────────────────────
function Sobre({ nav }) {
  return (
    <main style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 32px 120px" }}>

      {/* Cabeçalho + foto */}
      <div style={{ display: "grid", gridTemplateColumns: PERFIL.foto ? "1fr 1fr" : "1fr", gap: "80px", alignItems: "start", marginBottom: 80 }}>

        {/* Texto */}
        <div style={{ maxWidth: 680 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.34em", textTransform: "uppercase", opacity: 0.5, margin: "0 0 24px" }}>Sobre</p>
          <h1 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(30px, 5vw, 52px)", margin: "0 0 48px", letterSpacing: "-0.01em", lineHeight: 1.1 }}>PHOTOCILA</h1>

          <p style={{ fontFamily: SERIF, fontSize: "clamp(18px, 2.4vw, 22px)", lineHeight: 1.7, opacity: 0.85, margin: "0 0 32px" }}>
            PHOTOCILA é o projeto autoral da fotógrafa Priscila Corrêa.
          </p>
          <p style={{ fontFamily: SERIF, fontSize: "clamp(17px, 2vw, 20px)", lineHeight: 1.7, opacity: 0.72, margin: "0 0 24px" }}>
            Meu trabalho nasce da observação das relações entre pessoas, cidades e memória. Através
            da fotografia documental, investigo as diferentes formas de presença que transformam os
            espaços que atravessamos.
          </p>
          <p style={{ fontFamily: SERIF, fontSize: "clamp(17px, 2vw, 20px)", lineHeight: 1.7, opacity: 0.72, margin: "0 0 24px" }}>
            Interesso-me pelos encontros, pelas celebrações, pelos movimentos coletivos, pelos
            afetos e pelos vestígios que permanecem depois que o instante passa. Mais do que
            registrar acontecimentos, procuro construir imagens que preservem a experiência de
            estar presente.
          </p>
          <p style={{ fontFamily: SERIF, fontSize: "clamp(17px, 2vw, 20px)", lineHeight: 1.7, opacity: 0.72, margin: 0 }}>
            Esta galeria reúne coleções fotográficas organizadas a partir dessas observações. Cada
            obra faz parte de uma narrativa maior sobre território, permanência e as marcas que
            deixamos no mundo.
          </p>
        </div>

        {/* Foto — aparece só quando PERFIL.foto estiver preenchido */}
        {PERFIL.foto && (
          <div style={{ position: "sticky", top: 96 }}>
            <img
              src={PERFIL.foto}
              alt={PERFIL.nome}
              style={{ width: "100%", display: "block", objectFit: "cover", aspectRatio: "3 / 4", background: "#f6f6f6" }}
            />
            <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14, opacity: 0.45, marginTop: 12, textAlign: "center" }}>{PERFIL.nome}</p>
          </div>
        )}
      </div>

      {/* Divisor */}
      <div style={{ height: 1, background: "#ededed", maxWidth: 680, marginBottom: 80 }} />

      {/* Quatro pilares */}
      <div style={{ maxWidth: 680 }}>
        <p style={{ fontSize: 11, letterSpacing: "0.34em", textTransform: "uppercase", opacity: 0.5, margin: "0 0 32px" }}>Os quatro pilares</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0 40px", marginBottom: 40 }}>
          {["Presença", "Território", "Memória", "Vestígios"].map((pilar, i) => (
            <span key={i} style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(22px, 3vw, 30px)", opacity: 0.8 }}>{pilar}</span>
          ))}
        </div>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(18px, 2.2vw, 22px)", opacity: 0.55, margin: "0 0 56px", lineHeight: 1.5 }}>
          "Fotografo aquilo que permanece depois que o instante já passou."
        </p>
      </div>

      {/* CTA para a galeria */}
      <Underlined onClick={nav.colecoes}>Explorar as coleções</Underlined>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────
// COMPONENTES REUTILIZÁVEIS
// ─────────────────────────────────────────────────────────────────

function FullBleed({ photo, onClick }) {
  return (
    <button onClick={onClick} style={{ ...reset, display: "block", width: "100%", cursor: "pointer" }}>
      <div style={{ width: "100%", overflow: "hidden" }}>
        <img src={photo.img} alt={photo.titulo} style={{ width: "100%", height: "82vh", objectFit: "cover", display: "block" }} />
      </div>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "18px 32px 0", display: "flex", justifyContent: "space-between", fontSize: 12, letterSpacing: "0.06em", opacity: 0.6 }}>
        <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16, opacity: 1 }}>{photo.titulo}</span>
        <span>{photo.local} · {photo.ano}</span>
      </div>
    </button>
  );
}

function GalleryItem({ photo, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ ...reset, textAlign: "left", cursor: "pointer", width: "100%" }}>
      <div style={{ width: "100%", overflow: "hidden", background: "#f6f6f6" }}>
        <img src={photo.img} alt={photo.titulo}
          style={{ width: "100%", aspectRatio: "4 / 5", objectFit: "cover", display: "block", transform: h ? "scale(1.03)" : "scale(1)", transition: "transform 1.1s cubic-bezier(.16,1,.3,1)", filter: h ? "none" : "grayscale(8%)" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 16, gap: 16 }}>
        <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 18 }}>{photo.titulo}</span>
        <span style={{ fontSize: 11, letterSpacing: "0.06em", opacity: 0.5, whiteSpace: "nowrap" }}>{photo.local} · {photo.ano}</span>
      </div>
    </button>
  );
}

function Spec({ label, children }) {
  return (
    <div style={{ display: "flex", gap: 16, padding: "9px 0", borderTop: "1px solid #f0f0f0" }}>
      <span style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.42, width: 84, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 13, opacity: 0.78, lineHeight: 1.5 }}>{children}</span>
    </div>
  );
}

function FieldLabel({ children }) {
  return <p style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.5, margin: "0 0 12px" }}>{children}</p>;
}

function Chip({ children, active, onClick }) {
  return (
    <button onClick={onClick}
      style={{ ...reset, padding: "9px 16px", fontSize: 13, letterSpacing: "0.02em", cursor: "pointer", border: "1px solid", borderColor: active ? "#0a0a0a" : "#dcdcdc", background: active ? "#0a0a0a" : "transparent", color: active ? "#fff" : "#0a0a0a", transition: "all .2s" }}>
      {children}
    </button>
  );
}

function Underlined({ children, onClick, small }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ ...reset, fontSize: small ? 12 : 13, letterSpacing: "0.16em", textTransform: "uppercase", cursor: "pointer", paddingBottom: 4, borderBottom: "1px solid", borderColor: h ? "#0a0a0a" : "rgba(10,10,10,0.25)", transition: "border-color .3s" }}>
      {children}
    </button>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #ededed", marginTop: 40 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 32px", display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 16 }}>
        <span style={{ fontWeight: 600, fontSize: 13, letterSpacing: "0.3em" }}>PHOTOCILA</span>
        <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 14, opacity: 0.5 }}>{PERFIL.nome} — fotografia documental</span>
        <span style={{ fontSize: 11, opacity: 0.4, letterSpacing: "0.06em" }}>{PERFIL.instagram}</span>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────
// ESTILOS GLOBAIS
// ─────────────────────────────────────────────────────────────────
const reset = { border: "none", background: "none", padding: 0, margin: 0, font: "inherit", color: "#0a0a0a", fontFamily: SANS };

function Fonts() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Inter:wght@400;500;600&display=swap');
      * { box-sizing: border-box; }
      body { margin: 0; }
      ::selection { background: #0a0a0a; color: #fff; }
      @media (max-width: 760px) {
        .photo-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        .photo-grid > div:last-child { position: static !important; }
      }
      @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
    `}</style>
  );
}
