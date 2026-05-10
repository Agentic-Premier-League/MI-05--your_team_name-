"use client";

import { useState } from "react";
import type { ResumeAnalysis } from "@/types";

export default function ResumeAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ResumeAnalysis | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      // Reset result when new file is selected
      setResult(null);
    }
  };

  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await fetch("/api/resume/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to analyze resume");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "8px" }}>
          AI Resume Analyzer
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "16px" }}>
          Upload your resume to get an instant ATS score and personalized improvement tips.
        </p>
      </div>

      {!result && (
        <div className="glass-card" style={{ padding: "40px", textAlign: "center" }}>
          <div
            style={{
              border: "2px dashed var(--border-2)",
              borderRadius: "16px",
              padding: "60px 20px",
              background: "rgba(15, 22, 41, 0.4)",
              transition: "border-color 0.2s ease",
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.currentTarget.style.borderColor = "var(--accent)";
            }}
            onDragLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-2)";
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.currentTarget.style.borderColor = "var(--border-2)";
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                const droppedFile = e.dataTransfer.files[0];
                if (droppedFile.type === "application/pdf") {
                  setFile(droppedFile);
                  setResult(null);
                } else {
                  alert("Please upload a PDF file.");
                }
              }
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📄</div>
            <h3 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "8px" }}>
              {file ? file.name : "Drag & drop your PDF resume here"}
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "24px" }}>
              Only PDF format is supported
            </p>

            <input
              type="file"
              id="resume-upload"
              accept=".pdf"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <label htmlFor="resume-upload">
              <span className="btn-secondary" style={{ display: "inline-block" }}>
                {file ? "Choose different file" : "Browse Files"}
              </span>
            </label>
          </div>

          {error && (
            <div style={{ marginTop: "16px", color: "var(--red)", fontSize: "14px", background: "rgba(239, 68, 68, 0.1)", padding: "12px", borderRadius: "8px" }}>
              {error}
            </div>
          )}

          <div style={{ marginTop: "32px" }}>
            <button
              className="btn-primary"
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "16px",
                opacity: !file || isAnalyzing ? 0.7 : 1,
                cursor: !file || isAnalyzing ? "not-allowed" : "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px"
              }}
              disabled={!file || isAnalyzing}
              onClick={handleAnalyze}
            >
              {isAnalyzing ? (
                <>
                  <span className="animate-spin">⏳</span> Analyzing...
                </>
              ) : (
                "Analyze Resume"
              )}
            </button>
          </div>
        </div>
      )}

      {result && (
        <div className="animate-fade-in-up">
          {/* Action buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <button 
              className="btn-secondary" 
              style={{ padding: "8px 16px", fontSize: "14px", display: "flex", alignItems: "center", gap: "8px" }}
              onClick={() => {
                setFile(null);
                setResult(null);
              }}
            >
              <span>←</span> Upload another resume
            </button>
          </div>

          <div className="glass-card" style={{ padding: "32px", marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "32px", marginBottom: "32px" }}>
              {/* Score circle */}
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  border: `8px solid ${result.ats_score >= 80 ? "var(--green)" : result.ats_score >= 60 ? "var(--amber)" : "var(--red)"}`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 0 20px ${result.ats_score >= 80 ? "var(--green)" : result.ats_score >= 60 ? "var(--amber)" : "var(--red)"}44`,
                }}
              >
                <div style={{ fontSize: "36px", fontWeight: 800, lineHeight: 1 }}>{result.ats_score}</div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px", fontWeight: 600 }}>ATS SCORE</div>
              </div>

              <div>
                <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>Analysis Complete</h2>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>{result.summary}</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }}>
              {/* Strengths */}
              <div style={{ background: "rgba(34, 197, 94, 0.1)", borderRadius: "12px", padding: "20px", border: "1px solid rgba(34, 197, 94, 0.2)" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--green)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span>✓</span> Strengths
                </h3>
                <ul style={{ paddingLeft: "20px", margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                  {result.strengths.map((s, i) => (
                    <li key={i} style={{ color: "var(--text-primary)", fontSize: "14px" }}>{s}</li>
                  ))}
                </ul>
              </div>

              {/* Missing Skills */}
              <div style={{ background: "rgba(239, 68, 68, 0.1)", borderRadius: "12px", padding: "20px", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--red)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span>⚠️</span> Missing Skills
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {result.missing_skills.map((s, i) => (
                    <span key={i} style={{ background: "rgba(239, 68, 68, 0.2)", color: "#fca5a5", padding: "4px 12px", borderRadius: "100px", fontSize: "13px", fontWeight: 500 }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "16px", borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
                Actionable Suggestions
              </h3>
              <ul style={{ paddingLeft: "0", margin: 0, display: "flex", flexDirection: "column", gap: "12px", listStyle: "none" }}>
                {result.suggestions.map((s, i) => (
                  <li key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", padding: "16px", background: "var(--surface)", borderRadius: "12px", border: "1px solid var(--border-2)" }}>
                    <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--accent-glow)", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, flexShrink: 0 }}>
                      {i + 1}
                    </div>
                    <span style={{ color: "var(--text-primary)", fontSize: "15px", lineHeight: 1.6 }}>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
