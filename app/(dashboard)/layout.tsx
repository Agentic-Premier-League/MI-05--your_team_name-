import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          padding: "32px 48px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {children}
      </main>
    </div>
  );
}
