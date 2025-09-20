interface AfricanPatternProps {
    className?: string;
    pattern?: "geometric" | "tribal" | "diamond";
  }
  
  export function AfricanPattern({ className = "", pattern = "geometric" }: AfricanPatternProps) {
    const uniqueId = Math.random().toString(36).substr(2, 9);
    
    if (pattern === "geometric") {
      const patternId = `geometricPattern-${uniqueId}`;
      return (
        <svg
          className={className}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id={patternId} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <polygon points="20,5 35,20 20,35 5,20" fill="currentColor" opacity="0.1" />
              <polygon points="20,10 30,20 20,30 10,20" fill="currentColor" opacity="0.15" />
            </pattern>
          </defs>
          <rect width="200" height="200" fill={`url(#${patternId})`} />
        </svg>
      );
    }
  
    if (pattern === "tribal") {
      const patternId = `tribalPattern-${uniqueId}`;
      return (
        <svg
          className={className}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id={patternId} x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30,10 L40,30 L30,50 L20,30 Z" fill="currentColor" opacity="0.08" />
              <circle cx="30" cy="30" r="3" fill="currentColor" opacity="0.12" />
              <path d="M15,15 L15,45 M45,15 L45,45" stroke="currentColor" strokeWidth="1" opacity="0.1" />
            </pattern>
          </defs>
          <rect width="200" height="200" fill={`url(#${patternId})`} />
        </svg>
      );
    }
  
    const patternId = `diamondPattern-${uniqueId}`;
    return (
      <svg
        className={className}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id={patternId} x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <polygon points="25,5 45,25 25,45 5,25" fill="currentColor" opacity="0.06" />
            <polygon points="25,15 35,25 25,35 15,25" fill="currentColor" opacity="0.1" />
            <circle cx="25" cy="25" r="2" fill="currentColor" opacity="0.15" />
          </pattern>
        </defs>
        <rect width="200" height="200" fill={`url(#${patternId})`} />
      </svg>
    );
  }