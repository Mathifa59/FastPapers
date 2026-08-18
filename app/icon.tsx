import { ImageResponse } from "next/og";

// TODO: reemplazar con el favicon oficial derivado del SVG real del cliente
// (por ahora deriva del mismo placeholder tipográfico que <Logo variant="icon" />)

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FFC20E",
          color: "#0E0E0E",
          fontSize: 22,
          fontWeight: 900,
          fontFamily: "Arial Black, sans-serif",
        }}
      >
        F
      </div>
    ),
    { ...size }
  );
}
