import type { Metadata } from "next";

import GuidePage from "@metaface-guide/GuidePage";

export const metadata: Metadata = {
  title: "MetaFace 가입 가이드",
  description: "약 3분이면 완료되는 MetaFace 가입 방법을 안내합니다.",
};

export default function MetafaceGuideKoPage() {
  return <GuidePage lang="ko" />;
}
