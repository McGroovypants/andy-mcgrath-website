import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

// ── Video data ──────────────────────────────────────────────────────────────
const VIDEOS = [
  { id: "F_Ae4IZWbXM", title: "Behind the Sun", meta: "Latest Release · 2024" },
  { id: "Oz4y0VEtkDM", title: "Alive on Fire", meta: "Original Version" },
  { id: "Yc9AXWy8Ckg", title: "Alive on Fire", meta: "Max Maxwell Remix · No.1 SoundCloud NZ Charts 2024" },
  { id: "O9VfBAGyVf4", title: "Cosmic Energy", meta: "with Jeramiah Ross & Duncan McCann" },
  { id: "nE1-to038-M", title: "Silent Tribe", meta: "with Jeramiah Ross" },
  { id: "m11hTwWnwsA", title: "Houghton Bay", meta: "Single · 2024" },
  { id: "-KGwDrZgQlo", title: "Design the Sky", meta: "Latest Release" },
  { id: "3a5JXTtinUE", title: "Full Moon Risin'", meta: "The Studio Sessions" },
];

// ── Streaming platforms ────────────────────────────────────────────────────
const PLATFORMS = [
  {
    name: "Spotify",
    url: "https://open.spotify.com/artist/6ULF32IlSw97G7ZjxEOGAm",
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
    desc: "Stream free on Bandcamp",
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
  {
    name: "Instagram",
    url: "https://www.instagram.com/andymcgrath_music/",
    desc: "Follow on Instagram",
    color: "#E1306C",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="url(#ig-grad)">
        <defs>
          <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f09433"/>
            <stop offset="25%" stopColor="#e6683c"/>
            <stop offset="50%" stopColor="#dc2743"/>
            <stop offset="75%" stopColor="#cc2366"/>
            <stop offset="100%" stopColor="#bc1888"/>
          </linearGradient>
        </defs>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
];

// ── Shows data ──────────────────────────────────────────────────────────────
const PAST_SHOWS = [
  { date: "1 Feb 2026", venue: "Vogelmorn Upstairs", location: "Te Whanganui-a-Tara / Wellington", show: "Solo Show" },
  { date: "27 Jul 2025", venue: "Underworld Tavern, Mt Victoria", location: "Te Whanganui-a-Tara / Wellington", show: "Support for Dynamite Blues Train" },
  { date: "30 May 2025", venue: "Abandoned Tap Room", location: "Petone", show: "Blues Night with Dynamite Blues Train" },
  { date: "12 Aug 2024", venue: "Boneface Tavern", location: "Te Whanganui-a-Tara / Wellington", show: "Cosmic Energy Tour Launch" },
  { date: "15 Mar 2024", venue: "Boneface Tavern", location: "Te Whanganui-a-Tara / Wellington", show: "Andy McGrath, Jeramiah Ross & Duncan McCann" },
];

const GIG_IMAGES = [
  "/gig-1.jpg",
  "/gig-2.jpg",
  "/gig-3.jpg",
  "/gig-4.jpg",
  "/gig-5.jpg",
  "/gig-6.jpg",
];

// ── McGrath typography helper ───────────────────────────────────────────────
function McG({ prefix }: { prefix?: string }) {
  return <>{prefix ? `${prefix} ` : ""}M<span className="mc-raised">c</span>Grath</>;
}

// ── Nav ────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  const closeMenu = () => setMenuOpen(false);
  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <ul className="nav-links">
        <li><a href="#videos">Videos</a></li>
        <li><a href="#story">Story</a></li>
        <li><a href="#listen">Listen</a></li>
        <li><a href="#shows">Shows</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#signup">Sign Up</a></li>
      </ul>
      <button className={`hamburger${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
        <span /><span /><span />
      </button>
      {menuOpen && (
        <div className="mobile-menu">
          <ul>
            <li><a href="#videos" onClick={closeMenu}>Videos</a></li>
            <li><a href="#story" onClick={closeMenu}>Story</a></li>
            <li><a href="#listen" onClick={closeMenu}>Listen</a></li>
            <li><a href="#shows" onClick={closeMenu}>Shows</a></li>
            <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
            <li><a href="#signup" onClick={closeMenu}>Sign Up</a></li>
          </ul>
        </div>
      )}
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
          Tracks from the studio and stage — each one a story from life lived in music.
        </p>
        <div className="videos-grid">
          {VIDEOS.map((v) => (
            <React.Fragment key={v.id}>
              {v.id === "Yc9AXWy8Ckg" && (
                <div className="milestone milestone-grid-span">
                  <span className="milestone-dot" />
                  Alive on Fire · No.1 on SoundCloud NZ Charts · 2024
                </div>
              )}
              {active === v.id ? (
                <div className="video-card active">
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
                <div className="video-card" onClick={() => setActive(v.id)}>
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
              )}
            </React.Fragment>
          ))}
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
              <strong><McG prefix="Andy" /></strong> is a Wellington-based singer-songwriter whose modern-nostalgia sound is rooted in classic Kiwi music traditions. A versatile multi-instrumentalist and vocalist, Andy weaves together indie, rock, and blues influences with a contemporary edge — equally at home on a small stage or a festival field.
            </p>
            <p>
              Born into an Irish family in Wellington where singing was the soundtrack to life, Andy entered and won his first singing competition at The annual Fies, Irish Festival whilst barely at school. At intermediate he learned violin, but the first time he sat behind a drum kit, rock music called him away and never gave him back.
            </p>
            <p>
              The first gig on the drums was at The Awapuni Tavern, where a few friends got together and learnt the song, Burn by Deep Purple.
            </p>
            <p>
              At 19, Andy joined established songwriter <strong>Robert Thirtle</strong> — active in the Manawatu indie scene with bands like Cement Garden — along with bass player <strong>Kane Haitana</strong> to form <strong>The Carousers</strong>. The trio had several gigs, starting at The opening night of The Stomach, and impressed Meltdown Records owner, <strong>Pete Shephard</strong> enough to pay for the recordings of an EP. Unfortunately the money ran out before the songs were released and when Thirtle left for London, Andy picked up the guitar and started writing.
            </p>
            <p>
              At the time of the '91 Rugby World Cup, Andy recorded C'mon All Blacks with local guitarist, <strong>Simon Bowden</strong>, in the short-lived band, Andy &amp; the Sprigs which earned a spot on the nationwide RNZ network. Everything was going swimmingly until The All Blacks lost in the World Cup. Putting sports songs aside but wanting to perform more, he formed <strong>BDI's</strong>, spending three years as front man and guitarist, reaching the finals of Battle of the Bands in Wanganui — sharing a bill, unknowingly at the time, with future bandmate <strong>Tony Kemp</strong> on drums.
            </p>
            <p>
              After time with family, Andy composed soundtracks for NZ documentaries and TV series including Motorway Patrol and SCU (Serious Crash Unit) for Greenstone Pictures and TVNZ.
            </p>
            <p>
              During the 2019 stay-at-home period, Andy teamed up with <strong>Tony Kemp</strong> (drummer for The Relatives) and <strong>Duncan McCann</strong> (of Cherry Bomb) to form <strong>The MacTones</strong>. Working remotely, they collaborated on a series of virtual recording sessions that brought several of Andy's songs to life, highlighted by the release of the standout single <em>Geronimo</em>.
            </p>
            <p>
              In recent years, Andy has enjoyed being a solo artist, although sometimes gigging with friends <strong>Jeramiah Ross</strong> and <strong>Duncan McCann</strong> in local Wellington bars, Underworld Tavern, Morsa loca and more recently, The Vogelmorn Upstairs Bar.
            </p>
            <p>
              Apart from gigging, Andy is happiest in the studio, collaborating with different artists including <strong>Jeramiah Ross</strong> (aka Module) where they have worked tirelessly to produce great songs and a powerful signature sound. Andy has also collaborated with the legendary EDM Producer, <strong>Max Maxwell</strong>. They have collaborated on several songs to date and in 2024, Max remixed <em>Alive on Fire</em> which reached No.1 on the SoundCloud NZ Charts. The milestone felt right for an artist who has spent a lifetime lighting up the room.
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
              <div className="highlight-text">Soundtracks for Motorway Patrol and SCU, Greenstone Pictures. Directed/edited music videos for Stylus, Rubicon, Zed, Mareko, Head Like a Hole, and many more. Big screen director for Kanye West concerts in NZ.</div>
            </div>
            <div className="highlight-card">
              <div className="highlight-year">2024 — No.1</div>
              <div className="highlight-text">Alive on Fire (Max Maxwell Remix) reaches No.1 on the SoundCloud NZ Charts. A wonderful milestone.</div>
            </div>
            <div className="highlight-card">
              <div className="highlight-year">Now — The MacTones &amp; Solo</div>
              <div className="highlight-text">Performing and recording as a solo artist and singer-songwriter. Collaborating with Max Maxwell, Jeramiah Ross (Module), Campbell Burns, Steve Asplin (Captain Relaxo) and others.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Listen ─────────────────────────────────────────────────────────────────
const ACOUSTIC_PICKS = [
  { title: "Alive on Fire",   id: "1994665218" },
  { title: "Houghton Bay",    id: "3446405935" },
  { title: "Full Moon Risin'", id: "111662596" },
];

const COLLABS = [
  {
    title: "Secret Underground",
    credit: "Andy McGrath / Max Maxwell",
    type: "soundcloud",
    embedId: "2198324599",
  },
  {
    title: "Alive on Fire",
    credit: "Andy McGrath / Max Maxwell — No.1 SoundCloud NZ 2024",
    type: "soundcloud",
    embedId: "1601425545",
  },
  {
    title: "Behind the Sun",
    credit: "Andy McGrath — Music Video",
    type: "youtube",
    embedId: "F_Ae4IZWbXM",
  },
  {
    title: "Escaping the Moment",
    credit: "Andy McGrath / Max Maxwell",
    type: "soundcloud",
    embedId: "1834198521",
  },
  {
    title: "Koloko Jack",
    credit: "Andy McGrath / Max Maxwell",
    type: "spotify",
    embedId: "7MTM2dd5Trfxfbt0P8N7vj",
  },
];

function Listen() {
  return (
    <section className="section listen-section" id="listen">
      <div className="section-inner">
        <div className="section-label">Stream Free</div>
        <h2 className="section-title">Find the Music</h2>
        <p className="section-subtitle">
          Available on all major platforms. Hit play and see what lights you up.
        </p>

        {/* ── Acoustic Favourites ── */}
        <div className="listen-subsection">
          <h3 className="listen-subheading">Acoustic Favourites</h3>
          <p className="listen-subdesc">Three picks — each one close to Andy's heart.</p>
          <div className="listen-tracks">
            {ACOUSTIC_PICKS.map((track) => (
              <div key={track.id} className="listen-track">
                <div className="listen-track-label"><em>{track.title}</em></div>
                <iframe
                  title={track.title}
                  style={{ border: 0, width: "100%", height: "120px", display: "block" }}
                  src={`https://bandcamp.com/EmbeddedPlayer/track=${track.id}/size=large/bgcol=0c0a07/linkcol=c8922a/tracklist=false/artwork=small/`}
                  seamless
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── The Studio Sessions ── */}
        <div className="listen-subsection">
          <h3 className="listen-subheading">The Studio Sessions</h3>
          <p className="listen-subdesc">Eight tracks. The full collection.</p>
          <iframe
            title="The Studio Sessions"
            style={{ border: 0, width: "100%", height: "400px", display: "block" }}
            src="https://bandcamp.com/EmbeddedPlayer/album=1406120189/size=large/bgcol=0c0a07/linkcol=c8922a/tracklist=true/artwork=small/"
            seamless
          />
        </div>

        {/* ── Collaborations ── */}
        <div className="listen-subsection">
          <h3 className="listen-subheading">Collaborations</h3>
          <div className="listen-collabs">
            {COLLABS.map((c) => (
              <div key={c.embedId} className="listen-collab">
                <div className="listen-collab-label">
                  <em>{c.title}</em><span>{c.credit}</span>
                </div>
                {c.type === "spotify" && (
                  <iframe
                    title={c.title}
                    src={`https://open.spotify.com/embed/track/${c.embedId}`}
                    style={{ border: 0, width: "100%", height: "80px", display: "block", borderRadius: "8px" }}
                    allow="encrypted-media"
                  />
                )}
                {c.type === "soundcloud" && (
                  <iframe
                    title={c.title}
                    style={{ border: 0, width: "100%", height: "166px", display: "block" }}
                    src={`https://w.soundcloud.com/player/?url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F${c.embedId}&color=%23c8922a&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`}
                  />
                )}
                {c.type === "youtube" && (
                  <div className="listen-small-video">
                    <iframe
                      title={c.title}
                      src={`https://www.youtube.com/embed/${c.embedId}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ border: 0 }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Platform icons ── */}
        <p className="listen-platforms-heading">Find more on your favourite platform</p>
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

// ── Signup ──────────────────────────────────────────────────────────────────
function Signup() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const params = new URLSearchParams({
        EMAIL: email,
        FNAME: fname,
        "b_b3670fc4f8eb33686a3459659_9c8e7ff08d": "", // honeypot
      });
      // Mailchimp JSONP endpoint (avoids CORS)
      const url =
        "https://andymcgrathmusic.us1.list-manage.com/subscribe/post-json?u=b3670fc4f8eb33686a3459659&id=9c8e7ff08d&f_id=002fe6e5f0&" +
        params.toString() +
        "&c=__mailchimpCallback";

      await new Promise<void>((resolve, reject) => {
        const callbackName = "__mailchimpCallback";
        (window as any)[callbackName] = (data: any) => {
          delete (window as any)[callbackName];
          script.remove();
          if (data.result === "success") {
            resolve();
          } else {
            // "already subscribed" is still fine
            if (data.msg && data.msg.toLowerCase().includes("already subscribed")) {
              resolve();
            } else {
              reject(new Error(data.msg || "Subscription failed"));
            }
          }
        };
        const script = document.createElement("script");
        script.src = url;
        script.onerror = () => { script.remove(); reject(new Error("Network error")); };
        document.body.appendChild(script);
      });

      setStatus("done");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <section className="section signup-section" id="signup">
      <div className="section-inner signup-inner">
        <div className="section-label">Stay Connected</div>
        <h2 className="section-title">Stay in the Loop</h2>
        <p className="section-subtitle">
          New music, videos, and the occasional gig. No spam — just the good stuff. Sign up if you want to know when the next track drops.
        </p>
        {status === "done" ? (
          <p className="signup-thanks">Great! — Will be in touch when a fresh track arrives. 🎸</p>
        ) : (
          <form className="signup-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your name"
              className="signup-input"
              value={fname}
              onChange={e => setFname(e.target.value)}
            />
            <input
              type="email"
              placeholder="Your email"
              required
              className="signup-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button type="submit" className="signup-btn" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Sign Me Up"}
            </button>
            {status === "error" && (
              <p style={{ color: "#e57373", marginTop: "0.75rem", fontSize: "0.9rem" }}>
                Something went wrong — please try again or email andymcgrathmusicnz@gmail.com
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

// ── Shows ───────────────────────────────────────────────────────────────────
function Shows() {
  return (
    <section className="section shows-section" id="shows">
      <div className="section-inner">
        <div className="section-label">Live Shows</div>
        <h2 className="section-title">On Stage</h2>
        <p className="section-subtitle">
          Andy brings the songs to life — solo guitar looping, or a full band when the night calls for it.
        </p>

        {/* Coming soon */}
        <div className="shows-coming-soon" style={{ marginBottom: "2.5rem" }}>
          <div className="coming-soon-label">Next Show</div>
          <div className="coming-soon-text">Coming Soon — <a href="#signup" className="loop-link">stay in the loop</a> for announcements.</div>
        </div>

        {/* Film strip */}
        <h3 className="shows-subheading">Recent Shows</h3>
        <div className="filmstrip-wrap">
          <div className="filmstrip">
            {GIG_IMAGES.map((src, i) => (
              <div key={i} className="filmstrip-frame">
                <img src={src} alt={`Show ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Past shows */}
        <div className="shows-list">
          {PAST_SHOWS.map((s, i) => (
            <div key={i} className="show-row">
              <div className="show-date">{s.date}</div>
              <div className="show-details">
                <div className="show-venue">{s.venue}</div>
                <div className="show-location">{s.location}</div>
                <div className="show-name">{s.show}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Book button */}
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <a
            href="mailto:andymcgrathmusicnz@gmail.com?subject=Booking%20Enquiry%20-%20Andy%20McGrath"
            className="btn-primary"
          >
            Book Andy McGrath
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Contact ─────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="section-inner">
        <div className="section-label">Get in Touch</div>
        <h2 className="section-title">Contact Andy</h2>

        <div className="contact-layout">
          <div className="contact-photo">
            <img src="/contact-andy.jpg" alt="Andy McGrath at the drums" />
          </div>
          <div className="contact-text">
            <p>
              Andy McGrath is a multi-instrumentalist, songwriter, and performer with a deep love for music in all its forms. He plays guitar, bass, drums, and harmonica, and brings years of experience as a vocalist and voice-over artist.
            </p>
            <p>
              Andy has engineered and recorded his own music, mixed a large catalogue of songs, and in 2025 mixed an album for Te Whanganui-a-Tara / Wellington band Dynamite Blues Train.
            </p>
            <p>
              As a solo performer, Andy delivers a dynamic guitar-looping show that fills a room on its own — and when the occasion calls for it, he knows exactly who to call to put together a special night with a full band.
            </p>
            <p>
              Whether you are looking to book a show, explore a collaboration, or simply make something great together — Andy would love to hear from you. 🎸
            </p>
            <div style={{ marginTop: "2rem" }}>
              <a
                href="mailto:andymcgrathmusicnz@gmail.com?subject=Hello%20-%20Andy%20McGrath%20Music"
                className="btn-primary"
              >
                Book Andy McGrath
              </a>
            </div>
          </div>
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
        <a href="#shows">Shows</a>
        <a href="#contact">Contact</a>
        <a href="https://www.youtube.com/@Andy_McGrath" target="_blank" rel="noopener noreferrer">YouTube</a>
        <a href="https://andymcgrath.bandcamp.com" target="_blank" rel="noopener noreferrer">Bandcamp</a>
        <a href="https://open.spotify.com/artist/6ULF32IlSw97G7ZjxEOGAm" target="_blank" rel="noopener noreferrer">Spotify</a>
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
      <Signup />
      <Videos />
      <Story />
      <Listen />
      <Shows />
      <Contact />
      <Footer />
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
