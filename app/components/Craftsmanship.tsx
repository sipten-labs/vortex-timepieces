"use client";

import { Shield, Compass, Gem, Cpu } from "lucide-react";

export default function Craftsmanship() {
  const specs = [
    {
      icon: <Gem size={28} color="#d4af37" />,
      title: "Sapphire Crystal Face",
      desc: "Double-domed anti-reflective sapphire glass offering Mohs scale 9 scratch resistance.",
    },
    {
      icon: <Shield size={28} color="#d4af37" />,
      title: "Grade 5 Titanium Casing",
      desc: "Aerospace forged titanium offering 40% lighter wrist feel with supreme corrosion resistance.",
    },
    {
      icon: <Cpu size={28} color="#d4af37" />,
      title: "Automatic Calibre VX-01",
      desc: "Self-winding mechanical calibre with 48-hour power reserve and 28,800 vph precision beat.",
    },
    {
      icon: <Compass size={28} color="#d4af37" />,
      title: "10 ATM Water Resistance",
      desc: "Precision hermetic screw-down crown engineered for immersion up to 100 meters.",
    },
  ];

  return (
    <section id="craftsmanship" style={{ padding: "100px 32px", maxWidth: "1280px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "64px" }}>
        <span style={{ fontSize: "11px", letterSpacing: "0.3em", color: "#d4af37", fontWeight: "700" }}>
          METICULOUS ENGINEERING
        </span>
        <h2 style={{ fontSize: "36px", fontWeight: "300", color: "#fff", marginTop: "12px" }}>
          Built Without Compromise
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "28px",
        }}
      >
        {specs.map((item, idx) => (
          <div
            key={idx}
            style={{
              padding: "36px 28px",
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "16px",
            }}
          >
            <div style={{ marginBottom: "20px" }}>{item.icon}</div>
            <h3 style={{ color: "#fff", fontSize: "18px", fontWeight: "600", marginBottom: "12px" }}>
              {item.title}
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.7" }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* About Heritage Banner */}
      <div
        id="about"
        style={{
          marginTop: "90px",
          padding: "50px 40px",
          borderRadius: "20px",
          border: "1px solid rgba(212, 175, 55, 0.25)",
          background: "linear-gradient(135deg, rgba(212,175,55,0.06) 0%, rgba(0,0,0,0.8) 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "18px",
        }}
      >
        <span style={{ fontSize: "11px", letterSpacing: "0.25em", color: "#d4af37" }}>
          OUR HOROLOGICAL CREED
        </span>
        <h3 style={{ fontSize: "28px", color: "#fff", maxWidth: "600px", fontWeight: "300" }}>
          Bridging Avant-Garde 3D Technology With Classical Watchmaking
        </h3>
        <p style={{ color: "#94a3b8", maxWidth: "680px", fontSize: "14px", lineHeight: "1.8" }}>
          VORTEX was founded to challenge traditional luxury gatekeeping. Every timepiece is assembled in state-of-the-art sterile cleanrooms, calibrated for extreme accuracy, and delivered straight to collectors globally.
        </p>
      </div>
    </section>
  );
}