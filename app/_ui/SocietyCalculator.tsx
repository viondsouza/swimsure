"use client";

import { useState } from "react";

const FEE = 5400; // per child per month
const SHARE = 0.15; // society's share
const MIN = 10;
const MAX = 60;

const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

export default function SocietyCalculator() {
  const [children, setChildren] = useState(30);
  const monthly = children * FEE * SHARE;

  return (
    <div className="calc">
      <p className="calc-title">What your society earns</p>
      <label htmlFor="kids" className="calc-label">
        <span>Children who join from your society</span>
        <output htmlFor="kids" className="calc-count">
          {children}
        </output>
      </label>
      <input
        id="kids"
        type="range"
        min={MIN}
        max={MAX}
        step={5}
        value={children}
        onChange={(e) => setChildren(Number(e.target.value))}
        style={{ "--fill": `${((children - MIN) / (MAX - MIN)) * 100}%` } as React.CSSProperties}
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
      <p className="calc-note">
        15% of ₹5,400 a child each month. Three batches of 10 fill a pool with 30 children; extra Tue, Thu and Sat
        batches can double that.
      </p>
    </div>
  );
}
