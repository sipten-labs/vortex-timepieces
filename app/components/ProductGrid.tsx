"use client";

import { useState } from "react";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { CartItem } from "./CartDrawer";

interface ProductGridProps {
  onAddToCart: (item: CartItem) => void;
  onSelectWatch: (colorId: string, model: "skeleton" | "astro", imgPath: string, hex: string, name: string) => void;
}

export default function ProductGrid({ onAddToCart, onSelectWatch }: ProductGridProps) {
  // 1. Sovereign Skeleton Real Variants
  const skeletonVariants = [
    {
      id: "gold",
      name: "All Gold Steel",
      hex: "#d4af37",
      image: "/vortex-gold (5).png",
    },
    {
      id: "twotone",
      name: "Two-Tone Silver/Gold",
      hex: "#cbd5e1",
      image: "/vortex-gold (2).jpg",
    },
    {
      id: "leather",
      name: "Cognac Leather Strap",
      hex: "#8d5b4c",
      image: "/vortex-gold (3).jpg",
    },
  ];

  // 2. Celestial Astro Orbit Real Variants
  const astroVariants = [
    {
      id: "gold-mesh",
      name: "Gold Bezel Mesh Dial",
      hex: "#d4af37",
      image: "/vortex-black (3).jpg",
    },
    {
      id: "stealth-bracelet",
      name: "Stealth Black Steel Link",
      hex: "#334155",
      image: "/vortex-black (1).jpg",
    },
    {
      id: "black-mesh",
      name: "Obsidian Black Mesh",
      hex: "#0f172a",
      image: "/vortex-black (2).jpg",
    },
  ];

  const [selectedSkeleton, setSelectedSkeleton] = useState(skeletonVariants[0]);
  const [selectedAstro, setSelectedAstro] = useState(astroVariants[0]);

  return (
    <section id="collection" style={{ padding: "90px 32px", maxWidth: "1280px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "50px", flexWrap: "wrap", gap: "20px" }}>
        <div>
          <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.3em", color: "#d4af37", fontWeight: "600" }}>
            Curated Catalog
          </span>
          <h2 style={{ fontSize: "36px", fontWeight: "300", color: "#fff", margin: "8px 0 0 0" }}>
            The Masterpiece Collection
          </h2>
        </div>
        <p style={{ color: "#94a3b8", fontSize: "14px", maxWidth: "420px", margin: 0 }}>
          Click any edition to inspect its real craftsmanship in 3D perspective above.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "36px" }}>
        {/* Product 1: The Sovereign Skeleton ($480) */}
        <div
          style={{
            borderRadius: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(212, 175, 55, 0.25)",
            padding: "26px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#d4af37" }}>Genesis Mechanical Calibre</span>
            <span style={{ fontSize: "10px", padding: "4px 10px", borderRadius: "999px", background: "rgba(212,175,55,0.15)", color: "#d4af37", border: "1px solid rgba(212,175,55,0.3)" }}>
              Bestseller
            </span>
          </div>

          {/* Real Image Showcase */}
          <div
            onClick={() => onSelectWatch(selectedSkeleton.id, "skeleton", selectedSkeleton.image, selectedSkeleton.hex, selectedSkeleton.name)}
            style={{
              height: "280px",
              margin: "20px 0",
              borderRadius: "14px",
              background: "radial-gradient(circle, #181f2a 0%, #080a0e 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <img
              src={selectedSkeleton.image}
              alt={selectedSkeleton.name}
              style={{ maxHeight: "240px", maxWidth: "90%", objectFit: "contain", filter: "drop-shadow(0px 15px 25px rgba(0,0,0,0.85))", transition: "all 0.3s ease" }}
            />
            <div style={{ position: "absolute", bottom: "12px", display: "flex", alignItems: "center", gap: "6px", padding: "6px 14px", background: "rgba(0,0,0,0.75)", borderRadius: "9999px", border: "1px solid rgba(212,175,55,0.3)", color: "#d4af37", fontSize: "10px", fontWeight: "700", letterSpacing: "0.15em" }}>
              <Eye size={12} />
              INSPECT 3D PERSPECTIVE
            </div>
          </div>

          <div>
            {/* Real Color Swatches */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <span style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em" }}>Finish:</span>
              <div style={{ display: "flex", gap: "8px" }}>
                {skeletonVariants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      setSelectedSkeleton(v);
                      onSelectWatch(v.id, "skeleton", v.image, v.hex, v.name);
                    }}
                    title={v.name}
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: v.hex,
                      border: selectedSkeleton.id === v.id ? "2px solid #fff" : "1px solid rgba(255,255,255,0.3)",
                      boxShadow: selectedSkeleton.id === v.id ? `0 0 10px ${v.hex}` : "none",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: "11px", color: "#fff", fontWeight: "600", marginLeft: "4px" }}>
                {selectedSkeleton.name}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#d4af37", marginBottom: "8px" }}>
              <Star size={14} fill="#d4af37" />
              <span style={{ fontSize: "12px", color: "#fff", fontWeight: "600" }}>4.9</span>
              <span style={{ fontSize: "11px", color: "#64748b" }}>(142 verified reviews)</span>
            </div>
            <h3
              onClick={() => onSelectWatch(selectedSkeleton.id, "skeleton", selectedSkeleton.image, selectedSkeleton.hex, selectedSkeleton.name)}
              style={{ fontSize: "20px", color: "#fff", margin: "0 0 4px 0", fontWeight: "500", cursor: "pointer" }}
            >
              Vortex Sovereign Skeleton
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "12px", margin: 0 }}>42mm • Automatic Mechanical Calibre • Waterproof 30M</p>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "24px", paddingTop: "18px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <div>
              <span style={{ fontSize: "22px", fontWeight: "700", color: "#fff" }}>$480</span>
              <span style={{ fontSize: "12px", textDecoration: "line-through", color: "#64748b", marginLeft: "8px" }}>$650</span>
            </div>

            <button
              onClick={() =>
                onAddToCart({
                  id: `vortex-skeleton-${selectedSkeleton.id}`,
                  name: `Vortex Sovereign Skeleton (${selectedSkeleton.name})`,
                  price: 480,
                  imageColor: selectedSkeleton.hex,
                  quantity: 1,
                })
              }
              style={{
                padding: "10px 22px",
                borderRadius: "9999px",
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: "0.1em",
                backgroundColor: "#d4af37",
                color: "#000",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 4px 15px rgba(212,175,55,0.25)",
              }}
            >
              <ShoppingCart size={13} />
              <span>ORDER NOW</span>
            </button>
          </div>
        </div>

        {/* Product 2: The Celestial Astro Orbit ($150) */}
        <div
          style={{
            borderRadius: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(59, 130, 246, 0.25)",
            padding: "26px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#60a5fa" }}>Astro Dual Track Series</span>
            <span style={{ fontSize: "10px", padding: "4px 10px", borderRadius: "999px", background: "rgba(59,130,246,0.15)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.3)" }}>
              Special Edition
            </span>
          </div>

          {/* Real Image Showcase */}
          <div
            onClick={() => onSelectWatch(selectedAstro.id, "astro", selectedAstro.image, selectedAstro.hex, selectedAstro.name)}
            style={{
              height: "280px",
              margin: "20px 0",
              borderRadius: "14px",
              background: "radial-gradient(circle, #181f2a 0%, #080a0e 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <img
              src={selectedAstro.image}
              alt={selectedAstro.name}
              style={{ maxHeight: "240px", maxWidth: "90%", objectFit: "contain", filter: "drop-shadow(0px 15px 25px rgba(0,0,0,0.85))", transition: "all 0.3s ease" }}
            />
            <div style={{ position: "absolute", bottom: "12px", display: "flex", alignItems: "center", gap: "6px", padding: "6px 14px", background: "rgba(0,0,0,0.75)", borderRadius: "9999px", border: "1px solid rgba(212,175,55,0.3)", color: "#d4af37", fontSize: "10px", fontWeight: "700", letterSpacing: "0.15em" }}>
              <Eye size={12} />
              INSPECT 3D PERSPECTIVE
            </div>
          </div>

          <div>
            {/* Real Color Swatches */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <span style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em" }}>Finish:</span>
              <div style={{ display: "flex", gap: "8px" }}>
                {astroVariants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      setSelectedAstro(v);
                      onSelectWatch(v.id, "astro", v.image, v.hex, v.name);
                    }}
                    title={v.name}
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      backgroundColor: v.hex,
                      border: selectedAstro.id === v.id ? "2px solid #fff" : "1px solid rgba(255,255,255,0.3)",
                      boxShadow: selectedAstro.id === v.id ? `0 0 10px ${v.hex}` : "none",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: "11px", color: "#fff", fontWeight: "600", marginLeft: "4px" }}>
                {selectedAstro.name}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#d4af37", marginBottom: "8px" }}>
              <Star size={14} fill="#d4af37" />
              <span style={{ fontSize: "12px", color: "#fff", fontWeight: "600" }}>4.8</span>
              <span style={{ fontSize: "11px", color: "#64748b" }}>(96 verified reviews)</span>
            </div>
            <h3
              onClick={() => onSelectWatch(selectedAstro.id, "astro", selectedAstro.image, selectedAstro.hex, selectedAstro.name)}
              style={{ fontSize: "20px", color: "#fff", margin: "0 0 4px 0", fontWeight: "500", cursor: "pointer" }}
            >
              Vortex Celestial Orbit
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "12px", margin: 0 }}>40mm • Dual Orbit Track Dial • Stainless Steel Mesh</p>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "24px", paddingTop: "18px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <div>
              <span style={{ fontSize: "22px", fontWeight: "700", color: "#fff" }}>$150</span>
              <span style={{ fontSize: "12px", textDecoration: "line-through", color: "#64748b", marginLeft: "8px" }}>$220</span>
            </div>

            <button
              onClick={() =>
                onAddToCart({
                  id: `vortex-astro-${selectedAstro.id}`,
                  name: `Vortex Celestial Orbit (${selectedAstro.name})`,
                  price: 150,
                  imageColor: selectedAstro.hex,
                  quantity: 1,
                })
              }
              style={{
                padding: "10px 22px",
                borderRadius: "9999px",
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: "0.1em",
                backgroundColor: "#d4af37",
                color: "#000",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 4px 15px rgba(212,175,55,0.25)",
              }}
            >
              <ShoppingCart size={13} />
              <span>ORDER NOW</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}