import { NextResponse } from "next/server";
import { geminiModel } from "@/lib/gemini";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    // 1. Verify user is authenticated
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { role, experience } = await req.json();

    if (!role || !experience) {
      return NextResponse.json(
        { error: "Role and experience level are required" },
        { status: 400 }
      );
    }

    // 2. Build the prompt for Gemini
    const prompt = `
      You are an expert technical interviewer and recruiter.
      The candidate is applying for a "${role}" role with an experience level of "${experience}".
      
      Generate exactly 5 realistic, challenging interview questions tailored to this role and experience level.
      The questions should be a mix of behavioral (STAR method) and technical/scenario-based questions.
      
      Respond strictly with a JSON object in this exact format:
      {
        "questions": [
          "Question 1 here...",
          "Question 2 here..."
        ]
      }
    `;

    // 3. Call Gemini
    const result = await geminiModel.generateContent(prompt);
    const responseText = result.response.text();
    
    // 4. Parse and return
    const data = JSON.parse(responseText);
    
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error generating interview questions:", error);
    return NextResponse.json(
      { error: "Failed to generate questions. Please try again later." },
      { status: 500 }
    );
  }
}
