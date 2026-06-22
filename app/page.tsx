"use client";

import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   UPVIK — Digital Marketing Agency
   Homepage  |  Next.js 14 App Router
   app/page.tsx
───────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Industries", href: "#industries" },
  { label: "Blog", href: "#blog" },
];

const SERVICES = [
  { icon: "🔍", title: "Search Engine Optimisation", desc: "Rank #1 on Google for the terms your customers actually search. We combine technical audits, content depth, and authoritative link building for compounding organic growth.", tag: "SEO" },
  { icon: "💻", title: "Website Design & Development", desc: "Fast, pixel-perfect websites built on Next.js, WordPress, and custom stacks. Every site we ship scores 90+ on Core Web Vitals out of the box.", tag: "Web" },
  { icon: "📱", title: "Mobile App Development", desc: "Native iOS & Android apps and cross-platform Flutter solutions for businesses in Bhubaneswar and across Odisha — from MVP to full launch.", tag: "App" },
  { icon: "⚡", title: "Dynamic Web Applications", desc: "CRMs, portals, booking systems, and ERP dashboards custom-built for your workflow. Real-time data, role-based access, and bulletproof security.", tag: "Dev" },
  { icon: "📣", title: "Social Media Marketing", desc: "Strategy, creative, and paid campaigns across Meta, Instagram, LinkedIn, and YouTube. We grow audiences that convert, not just follow.", tag: "SMM" },
  { icon: "🎯", title: "Pay-Per-Click Advertising", desc: "Google Ads, Meta Ads, and programmatic campaigns managed by certified experts. Every rupee tracked, every campaign optimised for maximum ROI.", tag: "PPC" },
];

const STATS = [
  { value: "200+", label: "Projects Delivered" },
  { value: "98%", label: "Client Retention" },
  { value: "8×", label: "Average ROI" },
  { value: "6+", label: "Years in Bhubaneswar" },
];

const WORK = [
  { name: "Kalinga Hospital", category: "Healthcare · SEO + Web", result: "340% increase in organic traffic in 4 months", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80", color: "#0e7490" },
  { name: "Konark Realty", category: "Real Estate · SEO + PPC", result: "₹2.4 Cr in leads generated in Q1 2024", img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80", color: "#7c3aed" },
  { name: "Odisha Tourism Co.", category: "Travel · Social + Content", result: "120K Instagram followers in 6 months", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", color: "#b45309" },
  { name: "Ekamra Tech Park", category: "Corporate · Web App + Branding", result: "Custom portal for 80+ tenant companies", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", color: "#0f766e" },
];

const INDUSTRIES = [
  { name: "Healthcare", icon: "🏥" },
  { name: "Real Estate", icon: "🏠" },
  { name: "Education", icon: "🎓" },
  { name: "Hospitality", icon: "🏨" },
  { name: "Retail & E-Commerce", icon: "🛍️" },
  { name: "Manufacturing", icon: "🏭" },
  { name: "Finance & BFSI", icon: "💰" },
  { name: "Government & PSU", icon: "🏛️" },
];

const PROCESS = [
  { step: "01", title: "Discovery", desc: "We audit your current digital presence, map your competitors, and set measurable goals." },
  { step: "02", title: "Strategy", desc: "A custom roadmap built around your market, budget, and growth timeline." },
  { step: "03", title: "Execution", desc: "Our in-house team ships fast — SEO, design, code, and campaigns run in parallel." },
  { step: "04", title: "Optimise", desc: "Weekly reports, A/B tests, and algorithm-aware adjustments keep growth compounding." },
];

const TESTIMONIALS = [
  { name: "Ravi Shankar Panda", role: "MD, Konark Realty", quote: "Upvik transformed our digital presence. Within three months we were ranking for every major keyword in Bhubaneswar real estate. The ROI has been phenomenal.", avatar: "RS", color: "#7c3aed" },
  { name: "Dr. Sunita Mahapatra", role: "Director, Kalinga Diagnostics", quote: "We doubled our appointment bookings through the Google Ads campaign they ran. The team is responsive, data-driven, and genuinely invested in our success.", avatar: "SM", color: "#0e7490" },
  { name: "Priyanka Sahoo", role: "Co-founder, Ekamra Ventures", quote: "The web application they built for us handles 500+ daily users without a hitch. Clean code, beautiful UI, and delivered ahead of schedule.", avatar: "PS", color: "#059669" },
];

const BLOG_POSTS = [
  { title: "How Bhubaneswar Businesses Can Win on Google in 2025", excerpt: "Local SEO is changing fast. Here's what Odisha businesses need to know about Google's Helpful Content and map pack rankings.", date: "Jun 10, 2025", tag: "SEO", img: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=600&q=80" },
  { title: "Why Your Next Website Should Be Built on Next.js", excerpt: "Speed, SEO, and developer experience — three reasons we ship every new client site on the Next.js stack.", date: "May 28, 2025", tag: "Web Dev", img: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=600&q=80" },
  { title: "Meta Ads in Odisha: Targeting That Actually Converts", excerpt: "Generic audience targeting wastes budgets. Our hyperlocal playbook for Meta campaigns in Tier-2 Indian cities.", date: "May 14, 2025", tag: "PPC", img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80" },
];

const CLIENTS = ["Kalinga Hospital", "IDCO", "Utkal University", "Odisha Tourism", "Big FM Bhubaneswar", "Mayfair Hotels", "Capital Hospital", "NALCO"];

const TECH_STACK = [
  { name: "Next.js", color: "#000" }, { name: "React", color: "#61dafb" }, { name: "TypeScript", color: "#3178c6" },
  { name: "Node.js", color: "#339933" }, { name: "WordPress", color: "#21759b" }, { name: "Flutter", color: "#02569b" },
  { name: "PostgreSQL", color: "#336791" }, { name: "MongoDB", color: "#47a248" }, { name: "Google Ads", color: "#4285f4" },
  { name: "Meta Ads", color: "#1877f2" }, { name: "GA4 / GTM", color: "#e37400" }, { name: "Ahrefs / SEMrush", color: "#ff6900" },
];

/* ── Scroll reveal hook — client-only ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [mounted]);

  return { ref, visible: mounted ? visible : true };
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Animated counter — client-only ── */
function Counter({ target }: { target: string }) {
  const { ref, visible } = useReveal();
  const [count, setCount] = useState(0);
  const num = parseInt(target.replace(/\D/g, ""));
  const suffix = target.includes("+") ? "+" : target.includes("%") ? "%" : target.includes("×") ? "×" : "";

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.ceil(num / 60);
    const interval = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(interval); }
      else setCount(start);
    }, 18);
    return () => clearInterval(interval);
  }, [visible, num]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ══════════════════════════════════════════
   PAGE COMPONENT
══════════════════════════════════════════ */
export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", msg: "" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    fn(); // run once on mount
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navScrolled = mounted && scrolled;

  return (
    <div style={{ fontFamily: "'Inter', 'DM Sans', sans-serif", color: "#000000", background: "#fff" }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: navScrolled ? "rgba(255,255,255,0.97)" : "transparent",
        backdropFilter: navScrolled ? "blur(16px)" : "none",
        borderBottom: navScrolled ? "1px solid #e5e5e5" : "none",
        transition: "all 0.3s",
        padding: "0 24px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "#F01015", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontFamily: "Sora,sans-serif", fontWeight: 800, fontSize: 18 }}>U</span>
            </div>
            <span style={{ fontFamily: "Sora,sans-serif", fontWeight: 800, fontSize: 22, color: "#000000" }}>
              up<span className="grad">vik</span>
            </span>
          </a>

          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 36 }}>
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href}
                style={{ fontSize: 15, fontWeight: 500, color: "#000000", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#F01015")}
                onMouseLeave={e => (e.currentTarget.style.color = "#000000")}
              >{l.label}</a>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <a href="tel:+917894561230" className="hide-mobile" style={{ fontSize: 14, fontWeight: 600, color: "#F01015" }}>+91 78945 61230</a>
            <a href="#contact" className="btn-primary" style={{ padding: "10px 24px", fontSize: 14 }}>Get Free Audit</a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh", position: "relative", display: "flex", alignItems: "center",
        background: "#FFFFFF", overflow: "hidden", paddingTop: 72,
      }}>
        <div style={{ position: "absolute", top: -120, right: -120, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(240,16,21,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="container" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", padding: "80px 24px" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid #e5e5e5", borderRadius: 50, padding: "6px 16px", marginBottom: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#F01015", display: "inline-block" }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: "#000000" }}>Odisha&apos;s #1 Digital Growth Partner</span>
            </div>

            <h1 style={{ fontFamily: "Sora,sans-serif", fontSize: "clamp(38px,5vw,64px)", fontWeight: 800, lineHeight: 1.1, color: "#000000", marginBottom: 24 }}>
              We Grow Bhubaneswar<br />Businesses <span className="grad">Digitally.</span>
            </h1>

            <p style={{ fontSize: 18, color: "#555555", lineHeight: 1.75, marginBottom: 40, maxWidth: 480 }}>
              SEO, web development, apps, and performance marketing — built by a local team that understands the Odisha market and delivers results you can measure.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 56 }}>
              <a href="#contact" className="btn-primary">Get Free Digital Audit →</a>
              <a href="#work" className="btn-outline">View Our Work</a>
            </div>

            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              {STATS.map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily: "Sora,sans-serif", fontSize: 28, fontWeight: 800, color: "#F01015" }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: "#888888", fontWeight: 500, marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hide-mobile" style={{ position: "relative", height: 520 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80" alt="Bhubaneswar modern office"
              style={{ position: "absolute", top: 0, right: 0, width: "78%", height: 340, objectFit: "cover", borderRadius: 20, boxShadow: "0 24px 60px rgba(0,0,0,0.15)" }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80" alt="Digital marketing team"
              style={{ position: "absolute", bottom: 0, left: 0, width: "52%", height: 240, objectFit: "cover", borderRadius: 16, boxShadow: "0 16px 48px rgba(0,0,0,0.12)", border: "4px solid #fff" }} />
            <div style={{ position: "absolute", bottom: 60, right: 0, background: "#fff", borderRadius: 16, padding: "16px 22px", boxShadow: "0 12px 40px rgba(0,0,0,0.12)", border: "1px solid #e5e5e5", minWidth: 180 }}>
              <div style={{ fontSize: 11, color: "#888888", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>This month</div>
              <div style={{ fontFamily: "Sora,sans-serif", fontSize: 24, fontWeight: 800, color: "#F01015" }}>+284%</div>
              <div style={{ fontSize: 13, color: "#555555", marginTop: 2 }}>Organic traffic lifted</div>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.5 }}>
          <span style={{ fontSize: 12, color: "#888888", fontWeight: 500 }}>Scroll to explore</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom,#F01015,transparent)" }} />
        </div>
      </section>

      {/* ── MARQUEE CLIENTS ── */}
      <div style={{ background: "#000000", padding: "20px 0", overflow: "hidden", position: "relative" }}>
        <style>{`@keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }`}</style>
        <div style={{ display: "flex", animation: "marquee 22s linear infinite", whiteSpace: "nowrap", width: "max-content" }}>
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <span key={i} style={{ margin: "0 40px", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: 1.5, textTransform: "uppercase" }}>
              {c}<span style={{ marginLeft: 40, color: "#F01015", opacity: 0.6 }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section id="services" className="section" style={{ background: "#fff" }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="section-label">What We Do</div>
              <h2 className="section-title">Full-Stack Digital Services<br />Under One Roof</h2>
              <p className="section-sub" style={{ margin: "14px auto 0" }}>From strategy to execution, we cover every channel that drives growth for Bhubaneswar businesses.</p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="card-hover" style={{ background: "#fff", border: "1.5px solid #eaefff", borderRadius: 20, padding: "36px 28px", height: "100%", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "#F01015" }} />
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 20 }}>{s.icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#F01015", marginBottom: 10 }}>{s.tag}</div>
                  <h3 style={{ fontFamily: "Sora,sans-serif", fontSize: 20, fontWeight: 700, color: "#000000", marginBottom: 12 }}>{s.title}</h3>
                  <p style={{ fontSize: 14.5, color: "#6b7280", lineHeight: 1.7 }}>{s.desc}</p>
                  <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600, color: "#F01015" }}>Learn more <span>→</span></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS COUNTER ── */}
      <section style={{ background: "#000000", padding: "72px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, textAlign: "center" }}>
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 100}>
                <div style={{ color: "#fff" }}>
                  <div style={{ fontFamily: "Sora,sans-serif", fontSize: 52, fontWeight: 800, lineHeight: 1 }}>
                    <Counter target={s.value} />
                  </div>
                  <div style={{ fontSize: 14, opacity: 0.8, marginTop: 8, fontWeight: 500 }}>{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORK / CASE STUDIES ── */}
      <section id="work" className="section" style={{ background: "#f5f5f5" }}>
        <div className="container">
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
              <div>
                <div className="section-label">Our Work</div>
                <h2 className="section-title">Results That Speak<br />For Themselves</h2>
              </div>
              <a href="#contact" className="btn-outline">View All Projects →</a>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
            {WORK.map((w, i) => (
              <Reveal key={w.name} delay={i * 100}>
                <div className="card-hover" style={{ borderRadius: 20, overflow: "hidden", background: "#fff", border: "1px solid #e5e5e5" }}>
                  <div style={{ height: 220, overflow: "hidden", position: "relative" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={w.img} alt={w.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
                      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)" }} />
                    <div style={{ position: "absolute", bottom: 16, left: 16, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", borderRadius: 8, padding: "4px 12px", fontSize: 12, fontWeight: 600, color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}>{w.category}</div>
                  </div>
                  <div style={{ padding: "24px 28px" }}>
                    <h3 style={{ fontFamily: "Sora,sans-serif", fontSize: 20, fontWeight: 700, color: "#000000", marginBottom: 10 }}>{w.name}</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: w.color, display: "flex", alignItems: "center", justifyContent: "center" }}>📈</div>
                      <p style={{ fontSize: 14, color: "#374151", fontWeight: 500 }}>{w.result}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY UPVIK ── */}
      <section id="about" className="section" style={{ background: "#fff" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <Reveal>
              <div style={{ position: "relative" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80" alt="Upvik team Bhubaneswar"
                  style={{ width: "100%", height: 440, objectFit: "cover", borderRadius: 20, boxShadow: "0 24px 60px rgba(0,0,0,0.1)" }} />
                <div style={{ position: "absolute", top: -20, right: -20, background: "#fff", borderRadius: 16, padding: "18px 22px", boxShadow: "0 12px 40px rgba(0,0,0,0.12)", border: "1px solid #e5e5e5", textAlign: "center" }}>
                  <div style={{ fontFamily: "Sora,sans-serif", fontSize: 28, fontWeight: 800, color: "#F01015" }}>6+</div>
                  <div style={{ fontSize: 12, color: "#888888", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Years<br />in Odisha</div>
                </div>
                <div style={{ position: "absolute", bottom: -20, left: -20, background: "#F01015", borderRadius: 16, padding: "18px 22px", boxShadow: "0 12px 40px rgba(240,16,21,0.3)", textAlign: "center" }}>
                  <div style={{ fontFamily: "Sora,sans-serif", fontSize: 28, fontWeight: 800, color: "#fff" }}>98%</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Client<br />Retention</div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div>
                <div className="section-label">Why Upvik</div>
                <h2 className="section-title" style={{ marginBottom: 20 }}>Bhubaneswar&apos;s Most Trusted Digital Agency</h2>
                <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.8, marginBottom: 28 }}>
                  We&apos;re not a remote agency with a local phone number. Our entire team is based in Bhubaneswar — we know the Odisha market, speak the language of local business, and are invested in this city&apos;s growth.
                </p>
                {[
                  { icon: "⚡", title: "In-House Everything", desc: "No outsourcing. Every designer, developer, and strategist on your project is on our payroll." },
                  { icon: "📊", title: "Data-First Decisions", desc: "We instrument everything and send weekly performance reports you can actually understand." },
                  { icon: "🏆", title: "Proven Track Record", desc: "200+ projects delivered for Bhubaneswar businesses across healthcare, real estate, education, and more." },
                ].map((item) => (
                  <div key={item.title} style={{ display: "flex", gap: 18, marginBottom: 28 }}>
                    <div style={{ width: 48, height: 48, flexShrink: 0, borderRadius: 14, background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{item.icon}</div>
                    <div>
                      <h4 style={{ fontFamily: "Sora,sans-serif", fontSize: 17, fontWeight: 700, color: "#000000", marginBottom: 4 }}>{item.title}</h4>
                      <p style={{ fontSize: 14.5, color: "#6b7280", lineHeight: 1.65 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
                <a href="#contact" className="btn-primary" style={{ marginTop: 8 }}>Meet the Team →</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="section" style={{ background: "#f5f5f5" }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div className="section-label">How We Work</div>
              <h2 className="section-title">From Brief to Results<br />in Four Steps</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 100}>
                <div style={{ position: "relative", textAlign: "center", padding: "36px 20px" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#F01015", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 8px 24px rgba(240,16,21,0.3)" }}>
                    <span style={{ fontFamily: "Sora,sans-serif", fontWeight: 800, color: "#fff", fontSize: 18 }}>{p.step}</span>
                  </div>
                  <h3 style={{ fontFamily: "Sora,sans-serif", fontSize: 18, fontWeight: 700, color: "#000000", marginBottom: 10 }}>{p.title}</h3>
                  <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section id="industries" className="section" style={{ background: "#000000" }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2.5, textTransform: "uppercase", color: "#F01015", marginBottom: 12 }}>Industries We Serve</div>
              <h2 style={{ fontFamily: "Sora,sans-serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>Every Sector.<br />Every Scale.</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {INDUSTRIES.map((ind, i) => (
              <Reveal key={ind.name} delay={i * 60}>
                <div className="card-hover ind-card" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "28px 20px", textAlign: "center", cursor: "pointer", transition: "all 0.2s" }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{ind.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#e5e5e5" }}>{ind.name}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCAL BHUBANESWAR ── */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <Reveal delay={100}>
              <div>
                <div className="section-label">Proudly Local</div>
                <h2 className="section-title" style={{ marginBottom: 20 }}>Born and Built in Bhubaneswar</h2>
                <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.8, marginBottom: 24 }}>
                  From the startup corridors of Infocity to the markets of Saheed Nagar, we&apos;ve helped businesses across every zone of Bhubaneswar compete and win online.
                </p>
                <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.8, marginBottom: 32 }}>
                  We understand Smart City Bhubaneswar&apos;s growth trajectory, the buying behaviour of Odia consumers, and what it takes to rank locally in a city that&apos;s moving fast.
                </p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {["Infocity", "Saheed Nagar", "Patia", "Chandrasekharpur", "Nayapalli", "Unit-4"].map((area) => (
                    <span key={area} style={{ padding: "6px 16px", background: "#f5f5f5", borderRadius: 50, fontSize: 13, fontWeight: 600, color: "#F01015", border: "1px solid #e0e9ff" }}>{area}</span>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,0.1)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80" alt="Bhubaneswar city" style={{ width: "100%", height: 400, objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,10,50,0.7) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: 28, left: 28, right: 28 }}>
                  <div style={{ fontFamily: "Sora,sans-serif", fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Bhubaneswar, Odisha</div>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.75)" }}>Smart City · Growing Market · Our Home</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section" style={{ background: "linear-gradient(160deg,#f5f5f5 0%,#e8faf7 100%)" }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <div className="section-label">Client Stories</div>
              <h2 className="section-title">What Bhubaneswar<br />Business Owners Say</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <div className="card-hover" style={{ background: "#fff", borderRadius: 20, padding: "36px 28px", border: "1px solid #e5e5e5", position: "relative" }}>
                  <div style={{ fontSize: 40, color: "#F01015", opacity: 0.15, fontFamily: "Georgia,serif", lineHeight: 1, position: "absolute", top: 20, right: 24 }}>&quot;</div>
                  <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.75, marginBottom: 28, fontStyle: "italic" }}>&quot;{t.quote}&quot;</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 46, height: 46, borderRadius: "50%", background: t.color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Sora,sans-serif", fontWeight: 700, color: "#fff", fontSize: 15 }}>{t.avatar}</div>
                    <div>
                      <div style={{ fontWeight: 700, color: "#000000", fontSize: 15 }}>{t.name}</div>
                      <div style={{ fontSize: 13, color: "#888888" }}>{t.role}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 3, marginTop: 20 }}>
                    {[...Array(5)].map((_, j) => <span key={j} style={{ color: "#f59e0b", fontSize: 16 }}>★</span>)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="container">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div className="section-label">Our Stack</div>
              <h2 className="section-title">Built on Modern,<br />Battle-Tested Technology</h2>
            </div>
          </Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
            {TECH_STACK.map((tech) => (
              <div key={tech.name}
                style={{ padding: "10px 22px", borderRadius: 50, border: "1.5px solid #e2e8f0", fontSize: 14, fontWeight: 600, color: "#374151", background: "#fff", display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s", cursor: "default" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = tech.color; (e.currentTarget as HTMLElement).style.color = tech.color; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#e2e8f0"; (e.currentTarget as HTMLElement).style.color = "#374151"; }}
              >
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: tech.color, display: "inline-block" }} />
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG ── */}
      <section id="blog" className="section" style={{ background: "#f5f5f5" }}>
        <div className="container">
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
              <div>
                <div className="section-label">Insights</div>
                <h2 className="section-title">From the Upvik<br />Knowledge Hub</h2>
              </div>
              <a href="#" className="btn-outline">All Articles →</a>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {BLOG_POSTS.map((post, i) => (
              <Reveal key={post.title} delay={i * 100}>
                <div className="card-hover" style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid #e5e5e5" }}>
                  <div style={{ height: 180, overflow: "hidden" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.img} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
                      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
                      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
                  </div>
                  <div style={{ padding: "24px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                      <span style={{ padding: "3px 12px", background: "#eef4ff", borderRadius: 50, fontSize: 12, fontWeight: 700, color: "#F01015", textTransform: "uppercase", letterSpacing: 0.5 }}>{post.tag}</span>
                      <span style={{ fontSize: 12, color: "#9ca3af" }}>{post.date}</span>
                    </div>
                    <h3 style={{ fontFamily: "Sora,sans-serif", fontSize: 16, fontWeight: 700, color: "#000000", lineHeight: 1.45, marginBottom: 10 }}>{post.title}</h3>
                    <p style={{ fontSize: 13.5, color: "#6b7280", lineHeight: 1.65 }}>{post.excerpt}</p>
                    <div style={{ marginTop: 18, fontSize: 13, fontWeight: 600, color: "#F01015" }}>Read more →</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ background: "linear-gradient(135deg,#F01015 0%,#cc0d11 40%,#F01015 100%)", padding: "88px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />
        <div className="container" style={{ textAlign: "center", position: "relative" }}>
          <Reveal>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>Free No-Obligation Audit</div>
            <h2 style={{ fontFamily: "Sora,sans-serif", fontSize: "clamp(28px,4vw,52px)", fontWeight: 800, color: "#fff", lineHeight: 1.15, marginBottom: 20 }}>
              Ready to Grow Your<br />Bhubaneswar Business?
            </h2>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", maxWidth: 520, margin: "0 auto 40px" }}>
              Get a free SEO audit and digital strategy session — no pitch, just actionable insights for your business.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#contact"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 36px", background: "#fff", color: "#F01015", borderRadius: 50, fontWeight: 700, fontSize: 16, boxShadow: "0 8px 28px rgba(0,0,0,0.15)", transition: "transform 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-3px)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}>
                Get Free Audit →
              </a>
              <a href="tel:+917894561230"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "15px 34px", border: "2px solid rgba(255,255,255,0.5)", color: "#fff", borderRadius: 50, fontWeight: 700, fontSize: 16, transition: "all 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                📞 Call Now
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section" style={{ background: "#fff" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "start" }}>
            <Reveal>
              <div>
                <div className="section-label">Contact Us</div>
                <h2 className="section-title" style={{ marginBottom: 20 }}>Let&apos;s Talk<br />About Your Growth</h2>
                <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.8, marginBottom: 36 }}>
                  Drop us a message and we&apos;ll get back within 24 hours. No generic responses — just a real conversation with our strategy team.
                </p>
                {[
                  { icon: "📍", label: "Office", val: "Plot 42, Chandrasekharpur, Bhubaneswar, Odisha 751016" },
                  { icon: "📞", label: "Phone", val: "+91 78945 61230" },
                  { icon: "✉️", label: "Email", val: "hello@upvik.in" },
                  { icon: "⏰", label: "Hours", val: "Mon–Sat, 9 AM – 7 PM IST" },
                ].map((c) => (
                  <div key={c.label} style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                    <div style={{ width: 44, height: 44, flexShrink: 0, borderRadius: 12, background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{c.icon}</div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#888888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>{c.label}</div>
                      <div style={{ fontSize: 15, color: "#000000", fontWeight: 500 }}>{c.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div style={{ background: "#f5f5f5", borderRadius: 24, padding: "40px 36px", border: "1px solid #e5e5e5" }}>
                <h3 style={{ fontFamily: "Sora,sans-serif", fontSize: 22, fontWeight: 700, color: "#000000", marginBottom: 28 }}>Get Your Free Audit</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <input placeholder="Your Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    <input placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                  <input placeholder="Email Address" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                  <select value={formData.service} onChange={e => setFormData({ ...formData, service: e.target.value })}>
                    <option value="">Select Service</option>
                    <option>SEO Services</option>
                    <option>Website Development</option>
                    <option>Mobile App Development</option>
                    <option>Social Media Marketing</option>
                    <option>PPC / Google Ads</option>
                    <option>Full Digital Package</option>
                  </select>
                  <textarea rows={4} placeholder="Tell us about your business and goals..." value={formData.msg} onChange={e => setFormData({ ...formData, msg: e.target.value })} style={{ resize: "none" }} />
                  <button className="btn-primary" style={{ justifyContent: "center", fontSize: 16, padding: "16px" }}
                    onClick={() => alert("Thank you! Our team will reach out within 24 hours.")}>
                    Send Message & Get Free Audit →
                  </button>
                  <p style={{ fontSize: 12, color: "#9ca3af", textAlign: "center", lineHeight: 1.6 }}>
                    By submitting this form, you agree to our Privacy Policy. We never share your data.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#000000", color: "#e5e5e5", padding: "72px 0 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 64 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "#F01015", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#fff", fontFamily: "Sora,sans-serif", fontWeight: 800, fontSize: 18 }}>U</span>
                </div>
                <span style={{ fontFamily: "Sora,sans-serif", fontWeight: 800, fontSize: 22, color: "#fff" }}>upvik</span>
              </div>
              <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 280, marginBottom: 24 }}>
                Bhubaneswar&apos;s leading digital marketing and web development agency. We grow Odisha businesses online.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                {["Li", "Ig", "Fb", "Tw"].map((s) => (
                  <a key={s} href="#"
                    style={{ width: 36, height: 36, borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 600, transition: "all 0.2s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#F01015"; (e.currentTarget as HTMLElement).style.color = "#F01015"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; }}
                  >{s}</a>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 20, textTransform: "uppercase", letterSpacing: 1.5 }}>Services</div>
              {["SEO Services", "Web Development", "App Development", "Social Media", "Google Ads", "Content Marketing"].map((l) => (
                <a key={l} href="#services"
                  style={{ display: "block", fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 10, transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#F01015")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                >{l}</a>
              ))}
            </div>

            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 20, textTransform: "uppercase", letterSpacing: 1.5 }}>Company</div>
              {[["About Upvik", "#about"], ["Our Work", "#work"], ["Blog & Insights", "#blog"], ["Careers", "#"], ["Privacy Policy", "#"], ["Contact Us", "#contact"]].map(([l, href]) => (
                <a key={l} href={href}
                  style={{ display: "block", fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 10, transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#F01015")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                >{l}</a>
              ))}
            </div>

            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 20, textTransform: "uppercase", letterSpacing: 1.5 }}>Get in Touch</div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: 16 }}>Plot 42, Chandrasekharpur<br />Bhubaneswar, Odisha 751016</p>
              <a href="tel:+917894561230" style={{ display: "block", fontSize: 14, color: "#F01015", marginBottom: 6, fontWeight: 600 }}>+91 78945 61230</a>
              <a href="mailto:hello@upvik.in" style={{ display: "block", fontSize: 14, color: "#F01015", fontWeight: 600 }}>hello@upvik.in</a>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "24px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>© 2025 Upvik Digital Pvt. Ltd. · All rights reserved · Bhubaneswar, Odisha</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>Odisha&apos;s #1 Digital Marketing Agency</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
