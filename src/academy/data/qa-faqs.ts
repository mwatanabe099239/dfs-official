/** List rows use objects — Firestore cannot store nested arrays. */
export type FaqListItem = { heading: string; body: string };

export type FaqSection =
  | { kind: "body"; title: string; body: string }
  | { kind: "points"; title: string; points: string[] }
  | { kind: "list"; title: string; list: FaqListItem[] };

export type FaqEntry = {
  id: number;
  question: string;
  /** Title-based URL segment (assigned when loading published lists). */
  slug?: string;
  tag: string;
  tags: string[];
  /** Rich HTML body from admin TipTap editor. */
  content?: string;
  /** @deprecated Prefer `content`. */
  intro: string;
  /** Plain-text answer used in FAQPage JSON-LD — must match visible copy. */
  answer: string;
  /** @deprecated Prefer `content`. */
  sections?: FaqSection[];
  readTime: number;
  updatedAt: string;
  /**
   * English / Korean versions generated from the Japanese master by the admin
   * AI pipeline, keyed by locale. Absent means "not translated yet".
   */
  translations?: Record<string, FaqTranslation>;
  /**
   * True once a locale-specific view has been applied. When false on a
   * non-Japanese locale the reader is seeing the Japanese fallback.
   */
  translated?: boolean;
};

/** A translated view of an entry. Tags stay canonical Japanese for filtering. */
export type FaqTranslation = {
  question: string;
  answer: string;
  content: string;
  seoTitle: string;
  metaDescription: string;
};

export const FAQ_ENTRIES: FaqEntry[] = [
  {
    id: 1,
    question: "DFSChainとは？",
    tag: "基礎知識",
    tags: ["基礎知識", "初心者向け"],
    intro:
      "DFSChainは、高速・低コスト・安全性を兼ね備えた次世代のブロックチェーンです。\nWeb3アプリや暗号資産の利用を、誰にとってもシンプルで身近なものにします。",
    answer:
      "DFSChainは、分散型のデジタル台帳（ブロックチェーン）です。高速・低コスト・高い安全性を備え、暗号資産の送受信、スマートコントラクト、NFTやDeFiなど多様なWeb3サービスを誰でも気軽に利用できる設計になっています。",
    sections: [
      {
        kind: "body",
        title: "1. DFSChainとは何か",
        body: "DFSChainは、分散型のデジタル台帳（ブロックチェーン）です。取引の記録を世界中の参加者で共有し、改ざんが難しく、透明で信頼できる仕組みを提供します。",
      },
      {
        kind: "points",
        title: "2. ひとことで言うと",
        points: ["DFSChainは、たくさんの取引をすばやく、安く、安心して処理できるブロックチェーンです。"],
      },
      {
        kind: "list",
        title: "3. DFSChainの特徴",
        list: [
          {
            heading: "高速処理",
            body: "独自の仕組みにより、たくさんの取引をスピーディに処理できます。",
          },
          {
            heading: "低コスト",
            body: "手数料を抑え、誰でも気軽に利用できる設計です。",
          },
          {
            heading: "高い安全性",
            body: "分散化と暗号技術によって、データの改ざんや不正アクセスを防ぎます。",
          },
          {
            heading: "拡張性",
            body: "将来の利用増加にも対応できる、スケーラブルな設計です。",
          },
          {
            heading: "開発者フレンドリー",
            body: "開発ツールやドキュメントが充実しており、簡単にアプリを構築できます。",
          },
        ],
      },
      {
        kind: "points",
        title: "4. DFSChainでできること",
        points: [
          "暗号資産の送受信や決済ができます",
          "スマートコントラクトでアプリを作れます",
          "NFTやDeFiなど多様なWeb3サービスを利用できます",
          "DApps（分散型アプリ）を簡単に開発・公開できます",
        ],
      },
      {
        kind: "points",
        title: "5. なぜ初心者に向いているのか",
        points: [
          "難しい設定が少なく、シンプルに始められます",
          "手数料が安く、少額から安心して使えます",
          "わかりやすいドキュメントやサポートが充実しています",
          "コミュニティが活発で、困ったときに相談しやすい環境です",
        ],
      },
      {
        kind: "body",
        title: "6. まとめ",
        body: "DFSChainは、Web3の世界をもっと身近に、もっと便利にするためのブロックチェーンです。高速・低コスト・安全性を活かして、あらゆる人が安心してWeb3を楽しめる未来をつくります。まずは小さく始めて、DFSChainの世界を体験してみましょう。",
      },
    ],
    readTime: 2,
    updatedAt: "2024年6月1日",
  },
  {
    id: 2,
    question: "ウォレットはどう作る？",
    tag: "ウォレット",
    tags: ["ウォレット", "初心者向け"],
    intro: "DFSChainを利用するには、まずウォレット（暗号資産用のお財布）を用意します。",
    answer:
      "DFSChain対応ウォレットアプリをインストールし、新規ウォレットを作成します。表示されるシードフレーズ（復元用の単語）は必ず安全な場所に保管し、他人と共有しないでください。作成後、ウォレットアドレスを確認すれば送受信の準備が完了です。",
    readTime: 3,
    updatedAt: "2024年6月1日",
  },
  {
    id: 3,
    question: "ガス代はいくら？",
    tag: "アプリケーション",
    tags: ["アプリケーション", "使い方"],
    intro: "ガス代は、ブロックチェーン上で取引を処理するための手数料です。",
    answer:
      "ガス代はネットワークの混雑状況や取引の種類によって変動しますが、DFSChainは低コスト設計のため、多くの操作を少額で行えます。送金前にウォレットやエクスプローラーで見積もりを確認し、余裕を持ってガス代を用意しておくと安心です。",
    readTime: 3,
    updatedAt: "2024年6月1日",
  },
  {
    id: 4,
    question: "送金方法は？",
    tag: "使い方",
    tags: ["使い方", "初心者向け"],
    intro: "DFSChain上での送金は、ウォレットアプリから行います。",
    answer:
      "ウォレットを開き「送金」を選択し、受取人のアドレス、送る数量、ガス代設定を入力して送信します。送信前にアドレスと金額を必ず確認してください。完了後はトランザクションIDでエクスプローラーから状態を確認できます。",
    readTime: 4,
    updatedAt: "2024年6月1日",
  },
  {
    id: 5,
    question: "DFSは何に使える？",
    tag: "基礎知識",
    tags: ["基礎知識"],
    intro: "DFSはDFSChainエコシステムで使われるトークンです。",
    answer:
      "DFSは送金・決済、ガス代の支払い、ステーキング、DeFiやゲームなどのDApps利用、コミュニティ参加などに使えます。エコシステム内のさまざまなサービスで決済手段や報酬として活用されています。",
    readTime: 3,
    updatedAt: "2024年6月1日",
  },
  {
    id: 6,
    question: "ブロックエクスプローラーの使い方は？",
    tag: "使い方",
    tags: ["使い方"],
    intro: "ブロックエクスプローラーは、取引履歴やブロック情報を確認できるツールです。",
    answer:
      "公式のブロックエクスプローラーにアクセスし、ウォレットアドレスやトランザクションIDを検索します。送金状況、確認数、ガス代、タイムスタンプなどを確認でき、取引が成功したかどうかを判断できます。",
    readTime: 4,
    updatedAt: "2024年6月1日",
  },
  {
    id: 7,
    question: "ステーキングとは？",
    tag: "基礎知識",
    tags: ["基礎知識"],
    intro: "ステーキングは、トークンを預けてネットワークの運営に協力し、報酬を得る仕組みです。",
    answer:
      "DFSChainでは一定量のDFSをステーキングプールに預けることで、ネットワークの安全性に貢献しながら報酬を受け取れます。期間や利率はプールによって異なるため、公式情報を確認してから参加してください。",
    readTime: 4,
    updatedAt: "2024年6月1日",
  },
  {
    id: 8,
    question: "トランザクションが失敗するのはなぜ？",
    tag: "使い方",
    tags: ["使い方"],
    intro: "トランザクションが失敗する主な原因はいくつかあります。",
    answer:
      "ガス代不足、ガス上限の設定不足、送金先アドレスの誤り、ネットワーク混雑、スマートコントラクト側の条件未達などが考えられます。エクスプローラーでエラー内容を確認し、ガス代や入力内容を見直して再試行してください。",
    readTime: 4,
    updatedAt: "2024年6月1日",
  },
  {
    id: 9,
    question: "スマートコントラクトとは？",
    tag: "基礎知識",
    tags: ["基礎知識"],
    intro: "スマートコントラクトは、ブロックチェーン上で自動実行されるプログラムです。",
    answer:
      "あらかじめ定めた条件が満たされると自動的に処理が実行されます。DFSChainでは、DeFi、NFT、ゲームなどさまざまなDAppsの基盤として使われており、開発者は公式ドキュメントを参照してコントラクトをデプロイできます。",
    readTime: 5,
    updatedAt: "2024年6月1日",
  },
  {
    id: 10,
    question: "DFSChainの手数料は？",
    tag: "基礎知識",
    tags: ["基礎知識", "アプリケーション"],
    intro: "DFSChainは低コストでの利用を目指して設計されています。",
    answer:
      "手数料（ガス代）は取引の種類やネットワーク状況により変動しますが、一般的な送金は少額で完了します。ウォレット送信画面またはエクスプローラーで事前に見積もりを確認できます。",
    readTime: 3,
    updatedAt: "2024年6月1日",
  },
  {
    id: 11,
    question: "ブリッジの使い方は？",
    tag: "使い方",
    tags: ["使い方", "導入する"],
    intro: "ブリッジは、異なるブロックチェーン間で資産を移動するための仕組みです。",
    answer:
      "公式または信頼できるブリッジサービスにアクセスし、送元チェーンと送先チェーン、移動するトークンと数量を指定します。ウォレットを接続して指示に従い、完了までエクスプローラーで状態を確認してください。",
    readTime: 5,
    updatedAt: "2024年6月1日",
  },
  {
    id: 12,
    question: "サポートされているネットワークは？",
    tag: "基礎知識",
    tags: ["基礎知識"],
    intro: "DFSChainは独自のネットワークを中心に、ブリッジ経由で他チェーンと連携します。",
    answer:
      "メインネットおよびテストネットが提供されています。連携可能なネットワークはブリッジやパートナーサービスの拡充に伴い更新されるため、最新の対応一覧は公式ドキュメントまたはDFS Academyの記事でご確認ください。",
    readTime: 3,
    updatedAt: "2024年6月1日",
  },
];

export function getFaqById(id: string | number): FaqEntry | undefined {
  const numericId = typeof id === "string" ? Number.parseInt(id, 10) : id;
  return FAQ_ENTRIES.find((faq) => faq.id === numericId);
}

export function getFaqListItems() {
  return FAQ_ENTRIES.map(({ id, question, tag }) => ({ id, question, tag }));
}

/** Full plain-text answer for detail pages — must stay in sync with rendered content. */
export function getFaqDetailSchemaAnswer(faq: FaqEntry): string {
  if (faq.answer?.trim()) return faq.answer.trim();

  if (faq.content?.trim()) {
    return faq.content
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<\/(p|h[1-6]|li)>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  const parts = [faq.intro];

  for (const section of faq.sections ?? []) {
    if (section.kind === "body") parts.push(section.body);
    if (section.kind === "points") parts.push(...section.points);
    if (section.kind === "list") {
      parts.push(...section.list.map((row) => `${row.heading}：${row.body}`));
    }
  }

  return parts.filter(Boolean).join(" ");
}
