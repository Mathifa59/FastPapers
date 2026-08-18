import { ImageResponse } from "next/og";

// TODO: reemplazar con el ícono oficial derivado del SVG real del cliente

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0E0E0E",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#FFC20E",
            color: "#0E0E0E",
            width: 120,
            height: 120,
            fontSize: 76,
            fontWeight: 900,
            fontFamily: "Arial Black, sans-serif",
          }}
        >
          F
        </div>
      </div>
    ),
    { ...size }
  );
}
