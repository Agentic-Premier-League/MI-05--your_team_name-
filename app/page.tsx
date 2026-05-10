"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ─── Data ────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: "📄",
    title: "AI Resume Analyzer",
    description:
      "Upload your PDF resume and get an instant ATS score, keyword analysis, missing skills detection, and actionable improvement tips.",
    color: "#6366f1",
    gradient: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(99,102,241,0.05))",
    badge: "Most Popular",
  },
  {
    icon: "🎤",
    title: "AI Mock Interview",
    description:
      "Practice with AI-generated interview questions tailored to your target role. Get detailed feedback on each answer to improve fast.",
    color: "#a855f7",
    gradient: "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(168,85,247,0.05))",
    badge: null,
  },
  {
    icon: "🗺️",
    title: "Career Roadmap",
    description:
      "Tell us your current skills and dream job. Get a personalized, phase-by-phase learning roadmap with timelines and resources.",
    color: "#06b6d4",
    gradient: "linear-gradient(135deg, rgba(6,182,212,0.2), rgba(6,182,212,0.05))",
    badge: null,
  },
];

const steps = [
  { step: "01", title: "Create your account", desc: "Sign in with Google in one click — no forms, no hassle." },
  { step: "02", title: "Upload your resume", desc: "Drop your PDF and let the AI scan it in seconds." },
  { step: "03", title: "Get AI insights", desc: "Receive your ATS score, skill gaps, and improvement plan instantly." },
  { step: "04", title: "Practice & grow", desc: "Do mock interviews and follow your personalized career roadmap." },
];

const stats = [
  { value: "10,000+", label: "Students Helped" },
  { value: "95%", label: "Interview Success Rate" },
  { value: "3 min", label: "Resume Analysis Time" },
  { value: "Free", label: "To Get Started" },
];

const testimonials = [
  {
    name: "Priya S.",
    role: "CS Student → SWE Intern at Google",
    avatar: "PS",
    text: "CareerPilot AI helped me identify the exact keywords my resume was missing. My ATS score jumped from 42 to 91 in one revision!",
    color: "#6366f1",
  },
  {
    name: "Arjun M.",
    role: "MBA Student → Product Analyst",
    avatar: "AM",
    text: "The mock interview feature is incredible. I practiced 20+ questions before my actual interview and felt so much more confident.",
    color: "#a855f7",
  },
  {
    name: "Sarah K.",
    role: "Fresh Grad → Data Scientist",
    avatar: "SK",
    text: "The career roadmap gave me a clear 6-month plan with resources. I followed it and landed my first data science role!",
    color: "#06b6d4",
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

function Badge({ children, color = "#6366f1" }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 12px",
        borderRadius: "100px",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        background: `${color}22`,
        color: color,
        border: `1px solid ${color}44`,
      }}
    >
      {children}
    </span>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", overflowX: "hidden" }}>
      <Navbar />

      {/* ── Hero ── */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "100px 24px 80px",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Glow orb */}
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "300px",
            background: "radial-gradient(ellipse, rgba(99,102,241,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="animate-fade-in-up" style={{ marginBottom: "20px" }}>
          <Badge>✨ AI-Powered Career Platform for Students</Badge>
        </div>

        <h1
          className="animate-fade-in-up delay-100"
          style={{
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: "24px",
            color: "var(--text-primary)",
          }}
        >
          Your AI Co-Pilot for{" "}
          <span className="gradient-text">Landing Dream Jobs</span>
        </h1>

        <p
          className="animate-fade-in-up delay-200"
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "var(--text-secondary)",
            maxWidth: "600px",
            margin: "0 auto 40px",
            lineHeight: 1.7,
          }}
        >
          Analyze your resume with AI, practice mock interviews, and get a personalized career roadmap — all in one place.
        </p>

        <div
          className="animate-fade-in-up delay-300"
          style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}
        >
          <Link href="/login">
            <button
              id="hero-cta-primary"
              className="btn-primary animate-pulse-glow"
              style={{ padding: "14px 32px", fontSize: "16px" }}
            >
              🚀 Start Free — No Credit Card
            </button>
          </Link>
          <a href="#features">
            <button
              id="hero-cta-secondary"
              className="btn-secondary"
              style={{ padding: "14px 32px", fontSize: "16px" }}
            >
              See Features ↓
            </button>
          </a>
        </div>

        {/* Stats bar */}
        <div
          className="animate-fade-in-up delay-400"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "48px",
            flexWrap: "wrap",
            marginTop: "64px",
            padding: "32px 40px",
            background: "rgba(15,22,41,0.6)",
            border: "1px solid var(--border)",
            borderRadius: "20px",
            backdropFilter: "blur(12px)",
            maxWidth: "800px",
            margin: "64px auto 0",
          }}
        >
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "clamp(24px, 4vw, 36px)",
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #6366f1, #a855f7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section
        id="features"
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <Badge color="#a855f7">Features</Badge>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              marginTop: "16px",
              marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            Everything you need to{" "}
            <span className="gradient-text">accelerate your career</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "17px", maxWidth: "500px", margin: "0 auto" }}>
            Three powerful AI tools, one seamless platform.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass-card"
              style={{
                padding: "32px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(-6px)";
                el.style.boxShadow = `0 20px 40px ${feature.color}22`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              {/* Gradient accent top */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "3px",
                  background: `linear-gradient(90deg, ${feature.color}, transparent)`,
                  borderRadius: "16px 16px 0 0",
                }}
              />

              {feature.badge && (
                <div style={{ marginBottom: "16px" }}>
                  <Badge color={feature.color}>{feature.badge}</Badge>
                </div>
              )}

              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "14px",
                  background: feature.gradient,
                  border: `1px solid ${feature.color}33`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "26px",
                  marginBottom: "20px",
                }}
              >
                {feature.icon}
              </div>

              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  marginBottom: "12px",
                  color: "var(--text-primary)",
                }}
              >
                {feature.title}
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: 1.7 }}>
                {feature.description}
              </p>

              <div style={{ marginTop: "24px" }}>
                <Link href="/login">
                  <button
                    style={{
                      background: "transparent",
                      border: `1px solid ${feature.color}55`,
                      color: feature.color,
                      borderRadius: "8px",
                      padding: "8px 16px",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${feature.color}22`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    Try it free →
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section
        id="how-it-works"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "80px 24px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <Badge color="#06b6d4">How it Works</Badge>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              marginTop: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            Go from confused to{" "}
            <span className="gradient-text">career-ready in 4 steps</span>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "24px",
            position: "relative",
          }}
        >
          {steps.map((s, i) => (
            <div
              key={s.step}
              className="glass-card"
              style={{ padding: "32px 28px", textAlign: "center" }}
            >
              <div
                style={{
                  fontSize: "48px",
                  fontWeight: 900,
                  background: "linear-gradient(135deg, #6366f133, #a855f733)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1,
                  marginBottom: "16px",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {s.step}
              </div>
              <h3
                style={{
                  fontSize: "17px",
                  fontWeight: 700,
                  marginBottom: "10px",
                  color: "var(--text-primary)",
                }}
              >
                {s.title}
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.6 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section
        id="about"
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <Badge color="#22c55e">Success Stories</Badge>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              marginTop: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            Students who{" "}
            <span className="gradient-text">landed their dream roles</span>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="glass-card"
              style={{ padding: "28px" }}
            >
              {/* Stars */}
              <div style={{ color: "#f59e0b", fontSize: "14px", marginBottom: "16px" }}>
                ★★★★★
              </div>

              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "15px",
                  lineHeight: 1.7,
                  marginBottom: "24px",
                  fontStyle: "italic",
                }}
              >
                &ldquo;{t.text}&rdquo;
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "white",
                    flexShrink: 0,
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "14px" }}>{t.name}</div>
                  <div style={{ color: "var(--text-muted)", fontSize: "12px" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px 80px" }}>
        <div
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.1))",
            border: "1px solid rgba(99,102,241,0.3)",
            borderRadius: "24px",
            padding: "64px 40px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background decoration */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(99,102,241,0.1) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              marginBottom: "16px",
              letterSpacing: "-0.02em",
              position: "relative",
            }}
          >
            Ready to pilot your career?
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "18px",
              marginBottom: "36px",
              position: "relative",
            }}
          >
            Join thousands of students already using CareerPilot AI — it&apos;s completely free to start.
          </p>
          <Link href="/login" style={{ position: "relative" }}>
            <button
              id="cta-banner-btn"
              className="btn-primary"
              style={{ padding: "16px 40px", fontSize: "17px" }}
            >
              🚀 Get Started Free
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
