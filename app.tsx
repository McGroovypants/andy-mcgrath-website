import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

// ── Video data ──────────────────────────────────────────────────────────────
const VIDEOS = [
  { id: "F_Ae4IZWbXM", title: "Behind the Sun", meta: "Latest Release · 2024" },
  { id: "Yc9AXWy8Ckg", title: "Alive on Fire", meta: "Max Maxwell Remix · No.1 SoundCloud NZ Charts 2024" },
  { id: "O9VfBAGyVf4", title: "Cosmic Energy", meta: "with Jeramiah Ross & Duncan McCann" },
  { id: "nE1-to038-M", title: "Silent Tribe", meta: "with Jeramiah Ross" },
  { id: "M6NPM9E3pFY", title: "Houghton Bay", meta: "Single · 2024" },
  { id: "-KGwDrZgQlo", title: "Design the Sky", meta: "Latest Release" },
  { id: "3a5JXTtinUE", title: "Full Moon Risin'", meta: "The Studio Sessions" },
];

// ── Streaming platforms ────────────────────────────────────────────────────
const PLATFORMS = [
  {
    name: "Spotify",
    url: "https://open.spotify.com/user/director.andy1",
    desc: "Stream on Spotify",
    color: "#1DB954",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="#1DB954">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
  },
  {
    name: "Bandcamp",
    url: "https://andymcgrath.bandcamp.com",
    desc: "Buy & stream on Bandcamp",
    color: "#1DA0C3",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="#1DA0C3">
        <path d="M0 18.75l7.437-13.5H24l-7.438 13.5z"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@Andy_McGrath",
    desc: "Watch music videos",
    color: "#FF0000",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="#FF0000">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
];

// ── McGrath typography helper ───────────────────────────────────────────────
function McG({ prefix }: { prefix?: string }) {
  return <>{prefix ? `${prefix} ` : ""}M<span className="mc-raised">c</span>Grath</>;
}

// ── Nav ────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <ul className="nav-links">
        <li><a href="#videos">Videos</a></li>
        <li><a href="#story">Story</a></li>
        <li><a href="#listen">Listen</a></li>
      </ul>
    </nav>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg" />
      <h1 className="hero-title">
        Andy <span>M<span className="mc-raised">c</span>Grath</span>
      </h1>
      <p className="hero-location">Te Whanganui-a-Tara / Wellington</p>
      <p className="hero-tagline">Singer · Songwriter · Performer</p>
      <div className="hero-cta">
        <a href="#videos" className="btn-primary">Watch Videos</a>
        <a href="#listen" className="btn-outline">Stream Music</a>
      </div>
      <div className="hero-scroll">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}

// ── Videos ─────────────────────────────────────────────────────────────────
function Videos() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <section className="section videos-section" id="videos">
      <div className="section-inner">
        <div className="section-label">Music Videos</div>
        <h2 className="section-title">Watch &amp; Listen</h2>
        <p className="section-subtitle">
          Six tracks from the studio and the stage — each one a story from a life lived in music.
        </p>
        <div className="milestone">
          <span className="milestone-dot" />
          Alive on Fire · No.1 on SoundCloud NZ Charts · 2024
        </div>
        <div className="videos-grid">
          {VIDEOS.map((v) =>
            active === v.id ? (
              <div key={v.id} className="video-card active">
                <div className="video-embed">
                  <iframe
                    src={`https://www.youtube.com/embed/${v.id}?autoplay=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={v.title}
                  />
                </div>
                <div className="video-info">
                  <div className="video-title">{v.title}</div>
                  <div className="video-meta">{v.meta}</div>
                  <button
                    className="btn-outline"
                    style={{ marginTop: "0.75rem", fontSize: "0.7rem", padding: "0.5rem 1rem" }}
                    onClick={() => setActive(null)}
                  >
                    ✕ Close
                  </button>
                </div>
              </div>
            ) : (
              <div key={v.id} className="video-card" onClick={() => setActive(v.id)}>
                <div className="video-thumb">
                  <img
                    src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                    alt={v.title}
                  />
                  <div className="play-btn">
                    <div className="play-icon">
                      <svg viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="video-info">
                  <div className="video-title">{v.title}</div>
                  <div className="video-meta">{v.meta}</div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

// ── Story ──────────────────────────────────────────────────────────────────
function Story() {
  return (
    <section className="section story-section" id="story">
      <div className="section-inner">
        <div className="section-label">The Story</div>
        <h2 className="section-title">A Life in Music</h2>
        <div className="story-layout">
          <div className="story-text">
            <p>
              <strong><McG prefix="Andy" /></strong> is a Wellington-based singer-songwriter whose modern-nostalgia sound is rooted
              in classic Kiwi music traditions. A versatile multi-instrumentalist and vocalist, Andy weaves together
              indie, rock, and blues influences with a contemporary edge — equally at home on a small stage or a
              festival field.
            </p>
            <p>
              Born into an Irish family in Wellington where singing was the soundtrack to life, Andy entered and won
              his first singing competition at The Annual Irish Festival while barely at school. At intermediate he
              learned violin, but the first time he sat behind a drum kit, rock music called him away and never
              gave him back.
            </p>
            <p>
              At 19, Andy joined established songwriter <strong>Robert Thirtle</strong> — active in the Manawatu
              indie scene with bands like Cement Garden — along with bass player <strong>Kane Haitana</strong> to
              form <strong>The Carousers</strong>. The trio moved fast, securing an EP deal with Meltdown Records
              before the label folded. When Thirtle left for London, Andy picked up the guitar and started writing.
            </p>
            <p>
              At the time of the '91 Rugby World Cup, Andy recorded C'mon All Blacks, which earned airtime
              on the National Radio Network — enough to inspire his next band, <strong>Andy &amp; the Sprigs</strong>.
              Wanting to perform more, he formed <strong>BDI's</strong>, spending three years as front man and
              guitarist across the North Island, reaching the finals of Battle of the Bands in Wanganui — sharing
              a bill, unknowingly at the time, with future bandmate <strong>Tony Kemp</strong> on drums.
            </p>
            <p>
              After time with family, Andy composed soundtracks for NZ documentaries and TV series including
              Motorway Patrol and SCU (Serious Crash Unit) for Greenstone Pictures.
              He then threw himself back into live music, eventually finding his current home with
              <strong> The MacTones</strong>, where he plays guitar, harmonica, and shares lead vocals.
            </p>
            <p>
              In 2024, Alive on Fire — remixed by <strong>Max Maxwell</strong> — reached <strong>No.1
              on the SoundCloud NZ Charts</strong>. The milestone felt right for an artist who has spent a lifetime
              lighting up rooms.
            </p>
          </div>

          <div className="story-highlights">
            <div className="highlight-card">
              <div className="highlight-year">Early Days</div>
              <div className="highlight-text">Won first singing competition at the Annual Irish Festival in Wellington. Violin at intermediate. Rock music via drum kit — no going back.</div>
            </div>
            <div className="highlight-card">
              <div className="highlight-year">The Carousers</div>
              <div className="highlight-text">Formed with Robert Thirtle and Kane Haitana. Secured EP deal with Meltdown Records. Began writing own songs after the band dissolved.</div>
            </div>
            <div className="highlight-card">
              <div className="highlight-year">1991 — Andy &amp; the Sprigs</div>
              <div className="highlight-text">C'mon All Blacks earns National Radio airtime during the Rugby World Cup. The sports-song era begins.</div>
            </div>
            <div className="highlight-card">
              <div className="highlight-year">BDI's</div>
              <div className="highlight-text">Three years fronting a band across the North Island. Battle of the Bands finals, Wanganui.</div>
            </div>
            <div className="highlight-card">
              <div className="highlight-year">TV &amp; Film Composition</div>
              <div className="highlight-text">Soundtracks for Motorway Patrol and SCU (Serious Crash Unit), Greenstone Pictures. Directed music videos for Stylus, Zed, Savage, Head Like a Hole, and more. Concert director for Kanye West.</div>
            </div>
            <div className="highlight-card">
              <div className="highlight-year">2024 — No.1</div>
              <div className="highlight-text">Alive on Fire (Max Maxwell Remix) reaches No.1 on the SoundCloud NZ Charts. A wonderful milestone.</div>
            </div>
            <div className="highlight-card">
              <div className="highlight-year">Now — The MacTones &amp; Solo</div>
              <div className="highlight-text">Performing and recording as a solo artist and as singer-songwriter for The MacTones. Collaborating with Max Maxwell, Jeramiah Ross (Module), and others.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Listen ─────────────────────────────────────────────────────────────────
function Listen() {
  return (
    <section className="section listen-section" id="listen">
      <div className="section-inner">
        <div className="section-label">Stream &amp; Buy</div>
        <h2 className="section-title">Find the Music</h2>
        <p className="section-subtitle">
          Available on all major platforms. Grab a download, stream a track, or just hit play and see what lights you up.
        </p>
        <div className="listen-grid">
          {PLATFORMS.map((p) => (
            <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="listen-card">
              <div className="listen-icon">{p.icon}</div>
              <div className="listen-name">{p.name}</div>
              <div className="listen-desc">{p.desc}</div>
              <div className="listen-arrow">Listen Now →</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo"><McG prefix="Andy" /></div>
      <div className="footer-tagline">Modern Nostalgia · Te Whanganui-a-Tara / Wellington</div>
      <div className="footer-links">
        <a href="#home">Home</a>
        <a href="#videos">Videos</a>
        <a href="#story">Story</a>
        <a href="#listen">Listen</a>
        <a href="https://www.youtube.com/@Andy_McGrath" target="_blank" rel="noopener noreferrer">YouTube</a>
        <a href="https://andymcgrath.bandcamp.com" target="_blank" rel="noopener noreferrer">Bandcamp</a>
        <a href="https://open.spotify.com/user/director.andy1" target="_blank" rel="noopener noreferrer">Spotify</a>
      </div>
      <div className="footer-copy">© {new Date().getFullYear()} <McG prefix="Andy" /> · Te Whanganui-a-Tara / Wellington</div>
    </footer>
  );
}

// ── App shell ──────────────────────────────────────────────────────────────
function App() {
  return (
    <div>
      <Nav />
      <Hero />
      <Videos />
      <Story />
      <Listen />
      <Footer />
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
