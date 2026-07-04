export function Logo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Top half */}
      <path
        d="M16 30C23.732 30 30 23.732 30 16H2C2 23.732 8.268 30 16 30Z"
        fill="white"
      />
      {/* Bottom half */}
      <path
        d="M16 2C8.268 2 2 8.268 2 16H30C30 8.268 23.732 2 16 2Z"
        fill="#EF4444"
      />
      {/* Center band */}
      <rect x="1" y="15" width="30" height="2" rx="1" fill="#18181B" />
      {/* Center button */}
      <circle cx="16" cy="16" r="5" fill="white" stroke="#18181B" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="2.5" fill="#18181B" />
    </svg>
  );
}
