import type { Metadata } from "next";
import type { ReactNode } from "react";

import "../../src/metaface-guide/styles.css";

export const metadata: Metadata = {
  title: "MetaFace 登録ガイド",
  description: "約3分で完了するMetaFaceの登録方法をご案内します。",
  icons: {
    icon: "/metaface-guide/brand/face-logo.png",
    shortcut: "/metaface-guide/brand/face-logo.png",
  },
};

export default function MetafaceGuideLayout({ children }: { children: ReactNode }) {
  return <div className="metaface-guide-scope min-h-screen">{children}</div>;
}
