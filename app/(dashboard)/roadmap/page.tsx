"use client";

import { useState } from "react";
import type { CareerRoadmap } from "@/types";

export default function RoadmapPage() {
  const [targetRole, setTargetRole] = useState("");
  const [currentSkills, setCurrentSkills] = useState("");
  const [timeline, setTimeline] = useState("3 Months");
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState<CareerRoadmap | null>(null);

  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!targetRole || !currentSkills) return;
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/roadmap/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetRole, currentSkills, timeline }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate roadmap");
      }

      const data = await response.json();
      setRoadmap(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "8px" }}>
          Career Roadmap Generator
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "16px" }}>
          Get a personalized, step-by-step learning plan tailored to your dream job.
        </p>
      </div>

      {!roadmap && (
        <div className="glass-card" style={{ padding: "40px" }}>
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: 500, color: "var(--text-secondary)" }}>
              Target Job Role
            </label>
            <input
              type="text"
              placeholder="e.g. Full Stack Developer, Data Scientist..."
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "10px",
                border: "1px solid var(--border-2)",
                background: "rgba(15, 22, 41, 0.6)",
                color: "var(--text-primary)",
                fontSize: "15px",
                outline: "none",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = "var(--accent)"}
              onBlur={(e) => e.currentTarget.style.borderColor = "var(--border-2)"}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: 500, color: "var(--text-secondary)" }}>
              Current Skills
            </label>
            <textarea
              placeholder="List your current technical and soft skills, separated by commas..."
              value={currentSkills}
              onChange={(e) => setCurrentSkills(e.target.value)}
              style={{
                width: "100%",
                minHeight: "100px",
                padding: "12px 16px",
                borderRadius: "10px",
                border: "1px solid var(--border-2)",
                background: "rgba(15, 22, 41, 0.6)",
                color: "var(--text-primary)",
                fontSize: "15px",
                lineHeight: 1.6,
                outline: "none",
                resize: "vertical",
                fontFamily: "inherit",
                transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = "var(--accent)"}
              onBlur={(e) => e.currentTarget.style.borderColor = "var(--border-2)"}
            />
          </div>

          <div style={{ marginBottom: "32px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: 500, color: "var(--text-secondary)" }}>
              Preparation Timeline
            </label>
            <select
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "10px",
                border: "1px solid var(--border-2)",
                background: "rgba(15, 22, 41, 0.6)",
                color: "var(--text-primary)",
                fontSize: "15px",
                outline: "none",
                appearance: "none"
              }}
            >
              <option>1 Month (Crash Course)</option>
              <option>3 Months (Standard)</option>
              <option>6 Months (Deep Dive)</option>
            </select>
          </div>

          <button
            className="btn-primary"
            style={{ width: "100%", display: "flex", justifyContent: "center", gap: "8px" }}
            onClick={handleGenerate}
            disabled={!targetRole || !currentSkills || isGenerating}
          >
            {isGenerating ? (
              <><span className="animate-spin">⏳</span> Generating Roadmap...</>
            ) : (
              "Generate My Roadmap"
            )}
          </button>
        </div>
      )}

      {roadmap && (
        <div className="animate-fade-in-up">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <button 
              className="btn-secondary" 
              style={{ padding: "8px 16px", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px" }}
              onClick={() => setRoadmap(null)}
            >
              <span>←</span> Create New Roadmap
            </button>
            <div style={{ display: "flex", gap: "12px" }}>
              <span className="glass-card" style={{ padding: "6px 12px", fontSize: "13px", fontWeight: 600, color: "var(--accent)", borderRadius: "8px" }}>
                Target: {roadmap.target_role}
              </span>
              <span className="glass-card" style={{ padding: "6px 12px", fontSize: "13px", fontWeight: 600, color: "var(--green)", borderRadius: "8px" }}>
                Duration: {roadmap.total_duration}
              </span>
            </div>
          </div>

          <div className="glass-card" style={{ padding: "32px", marginBottom: "32px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "12px" }}>Overview</h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>{roadmap.summary}</p>
          </div>

          <div style={{ position: "relative", marginLeft: "24px" }}>
            {/* Vertical timeline line */}
            <div style={{ position: "absolute", top: "24px", bottom: "24px", left: "0", width: "2px", background: "var(--border-2)", zIndex: 0 }} />

            {roadmap.phases.map((phase, idx) => (
              <div key={idx} style={{ position: "relative", paddingLeft: "48px", marginBottom: "40px", zIndex: 1, animationDelay: `${idx * 150}ms` }} className="animate-fade-in-up">
                {/* Node */}
                <div style={{ 
                  position: "absolute", left: "-11px", top: "24px", width: "24px", height: "24px", borderRadius: "50%", 
                  background: "var(--background)", border: "4px solid var(--accent)", boxShadow: "0 0 10px var(--accent-glow)"
                }} />

                <div className="glass-card" style={{ padding: "24px", position: "relative" }}>
                  {/* Phase header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                        Phase {phase.phase} • {phase.duration}
                      </div>
                      <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--text-primary)" }}>{phase.title}</h3>
                    </div>
                  </div>

                  {/* Skills */}
                  <div style={{ marginBottom: "20px" }}>
                    <h4 style={{ fontSize: "13px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600, marginBottom: "8px" }}>Key Skills to Learn</h4>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {phase.skills.map((s, i) => (
                        <span key={i} style={{ background: "rgba(99, 102, 241, 0.1)", color: "var(--text-primary)", padding: "4px 12px", borderRadius: "100px", fontSize: "13px", border: "1px solid rgba(99, 102, 241, 0.2)" }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Resources */}
                  <div style={{ marginBottom: "20px" }}>
                    <h4 style={{ fontSize: "13px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600, marginBottom: "8px" }}>Recommended Resources</h4>
                    <ul style={{ paddingLeft: "20px", margin: 0, color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.6 }}>
                      {phase.resources.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>

                  {/* Milestone */}
                  <div style={{ background: "rgba(34, 197, 94, 0.1)", border: "1px solid rgba(34, 197, 94, 0.2)", borderRadius: "8px", padding: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <span>🎯</span>
                      <span style={{ fontWeight: 600, fontSize: "14px", color: "var(--green)" }}>Phase Milestone</span>
                    </div>
                    <p style={{ color: "var(--text-secondary)", fontSize: "14px", margin: 0 }}>{phase.milestone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
