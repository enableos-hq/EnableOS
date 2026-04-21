export const metadata = {
  title: "EnableOS — The Operating System for Enablement",
  description: "Built by a solo enablement hire who got tired of spreadsheet chaos. Intake, ramp tracking, 1:1 notes, collaterals, sessions, pulse checks, planning, forecasting, and leaderboards — all in one system.",
  openGraph: {
    title: "EnableOS — The Operating System for Enablement",
    description: "9 features. One system. Zero spreadsheets. Built for the solo enablement hire.",
    url: "https://enableos.app",
    siteName: "EnableOS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EnableOS — The Operating System for Enablement",
    description: "9 features. One system. Zero spreadsheets.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, background: "#09090b" }}>{children}</body>
    </html>
  );
}
