export function Logo({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <img
      src={dark ? "/difinesai/difines-ai-logo-light.svg" : "/difinesai/logo.png"}
      alt="DIFINES AI"
      className={`h-11 w-auto object-contain ${className}`}
      width={200}
      height={44}
    />
  );
}
