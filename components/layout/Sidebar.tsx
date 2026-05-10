"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: "📊" },
  { name: "Resume Analyzer", href: "/resume", icon: "📄" },
  { name: "Mock Interview", href: "/interview", icon: "🎤" },
  { name: "Career Roadmap", href: "/roadmap", icon: "🗺️" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <aside
      style={{
        width: "260px",
        height: "100vh",
        position: "sticky",
        top: 0,
        borderRight: "1px solid var(--border)",
        background: "rgba(15, 22, 41, 0.4)",
        backdropFilter: "blur(12px)",
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ marginBottom: "40px", padding: "0 8px" }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
            }}
          >
            🚀
          </div>
          <span style={{ fontWeight: 700, fontSize: "18px", color: "var(--text-primary)" }}>
            CareerPilot
          </span>
        </Link>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderRadius: "10px",
                color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                background: isActive ? "var(--accent-glow)" : "transparent",
                fontWeight: isActive ? 600 : 500,
                fontSize: "15px",
                transition: "all 0.2s ease",
                border: isActive ? "1px solid rgba(99, 102, 241, 0.3)" : "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.color = "var(--text-primary)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }
              }}
            >
              <span style={{ fontSize: "18px" }}>{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div style={{ borderTop: "1px solid var(--border)", padding: "20px 8px 0" }}>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "transparent",
            border: "none",
            color: "var(--text-muted)",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            width: "100%",
            textAlign: "left",
            padding: "8px",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          onClick={handleSignOut}
        >
          <span>🚪</span> Sign Out
        </button>
      </div>
    </aside>
  );
}
