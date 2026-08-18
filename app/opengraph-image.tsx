import { ImageResponse } from "next/og";

// TODO: reemplazar con una og-image oficial cuando el cliente entregue el
// logo real (por ahora deriva del mismo placeholder tipográfico de <Logo />)

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0E0E0E",
          gap: 24,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", fontFamily: "Arial Black, sans-serif" }}>
          <div
            style={{
              background: "#FFC20E",
              color: "#0E0E0E",
              padding: "8px 20px",
              fontSize: 108,
              fontWeight: 900,
              letterSpacing: -4,
            }}
          >
            FAST
          </div>
          <div style={{ color: "#F7F5F0", fontSize: 108, fontWeight: 900, letterSpacing: -4, paddingLeft: 12 }}>
            PAPERS
          </div>
        </div>
        <div
          style={{
            color: "#F7F5F0",
            opacity: 0.75,
            fontSize: 28,
            letterSpacing: 6,
            fontFamily: "Arial, sans-serif",
          }}
        >
          MATERIA PRIMA PARA EL SECTOR GRÁFICO
        </div>
      </div>
    ),
    { ...size }
  );
}
