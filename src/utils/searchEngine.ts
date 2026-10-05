export interface SearchResult {
  id: string;
  type: 'app' | 'calc' | 'web' | 'system' | 'unit' | 'file' | 'note';
  title: string;
  subtitle: string;
  badge?: string;
  iconName: string;
  accentColor?: string;
  appData?: {
    id: string;
    package: string;
    category: string;
  };
  fileData?: {
    id: string;
    path: string;
    appHandler: string;
  };
  payload?: any;
}

export function evaluateMathExpression(input: string): string | null {
  const clean = input.trim();
  // Match math-like input: numbers, basic operators, parenthesis, sqrt, %, etc.
  if (!/^[\d\s+\-*/().%^sqrt]+$/.test(clean) && !clean.includes('of') && !clean.includes('+') && !clean.includes('*') && !clean.includes('-') && !clean.includes('/')) {
    return null;
  }

  try {
    // Handle "X% of Y" pattern
    const percentMatch = clean.match(/^(\d+(?:\.\d+)?)\s*%\s*(?:of)?\s*(\d+(?:\.\d+)?)$/i);
    if (percentMatch) {
      const p = parseFloat(percentMatch[1]);
      const total = parseFloat(percentMatch[2]);
      const res = (p / 100) * total;
      return `${res.toLocaleString()}`;
    }

    // Replace sqrt(x) with Math.sqrt(x) and ^ with **
    let sanitized = clean
      .replace(/sqrt\(([^)]+)\)/g, 'Math.sqrt($1)')
      .replace(/\^/g, '**')
      .replace(/x/gi, '*');

    // Only allow safe characters
    if (!/^[0-9+\-*/(). Mathsqrt%, ]+$/.test(sanitized)) {
      return null;
    }

    // Must contain at least one operator and numbers
    if (!/[+\-*/%]/.test(sanitized) && !sanitized.includes('Math.sqrt')) {
      return null;
    }

    const fn = new Function(`return (${sanitized})`);
    const val = fn();
    if (typeof val === 'number' && !isNaN(val) && isFinite(val)) {
      return Number(val.toFixed(6)).toString();
    }
  } catch {
    return null;
  }
  return null;
}

export function evaluateUnitConversion(input: string): string | null {
  const text = input.trim().toLowerCase();
  
  // Pattern: "100 km to miles" or "50 usd to inr" or "32 c to f"
  const match = text.match(/^(\d+(?:\.\d+)?)\s*([a-z]+)\s*(?:to|in)\s*([a-z]+)$/i);
  if (!match) return null;

  const value = parseFloat(match[1]);
  const from = match[2];
  const to = match[3];

  if ((from === 'km' || from === 'kilometer' || from === 'kilometers') && (to === 'mi' || to === 'mile' || to === 'miles')) {
    return `${(value * 0.621371).toFixed(2)} miles`;
  }
  if ((from === 'mi' || from === 'mile' || from === 'miles') && (to === 'km' || to === 'kilometer' || to === 'kilometers')) {
    return `${(value * 1.60934).toFixed(2)} km`;
  }
  if ((from === 'c' || from === 'celsius') && (to === 'f' || to === 'fahrenheit')) {
    return `${((value * 9) / 5 + 32).toFixed(1)} °F`;
  }
  if ((from === 'f' || from === 'fahrenheit') && (to === 'c' || to === 'celsius')) {
    return `${(((value - 32) * 5) / 9).toFixed(1)} °C`;
  }
  if ((from === 'kg' || from === 'kilogram' || from === 'kgs') && (to === 'lb' || to === 'lbs' || to === 'pounds')) {
    return `${(value * 2.20462).toFixed(2)} lbs`;
  }
  if ((from === 'lb' || from === 'lbs' || from === 'pounds') && (to === 'kg' || to === 'kilogram' || to === 'kgs')) {
    return `${(value * 0.453592).toFixed(2)} kg`;
  }
  if ((from === 'usd' || from === 'dollars') && (to === 'inr' || to === 'rupees')) {
    return `₹${(value * 86.8).toFixed(2)} INR (approx)`;
  }
  if ((from === 'inr' || from === 'rupees') && (to === 'usd' || to === 'dollars')) {
    return `$${(value / 86.8).toFixed(2)} USD (approx)`;
  }
  if ((from === 'gb' || from === 'gigabytes') && (to === 'mb' || to === 'megabytes')) {
    return `${(value * 1024).toLocaleString()} MB`;
  }

  return null;
}
