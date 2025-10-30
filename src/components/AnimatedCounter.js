import React, { useEffect, useRef, useState } from 'react';

const AnimatedCounter = ({ value, duration = 2, decimals = 0, suffix = '', className = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef();

  useEffect(() => {
    let start = 0;
    const end = parseFloat(value);
    if (start === end) return;
    const range = end - start;
    const increment = range / (duration * 60);
    let current = start;
    
    const step = () => {
      
      current += increment;
      if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
        setCount(end);
        return;
      }
      setCount(Number(current.toFixed(decimals)));
      ref.current = requestAnimationFrame(step);
    };
    ref.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(ref.current);
  }, [value, duration, decimals]);

  return (
    <span className={className}>
      {count.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
    </span>
  );
};

export default AnimatedCounter;
