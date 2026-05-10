import Link from "next/link";

const stats = [
  { label: "Resumes Analyzed", value: "0", icon: "📄", color: "#6366f1" },
  { label: "Mock Interviews Done", value: "0", icon: "🎤", color: "#a855f7" },
  { label: "Roadmaps Generated", value: "0", icon: "🗺️", color: "#06b6d4" },
];

export default function DashboardOverview() {
  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "8px" }}>
          Welcome back, Student 👋
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "16px" }}>
          Here&apos;s an overview of your career preparation progress.
        </p>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px",
          marginBottom: "48px",
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="glass-card animate-fade-in-up"
            style={{ padding: "24px", animationDelay: `${i * 100}ms` }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: `${stat.color}22`,
                  color: stat.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                }}
              >
                {stat.icon}
              </div>
              <div>
                <div style={{ fontSize: "28px", fontWeight: 800, lineHeight: 1 }}>{stat.value}</div>
                <div style={{ color: "var(--text-muted)", fontSize: "13px", marginTop: "4px", fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "20px" }}>Quick Actions</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        <Link href="/resume" style={{ textDecoration: "none" }}>
          <div
            className="glass-card"
            style={{
              padding: "24px",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              transition: "all 0.2s ease",
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: "24px", marginBottom: "12px" }}>📄</div>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px" }}>
              Analyze Resume
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
              Upload your latest resume to get an ATS score and targeted feedback.
            </p>
          </div>
        </Link>

        <Link href="/interview" style={{ textDecoration: "none" }}>
          <div
            className="glass-card"
            style={{
              padding: "24px",
              border: "1px solid rgba(168, 85, 247, 0.3)",
              transition: "all 0.2s ease",
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: "24px", marginBottom: "12px" }}>🎤</div>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px" }}>
              Start Mock Interview
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
              Practice answering role-specific questions and get real-time feedback.
            </p>
          </div>
        </Link>

        <Link href="/roadmap" style={{ textDecoration: "none" }}>
          <div
            className="glass-card"
            style={{
              padding: "24px",
              border: "1px solid rgba(6, 182, 212, 0.3)",
              transition: "all 0.2s ease",
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: "24px", marginBottom: "12px" }}>🗺️</div>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px" }}>
              Generate Roadmap
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
              Plan your learning journey based on your current skills and target role.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
