import { NextResponse } from "next/server";
import { geminiModel } from "@/lib/gemini";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { role, qnaPairs } = await req.json();

    if (!role || !qnaPairs || !Array.isArray(qnaPairs)) {
      return NextResponse.json(
        { error: "Role and Q&A pairs are required" },
        { status: 400 }
      );
    }

    const prompt = `
      You are an expert technical interviewer and career coach.
      A candidate for a "${role}" role has just completed a mock interview.
      
      Here are the questions they were asked and their answers:
      ${JSON.stringify(qnaPairs, null, 2)}
      
      Please evaluate each answer. For each answer, provide:
      1. A score from 0 to 100.
      2. Constructive feedback on what they did well and what was missing.
      3. A specific suggestion on how to improve the answer (e.g. using the STAR method, adding metrics).
      
      Respond STRICTLY with a JSON array in this exact format:
      [
        {
          "question": "The original question...",
          "answer": "The candidate's answer...",
          "score": 85,
          "feedback": "Your feedback here...",
          "improvement": "Your improvement tip here..."
        }
      ]
    `;

    const result = await geminiModel.generateContent(prompt);
    const responseText = result.response.text();
    
    const data = JSON.parse(responseText);
    
    return NextResponse.json({ feedbacks: data });
  } catch (error: any) {
    console.error("Error generating interview feedback:", error);
    return NextResponse.json(
      { error: "Failed to generate feedback." },
      { status: 500 }
    );
  }
}
