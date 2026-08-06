"use client";

import Link from "next/link";
const logoImg = "/academy/logo.png";
import { assetSrc } from "@academy/lib/asset";
import { useAcademyI18n } from "@academy/i18n/AcademyLocaleProvider";

export function Logo() {
  const { path } = useAcademyI18n();

  return (
    <Link href={path("/academy")} className="flex shrink-0 items-center">
      <img src={assetSrc(logoImg)} alt="DFS Academy" className="h-8 w-auto lg:h-9" />
    </Link>
  );
}
