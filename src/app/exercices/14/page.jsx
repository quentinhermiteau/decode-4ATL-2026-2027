"use client";

import { useMemo, useState } from "react";

const translations = {
  en: "The {{count}} prime number is {{value}}.",
  fr: "Le {{count}} nombre premier est {{value}}.",
};

function isPrime(n) {
  if (n < 2) {
    return false;
  }
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

function calculatePrime(n) {
  let count = 0;
  let i = 1;
  while (count < n) {
    i++;
    if (isPrime(i)) {
      count++;
    }
  }
  return i;
}

export default function LocalizedPrimeNumbers() {
  const [count, setCount] = useState(1);
  const [locale, setLocale] = useState("en");

  const handleClick = () => setCount(count + 1);
  const handleLocaleChange = (e) => setLocale(e.target.value);

  const nthprime = useMemo(() => calculatePrime(count), [count]);

  return (
    <div>
      <header>
        <select value={locale} onChange={handleLocaleChange}>
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>

        <button className="primary" onClick={handleClick}>
          Next
        </button>
      </header>
      <p>
        {translations[locale]
          .replace("{{count}}", count)
          .replace("{{value}}", nthprime)}
      </p>
    </div>
  );
}
