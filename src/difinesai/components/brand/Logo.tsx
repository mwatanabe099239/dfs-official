export function Logo({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <img
      src={dark ? "/ai/difines-ai-logo-light.svg" : "/ai/logo.png"}
      alt="DIFINES AI"
      className={`h-11 w-auto object-contain ${className}`}
      width={200}
      height={44}
    />
  );
}
