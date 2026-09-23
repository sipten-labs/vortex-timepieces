"use client";

import { X, ShieldCheck, ArrowRight, Trash2, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageColor: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onRemove,
  onUpdateQty,
}: CartDrawerProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    country: "United States",
  });

  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          height: "100%",
          backgroundColor: "#0b0e14",
          borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          flexDirection: "column",
          padding: "24px",
          boxSizing: "border-box",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "16px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <span style={{ fontSize: "16px", fontWeight: "600", letterSpacing: "0.1em", color: "#f8fafc" }}>
            YOUR SELECTION ({items.reduce((s, i) => s + i.quantity, 0)})
          </span>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#94a3b8",
              cursor: "pointer",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {orderPlaced ? (
          <div style={{ padding: "40px 10px", textAlign: "center", margin: "auto 0" }}>
            <CheckCircle2 size={54} color="#d4af37" style={{ margin: "0 auto 16px" }} />
            <h3 style={{ fontSize: "20px", color: "#fff", marginBottom: "8px" }}>Order Reserved!</h3>
            <p style={{ color: "#94a3b8", fontSize: "13px", lineHeight: "1.6" }}>
              Thank you, {formData.name || "Client"}. We have dispatched order verification details to {formData.email || "your email"}.
            </p>
            <button
              onClick={() => {
                setOrderPlaced(false);
                setIsCheckingOut(false);
                onClose();
              }}
              style={{
                marginTop: "24px",
                padding: "12px 28px",
                backgroundColor: "#d4af37",
                color: "#000",
                fontWeight: "700",
                fontSize: "12px",
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
              }}
            >
              CONTINUE BROWSING
            </button>
          </div>
        ) : !isCheckingOut ? (
          <>
            {/* Cart Items List */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 0" }}>
              {items.length === 0 ? (
                <p style={{ color: "#64748b", textAlign: "center", marginTop: "40px", fontSize: "14px" }}>
                  Your bespoke timepiece bag is empty.
                </p>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "16px 0",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                    }}
                  >
                    <div>
                      <h4 style={{ color: "#fff", fontSize: "14px", margin: "0 0 4px 0" }}>
                        {item.name}
                      </h4>
                      <span style={{ color: "#d4af37", fontSize: "13px", fontWeight: "600" }}>
                        ${item.price} USD
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid rgba(255,255,255,0.2)",
                          borderRadius: "4px",
                        }}
                      >
                        <button
                          onClick={() => onUpdateQty(item.id, -1)}
                          style={{
                            padding: "2px 8px",
                            background: "none",
                            border: "none",
                            color: "#fff",
                            cursor: "pointer",
                          }}
                        >
                          -
                        </button>
                        <span style={{ padding: "0 6px", fontSize: "12px", color: "#fff" }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.id, 1)}
                          style={{
                            padding: "2px 8px",
                            background: "none",
                            border: "none",
                            color: "#fff",
                            cursor: "pointer",
                          }}
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemove(item.id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#ef4444",
                          cursor: "pointer",
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {items.length > 0 && (
              <div style={{ paddingTop: "16px", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: "700",
                    marginBottom: "16px",
                  }}
                >
                  <span>Subtotal</span>
                  <span>${total} USD</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "11px",
                    color: "#94a3b8",
                    marginBottom: "20px",
                  }}
                >
                  <ShieldCheck size={16} color="#d4af37" />
                  <span>Insured Global Air Courier Included</span>
                </div>

                <button
                  onClick={() => setIsCheckingOut(true)}
                  style={{
                    width: "100%",
                    padding: "16px",
                    backgroundColor: "#d4af37",
                    color: "#000",
                    fontWeight: "700",
                    fontSize: "12px",
                    letterSpacing: "0.2em",
                    borderRadius: "9999px",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  PROCEED TO CHECKOUT <ArrowRight size={16} />
                </button>
              </div>
            )}
          </>
        ) : (
          /* International Dropshipping Checkout Form */
          <form onSubmit={handleCheckoutSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "16px" }}>
            <h3 style={{ color: "#fff", fontSize: "15px", margin: 0 }}>Worldwide Shipping Details</h3>

            <div>
              <label style={{ color: "#94a3b8", fontSize: "11px", display: "block", marginBottom: "4px" }}>Full Name</label>
              <input
                required
                type="text"
                placeholder="Lord Alexander Vance"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  borderRadius: "6px",
                  fontSize: "13px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label style={{ color: "#94a3b8", fontSize: "11px", display: "block", marginBottom: "4px" }}>Email Address</label>
              <input
                required
                type="email"
                placeholder="vance@luxury.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  borderRadius: "6px",
                  fontSize: "13px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div>
              <label style={{ color: "#94a3b8", fontSize: "11px", display: "block", marginBottom: "4px" }}>Shipping Destination Address</label>
              <textarea
                required
                rows={2}
                placeholder="Apartment / Suite, Street Address, City, Postal Code"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff",
                  borderRadius: "6px",
                  fontSize: "13px",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginTop: "10px", padding: "12px", background: "rgba(212,175,55,0.08)", borderRadius: "6px", border: "1px solid rgba(212,175,55,0.2)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#fff", fontSize: "13px", fontWeight: "700" }}>
                <span>Total Amount Due</span>
                <span style={{ color: "#d4af37" }}>${total} USD</span>
              </div>
            </div>

            <button
              type="submit"
              style={{
                marginTop: "16px",
                padding: "16px",
                backgroundColor: "#d4af37",
                color: "#000",
                fontWeight: "700",
                fontSize: "12px",
                letterSpacing: "0.2em",
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
              }}
            >
              CONFIRM & PAY WITH STRIPE
            </button>

            <button
              type="button"
              onClick={() => setIsCheckingOut(false)}
              style={{
                background: "none",
                border: "none",
                color: "#94a3b8",
                fontSize: "12px",
                cursor: "pointer",
                marginTop: "6px",
              }}
            >
              Back to Selection
            </button>
          </form>
        )}
      </div>
    </div>
  );
}