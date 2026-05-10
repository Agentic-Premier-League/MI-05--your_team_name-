import { NextResponse } from "next/server";
import { geminiModel } from "@/lib/gemini";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Bypass auth for now
    // if (!user) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const { targetRole, currentSkills, timeline } = await req.json();

    if (!targetRole || !currentSkills || !timeline) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const prompt = `
      You are an expert career coach and technical mentor.
      A candidate wants to transition into a "${targetRole}" role over the next "${timeline}".
      Their current skills are: "${currentSkills}".

      Generate a structured, step-by-step career and learning roadmap to help them achieve this goal.
      Divide the timeline into 3 to 4 logical phases.

      Respond STRICTLY with a JSON object matching this exact schema:
      {
        "target_role": "${targetRole}",
        "total_duration": "${timeline}",
        "summary": "A 2-3 sentence encouraging overview of their journey.",
        "phases": [
          {
            "phase": 1,
            "title": "Phase Title",
            "duration": "e.g. Weeks 1-4",
            "skills": ["Skill 1", "Skill 2"],
            "resources": ["Resource 1", "Resource 2"],
            "milestone": "A concrete milestone to achieve at the end of this phase."
          }
        ]
      }
    `;

    const result = await geminiModel.generateContent(prompt);
    const responseText = result.response.text();
    
    const data = JSON.parse(responseText);
    
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error generating roadmap:", error);
    return NextResponse.json(
      { error: "Failed to generate roadmap." },
      { status: 500 }
    );
  }
}
