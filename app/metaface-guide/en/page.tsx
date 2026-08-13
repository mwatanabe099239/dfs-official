import type { Metadata } from "next";

import GuidePage from "@metaface-guide/GuidePage";

export const metadata: Metadata = {
  title: "MetaFace Registration Guide",
  description: "Create your MetaFace account in about 3 minutes.",
};

export default function MetafaceGuideEnPage() {
  return <GuidePage lang="en" />;
}
