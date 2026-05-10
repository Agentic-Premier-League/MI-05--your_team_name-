import { NextResponse } from "next/server";
import { geminiModel } from "@/lib/gemini";
import { createClient } from "@/lib/supabase/server";
export const runtime = "nodejs";
export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("resume") as File;

    if (!file) {
      return NextResponse.json({ error: "No resume file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const pdfParseModule = await import("pdf-parse");
    const pdfParse = pdfParseModule.default || pdfParseModule;
    const pdfData = await pdfParse(buffer);
    const resumeText = pdfData.text;

    if (!resumeText || resumeText.trim() === "") {
      return NextResponse.json({ error: "Could not extract text from the PDF" }, { status: 400 });
    }

    const prompt = `
You are an expert ATS (Applicant Tracking System) software and senior technical recruiter.

Analyze this resume:

"""
${resumeText}
"""

Return STRICT JSON:
{
  "ats_score": number,
  "summary": "text",
  "strengths": [],
  "missing_skills": [],
  "suggestions": [],
  "keywords_found": []
}
`;

    const result = await geminiModel.generateContent(prompt);
    let responseText = result.response.text();

    responseText = responseText.replace(/```json\n?/gi, "").replace(/```\n?/g, "").trim();

    const analysis = JSON.parse(responseText);

    return NextResponse.json(analysis);

  } catch (error: any) {
    console.error("Error analyzing resume:", error);
    return NextResponse.json(
      { error: "Failed to analyze resume. Make sure it is a valid PDF." },
      { status: 500 }
    );
  }
}