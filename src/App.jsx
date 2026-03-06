import { useState, useEffect } from "react";

const prompts = [
  { id: 1, title: "Legal Contract Risk Analyzer", category: "Legal", tier: "free", description: "Extract risk clauses, flag unusual terms, and score overall contract safety.", tags: ["legal", "contracts", "risk"], uses: 4821, rating: 4.9, prompt: `You are a senior contract attorney. Analyze the following contract and:\n1. Identify all risk clauses (score 1-10)\n2. Flag non-standard terms\n3. Suggest protective amendments\n4. Output an executive risk summary\n\nContract: [PASTE CONTRACT]` },
  { id: 2, title: "Cold Email Generator", category: "Sales", tier: "free", description: "Write high-converting cold emails with psychological triggers.", tags: ["sales", "email", "copywriting"], uses: 7643, rating: 4.6, prompt: `You are a world-class sales copywriter. Write a cold email that:\n1. Opens with a pattern interrupt\n2. Uses social proof within 2 sentences\n3. Focuses on ONE specific pain point\n4. Has a low-friction CTA\n\nTarget: [COMPANY/PERSON], Pain: [PAIN POINT]` },
  { id: 3, title: "SEO Content Brief Generator", category: "Marketing", tier: "free", description: "Create comprehensive content briefs that rank on page 1.", tags: ["seo", "content", "marketing"], uses: 5521, rating: 4.8, prompt: `You are an SEO strategist at a top agency. Create a content brief:\n1. Primary & secondary keywords (with search intent)\n2. SERP analysis and content gaps\n3. Outline with H2/H3 structure\n4. Word count, readability, and E-E-A-T requirements\n\nTopic: [TOPIC], Domain: [YOUR SITE]` },
  { id: 4, title: "Meeting Summary Generator", category: "Productivity", tier: "free", description: "Turn messy meeting notes into structured action items instantly.", tags: ["productivity", "meetings", "notes"], uses: 3201, rating: 4.7, prompt: `You are an executive assistant. Transform these meeting notes into:\n1. 3-line executive summary\n2. Decisions made (bullet list)\n3. Action items with owners and deadlines\n4. Open questions requiring follow-up\n\nNotes: [PASTE NOTES]` },
  { id: 5, title: "Job Description Writer", category: "HR", tier: "free", description: "Write compelling job descriptions that attract top talent.", tags: ["hr", "recruiting", "hiring"], uses: 2890, rating: 4.5, prompt: `You are a talent acquisition specialist. Write a job description that:\n1. Opens with a compelling mission statement\n2. Lists responsibilities in order of importance\n3. Separates must-haves from nice-to-haves\n4. Includes salary range and growth path\n5. Ends with a motivating call to apply\n\nRole: [ROLE], Company: [COMPANY], Salary: [RANGE]` },
  { id: 6, title: "Product Feedback Analyzer", category: "Product", tier: "free", description: "Extract patterns and insights from customer feedback at scale.", tags: ["product", "feedback", "ux"], uses: 1987, rating: 4.6, prompt: `You are a product manager at a top SaaS company. Analyze this customer feedback and:\n1. Identify top 5 pain points (frequency + severity)\n2. Spot feature requests with highest demand\n3. Detect sentiment trends\n4. Recommend 3 immediate product improvements\n\nFeedback: [PASTE FEEDBACK]` },
  { id: 7, title: "Market Research Synthesizer", category: "Research", tier: "pro", description: "Turn raw market data into strategic insights with competitor mapping.", tags: ["research", "strategy", "market"], uses: 3102, rating: 4.8, prompt: `Act as a McKinsey analyst. Given the following data:\n1. Build a competitive landscape map\n2. Identify whitespace opportunities\n3. Model TAM/SAM/SOM\n4. Recommend top 3 positioning strategies\n\nData: [INSERT DATA]` },
  { id: 8, title: "Financial Model Builder", category: "Finance", tier: "pro", description: "Generate 3-statement financial models with scenario analysis.", tags: ["finance", "modeling", "forecasting"], uses: 2890, rating: 4.7, prompt: `You are a CFO at a top-tier investment bank. Build a complete 3-statement model:\n1. P&L with 5-year projections\n2. Balance sheet\n3. Cash flow statement\n4. Bull/base/bear scenarios\n\nAssumptions: [INSERT]` },
  { id: 9, title: "Investor Pitch Deck Writer", category: "Finance", tier: "pro", description: "Write a compelling 12-slide pitch deck narrative investors actually read.", tags: ["pitch", "fundraising", "startup"], uses: 2341, rating: 4.9, prompt: `You are a partner at a top VC firm. Write a pitch deck narrative:\n1. Problem (make them feel the pain)\n2. Solution (show the aha moment)\n3. Market size (TAM/SAM/SOM with sources)\n4. Business model (unit economics)\n5. Traction (metrics that matter)\n6. Team (why you)\n7. Ask (amount, use of funds)\n\nCompany: [NAME], Stage: [STAGE], Sector: [SECTOR]` },
  { id: 10, title: "Brand Voice Guide Creator", category: "Marketing", tier: "pro", description: "Define your brand tone, vocabulary, and communication style.", tags: ["brand", "copywriting", "strategy"], uses: 1876, rating: 4.8, prompt: `You are a brand strategist at a top creative agency. Create a brand voice guide:\n1. Voice adjectives (3-5 words with examples)\n2. Do's and don'ts for communication\n3. Vocabulary: words we use vs words we avoid\n4. Sample copy in 3 scenarios (email, social, support)\n5. Tone variations by context\n\nBrand: [NAME], Audience: [TARGET], Values: [CORE VALUES]` },
  { id: 11, title: "Competitive Analysis Framework", category: "Research", tier: "pro", description: "Build a comprehensive competitor analysis with strategic recommendations.", tags: ["competitive", "strategy", "research"], uses: 2156, rating: 4.7, prompt: `You are a strategy consultant. Analyze these competitors:\n1. Feature comparison matrix\n2. Pricing and packaging comparison\n3. Positioning and messaging analysis\n4. Strengths and vulnerabilities\n5. Strategic opportunities to exploit\n\nOur product: [DESCRIPTION]\nCompetitors: [LIST]` },
  { id: 12, title: "Sales Call Script Builder", category: "Sales", tier: "pro", description: "Build a customized discovery call script with objection handlers.", tags: ["sales", "script", "objections"], uses: 3421, rating: 4.8, prompt: `You are a VP of Sales at a high-growth SaaS company. Build a discovery call script:\n1. Opening (build rapport + set agenda)\n2. Discovery questions (pain, impact, urgency)\n3. Demo transition\n4. Objection handlers (price, timing, competition)\n5. Close and next steps\n\nProduct: [PRODUCT], ICP: [IDEAL CUSTOMER]` },
  { id: 13, title: "Performance Review Writer", category: "HR", tier: "pro", description: "Write fair, specific, and actionable performance reviews.", tags: ["hr", "management", "feedback"], uses: 1654, rating: 4.6, prompt: `You are an experienced people manager. Write a performance review that:\n1. Opens with overall assessment\n2. Highlights 3 specific achievements with impact\n3. Identifies 2 development areas with examples\n4. Sets SMART goals for next period\n5. Closes with motivating forward-looking statement\n\nEmployee: [NAME], Role: [ROLE], Period: [TIMEFRAME], Notes: [YOUR OBSERVATIONS]` },
  { id: 14, title: "Email Sequence Automator", category: "Marketing", tier: "pro", description: "Write a 7-email nurture sequence that converts leads to customers.", tags: ["email", "automation", "nurture"], uses: 2987, rating: 4.9, prompt: `You are a conversion copywriter. Write a 7-email nurture sequence:\nEmail 1: Welcome + quick win (Day 0)\nEmail 2: Problem agitation (Day 2)\nEmail 3: Solution education (Day 4)\nEmail 4: Social proof (Day 7)\nEmail 5: Objection handling (Day 10)\nEmail 6: Urgency/scarcity (Day 14)\nEmail 7: Final offer (Day 16)\n\nProduct: [PRODUCT], Audience: [ICP], Main benefit: [BENEFIT]` },
  { id: 15, title: "API Documentation Writer", category: "Engineering", tier: "pro", description: "Write clear, developer-friendly API docs with examples.", tags: ["api", "docs", "developer"], uses: 1432, rating: 4.7, prompt: `You are a developer advocate. Document this API endpoint:\n1. Endpoint overview (one sentence)\n2. Authentication requirements\n3. Request parameters (table format)\n4. Response schema with types\n5. Code examples (curl, Python, JavaScript)\n6. Error codes and handling\n7. Rate limiting notes\n\nEndpoint: [ENDPOINT DETAILS]` },
  { id: 16, title: "OKR Framework Builder", category: "Productivity", tier: "pro", description: "Design quarterly OKRs aligned to company strategy.", tags: ["okr", "strategy", "planning"], uses: 1876, rating: 4.7, prompt: `You are a strategy consultant. Design a quarterly OKR framework:\n1. 3 company-level Objectives\n2. 3-5 Key Results per Objective (measurable)\n3. Cascade to team level (2-3 teams)\n4. Leading vs lagging indicators\n5. Check-in cadence recommendation\n\nCompany stage: [STAGE], Priority: [TOP PRIORITY], Team size: [SIZE]` },
  { id: 17, title: "User Story Generator", category: "Product", tier: "pro", description: "Convert feature ideas into well-structured user stories with acceptance criteria.", tags: ["product", "agile", "stories"], uses: 2341, rating: 4.8, prompt: `You are a senior product manager. Convert this feature idea into:\n1. User story (As a... I want... So that...)\n2. 5-7 acceptance criteria (Given/When/Then)\n3. Edge cases to consider\n4. Definition of done\n5. Story point estimate with rationale\n\nFeature idea: [DESCRIPTION], User type: [WHO]` },
  { id: 18, title: "Pricing Strategy Analyzer", category: "Finance", tier: "pro", description: "Analyze and optimize your pricing strategy using proven frameworks.", tags: ["pricing", "strategy", "revenue"], uses: 1654, rating: 4.8, prompt: `You are a pricing consultant. Analyze this pricing situation:\n1. Van Westendorp price sensitivity analysis\n2. Competitive pricing comparison\n3. Value-based pricing recommendation\n4. Pricing psychology tactics to apply\n5. A/B test roadmap\n\nProduct: [DESCRIPTION], Current price: [PRICE], Competitors: [LIST WITH PRICES]` },
  { id: 19, title: "LinkedIn Profile Optimizer", category: "Marketing", tier: "pro", description: "Rewrite your LinkedIn profile to attract opportunities and clients.", tags: ["linkedin", "personal brand", "b2b"], uses: 3201, rating: 4.6, prompt: `You are a personal branding expert. Rewrite this LinkedIn profile:\n1. Headline (keyword-rich, value-focused)\n2. About section (hook, story, CTA)\n3. Experience descriptions (achievement-focused)\n4. Skills section optimization\n5. Featured section recommendations\n\nCurrent profile: [PASTE PROFILE], Goal: [WHAT YOU WANT TO ATTRACT]` },
  { id: 20, title: "Code Review Checklist Builder", category: "Engineering", tier: "pro", description: "Generate a comprehensive code review checklist for your tech stack.", tags: ["code", "review", "engineering"], uses: 1987, rating: 4.9, prompt: `You are a principal engineer. Create a code review checklist for:\n1. Security vulnerabilities (OWASP top 10)\n2. Performance bottlenecks\n3. Code readability and maintainability\n4. Test coverage requirements\n5. Documentation standards\n6. Stack-specific best practices\n\nStack: [YOUR TECH STACK], Team size: [SIZE]` },
  { id: 21, title: "Customer Onboarding Flow", category: "Product", tier: "pro", description: "Design a frictionless onboarding experience that reduces churn.", tags: ["onboarding", "product", "retention"], uses: 1543, rating: 4.7, prompt: `You are a growth PM. Design a customer onboarding flow:\n1. Day 0: First value moment\n2. Day 1-3: Habit formation touchpoints\n3. Day 7: Engagement checkpoint\n4. Day 14: Expansion opportunity\n5. Day 30: Advocacy trigger\n\nProduct: [DESCRIPTION], Key action: [ACTIVATION EVENT]` },
  { id: 22, title: "Press Release Writer", category: "Marketing", tier: "pro", description: "Write a newsworthy press release journalists actually publish.", tags: ["pr", "press", "media"], uses: 1234, rating: 4.6, prompt: `You are a PR director at a top agency. Write a press release:\n1. Headline (newsy, not salesy)\n2. Dateline and lead paragraph\n3. Body (inverted pyramid)\n4. Executive quote\n5. Boilerplate\n6. Media contact\n\nAnnouncement: [WHAT], Company: [NAME], Date: [DATE]` },
  { id: 23, title: "Database Schema Designer", category: "Engineering", tier: "pro", description: "Design optimized database schemas with indexing recommendations.", tags: ["database", "sql", "architecture"], uses: 1876, rating: 4.8, prompt: `You are a database architect. Design a schema for:\n1. Entity relationship diagram (text format)\n2. Table definitions with data types\n3. Primary and foreign keys\n4. Indexing strategy\n5. Normalization analysis\n6. Query performance considerations\n\nUse case: [DESCRIPTION], Scale: [EXPECTED ROWS/REQUESTS]` },
  { id: 24, title: "Refund Policy Writer", category: "Legal", tier: "pro", description: "Write a clear, fair refund policy that protects your business.", tags: ["legal", "policy", "ecommerce"], uses: 987, rating: 4.5, prompt: `You are a business attorney. Write a refund policy that:\n1. Clearly defines eligible refund scenarios\n2. States timeframes and conditions\n3. Explains the refund process\n4. Covers edge cases (digital products, subscriptions)\n5. Is legally sound but customer-friendly\n\nBusiness type: [TYPE], Products: [DESCRIPTION]` },
  { id: 25, title: "Social Media Content Calendar", category: "Marketing", tier: "pro", description: "Create a 30-day content calendar with post ideas and hooks.", tags: ["social", "content", "calendar"], uses: 2876, rating: 4.7, prompt: `You are a social media strategist. Create a 30-day content calendar:\n1. Content pillars (3-4 themes)\n2. Post frequency per platform\n3. 30 post ideas with hooks\n4. Best posting times\n5. Engagement tactics\n\nBrand: [NAME], Platforms: [LIST], Audience: [TARGET]` },
  { id: 26, title: "Technical Architecture Reviewer", category: "Engineering", tier: "enterprise", description: "Review system designs for scalability, security, and cost efficiency.", tags: ["engineering", "architecture", "devops"], uses: 1204, rating: 5.0, prompt: `As a Principal Engineer at FAANG, review this architecture:\n1. Identify single points of failure\n2. Project costs at 10x scale\n3. Flag security vulnerabilities\n4. Suggest specific optimizations with trade-offs\n\nArchitecture: [DIAGRAM/DESCRIPTION]` },
  { id: 27, title: "M&A Due Diligence Checklist", category: "Legal", tier: "enterprise", description: "Generate a comprehensive due diligence checklist for M&A transactions.", tags: ["legal", "m&a", "finance"], uses: 432, rating: 5.0, prompt: `You are an M&A attorney. Generate a due diligence checklist covering:\n1. Corporate structure and governance\n2. Financial statements and projections\n3. Intellectual property audit\n4. Employment and benefits review\n5. Litigation and regulatory review\n6. Customer and supplier contracts\n7. Technology and cybersecurity assessment\n\nDeal type: [TYPE], Target: [INDUSTRY], Deal size: [RANGE]` },
  { id: 28, title: "Enterprise Sales Playbook", category: "Sales", tier: "enterprise", description: "Build a complete enterprise sales playbook for complex B2B deals.", tags: ["enterprise", "sales", "b2b"], uses: 654, rating: 4.9, prompt: `You are a CRO who has closed $100M+ in enterprise deals. Build a sales playbook:\n1. Ideal customer profile (firmographic + technographic)\n2. Multi-stakeholder mapping\n3. Discovery framework (MEDDIC/SPICED)\n4. Proposal and pricing strategy\n5. Legal/procurement navigation\n6. Negotiation tactics\n7. Success metrics and QBR framework\n\nProduct: [DESCRIPTION], ACV target: [AMOUNT]` },
  { id: 29, title: "Board Presentation Builder", category: "Finance", tier: "enterprise", description: "Structure and write board-level presentations that drive decisions.", tags: ["board", "executive", "presentation"], uses: 321, rating: 5.0, prompt: `You are a CFO presenting to a board of directors. Structure this presentation:\n1. Executive summary (decisions needed)\n2. Business performance vs. plan\n3. Key risks and mitigation\n4. Strategic initiatives update\n5. Financial projections\n6. Resource requests with ROI\n\nPeriod: [Q/YEAR], Key messages: [WHAT YOU NEED APPROVED], Data: [METRICS]` },
  { id: 30, title: "Regulatory Compliance Analyzer", category: "Legal", tier: "enterprise", description: "Analyze business operations for regulatory compliance gaps.", tags: ["compliance", "legal", "regulatory"], uses: 543, rating: 4.9, prompt: `You are a compliance officer at a Fortune 500. Analyze for compliance:\n1. Applicable regulations (GDPR, CCPA, SOC2, HIPAA, etc.)\n2. Current gaps vs. requirements\n3. Risk severity matrix\n4. Remediation roadmap (priority order)\n5. Ongoing monitoring requirements\n6. Documentation needed\n\nBusiness type: [TYPE], Regions: [LOCATIONS], Data handled: [DESCRIPTION]` },
  { id: 31, title: "Workforce Planning Model", category: "HR", tier: "enterprise", description: "Model headcount needs, costs, and hiring timelines for scale.", tags: ["hr", "workforce", "planning"], uses: 432, rating: 4.8, prompt: `You are a Chief People Officer. Build a workforce plan:\n1. Current vs. target org structure\n2. Headcount requirements by quarter\n3. Fully-loaded cost model per role\n4. Hiring timeline and bottlenecks\n5. Build vs. buy vs. partner decisions\n6. Attrition risk assessment\n\nCompany stage: [STAGE], Growth target: [%], Budget: [AMOUNT]` },
  { id: 32, title: "Data Room Preparation Guide", category: "Finance", tier: "enterprise", description: "Prepare a VC-ready data room that accelerates due diligence.", tags: ["fundraising", "data room", "vc"], uses: 876, rating: 5.0, prompt: `You are a founder who has raised $50M+. Prepare a data room:\n1. Document checklist (categorized)\n2. Financial model requirements\n3. Legal documents to gather\n4. Metrics dashboard template\n5. Common investor questions to pre-answer\n6. Red flags to address proactively\n\nStage: [SERIES], Sector: [INDUSTRY], ARR: [AMOUNT]` },
  { id: 33, title: "Crisis Communication Plan", category: "Marketing", tier: "enterprise", description: "Build a crisis communication playbook for PR emergencies.", tags: ["crisis", "pr", "communications"], uses: 543, rating: 4.9, prompt: `You are a crisis communications expert. Build a response plan:\n1. Crisis severity matrix (P0-P3 definitions)\n2. Response team and decision tree\n3. First 24-hour playbook\n4. Holding statements by scenario\n5. Stakeholder communication order\n6. Media response protocol\n7. Post-crisis review process\n\nCompany: [TYPE], Potential scenarios: [LIST]` },
  { id: 34, title: "SLA Framework Designer", category: "Engineering", tier: "enterprise", description: "Design enterprise-grade SLAs with monitoring and escalation procedures.", tags: ["sla", "enterprise", "operations"], uses: 432, rating: 4.8, prompt: `You are a VP of Engineering. Design an SLA framework:\n1. Service tier definitions (Platinum/Gold/Silver)\n2. Uptime commitments and measurement\n3. Response and resolution time matrix\n4. Escalation procedures\n5. Credit/penalty structure\n6. Exclusions and force majeure\n7. Reporting and review cadence\n\nProduct type: [SAAS/API/etc], Enterprise clients: [COUNT]` },
  { id: 35, title: "Executive Compensation Designer", category: "HR", tier: "enterprise", description: "Design competitive executive compensation packages with equity strategy.", tags: ["compensation", "executive", "equity"], uses: 321, rating: 4.9, prompt: `You are a compensation consultant. Design an executive compensation package:\n1. Base salary benchmarking\n2. Annual bonus structure\n3. Equity plan (options vs. RSUs, cliff/vesting)\n4. Benefits and perquisites\n5. Change-of-control provisions\n6. Clawback policies\n\nRole: [TITLE], Stage: [SERIES], Location: [CITY], Budget: [RANGE]` },
];

const categories = ["All", "Legal", "Research", "Finance", "Sales", "Engineering", "Marketing", "HR", "Productivity", "Product"];
const tiers = ["All", "free", "pro", "enterprise"];
const tierColors = {
  free:       { bg: "#00ff9020", border: "#00ff90", text: "#00ff90" },
  pro:        { bg: "#00b4ff20", border: "#00b4ff", text: "#00b4ff" },
  enterprise: { bg: "#ff6b3520", border: "#ff6b35", text: "#ff6b35" },
};
const categoryIcons = { Legal:"⚖", Research:"◎", Finance:"◈", Sales:"◆", Engineering:"⬡", Marketing:"◉", HR:"◫", Productivity:"◧", Product:"◩", All:"◌" };
const TIER_RANK = { free: 0, pro: 1, enterprise: 2 };
const GUMROAD_PRODUCTS = { pro: "qvcmgg", enterprise: "gveybd" };

async function verifyLicenseKey(key) {
  for (const [tier, productId] of Object.entries(GUMROAD_PRODUCTS)) {
    try {
      const res = await fetch("https://api.gumroad.com/v2/licenses/verify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `product_id=${productId}&license_key=${encodeURIComponent(key)}`,
      });
      const data = await res.json();
      if (data.success) return { valid: true, tier };
    } catch (_) {}
  }
  return { valid: false };
}

function GlitchText({ text }) {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const iv = setInterval(() => { setGlitch(true); setTimeout(() => setGlitch(false), 150); }, 3000 + Math.random() * 2000);
    return () => clearInterval(iv);
  }, []);
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {text}
      {glitch && <>
        <span style={{ position: "absolute", top: 0, left: "2px", color: "#ff003c", clipPath: "polygon(0 30%,100% 30%,100% 50%,0 50%)", opacity: 0.8 }}>{text}</span>
        <span style={{ position: "absolute", top: 0, left: "-2px", color: "#00ffff", clipPath: "polygon(0 60%,100% 60%,100% 80%,0 80%)", opacity: 0.8 }}>{text}</span>
      </>}
    </span>
  );
}

function SaveButton() {
  const [saved, setSaved] = useState(false);
  return (
    <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }} style={{ padding: "12px 20px", background: saved ? "#00ff9015" : "none", border: `1px solid ${saved ? "#00ff90" : "#2a3545"}`, color: saved ? "#00ff90" : "#6677aa", borderRadius: "6px", fontFamily: "'Space Mono', monospace", fontSize: "11px", cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }}>
      {saved ? "✓ SAVED" : "♡ SAVE"}
    </button>
  );
}

function LockOverlay({ tier, onUnlock }) {
  const tc = tierColors[tier];
  return (
    <div style={{ position: "absolute", inset: 0, borderRadius: "8px", background: "rgba(3,5,8,0.88)", backdropFilter: "blur(3px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px", zIndex: 10 }}>
      <div style={{ fontSize: "28px" }}>🔒</div>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", color: tc.text, letterSpacing: "0.12em", textTransform: "uppercase" }}>{tier} prompt</div>
      <button onClick={onUnlock} style={{ background: `${tc.border}18`, border: `1px solid ${tc.border}`, color: tc.text, padding: "7px 16px", borderRadius: "4px", fontFamily: "'Space Mono', monospace", fontSize: "10px", cursor: "pointer", letterSpacing: "0.05em" }}>UNLOCK →</button>
    </div>
  );
}

function PromptCard({ prompt, userTier, onClick, onUnlock }) {
  const [hovered, setHovered] = useState(false);
  const tier = tierColors[prompt.tier];
  const locked = TIER_RANK[userTier] < TIER_RANK[prompt.tier];
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => !locked && onClick(prompt)} style={{ background: hovered && !locked ? "#0d1117" : "#080c10", border: `1px solid ${hovered && !locked ? tier.border : "#1a2030"}`, borderRadius: "8px", padding: "20px", cursor: locked ? "default" : "pointer", transition: "all 0.2s ease", transform: hovered && !locked ? "translateY(-3px)" : "none", boxShadow: hovered && !locked ? `0 8px 32px ${tier.border}22` : "none", position: "relative", overflow: "hidden" }}>
      {locked && <LockOverlay tier={prompt.tier} onUnlock={onUnlock} />}
      {hovered && !locked && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(90deg,transparent,${tier.border},transparent)` }} />}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
        <span style={{ fontSize: "22px" }}>{categoryIcons[prompt.category] || "◌"}</span>
        <span style={{ fontSize: "10px", fontFamily: "'Space Mono', monospace", padding: "3px 8px", borderRadius: "2px", background: tier.bg, border: `1px solid ${tier.border}`, color: tier.text, textTransform: "uppercase", letterSpacing: "0.1em" }}>{prompt.tier}</span>
      </div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "15px", fontWeight: "700", color: "#e8eaf0", marginBottom: "8px", lineHeight: 1.3 }}>{prompt.title}</div>
      <div style={{ fontSize: "12px", color: "#556", lineHeight: 1.5, marginBottom: "14px" }}>{prompt.description}</div>
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" }}>
        {prompt.tags.map(t => <span key={t} style={{ fontSize: "10px", fontFamily: "'Space Mono', monospace", color: "#445", padding: "2px 6px", border: "1px solid #1e2535", borderRadius: "2px" }}>#{t}</span>)}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "11px", color: "#445", fontFamily: "'Space Mono', monospace" }}>{prompt.uses.toLocaleString()} uses</span>
        <span style={{ fontSize: "12px", color: "#ffd700" }}>{"★".repeat(Math.floor(prompt.rating))} {prompt.rating}</span>
      </div>
    </div>
  );
}

function Modal({ prompt, onClose }) {
  const [copied, setCopied] = useState(false);
  if (!prompt) return null;
  const tier = tierColors[prompt.tier];
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px", backdropFilter: "blur(4px)" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#080c10", border: `1px solid ${tier.border}`, borderRadius: "12px", padding: "32px", maxWidth: "640px", width: "100%", boxShadow: `0 0 60px ${tier.border}33`, position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg,transparent,${tier.border},transparent)`, borderRadius: "12px 12px 0 0" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
          <div>
            <div style={{ fontSize: "11px", color: tier.text, fontFamily: "'Space Mono', monospace", marginBottom: "8px", letterSpacing: "0.1em" }}>{prompt.category.toUpperCase()} / {prompt.tier.toUpperCase()}</div>
            <div style={{ fontSize: "20px", fontFamily: "'Syne', sans-serif", fontWeight: "800", color: "#e8eaf0" }}>{prompt.title}</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "1px solid #1e2535", color: "#556", cursor: "pointer", borderRadius: "4px", width: "32px", height: "32px", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
        </div>
        <div style={{ background: "#030508", border: "1px solid #1a2030", borderRadius: "6px", padding: "20px", marginBottom: "20px", fontFamily: "'Space Mono', monospace", fontSize: "12px", color: "#8899bb", lineHeight: "1.8", whiteSpace: "pre-wrap", maxHeight: "240px", overflowY: "auto" }}>{prompt.prompt}</div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => { navigator.clipboard.writeText(prompt.prompt); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{ flex: 1, background: copied ? "#00ff9015" : `${tier.border}15`, border: `1px solid ${copied ? "#00ff90" : tier.border}`, color: copied ? "#00ff90" : tier.text, padding: "12px", borderRadius: "6px", fontFamily: "'Space Mono', monospace", fontSize: "12px", cursor: "pointer", letterSpacing: "0.05em", transition: "all 0.2s" }}>
            {copied ? "✓ COPIED" : "◻ COPY PROMPT"}
          </button>
          <SaveButton />
        </div>
      </div>
    </div>
  );
}

function LicenseModal({ onClose, onVerified }) {
  const [key, setKey] = useState("");
  const [status, setStatus] = useState("idle");
  const handleVerify = async () => {
    if (!key.trim()) return;
    setStatus("loading");
    const result = await verifyLicenseKey(key.trim());
    if (result.valid) {
      localStorage.setItem("pv_license_key", key.trim());
      localStorage.setItem("pv_tier", result.tier);
      onVerified(result.tier);
      onClose();
    } else {
      setStatus("error");
    }
  };
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, padding: "20px", backdropFilter: "blur(6px)" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#080c10", border: "1px solid #00b4ff", borderRadius: "12px", padding: "36px", maxWidth: "480px", width: "100%", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,transparent,#00b4ff,#00ff90,transparent)", borderRadius: "12px 12px 0 0" }} />
        <div style={{ fontSize: "11px", color: "#00b4ff", fontFamily: "'Space Mono', monospace", letterSpacing: "0.2em", marginBottom: "12px" }}>// UNLOCK LIBRARY</div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "20px", fontWeight: "900", color: "#e8eaf0", marginBottom: "8px" }}>Enter your license key</div>
        <div style={{ fontSize: "12px", color: "#556", marginBottom: "24px", lineHeight: 1.6 }}>After subscribing on Gumroad, you'll receive a license key by email. Enter it here to unlock your prompts.</div>
        <input value={key} onChange={e => { setKey(e.target.value); setStatus("idle"); }} onKeyDown={e => e.key === "Enter" && handleVerify()} placeholder="XXXXXXXX-XXXXXXXX-XXXXXXXX-XXXXXXXX" style={{ width: "100%", background: "#030508", border: `1px solid ${status === "error" ? "#ff4444" : "#1a2030"}`, borderRadius: "4px", padding: "12px 14px", fontFamily: "'Space Mono', monospace", fontSize: "12px", color: "#8899bb", outline: "none", boxSizing: "border-box", marginBottom: "12px" }} />
        {status === "error" && <div style={{ fontSize: "11px", color: "#ff4444", fontFamily: "'Space Mono', monospace", marginBottom: "12px" }}>✗ Invalid key — check your Gumroad receipt email</div>}
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={handleVerify} disabled={status === "loading"} style={{ flex: 1, background: "linear-gradient(135deg,#00b4ff,#00ff90)", border: "none", color: "#030508", padding: "12px", borderRadius: "4px", fontFamily: "'Space Mono', monospace", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>
            {status === "loading" ? "VERIFYING..." : "UNLOCK ACCESS →"}
          </button>
          <button onClick={onClose} style={{ padding: "12px 16px", background: "none", border: "1px solid #1e2535", color: "#445", borderRadius: "4px", fontFamily: "'Space Mono', monospace", fontSize: "11px", cursor: "pointer" }}>CANCEL</button>
        </div>
        <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid #0e1520", fontSize: "11px", color: "#334", fontFamily: "'Space Mono', monospace", textAlign: "center" }}>
          Don't have a key? → <a href="https://ogoina4.gumroad.com/l/qvcmgg" target="_blank" rel="noopener noreferrer" style={{ color: "#00b4ff", textDecoration: "none" }}>Subscribe to Pro</a> or <a href="https://ogoina4.gumroad.com/l/gveybd" target="_blank" rel="noopener noreferrer" style={{ color: "#ff6b35", textDecoration: "none" }}>Enterprise</a>
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
  const [userTier, setUserTier] = useState("free");
  const [showLicense, setShowLicense] = useState(false);

  useEffect(() => { const saved = localStorage.getItem("pv_tier"); if (saved) setUserTier(saved); }, []);
  useEffect(() => { const iv = setInterval(() => setCounter(c => c < 24891 ? c + Math.floor(Math.random() * 37) : 24891), 30); return () => clearInterval(iv); }, []);

  const filtered = prompts.filter(p => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchTier = activeTier === "All" || p.tier === activeTier;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.tags.some(t => t.includes(search.toLowerCase()));
    return matchCat && matchTier && matchSearch;
  });

  const tierBadgeColor = { free: "#00ff90", pro: "#00b4ff", enterprise: "#ff6b35" };

  return (
    <div style={{ fontFamily: "'Space Mono', monospace", background: "#030508", minHeight: "100vh", color: "#8899bb" }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@700;800;900&display=swap" rel="stylesheet" />
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: `linear-gradient(rgba(0,180,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,180,255,0.03) 1px,transparent 1px)`, backgroundSize: "40px 40px" }} />
      <div style={{ position: "fixed", top: "-200px", left: "-200px", width: "500px", height: "500px", background: "radial-gradient(circle,rgba(0,180,255,0.04) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-200px", right: "-100px", width: "400px", height: "400px", background: "radial-gradient(circle,rgba(0,255,144,0.03) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <nav style={{ borderBottom: "1px solid #0e1520", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "56px", background: "rgba(3,5,8,0.9)", backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 100 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "28px", height: "28px", background: "linear-gradient(135deg,#00b4ff,#00ff90)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>◈</div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: "900", fontSize: "16px", color: "#e8eaf0", letterSpacing: "-0.02em" }}>PROMPT<span style={{ color: "#00b4ff" }}>VAULT</span></span>
          </div>
          <span style={{ fontSize: "10px", background: "#0a0a0a", border: "1px solid #333", color: "#00ff90", padding: "2px 8px", borderRadius: "2px", letterSpacing: "0.1em" }}>{counter.toLocaleString()} prompts used</span>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <span onClick={() => document.getElementById("library").scrollIntoView({ behavior: "smooth" })} style={{ fontSize: "12px", color: "#6677aa", cursor: "pointer" }}>Library</span>
            <span onClick={() => document.getElementById("pricing").scrollIntoView({ behavior: "smooth" })} style={{ fontSize: "12px", color: "#6677aa", cursor: "pointer" }}>Pricing</span>
            {userTier !== "free" ? (
              <span style={{ fontSize: "10px", background: `${tierBadgeColor[userTier]}18`, border: `1px solid ${tierBadgeColor[userTier]}`, color: tierBadgeColor[userTier], padding: "5px 12px", borderRadius: "4px", letterSpacing: "0.05em" }}>✓ {userTier.toUpperCase()}</span>
            ) : (
              <button onClick={() => setShowLicense(true)} style={{ background: "linear-gradient(135deg,#00b4ff,#00ff90)", border: "none", color: "#030508", padding: "7px 16px", borderRadius: "4px", fontFamily: "'Space Mono', monospace", fontSize: "11px", fontWeight: "700", cursor: "pointer", letterSpacing: "0.05em" }}>UNLOCK ACCESS →</button>
            )}
          </div>
        </nav>

        <div style={{ padding: "80px 32px 60px", maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: "1px solid #0e1a28", borderRadius: "100px", padding: "6px 14px", fontSize: "11px", marginBottom: "32px", background: "#00b4ff08", color: "#00b4ff" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00ff90", display: "inline-block", animation: "pulse 2s infinite" }} />
            v2.4 — {prompts.length} prompts across {categories.length - 1} industries
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(42px,8vw,80px)", fontWeight: "900", lineHeight: 0.95, letterSpacing: "-0.03em", color: "#e8eaf0", marginBottom: "24px" }}>
            <GlitchText text="Battle-tested" /><br />
            <span style={{ background: "linear-gradient(135deg,#00b4ff 0%,#00ff90 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI prompts</span><br />
            that actually work.
          </h1>
          <p style={{ fontSize: "16px", color: "#5a6a7a", lineHeight: 1.7, maxWidth: "520px", margin: "0 auto 40px" }}>Stop writing prompts from scratch. Access a curated library of expert-crafted prompts for legal, finance, marketing, engineering, and more.</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginBottom: "40px" }}>
            <button onClick={() => document.getElementById("library").scrollIntoView({ behavior: "smooth" })} style={{ background: "linear-gradient(135deg,#00b4ff,#00ff90)", border: "none", color: "#030508", padding: "12px 28px", borderRadius: "4px", fontFamily: "'Space Mono', monospace", fontSize: "12px", fontWeight: "700", cursor: "pointer", letterSpacing: "0.05em" }}>BROWSE PROMPTS →</button>
            <button onClick={() => document.getElementById("pricing").scrollIntoView({ behavior: "smooth" })} style={{ background: "transparent", border: "1px solid #2a3545", color: "#8899bb", padding: "12px 28px", borderRadius: "4px", fontFamily: "'Space Mono', monospace", fontSize: "12px", cursor: "pointer", letterSpacing: "0.05em" }}>VIEW PRICING</button>
          </div>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            {[{ label: `${prompts.length}+`, sub: "Prompts" }, { label: "$0", sub: "To start" }, { label: `${categories.length - 1}`, sub: "Industries" }, { label: "24k+", sub: "Users" }].map(stat => (
              <div key={stat.label} style={{ background: "#080c10", border: "1px solid #0e1520", borderRadius: "8px", padding: "16px 24px", textAlign: "center" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "28px", fontWeight: "900", color: "#e8eaf0" }}>{stat.label}</div>
                <div style={{ fontSize: "11px", color: "#445" }}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div id="library" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 32px 80px" }}>
          <div style={{ borderBottom: "1px solid #0e1520", marginBottom: "32px", paddingBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "11px", letterSpacing: "0.2em", color: "#00b4ff", marginBottom: "4px" }}>// PROMPT LIBRARY</div>
              <div style={{ fontSize: "22px", fontFamily: "'Syne', sans-serif", fontWeight: "800", color: "#e8eaf0" }}>Browse the vault</div>
            </div>
            {userTier === "free" && (
              <button onClick={() => setShowLicense(true)} style={{ background: "transparent", border: "1px solid #00b4ff", color: "#00b4ff", padding: "8px 16px", borderRadius: "4px", fontFamily: "'Space Mono', monospace", fontSize: "10px", cursor: "pointer", letterSpacing: "0.05em" }}>🔑 ENTER LICENSE KEY</button>
            )}
          </div>

          <div style={{ display: "flex", gap: "10px", marginBottom: "24px", flexWrap: "wrap", alignItems: "center" }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search prompts..." style={{ background: "#080c10", border: "1px solid #1a2030", borderRadius: "4px", padding: "8px 14px", fontFamily: "'Space Mono', monospace", fontSize: "12px", color: "#8899bb", outline: "none", width: "190px" }} />
            <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} style={{ background: activeCategory === cat ? "#00b4ff15" : "transparent", border: `1px solid ${activeCategory === cat ? "#00b4ff" : "#1a2030"}`, color: activeCategory === cat ? "#00b4ff" : "#445", padding: "6px 10px", borderRadius: "4px", cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.05em" }}>
                  {cat === "All" ? "ALL" : `${categoryIcons[cat] || ""} ${cat.toUpperCase()}`}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: "6px", marginLeft: "auto" }}>
              {tiers.map(t => {
                const tc = t === "free" ? "#00ff90" : t === "pro" ? "#00b4ff" : t === "enterprise" ? "#ff6b35" : "#e8eaf0";
                const isActive = activeTier === t;
                return <button key={t} onClick={() => setActiveTier(t)} style={{ background: isActive ? `${tc}18` : "transparent", border: `1px solid ${isActive ? tc : "#2a3545"}`, color: isActive ? tc : "#556677", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: "10px", textTransform: "uppercase", transition: "all 0.15s", fontWeight: isActive ? "700" : "400" }}>{t}</button>;
              })}
            </div>
          </div>

          {userTier === "free" && (
            <div style={{ background: "#00b4ff08", border: "1px solid #00b4ff22", borderRadius: "6px", padding: "12px 16px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "11px", color: "#5577aa", fontFamily: "'Space Mono', monospace" }}>◌ FREE TIER — {prompts.filter(p => p.tier === "free").length} prompts unlocked · {prompts.filter(p => p.tier !== "free").length} locked</span>
              <button onClick={() => setShowLicense(true)} style={{ background: "none", border: "1px solid #00b4ff", color: "#00b4ff", padding: "5px 12px", borderRadius: "3px", fontFamily: "'Space Mono', monospace", fontSize: "9px", cursor: "pointer", letterSpacing: "0.08em" }}>UNLOCK ALL →</button>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "16px" }}>
            {filtered.map(p => <PromptCard key={p.id} prompt={p} userTier={userTier} onClick={setSelectedPrompt} onUnlock={() => setShowLicense(true)} />)}
          </div>
          {filtered.length === 0 && <div style={{ textAlign: "center", padding: "60px", color: "#334", fontFamily: "'Space Mono', monospace", fontSize: "12px" }}>NO PROMPTS FOUND // TRY ADJUSTING FILTERS</div>}
        </div>

        <div id="pricing" style={{ borderTop: "1px solid #0e1520", padding: "80px 32px", maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#00b4ff", marginBottom: "8px", fontFamily: "'Space Mono', monospace" }}>// PRICING</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "32px", fontWeight: "900", color: "#e8eaf0" }}>Start free. Scale when ready.</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "16px" }}>
            {[
              { name: "FREE", price: "$0", period: "/forever", color: "#00ff90", features: [`${prompts.filter(p=>p.tier==="free").length} free prompts`, "All categories", "Copy & use instantly", "Email support"], cta: "START FREE", href: "#library" },
              { name: "PRO", price: "$29", period: "/month", color: "#00b4ff", highlight: true, features: [`${prompts.filter(p=>p.tier!=="enterprise").length}+ premium prompts`, "All free prompts included", "Multi-model versions", "New prompts weekly", "Priority support"], cta: "GO PRO →", href: "https://ogoina4.gumroad.com/l/qvcmgg" },
              { name: "ENTERPRISE", price: "$199", period: "/month", color: "#ff6b35", features: ["All prompts unlocked", "Custom prompt creation", "10 team seats", "API access", "Dedicated support"], cta: "GET ENTERPRISE →", href: "https://ogoina4.gumroad.com/l/gveybd" },
            ].map(plan => (
              <div key={plan.name} style={{ background: plan.highlight ? "#0a0f18" : "#080c10", border: `1px solid ${plan.highlight ? plan.color : "#1a2030"}`, borderRadius: "10px", padding: "28px", position: "relative", overflow: "hidden", boxShadow: plan.highlight ? `0 0 40px ${plan.color}22` : "none" }}>
                {plan.highlight && <div style={{ position: "absolute", top: "12px", right: "12px", background: "#00b4ff15", border: "1px solid #00b4ff", color: "#00b4ff", fontSize: "9px", padding: "3px 8px", borderRadius: "2px", fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em" }}>POPULAR</div>}
                <div style={{ fontSize: "11px", color: plan.color, letterSpacing: "0.15em", marginBottom: "12px" }}>{plan.name}</div>
                <div style={{ marginBottom: "24px" }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "40px", fontWeight: "900", color: "#e8eaf0" }}>{plan.price}</span>
                  <span style={{ fontSize: "12px", color: "#445" }}>{plan.period}</span>
                </div>
                <div style={{ marginBottom: "24px" }}>
                  {plan.features.map(f => <div key={f} style={{ display: "flex", gap: "10px", marginBottom: "10px", fontSize: "12px", color: "#6677aa" }}><span style={{ color: plan.color }}>›</span> {f}</div>)}
                </div>
                <a href={plan.href} target={plan.href.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer" style={{ display: "block", width: "100%", padding: "12px", background: plan.highlight ? "linear-gradient(135deg,#00b4ff,#00ff90)" : "transparent", border: plan.highlight ? "none" : `1px solid ${plan.color}`, color: plan.highlight ? "#030508" : plan.color, borderRadius: "4px", cursor: "pointer", fontFamily: "'Space Mono', monospace", fontSize: "12px", fontWeight: "700", letterSpacing: "0.05em", textAlign: "center", textDecoration: "none", boxSizing: "border-box" }}>{plan.cta}</a>
                {plan.name !== "FREE" && <div style={{ marginTop: "10px", textAlign: "center" }}><span onClick={() => setShowLicense(true)} style={{ fontSize: "10px", color: "#334", fontFamily: "'Space Mono', monospace", cursor: "pointer", textDecoration: "underline" }}>Already subscribed? Enter license key</span></div>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid #0e1520", padding: "80px 32px", textAlign: "center" }}>
          <div style={{ maxWidth: "500px", margin: "0 auto", background: "#080c10", border: "1px solid #1a2030", borderRadius: "12px", padding: "40px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg,transparent,#00b4ff,#00ff90,transparent)" }} />
            <div style={{ fontSize: "11px", color: "#00b4ff", letterSpacing: "0.2em", marginBottom: "12px" }}>// EARLY ACCESS</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "22px", fontWeight: "900", color: "#e8eaf0", marginBottom: "8px" }}>Get the first 10 prompts free</div>
            <div style={{ fontSize: "12px", color: "#445", marginBottom: "24px" }}>No credit card. No spam. Just prompts that work.</div>
            {subscribed ? (
              <div style={{ color: "#00ff90", fontFamily: "'Space Mono', monospace", fontSize: "13px" }}>✓ ACCESS GRANTED — CHECK YOUR EMAIL</div>
            ) : (
              <div>
                <iframe name="mc_embed_iframe" style={{ display: "none" }} title="mc" />
                <form action="https://gmail.us2.list-manage.com/subscribe/post?u=13f674f36946617471a726a61&id=d56b3d028a&f_id=00ccc7e1f0" method="post" target="mc_embed_iframe" onSubmit={e => { if (email) { setSubscribed(true); } else { e.preventDefault(); } }} style={{ display: "flex", gap: "8px" }}>
                  <input type="email" name="EMAIL" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required style={{ flex: 1, background: "#030508", border: "1px solid #1a2030", borderRadius: "4px", padding: "10px 14px", fontFamily: "'Space Mono', monospace", fontSize: "12px", color: "#8899bb", outline: "none" }} />
                  <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true"><input type="text" name="b_13f674f36946617471a726a61_d56b3d028a" tabIndex="-1" defaultValue="" readOnly /></div>
                  <button type="submit" style={{ background: "linear-gradient(135deg,#00b4ff,#00ff90)", border: "none", color: "#030508", padding: "10px 20px", borderRadius: "4px", fontFamily: "'Space Mono', monospace", fontSize: "11px", fontWeight: "700", cursor: "pointer", whiteSpace: "nowrap" }}>GET ACCESS</button>
                </form>
              </div>
            )}
          </div>
        </div>

        <div style={{ borderTop: "1px solid #0e1520", padding: "24px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "11px", color: "#2a3040" }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: "900", color: "#1e2535" }}>PROMPT<span style={{ color: "#1a2f40" }}>VAULT</span></span>
          <span style={{ fontFamily: "'Space Mono', monospace" }}>© 2026 — BUILT WITH AI</span>
        </div>
      </div>

      {selectedPrompt && <Modal prompt={selectedPrompt} onClose={() => setSelectedPrompt(null)} />}
      {showLicense && <LicenseModal onClose={() => setShowLicense(false)} onVerified={t => setUserTier(t)} />}

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#030508}::-webkit-scrollbar-thumb{background:#1a2535}`}</style>
    </div>
  );
}