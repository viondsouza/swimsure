"use client";

import { useState } from "react";

const FEE = 3000; // per child per month
const SHARE = 0.15; // society's share

const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

export default function SocietyCalculator() {
  const [children, setChildren] = useState(30);
  const monthly = children * FEE * SHARE;

  return (
    <div className="calc">
      <label htmlFor="kids" className="calc-label">
        <span>Children who join from your society</span>
        <output htmlFor="kids" className="calc-count">
          {children}
        </output>
      </label>
      <input
        id="kids"
        type="range"
        min={10}
        max={90}
        step={5}
        value={children}
        onChange={(e) => setChildren(Number(e.target.value))}
        style={{ "--fill": `${((children - 10) / 80) * 100}%` } as React.CSSProperties}
      />
      <div className="calc-results">
        <div>
          <span className="calc-big">{inr(monthly)}</span>
          <span className="calc-small">to the society each month</span>
        </div>
        <div>
          <span className="calc-big">{inr(monthly * 12)}</span>
          <span className="calc-small">a year</span>
        </div>
      </div>
    </div>
  );
}
