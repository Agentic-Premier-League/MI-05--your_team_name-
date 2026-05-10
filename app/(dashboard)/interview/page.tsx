"use client";

import { useState } from "react";
import type { InterviewSession, AnswerFeedback } from "@/types";

export default function MockInterviewPage() {
  const [step, setStep] = useState<"setup" | "interview" | "feedback">("setup");
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("Entry Level");
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Interview state
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  
  // Feedback state
  const [feedbacks, setFeedbacks] = useState<AnswerFeedback[]>([]);

  const [error, setError] = useState<string | null>(null);

  const handleStart = async () => {
    if (!role) return;
    setIsGenerating(true);
    setError(null);
    
    try {
      const response = await fetch("/api/interview/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, experience }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate questions");
      }

      const data = await response.json();
      setQuestions(data.questions);
      setAnswers([]);
      setCurrentQuestionIndex(0);
      setStep("interview");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNextQuestion = async () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = currentAnswer;
    setAnswers(newAnswers);
    setCurrentAnswer("");
    setError(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Finish interview
      setIsGenerating(true);
      
      try {
        const qnaPairs = questions.map((q, i) => ({
          question: q,
          answer: newAnswers[i],
        }));

        const response = await fetch("/api/interview/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role, qnaPairs }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate feedback");
        }

        const data = await response.json();
        setFeedbacks(data.feedbacks);
        setStep("feedback");
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to analyze answers");
      } finally {
        setIsGenerating(false);
      }
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "8px" }}>
          AI Mock Interview
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "16px" }}>
          Practice role-specific questions and get detailed, actionable feedback.
        </p>
      </div>

      {step === "setup" && (
        <div className="glass-card" style={{ padding: "40px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "24px" }}>Configure Your Interview</h2>
          
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: 500, color: "var(--text-secondary)" }}>
              Target Job Role
            </label>
            <input
              type="text"
              placeholder="e.g. Frontend Developer, Data Analyst..."
              value={role}
              onChange={(e) => setRole(e.target.value)}
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

          <div style={{ marginBottom: "32px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: 500, color: "var(--text-secondary)" }}>
              Experience Level
            </label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
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
              <option>Entry Level / New Grad</option>
              <option>Junior (1-3 years)</option>
              <option>Mid-Level (3-5 years)</option>
              <option>Senior (5+ years)</option>
            </select>
          </div>

          <button
            className="btn-primary"
            style={{ width: "100%", display: "flex", justifyContent: "center", gap: "8px" }}
            onClick={handleStart}
            disabled={!role || isGenerating}
          >
            {isGenerating ? (
              <><span className="animate-spin">⏳</span> Generating Questions...</>
            ) : (
              "Start Mock Interview"
            )}
          </button>
        </div>
      )}

      {step === "interview" && (
        <div className="glass-card animate-fade-in-up" style={{ padding: "40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <span style={{ color: "var(--text-muted)", fontWeight: 600, fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <div style={{ display: "flex", gap: "4px" }}>
              {questions.map((_, i) => (
                <div key={i} style={{ width: "32px", height: "4px", borderRadius: "2px", background: i <= currentQuestionIndex ? "var(--accent)" : "var(--border-2)" }} />
              ))}
            </div>
          </div>

          <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "32px", lineHeight: 1.5 }}>
            {questions[currentQuestionIndex]}
          </h2>

          <div style={{ marginBottom: "24px" }}>
            <textarea
              placeholder="Type your answer here... (In a real scenario, use the STAR method: Situation, Task, Action, Result)"
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              style={{
                width: "100%",
                minHeight: "200px",
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid var(--border-2)",
                background: "rgba(15, 22, 41, 0.6)",
                color: "var(--text-primary)",
                fontSize: "15px",
                lineHeight: 1.6,
                outline: "none",
                resize: "vertical",
                fontFamily: "inherit"
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = "var(--accent)"}
              onBlur={(e) => e.currentTarget.style.borderColor = "var(--border-2)"}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {error && (
              <div style={{ marginTop: "16px", color: "var(--red)", fontSize: "14px", background: "rgba(239, 68, 68, 0.1)", padding: "12px", borderRadius: "8px" }}>
                {error}
              </div>
            )}
            
            <button
              className="btn-primary"
              onClick={handleNextQuestion}
              disabled={currentAnswer.trim().length < 10 || isGenerating}
              style={{ opacity: currentAnswer.trim().length < 10 ? 0.5 : 1, display: "flex", alignItems: "center", gap: "8px" }}
            >
              {isGenerating ? (
                <><span className="animate-spin">⏳</span> Analyzing Answers...</>
              ) : currentQuestionIndex === questions.length - 1 ? (
                "Finish & Get Feedback"
              ) : (
                "Next Question →"
              )}
            </button>
          </div>
        </div>
      )}

      {step === "feedback" && (
        <div className="animate-fade-in-up">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
            <div>
              <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "4px" }}>Interview Feedback</h2>
              <p style={{ color: "var(--text-secondary)" }}>Review your answers and see how you can improve.</p>
            </div>
            <button className="btn-secondary" onClick={() => { setStep("setup"); setRole(""); }}>
              Start New Interview
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {feedbacks.map((item, idx) => (
              <div key={idx} className="glass-card" style={{ padding: "32px", animationDelay: `${idx * 100}ms` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-primary)", flex: 1, paddingRight: "24px" }}>
                    Q{idx + 1}: {item.question}
                  </h3>
                  <div style={{ 
                    background: item.score >= 80 ? "rgba(34, 197, 94, 0.1)" : item.score >= 60 ? "rgba(245, 158, 11, 0.1)" : "rgba(239, 68, 68, 0.1)",
                    color: item.score >= 80 ? "var(--green)" : item.score >= 60 ? "var(--amber)" : "var(--red)",
                    padding: "6px 12px", borderRadius: "8px", fontWeight: 700, fontSize: "14px", border: `1px solid ${item.score >= 80 ? "rgba(34, 197, 94, 0.2)" : item.score >= 60 ? "rgba(245, 158, 11, 0.2)" : "rgba(239, 68, 68, 0.2)"}`
                  }}>
                    Score: {item.score}/100
                  </div>
                </div>

                <div style={{ background: "rgba(0,0,0,0.2)", padding: "16px", borderRadius: "8px", marginBottom: "24px" }}>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "8px" }}>Your Answer</div>
                  <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.6 }}>{item.answer}</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                      <span style={{ color: "var(--accent)" }}>💡</span>
                      <span style={{ fontWeight: 600, fontSize: "15px" }}>AI Feedback</span>
                    </div>
                    <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.6 }}>{item.feedback}</p>
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                      <span style={{ color: "var(--green)" }}>📈</span>
                      <span style={{ fontWeight: 600, fontSize: "15px" }}>How to Improve</span>
                    </div>
                    <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.6 }}>{item.improvement}</p>
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
