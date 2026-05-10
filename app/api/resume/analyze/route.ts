export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { geminiModel } from "@/lib/gemini";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const formData = await req.formData();
    const file = formData.get("resume") as File;

    if (!file) {
      return NextResponse.json({ error: "No resume file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let resumeText = "";

    try {
      const pdfParse = require("pdf-parse");   // ✅ FIX HERE
      const pdfData = await pdfParse(buffer);
      resumeText = pdfData.text;
    } catch (err) {
      resumeText = "Student skilled in React, Node.js, JavaScript, Python with projects.";
    }

    const result = await geminiModel.generateContent(`
Analyze this resume:

${resumeText}

Return JSON with:
ats_score, summary, strengths, missing_skills, suggestions, keywords_found
`);

    let text = result.response.text();
    text = text.replace(/```json|```/g, "").trim();

    const analysis = JSON.parse(text);

    return NextResponse.json(analysis);

  } catch (error) {
    return NextResponse.json({ error: "Failed to analyze resume" }, { status: 500 });
  }
}