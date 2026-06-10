"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FDFBFF",
          fontFamily: "'Sora', sans-serif",
          color: "#1a1235",
        }}
      >
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h1
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "1.8rem",
              marginBottom: "0.75rem",
            }}
          >
            Something went wrong
          </h1>
          <p
            style={{
              fontSize: "1rem",
              color: "#666",
              marginBottom: "1.5rem",
              maxWidth: "400px",
            }}
          >
            We hit an unexpected error. This has been automatically reported and
            we&apos;re looking into it.
          </p>
          <button
            onClick={() => reset()}
            style={{
              background: "#7C5CFC",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "10px 24px",
              fontSize: "0.95rem",
              fontFamily: "'Sora', sans-serif",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
