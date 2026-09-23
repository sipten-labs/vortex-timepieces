"use client";

import { useState } from "react";
import WatchCanvas from "./components/WatchCanvas";
import ProductGrid from "./components/ProductGrid";
import Craftsmanship from "./components/Craftsmanship";
import CartDrawer, { CartItem } from "./components/CartDrawer";
import { ArrowUpRight, ShoppingBag, ShieldCheck, Globe, Sparkles } from "lucide-react";

// 1. Sovereign Skeleton All Uploaded Photos
const SKELETON_GALLERY = [
  "/vortex-gold (5).png",
  "/vortex-gold (2).jpg",
  "/vortex-gold (3).jpg",
  "/vortex-gold (1).png",
  "/vortex-gold (4).png",
];

// 2. Celestial Astro Orbit All Uploaded Photos
const ASTRO_GALLERY = [
  "/vortex-black (3).jpg",
  "/vortex-black (1).jpg",
  "/vortex-black (2).jpg",
  "/vortex-black (4).jpg",
  "/vortex-black (5).jpg",
];

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Active product states
  const [activeModel, setActiveModel] = useState<"skeleton" | "astro">("skeleton");
  const [activeWatchImage, setActiveWatchImage] = useState<string>("/vortex-gold (5).png");
  const [activeColorHex, setActiveColorHex] = useState<string>("#d4af37");
  const [activeColorName, setActiveColorName] = useState<string>("Genesis Gold Calibre");

  const handleAddToCart = (product: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, product];
    });
    setIsCartOpen(true);
  };

  const handleSelectWatch = (colorId: string, model: "skeleton" | "astro", imgPath: string, hex: string, name: string) => {
    setActiveModel(model);
    setActiveWatchImage(imgPath);
    setActiveColorHex(hex);
    setActiveColorName(name);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const currentPrice = activeModel === "astro" ? 150 : 480;
  const currentTitle = activeModel === "astro" ? "Vortex Celestial Orbit" : "Vortex Sovereign Skeleton";
  const currentGallery = activeModel === "astro" ? ASTRO_GALLERY : SKELETON_GALLERY;

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#06070a", color: "#f8fafc" }}>
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={handleRemoveItem}
        onUpdateQty={handleUpdateQty}
      />

      {/* Navbar */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 48px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(12px)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "rgba(6, 7, 10, 0.85)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: activeColorHex }} />
          <span style={{ fontSize: "20px", fontWeight: "700", letterSpacing: "0.3em", color: "#fff" }}>
            VORTEX
          </span>
        </div>

        <nav style={{ display: "flex", gap: "32px", fontSize: "13px", letterSpacing: "0.15em", color: "#94a3b8" }}>
          <a href="#collection" style={{ textDecoration: "none", color: "inherit" }}>COLLECTION</a>
          <a href="#craftsmanship" style={{ textDecoration: "none", color: "inherit" }}>CRAFTSMANSHIP</a>
          <a href="#about" style={{ textDecoration: "none", color: "inherit" }}>ABOUT</a>
        </nav>

        <button
          onClick={() => setIsCartOpen(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 20px",
            fontSize: "12px",
            fontWeight: "600",
            letterSpacing: "0.15em",
            border: `1px solid ${activeColorHex}66`,
            borderRadius: "9999px",
            color: activeColorHex,
            background: "none",
            cursor: "pointer",
          }}
        >
          <ShoppingBag size={15} />
          <span>BAG ({cartItems.reduce((s, i) => s + i.quantity, 0)})</span>
        </button>
      </header>

      {/* Hero Showcase Section */}
      <section
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "50px 32px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "40px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "1 1 480px", minWidth: "320px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "9999px",
              backgroundColor: `${activeColorHex}1a`,
              border: `1px solid ${activeColorHex}4d`,
              color: activeColorHex,
              fontSize: "11px",
              letterSpacing: "0.2em",
              marginBottom: "20px",
            }}
          >
            <Sparkles size={14} />
            LIVE BESPOKE INSPECT: {activeColorName.toUpperCase()}
          </div>

          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 62px)",
              fontWeight: "300",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: "0 0 16px 0",
            }}
          >
            {currentTitle} <br />
            <span style={{ fontStyle: "italic", fontFamily: "serif", color: activeColorHex }}>
              IN 3D HOROLOGY
            </span>
          </h1>

          <div
            style={{
              padding: "16px 20px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "14px",
              marginBottom: "28px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "14px",
            }}
          >
            <div>
              <span style={{ fontSize: "10px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.15em" }}>Calibre Movement</span>
              <p style={{ color: "#f8fafc", fontSize: "12px", margin: "3px 0 0 0", fontWeight: "600" }}>
                {activeModel === "astro" ? "Precision Dual-Orbit Calibre" : "Open-Heart Automatic Mechanical"}
              </p>
            </div>
            <div>
              <span style={{ fontSize: "10px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.15em" }}>Case & Crystal</span>
              <p style={{ color: "#f8fafc", fontSize: "12px", margin: "3px 0 0 0", fontWeight: "600" }}>
                Anti-Scratch Sapphire • 316L Steel
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "40px" }}>
            <button
              onClick={() =>
                handleAddToCart({
                  id: `vortex-${activeModel}-${activeColorName.toLowerCase().replace(/\s+/g, "-")}`,
                  name: `${currentTitle} (${activeColorName})`,
                  price: currentPrice,
                  imageColor: activeColorHex,
                  quantity: 1,
                })
              }
              style={{
                padding: "16px 36px",
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "0.2em",
                backgroundColor: activeColorHex,
                color: "#000",
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
                boxShadow: `0 0 25px ${activeColorHex}55`,
              }}
            >
              ORDER NOW ${currentPrice} USD
            </button>

            <a
              href="#collection"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "16px 32px",
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: "0.2em",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#f8fafc",
                borderRadius: "9999px",
                textDecoration: "none",
              }}
            >
              ALL EDITIONS <ArrowUpRight size={16} />
            </a>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
              paddingTop: "24px",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#94a3b8" }}>
              <Globe size={16} color={activeColorHex} />
              <span>Worldwide Air Mail</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#94a3b8" }}>
              <ShieldCheck size={16} color={activeColorHex} />
              <span>5-Yr International Warranty</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#94a3b8" }}>
              <Sparkles size={16} color={activeColorHex} />
              <span>Individually Numbered</span>
            </div>
          </div>
        </div>

        {/* 3D Visualizer Studio with Multi-Photo Gallery */}
        <div style={{ flex: "1 1 500px", minWidth: "320px", position: "relative" }}>
          <WatchCanvas
            currentColor={activeColorHex}
            activeImage={activeWatchImage}
            galleryImages={currentGallery}
            title={currentTitle}
            onSelectImage={(img) => setActiveWatchImage(img)}
          />
        </div>
      </section>

      <ProductGrid onAddToCart={handleAddToCart} onSelectWatch={handleSelectWatch} />
      <Craftsmanship />

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "40px 32px", textAlign: "center", color: "#64748b", fontSize: "12px" }}>
        <p>© 2026 VORTEX TIMEPIECES. All Rights Reserved. Bespoke Horology Platform.</p>
      </footer>
    </main>
  );
}