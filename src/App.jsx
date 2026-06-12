import React, { useState, useEffect } from "react";
import { PERFIL, TAMANHOS, MOLDURAS, COLECAO } from "./colecao";

// ─────────────────────────────────────────────────────────────
// PHOTOCILA — Galeria editorial de fotografia documental
// Os DADOS ficam em colecao.js. Este arquivo é a interface.
// ─────────────────────────────────────────────────────────────

const SERIF = '"Cormorant Garamond", "Times New Roman", Georgia, serif';
const SANS = '"Inter", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif';

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

export default function App() {
  const [view, setView] = useState({ page: "home" });
  useEffect(() => window.scrollTo({ top: 0 }), [view]);
  const open = (page, id) => setView({ page, id });

  return (
    <div style={{ background: "#fff", color: "#0a0a0a", minHeight: "100vh", fontFamily: SANS, WebkitFontSmoothing: "antialiased" }}>
      <Fonts />
      <Header onHome={() => open("home")} onGallery={() => open("gallery")} />
      {view.page === "home" && <Home onGallery={() => open("gallery")} onPhoto={(id) => open("photo", id)} />}
      {view.page === "gallery" && <Gallery onPhoto={(id) => open("photo", id)} />}
      {view.page === "photo" && (
        <PhotoPage photo={COLECAO.find((p) => p.id === view.id)} onBack={() => open("gallery")} onPhoto={(id) => open("photo", id)} />
      )}
      <Footer />
    </div>
  );
}

function Header({ onHome, onGallery }) {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.86)", backdropFilter: "saturate(180%) blur(12px)", borderBottom: "1px solid #ededed" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 32px", display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <button onClick={onHome} style={{ ...reset, fontWeight: 600, fontSize: 15, letterSpacing: "0.32em" }}>PHOTOCILA</button>
        <nav style={{ display: "flex", gap: 28 }}>
          <NavLink onClick={onGallery}>Coleção</NavLink>
          <NavLink onClick={onHome}>Sobre</NavLink>
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

function Home({ onGallery, onPhoto }) {
  const hero = COLECAO[0];
  return (
    <main>
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "96px 32px 72px", textAlign: "center" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.34em", textTransform: "uppercase", opacity: 0.5, margin: "0 0 36px" }}>Edição limitada</p>
        <h1 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(40px, 8vw, 92px)", lineHeight: 1.02, letterSpacing: "-0.01em", margin: "0 0 28px" }}>
          Fotografias documentais<br />em edição limitada
        </h1>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(17px, 2.4vw, 22px)", opacity: 0.62, maxWidth: 520, margin: "0 auto 44px", lineHeight: 1.5 }}>
          Presença, território e memória — o registro de quem ocupa o espaço.
        </p>
        <Underlined onClick={onGallery}>Explorar Coleção</Underlined>
      </section>
      {hero && <FullBleed photo={hero} onClick={() => onPhoto(hero.id)} />}
      <section style={{ maxWidth: 760, margin: "0 auto", padding: "120px 32px", textAlign: "center" }}>
        <p style={{ fontFamily: SERIF, fontSize: "clamp(22px, 3.4vw, 32px)", lineHeight: 1.45, fontWeight: 500, margin: 0 }}>
          Cada fotografia é um território.<br />Esta imagem merece ocupar uma parede.
        </p>
      </section>
    </main>
  );
}

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

function Gallery({ onPhoto }) {
  return (
    <main style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 32px 60px" }}>
      <div style={{ marginBottom: 64 }}>
        <p style={{ fontSize: 11, letterSpacing: "0.34em", textTransform: "uppercase", opacity: 0.5, margin: "0 0 16px" }}>Primeira coleção</p>
        <h2 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(30px, 5vw, 52px)", margin: 0, letterSpacing: "-0.01em" }}>Presença e território</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "56px 40px" }}>
        {COLECAO.map((p) => <GalleryItem key={p.id} photo={p} onClick={() => onPhoto(p.id)} />)}
      </div>
    </main>
  );
}

function GalleryItem({ photo, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ ...reset, textAlign: "left", cursor: "pointer", width: "100%" }}>
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

function PhotoPage({ photo, onBack, onPhoto }) {
  const [tam, setTam] = useState(TAMANHOS[2]);
  const [mol, setMol] = useState(MOLDURAS[0]);
  if (!photo) return null;
  const total = tam.preco + mol.add;
  const outras = COLECAO.filter((p) => p.id !== photo.id).slice(0, 2);

  return (
    <main style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 32px 60px" }}>
      <Underlined small onClick={onBack}>← Coleção</Underlined>
      <div className="photo-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.5fr) minmax(280px, 1fr)", gap: 72, marginTop: 40, alignItems: "start" }}>
        <div style={{ background: "#f6f6f6" }}>
          <img src={photo.img} alt={photo.titulo} style={{ width: "100%", display: "block", objectFit: "cover" }} />
        </div>
        <div style={{ position: "sticky", top: 96 }}>
          <h1 style={{ fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(28px, 4vw, 40px)", margin: "0 0 6px", lineHeight: 1.1 }}>{photo.titulo}</h1>
          <p style={{ fontSize: 13, letterSpacing: "0.04em", opacity: 0.55, margin: "0 0 28px" }}>{photo.local}, {photo.ano}</p>
          <p style={{ fontFamily: SERIF, fontSize: 18, lineHeight: 1.6, opacity: 0.82, margin: "0 0 40px" }}>{photo.texto}</p>

          <Spec label="Série">{photo.serie}</Spec>
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
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.78")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
            Adquirir pelo WhatsApp
          </a>
          <p style={{ fontSize: 11, opacity: 0.4, textAlign: "center", marginTop: 14, letterSpacing: "0.03em" }}>Produção sob encomenda · combinamos tudo na conversa</p>
        </div>
      </div>

      <div style={{ marginTop: 120 }}>
        <p style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", opacity: 0.5, marginBottom: 40 }}>Na mesma coleção</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "40px" }}>
          {outras.map((p) => <GalleryItem key={p.id} photo={p} onClick={() => onPhoto(p.id)} />)}
        </div>
      </div>
    </main>
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
    <button onClick={onClick} style={{ ...reset, padding: "9px 16px", fontSize: 13, letterSpacing: "0.02em", cursor: "pointer", border: "1px solid", borderColor: active ? "#0a0a0a" : "#dcdcdc", background: active ? "#0a0a0a" : "transparent", color: active ? "#fff" : "#0a0a0a", transition: "all .2s" }}>
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
