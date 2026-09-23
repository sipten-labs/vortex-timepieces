"use client";

import { useState, useRef } from "react";
import { ZoomIn, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface WatchCanvasProps {
  currentColor: string;
  activeImage: string;
  galleryImages: string[];
  title: string;
  onSelectImage: (img: string) => void;
}

export default function WatchCanvas({
  currentColor,
  activeImage,
  galleryImages,
  title,
  onSelectImage,
}: WatchCanvasProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotation({ x: -y * 22, y: x * 26 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  // Next / Prev controls
  const currentIndex = galleryImages.indexOf(activeImage);
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIdx = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    onSelectImage(galleryImages[prevIdx]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = (currentIndex + 1) % galleryImages.length;
    onSelectImage(galleryImages[nextIdx]);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "560px",
        position: "relative",
        borderRadius: "28px",
        background: "radial-gradient(circle at center, #151a24 0%, #06070a 85%)",
        border: `1px solid ${currentColor}33`,
        boxShadow: `0 20px 60px rgba(0,0,0,0.8), 0 0 40px ${currentColor}15`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        perspective: "1200px",
        userSelect: "none",
      }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Ambient Glow */}
      <div
        style={{
          position: "absolute",
          width: "360px",
          height: "360px",
          borderRadius: "50%",
          background: currentColor,
          filter: "blur(110px)",
          opacity: 0.12,
          pointerEvents: "none",
        }}
      />

      {/* Top Controls Bar */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "24px",
          right: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            borderRadius: "999px",
            backgroundColor: "rgba(0,0,0,0.65)",
            border: "1px solid rgba(255,255,255,0.12)",
            fontSize: "10px",
            letterSpacing: "0.2em",
            color: "#d4af37",
          }}
        >
          <Sparkles size={12} />
          <span>BESPOKE 3D MACRO HOROLOGY</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setZoomLevel((z) => (z === 1 ? 1.4 : 1));
          }}
          style={{
            padding: "6px 14px",
            borderRadius: "999px",
            backgroundColor: "rgba(0,0,0,0.65)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff",
            fontSize: "11px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <ZoomIn size={12} />
          <span>{zoomLevel === 1 ? "ZOOM 1.4X" : "RESET"}</span>
        </button>
      </div>

      {/* Left Arrow Button */}
      {galleryImages.length > 1 && (
        <button
          onClick={handlePrev}
          style={{
            position: "absolute",
            left: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
          }}
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {/* Right Arrow Button */}
      {galleryImages.length > 1 && (
        <button
          onClick={handleNext}
          style={{
            position: "absolute",
            right: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            backgroundColor: "rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
          }}
        >
          <ChevronRight size={20} />
        </button>
      )}

      {/* Main Interactive Watch Showcase with 3D Tilt */}
      <div
        style={{
          width: "100%",
          height: "72%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoomLevel})`,
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
          transformStyle: "preserve-3d",
        }}
      >
        <img
          src={activeImage}
          alt={title}
          style={{
            maxHeight: "360px",
            maxWidth: "80%",
            objectFit: "contain",
            filter: "drop-shadow(0px 25px 35px rgba(0,0,0,0.95))",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Bottom Multi-Photo Thumbnail Bar */}
      <div
        style={{
          position: "absolute",
          bottom: "16px",
          display: "flex",
          gap: "10px",
          zIndex: 20,
          background: "rgba(0,0,0,0.7)",
          padding: "6px 12px",
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {galleryImages.map((img, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              onSelectImage(img);
            }}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              overflow: "hidden",
              border: activeImage === img ? `2px solid #d4af37` : "1px solid rgba(255,255,255,0.2)",
              padding: 0,
              cursor: "pointer",
              background: "#080a0f",
              boxShadow: activeImage === img ? "0 0 10px rgba(212,175,55,0.5)" : "none",
            }}
          >
            <img
              src={img}
              alt="thumbnail"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}