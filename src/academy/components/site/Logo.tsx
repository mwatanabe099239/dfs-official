import Link from "next/link";
const logoImg = "/academy/logo.png";
import { assetSrc } from "@academy/lib/asset";

export function Logo() {
  return (
    <Link href="/academy" className="flex shrink-0 items-center">
      <img src={assetSrc(logoImg)} alt="DFS Academy" className="h-8 w-auto lg:h-9" />
    </Link>
  );
}
