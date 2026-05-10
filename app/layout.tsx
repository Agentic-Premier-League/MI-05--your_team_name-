import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareerPilot AI — Your AI-Powered Career Coach",
  description:
    "Analyze resumes, ace mock interviews, and generate personalized career roadmaps with AI. Built for students and early-career professionals.",
  keywords: "career, resume, AI, mock interview, career roadmap, students",
  openGraph: {
    title: "CareerPilot AI",
    description: "Your AI-powered career co-pilot for students.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <div className="mesh-bg" />
        {children}
      </body>
    </html>
  );
}
