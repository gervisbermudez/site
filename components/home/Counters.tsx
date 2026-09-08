"use client";

import { useEffect, useState } from "react";

const counters = [
  { value: 8, label: "Years Experience" },
  { value: 10, label: "Completed Projects" },
  { value: 5, label: "Happy Customers" },
];

function useCountUp(target: number) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let frame = 0;
    const steps = 24;
    const id = window.setInterval(() => {
      frame += 1;
      setValue(Math.round((target * frame) / steps));
      if (frame >= steps) window.clearInterval(id);
    }, 40);
    return () => window.clearInterval(id);
  }, [target]);
  return value;
}

function Counter({ value, label }: { value: number; label: string }) {
  const n = useCountUp(value);
  return (
    <div className="col-md-3 col-6">
      <div className="art-counter-frame">
        <div className="art-counter-box">
          <span className="art-counter">
            <span> {n} </span>
          </span>
          <span className="art-counter-plus">+</span>
        </div>
        <h6>
          <span> {label} </span>
        </h6>
      </div>
    </div>
  );
}

export function Counters() {
  return (
    <div className="container-fluid">
      <div className="row">
        {counters.map((item) => (
          <Counter key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
}
