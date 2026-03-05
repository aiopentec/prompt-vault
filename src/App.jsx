import { useState, useEffect, useRef } from "react";

const prompts = [
  {
    id: 1,
    title: "Legal Contract Risk Analyzer",
    category: "Legal",
    tier: "free",
    description: "Extract risk clauses, flag unusual terms, and score overall contract safety.",
    tags: ["legal", "contracts", "risk"],
    uses: 4821,
    rating: 4.9,
    prompt: `You are a senior contract attorney. Analyze the following contract and:\n1. Identify all risk clauses (score 1-10)\n2. Flag non-standard terms\n3. Suggest protective amendments\n4. Output an executive risk summary\n\nContract: [PASTE CONTRACT]`
  },
  {
    id: 2,
    title: "Market Research Synthesizer",
    category: "Research",
    tier: "pro",
    description: "Turn raw market data into strategic insights with competitor mapping.",
    tags: ["research", "strategy", "market"],
    uses: 3102,
    rating: 4.8,
    prompt: `Act as a McKinsey analyst. Given the following data:\n1. Build a competitive landscape map\n2. Identify whitespace opportunities\n3. Model TAM/SAM/SOM\n4. Recommend top 3 positioning strategies\n\nData: [INSERT DATA]`
  },
  {
    id: 3,
    title: "Financial Model Builder",
    category: "Finance",
    tier: "pro",
    description: "Generate 3-statement financial models with scenario analysis.",
    tags: ["finance", "modeling", "forecasting"],
    uses: 2890,
    rating: 4.7,
    prompt: `You are a CFO at a top-tier investment bank. Build a complete 3-statement model:\n1. P&L with 5-year projections\n2. Balance sheet\n3. Cash flow statement\n4. Bull/base/bear scenarios\n\nAssumptions: [INSERT]`
  },
  {
    id: 4,
    title: "Cold Email Generator",
    category: "Sales",
    tier: "free",
    description: "Write high-converting cold emails with psychological triggers.",
    tags: ["sales", "email", "copywriting"],
    uses: 7643,
    rating: 4.6,
    prompt: `You are a world-class sales copywriter. Write a cold email that:\n1. Opens with a pattern interrupt\n2. Uses social proof within 2 sentences\n3. Focuses on ONE specific pain point\n4. Has a low-friction CTA\n\nTarget: [COMPANY/PERSON], Pain: [PAIN POINT]`
  },
  {
    id: 5,
    title: "Technical Architecture Reviewer",
    category: "Engineering",
    tier: "enterprise",
    description: "Review system designs for scalability, security, and cost efficiency.",
    tags: ["engineering", "architecture", "devops"],
    uses: 1204,
    rating: 5.0,
    prompt: `As a Principal Engineer at FAANG, review this architecture:\n1. Identify single points of failure\n2. Project costs at 10x scale\n3. Flag security vulnerabilities\n4. Suggest specific optimizations with trade-offs\n\nArchitecture: [DIAGRAM/DESCRIPTION]`
  },
  {
    id: 6,
    title: "SEO Content Brief Generator",
    category: "Marketing",
    tier: "free",
    description: "Create comprehensive content briefs that rank on page 1.",
    tags: ["seo", "content", "marketing"],
    uses: 5521,
    rating: 4.8,
    prompt: `You are an SEO strategist at a top agency. Create a content brief:\n1. Primary & secondary keywords (with search intent)\n2. SERP analysis and content gaps\n3. Outline with H2/H3 structure\n4. Word count, readability, and E-E-A-T requirements\n\nTopic: [TOPIC], Domain: [YOUR SITE]`
  },
];

const categories = ["All", "Legal", "Research", "Finance", "Sales", "Engineering", "Marketing"];
const tiers = ["All", "free", "pro", "enterprise"];

const tierColors = {
  free: { bg: "#00ff9020", border: "#00ff90", text: "#00ff90" },
  pro: { bg: "#00b4ff20", border: "#00b4ff", text: "#00b4ff" },
  enterprise: { bg: "#ff6b3520", border: "#ff6b35", text: "#ff6b35" },
};

const categoryIcons = {
  Legal: "⚖", Research: "◎", Finance: "◈", Sales: "◆",
  Engineering: "⬡", Marketing: "◉", All: "◌"
};

function GlitchText({ text, className = "" }) {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <span className={className} style={{ position: "relative", display: "inline-block" }}>
      {text}
      {glitch && (
        <>
          <span style={{
            position: "absolute", top: 0, left: "2px", color: "#ff003c",
            clipPath: "polygon(0 30%, 100% 30%, 100% 50%, 0 50%)",
            opacity: 0.8
          }}>{text}</span>
          <span style={{
            position: "absolute", top: 0, left: "-2px", color: "#00ffff",
            clipPath: "polygon(0 60%, 100% 60%, 100% 80%, 0 80%)",
            opacity: 0.8
          }}>{text}</span>
        </>
      )}
    </span>
  );
}

function TerminalBadge({ text }) {
  return (
    <span style={{
      fontFamily: "'Space Mono', monospace",
      fontSize: "10px",
      background: "#0a0a0a",
      border: "1px solid #333",
      color: "#00ff90",
      padding: "2px 8px",
      borderRadius: "2px",
      letterSpacing: "0.1em",
    }}>
      {text}
    </span>
  );
}

function PromptCard({ prompt, onClick }) {
  const [hovered, setHovered] = useState(false);
  const tier = tierColors[prompt.tier];
  return (
    <div
      onClick={() => onClick(prompt)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#0d1117" : "#080c10",
        border: `1px solid ${hovered ? tier.border : "#1a2030"}`,
        borderRadius: "8px",
        padding: "20px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered ? `0 8px 32px ${tier.border}22` : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {hovered && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${tier.border}, transparent)`,
        }} />
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
        <span style={{ fontSize: "22px" }}>{categoryIcons[prompt.category]}</span>
        <span style={{
          fontSize: "10px", fontFamily: "'Space Mono', monospace",
          padding: "3px 8px", borderRadius: "2px",
          background: tier.bg, border: `1px solid ${tier.border}`,
          color: tier.text, textTransform: "uppercase", letterSpacing: "0.1em"
        }}>
          {prompt.tier}
        </span>
      </div>
      <div style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: "15px", fontWeight: "700",
        color: "#e8eaf0", marginBottom: "8px", lineHeight: 1.3
      }}>
        {prompt.title}
      </div>
      <div style={{ fontSize: "12px", color: "#556", lineHeight: 1.5, marginBottom: "14px" }}>
        {prompt.description}
      </div>
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" }}>
        {prompt.tags.map(t => (
          <span key={t} style={{
            fontSize: "10px", fontFamily: "'Space Mono', monospace",
            color: "#445", padding: "2px 6px",
            border: "1px solid #1e2535", borderRadius: "2px"
          }}>#{t}</span>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "11px", color: "#445", fontFamily: "'Space Mono', monospace" }}>
          {prompt.uses.toLocaleString()} uses
        </span>
        <span style={{ fontSize: "12px", color: "#ffd700" }}>
          {"★".repeat(Math.floor(prompt.rating))} {prompt.rating}
        </span>
      </div>
    </div>
  );
}

function SaveButton() {
  const [saved, setSaved] = useState(false);
  return (
    <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }} style={{
      padding: "12px 20px",
      background: saved ? "#00ff9015" : "none",
      border: `1px solid ${saved ? "#00ff90" : "#2a3545"}`,
      color: saved ? "#00ff90" : "#6677aa",
      borderRadius: "6px", fontFamily: "'Space Mono', monospace",
      fontSize: "11px", cursor: "pointer", transition: "all 0.2s",
      whiteSpace: "nowrap"
    }}>
      {saved ? "✓ SAVED" : "♡ SAVE"}
    </button>
  );
}

function Modal({ prompt, onClose }) {
  const [copied, setCopied] = useState(false);
  if (!prompt) return null;
  const tier = tierColors[prompt.tier];

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, padding: "20px", backdropFilter: "blur(4px)"
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#080c10",
        border: `1px solid ${tier.border}`,
        borderRadius: "12px",
        padding: "32px",
        maxWidth: "640px", width: "100%",
        boxShadow: `0 0 60px ${tier.border}33`,
        position: "relative"
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: "2px",
          background: `linear-gradient(90deg, transparent, ${tier.border}, transparent)`,
          borderRadius: "12px 12px 0 0"
        }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
          <div>
            <div style={{ fontSize: "11px", color: tier.text, fontFamily: "'Space Mono', monospace", marginBottom: "8px", letterSpacing: "0.1em" }}>
              {prompt.category.toUpperCase()} / {prompt.tier.toUpperCase()}
            </div>
            <div style={{ fontSize: "20px", fontFamily: "'Syne', sans-serif", fontWeight: "800", color: "#e8eaf0" }}>
              {prompt.title}
            </div>
          </div>
          <button onClick={onClose} style={{
            background: "none", border: "1px solid #1e2535",
            color: "#556", cursor: "pointer", borderRadius: "4px",
            width: "32px", height: "32px", fontSize: "18px",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>×</button>
        </div>
        <div style={{
          background: "#030508", border: "1px solid #1a2030",
          borderRadius: "6px", padding: "20px", marginBottom: "20px",
          fontFamily: "'Space Mono', monospace", fontSize: "12px",
          color: "#8899bb", lineHeight: "1.8",
          whiteSpace: "pre-wrap", maxHeight: "240px", overflowY: "auto"
        }}>
          {prompt.prompt}
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={handleCopy} style={{
            flex: 1,
            background: copied ? "#00ff9015" : `${tier.border}15`,
            border: `1px solid ${copied ? "#00ff90" : tier.border}`,
            color: copied ? "#00ff90" : tier.text,
            padding: "12px", borderRadius: "6px",
            fontFamily: "'Space Mono', monospace", fontSize: "12px",
            cursor: "pointer", letterSpacing: "0.05em", transition: "all 0.2s"
          }}>
            {copied ? "✓ COPIED" : "◻ COPY PROMPT"}
          </button>
          <SaveButton />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTier, setActiveTier] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCounter(c => c < 24891 ? c + Math.floor(Math.random() * 37) : 24891), 30);
    return () => clearInterval(interval);
  }, []);

  const filtered = prompts.filter(p => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchTier = activeTier === "All" || p.tier === activeTier;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some(t => t.includes(search.toLowerCase()));
    return matchCat && matchTier && matchSearch;
  });

  const gridStyle = {
    fontFamily: "'Space Mono', monospace",
    background: "#030508",
    minHeight: "100vh",
    color: "#8899bb",
  };

  return (
    <div style={gridStyle}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@700;800;900&display=swap" rel="stylesheet" />

      {/* Animated grid background */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(0,180,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,180,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }} />

      {/* Glow orbs */}
      <div style={{
        position: "fixed", top: "-200px", left: "-200px",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(0,180,255,0.06) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0
      }} />
      <div style={{
        position: "fixed", bottom: "-200px", right: "-100px",
        width: "400px", height: "400px",
        background: "radial-gradient(circle, rgba(0,255,144,0.05) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* NAV */}
        <nav style={{
          borderBottom: "1px solid #0e1520",
          padding: "0 32px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: "56px",
          background: "rgba(3,5,8,0.9)",
          backdropFilter: "blur(10px)",
          position: "sticky", top: 0, zIndex: 100
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "28px", height: "28px",
              background: "linear-gradient(135deg, #00b4ff, #00ff90)",
              borderRadius: "4px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "14px"
            }}>◈</div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: "900", fontSize: "16px", color: "#e8eaf0", letterSpacing: "-0.02em" }}>
              PROMPT<span style={{ color: "#00b4ff" }}>VAULT</span>
            </span>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <TerminalBadge text={`${counter.toLocaleString()} prompts used`} />
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <span onClick={() => document.getElementById("library").scrollIntoView({behavior:"smooth"})} style={{ fontSize: "12px", color: "#6677aa", cursor: "pointer" }}>Library</span>
            <span onClick={() => document.getElementById("pricing").scrollIntoView({behavior:"smooth"})} style={{ fontSize: "12px", color: "#6677aa", cursor: "pointer" }}>Pricing</span>
            <button onClick={() => document.getElementById("pricing").scrollIntoView({behavior:"smooth"})} style={{
              background: "linear-gradient(135deg, #00b4ff, #00ff90)",
              border: "none", color: "#030508",
              padding: "7px 16px", borderRadius: "4px",
              fontFamily: "'Space Mono', monospace", fontSize: "11px",
              fontWeight: "700", cursor: "pointer", letterSpacing: "0.05em"
            }}>
              GET ACCESS →
            </button>
          </div>
        </nav>

        {/* HERO */}
        <div style={{
          padding: "80px 32px 60px",
          maxWidth: "900px", margin: "0 auto",
          textAlign: "center",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            border: "1px solid #0e1a28",
            borderRadius: "100px", padding: "6px 14px",
            fontSize: "11px", marginBottom: "32px",
            background: "#00b4ff08",
            color: "#00b4ff"
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00ff90", display: "inline-block", animation: "pulse 2s infinite" }} />
            v2.4 — 200+ prompts across 12 industries
          </div>

          <h1 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(42px, 8vw, 80px)",
            fontWeight: "900",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            color: "#e8eaf0",
            marginBottom: "24px"
          }}>
            <GlitchText text="Battle-tested" /><br />
            <span style={{
              background: "linear-gradient(135deg, #00b4ff 0%, #00ff90 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>AI prompts</span><br />
            that actually work.
          </h1>

          <p style={{
            fontSize: "16px", color: "#5a6a7a", lineHeight: 1.7,
            maxWidth: "520px", margin: "0 auto 40px"
          }}>
            Stop writing prompts from scratch. Access a curated library of expert-crafted prompts for legal, finance, marketing, engineering, and more.
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginBottom: "40px" }}>
            <button onClick={() => document.getElementById("library").scrollIntoView({behavior:"smooth"})} style={{
              background: "linear-gradient(135deg, #00b4ff, #00ff90)",
              border: "none", color: "#030508",
              padding: "12px 28px", borderRadius: "4px",
              fontFamily: "'Space Mono', monospace", fontSize: "12px",
              fontWeight: "700", cursor: "pointer", letterSpacing: "0.05em"
            }}>BROWSE PROMPTS →</button>
            <button onClick={() => document.getElementById("pricing").scrollIntoView({behavior:"smooth"})} style={{
              background: "transparent",
              border: "1px solid #2a3545", color: "#8899bb",
              padding: "12px 28px", borderRadius: "4px",
              fontFamily: "'Space Mono', monospace", fontSize: "12px",
              cursor: "pointer", letterSpacing: "0.05em"
            }}>VIEW PRICING</button>
          </div>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { label: "200+", sub: "Prompts" },
              { label: "$0", sub: "To start" },
              { label: "12", sub: "Industries" },
              { label: "24k+", sub: "Users" },
            ].map(stat => (
              <div key={stat.label} style={{
                background: "#080c10",
                border: "1px solid #0e1520",
                borderRadius: "8px", padding: "16px 24px", textAlign: "center"
              }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "28px", fontWeight: "900", color: "#e8eaf0" }}>{stat.label}</div>
                <div style={{ fontSize: "11px", color: "#445" }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* LIBRARY SECTION */}
        <div id="library" style={{
          maxWidth: "1100px", margin: "0 auto",
          padding: "0 32px 80px"
        }}>
          <div style={{ borderBottom: "1px solid #0e1520", marginBottom: "32px", paddingBottom: "16px" }}>
            <div style={{
              fontFamily: "'Syne', sans-serif", fontSize: "11px",
              letterSpacing: "0.2em", color: "#00b4ff", marginBottom: "4px"
            }}>
              // PROMPT LIBRARY
            </div>
            <div style={{ fontSize: "22px", fontFamily: "'Syne', sans-serif", fontWeight: "800", color: "#e8eaf0" }}>
              Browse the vault
            </div>
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap", alignItems: "center" }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search prompts..."
              style={{
                background: "#080c10",
                border: "1px solid #1a2030",
                borderRadius: "4px", padding: "8px 14px",
                fontFamily: "'Space Mono', monospace", fontSize: "12px",
                color: "#8899bb", outline: "none", width: "200px"
              }}
            />
            <div style={{ display: "flex", gap: "6px" }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                  background: activeCategory === cat ? "#00b4ff15" : "transparent",
                  border: `1px solid ${activeCategory === cat ? "#00b4ff" : "#1a2030"}`,
                  color: activeCategory === cat ? "#00b4ff" : "#445",
                  padding: "6px 12px", borderRadius: "4px", cursor: "pointer",
                  fontFamily: "'Space Mono', monospace", fontSize: "10px",
                  letterSpacing: "0.05em"
                }}>
                  {cat === "All" ? "ALL" : `${categoryIcons[cat]} ${cat.toUpperCase()}`}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: "6px", marginLeft: "auto" }}>
              {tiers.map(t => {
                const tc = t === "free" ? "#00ff90" : t === "pro" ? "#00b4ff" : t === "enterprise" ? "#ff6b35" : "#e8eaf0";
                const isActive = activeTier === t;
                return (
                  <button key={t} onClick={() => setActiveTier(t)} style={{
                    background: isActive ? `${tc}18` : "transparent",
                    border: `1px solid ${isActive ? tc : "#2a3545"}`,
                    color: isActive ? tc : "#556677",
                    padding: "6px 12px", borderRadius: "4px", cursor: "pointer",
                    fontFamily: "'Space Mono', monospace", fontSize: "10px",
                    textTransform: "uppercase", transition: "all 0.15s",
                    fontWeight: isActive ? "700" : "400"
                  }}>
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "16px"
          }}>
            {filtered.map(p => (
              <PromptCard key={p.id} prompt={p} onClick={setSelectedPrompt} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px", color: "#334", fontFamily: "'Space Mono', monospace", fontSize: "12px" }}>
              NO PROMPTS FOUND // TRY ADJUSTING FILTERS
            </div>
          )}
        </div>

        {/* PRICING */}
        <div id="pricing" style={{
          borderTop: "1px solid #0e1520",
          padding: "80px 32px",
          maxWidth: "1000px", margin: "0 auto"
        }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#00b4ff", marginBottom: "8px", fontFamily: "'Space Mono', monospace" }}>
              // PRICING
            </div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "32px", fontWeight: "900", color: "#e8eaf0" }}>
              Start free. Scale when ready.
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
            {[
              {
                name: "FREE", price: "$0", period: "/forever",
                color: "#00ff90",
                features: ["50 free prompts", "Community access", "Monthly updates", "Discord support"],
                cta: "START FREE"
              },
              {
                name: "PRO", price: "$29", period: "/month",
                color: "#00b4ff", highlight: true,
                features: ["200+ premium prompts", "Multi-model versions", "Priority updates", "Slack community", "New prompts weekly"],
                cta: "GO PRO →"
              },
              {
                name: "ENTERPRISE", price: "$199", period: "/month",
                color: "#ff6b35",
                features: ["Everything in Pro", "Custom prompt creation", "Team seats (10)", "API access", "Dedicated support"],
                cta: "CONTACT US"
              }
            ].map(plan => (
              <div key={plan.name} style={{
                background: plan.highlight ? "#0a0f18" : "#080c10",
                border: `1px solid ${plan.highlight ? plan.color : "#1a2030"}`,
                borderRadius: "10px", padding: "28px",
                position: "relative", overflow: "hidden",
                boxShadow: plan.highlight ? `0 0 40px ${plan.color}22` : "none"
              }}>
                {plan.highlight && (
                  <div style={{
                    position: "absolute", top: "12px", right: "12px",
                    background: "#00b4ff15", border: "1px solid #00b4ff",
                    color: "#00b4ff", fontSize: "9px", padding: "3px 8px",
                    borderRadius: "2px", fontFamily: "'Space Mono', monospace",
                    letterSpacing: "0.1em"
                  }}>POPULAR</div>
                )}
                <div style={{ fontSize: "11px", color: plan.color, letterSpacing: "0.15em", marginBottom: "12px" }}>{plan.name}</div>
                <div style={{ marginBottom: "24px" }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "40px", fontWeight: "900", color: "#e8eaf0" }}>{plan.price}</span>
                  <span style={{ fontSize: "12px", color: "#445" }}>{plan.period}</span>
                </div>
                <div style={{ marginBottom: "24px" }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: "flex", gap: "10px", marginBottom: "10px", fontSize: "12px", color: "#6677aa" }}>
                      <span style={{ color: plan.color }}>›</span> {f}
                    </div>
                  ))}
                </div>
                <a
                  href={
                    plan.name === "PRO" ? "https://ogoina4.gumroad.com/l/qvcmgg" :
                    plan.name === "ENTERPRISE" ? "https://ogoina4.gumroad.com/l/gveybd" : "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block", width: "100%", padding: "12px",
                    background: plan.highlight ? `linear-gradient(135deg, #00b4ff, #00ff90)` : "transparent",
                    border: plan.highlight ? "none" : `1px solid ${plan.color}`,
                    color: plan.highlight ? "#030508" : plan.color,
                    borderRadius: "4px", cursor: "pointer",
                    fontFamily: "'Space Mono', monospace", fontSize: "12px",
                    fontWeight: "700", letterSpacing: "0.05em",
                    textAlign: "center", textDecoration: "none", boxSizing: "border-box"
                  }}>
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* EMAIL CAPTURE */}
        <div style={{
          borderTop: "1px solid #0e1520",
          padding: "80px 32px",
          textAlign: "center"
        }}>
          <div style={{
            maxWidth: "500px", margin: "0 auto",
            background: "#080c10",
            border: "1px solid #1a2030",
            borderRadius: "12px", padding: "40px",
            position: "relative", overflow: "hidden"
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0,
              height: "1px",
              background: "linear-gradient(90deg, transparent, #00b4ff, #00ff90, transparent)"
            }} />
            <div style={{ fontSize: "11px", color: "#00b4ff", letterSpacing: "0.2em", marginBottom: "12px" }}>
              // EARLY ACCESS
            </div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "22px", fontWeight: "900", color: "#e8eaf0", marginBottom: "8px" }}>
              Get the first 10 prompts free
            </div>
            <div style={{ fontSize: "12px", color: "#445", marginBottom: "24px" }}>
              No credit card. No spam. Just prompts that work.
            </div>
            {subscribed ? (
              <div style={{ color: "#00ff90", fontFamily: "'Space Mono', monospace", fontSize: "13px" }}>
                ✓ ACCESS GRANTED — CHECK YOUR EMAIL
              </div>
            ) : (
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && email && setSubscribed(true)}
                  placeholder="your@email.com"
                  style={{
                    flex: 1, background: "#030508",
                    border: "1px solid #1a2030", borderRadius: "4px",
                    padding: "10px 14px", fontFamily: "'Space Mono', monospace",
                    fontSize: "12px", color: "#8899bb", outline: "none"
                  }}
                />
                <button onClick={() => email && setSubscribed(true)} style={{
                  background: "linear-gradient(135deg, #00b4ff, #00ff90)",
                  border: "none", color: "#030508",
                  padding: "10px 20px", borderRadius: "4px",
                  fontFamily: "'Space Mono', monospace", fontSize: "11px",
                  fontWeight: "700", cursor: "pointer", whiteSpace: "nowrap"
                }}>
                  GET ACCESS
                </button>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div style={{
          borderTop: "1px solid #0e1520",
          padding: "24px 32px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: "11px", color: "#2a3040"
        }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: "900", color: "#1e2535" }}>
            PROMPT<span style={{ color: "#1a2f40" }}>VAULT</span>
          </span>
          <span style={{ fontFamily: "'Space Mono', monospace" }}>
            © 2025 — MIT LICENSE — BUILT WITH AI
          </span>
        </div>
      </div>

      {selectedPrompt && <Modal prompt={selectedPrompt} onClose={() => setSelectedPrompt(null)} />}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #030508; }
        ::-webkit-scrollbar-thumb { background: #1a2535; }
      `}</style>
    </div>
  );
}
