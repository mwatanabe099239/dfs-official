export function InfinityMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 56 28"
      fill="none"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 14c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M42 14c0 5.5-4.5 10-10 10S22 19.5 22 14s4.5-10 10-10 10 4.5 10 10z"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <>
      <img
        src="/difinesai/logo_white.png"
        alt="DIFINES AI"
        className={`h-9 w-auto object-contain dark:hidden ${className}`}
        width={180}
        height={36}
      />
      <img
        src="/difinesai/logo.png"
        alt="DIFINES AI"
        className={`hidden h-9 w-auto object-contain dark:block ${className}`}
        width={180}
        height={36}
      />
    </>
  );
}
