import type { AcademyLocale } from "./locales";

/**
 * Academy UI chrome translations.
 *
 * Keys are the original Japanese strings, so wrapping existing markup in `t()`
 * is a mechanical change and an untranslated key degrades to Japanese rather
 * than rendering a raw identifier.
 *
 * Article *content* is not translated here — that comes from the per-document
 * translations produced by the admin AI pipeline.
 */
type Dictionary = Record<string, string>;

const en: Dictionary = {
  // Navigation
  記事: "Articles",
  コース: "Courses",
  パートナーシップ: "Partnership",
  メニュー: "Menu",
  メニューを開く: "Open menu",
  検索: "Search",

  // Footer
  学ぶ: "Learn",
  サポート: "Support",
  よくある質問: "FAQ",
  お問い合わせ: "Contact",
  "ご意見・ご要望": "Feedback",
  パートナーになる: "Become a partner",
  パートナーシップのご相談: "Partnership enquiries",
  "DFSChainを学び、Web3の未来を一緒に創る学習プラットフォーム。":
    "A learning platform to master DFSChain and build the future of Web3 together.",
  "プライバシー・ポリシー": "Privacy Policy",
  利用規約: "Terms of Use",

  // Q&A listing
  初心者向けによくある質問をわかりやすくまとめました:
    "Common questions about DFSChain, explained clearly for beginners",
  "公開Q&A数": "Published Q&A",
  初心者向け: "For beginners",
  はじめての方でも安心: "Beginner-friendly",
  更新中: "Always updating",
  定期的に最新情報を追加: "New content added regularly",
  "人気のQ&A": "Popular Q&A",
  すべて見る: "View all",
  すべて: "All",
  "Q&Aを検索する（例：ウォレット、送金、ガス代）":
    "Search Q&A (e.g. wallet, transfers, gas fees)",
  "条件に一致するQ&Aが見つかりませんでした。": "No Q&A matched your search.",
  さらに表示する: "Show more",

  // Content tags
  基礎知識: "Basics",
  使い方: "How to use",
  ウォレット: "Wallet",
  ガス代: "Gas fees",
  セキュリティ: "Security",
  ブリッジ: "Bridge",

  // Q&A detail
  ホーム: "Home",
  見つかりません: "Not found",
  "Q&Aが見つかりません": "Q&A not found",
  "お探しの質問は存在しないか、移動した可能性があります。":
    "The question you are looking for does not exist, or may have moved.",
  "この記事は役に立ちましたか？": "Was this article helpful?",
  役に立った: "Helpful",
  役に立たなかった: "Not helpful",
  "関連Q&A": "Related Q&A",
  "Q&A一覧に戻る": "Back to all Q&A",
  最終更新: "Last updated",
  読了目安: "Read time",
  "他のQ&Aも見る": "Browse more Q&A",
  "初心者から上級者まで、よくある質問をわかりやすく解説！":
    "Clear answers to common questions, from beginner to advanced.",
  "すべてのQ&Aを見る": "View all Q&A",
  "DFSChainのよくある質問への回答です。":
    "Answers to frequently asked questions about DFSChain.",

  // Home + promo bar
  "DFSChainの知識を深めて、未来のWeb3を一緒に創りましょう！":
    "Deepen your DFSChain knowledge and help build the future of Web3.",
  今すぐ学ぶ: "Start learning",
  "を理解し、": ": understand it,",
  AIと共に新しい経済圏へ: "and step into a new economy with AI",
  "DFSChainとAIの基礎から、アプリ活用まで段階的に学べます。":
    "Learn step by step, from the fundamentals of DFSChain and AI through to using real apps.",
  "Q&Aを見る": "Browse Q&A",
  "注目のQ&A": "Featured Q&A",
  回答を見る: "Read the answer",
  初心者におすすめの記事: "Recommended for beginners",
  "Learn & Earn": "Learn & Earn",
  関連コース: "Related courses",
  コースを見る: "View course",

  // Metadata
  "DFSChain Q&A — DFS Academy": "DFSChain Q&A — DFS Academy",
  "DFSChainのよくある質問を初心者向けにわかりやすくまとめました。":
    "Frequently asked questions about DFSChain, explained clearly for beginners.",
  "DFS Academy — DFSChainを学び、Web3の未来を切り拓こう":
    "DFS Academy — Learn DFSChain and open up the future of Web3",
  "初心者から上級者まで、Web3とDFSChainの知識をわかりやすく学べる学習プラットフォーム。":
    "A learning platform that makes Web3 and DFSChain easy to understand, from beginner to advanced.",

  // Translation notice
  "この記事はまだ翻訳されていないため、日本語で表示しています。":
    "This article has not been translated yet, so it is shown in Japanese.",
};

const ko: Dictionary = {
  // Navigation
  記事: "아티클",
  コース: "코스",
  パートナーシップ: "파트너십",
  メニュー: "메뉴",
  メニューを開く: "메뉴 열기",
  検索: "검색",

  // Footer
  学ぶ: "학습",
  サポート: "지원",
  よくある質問: "자주 묻는 질문",
  お問い合わせ: "문의하기",
  "ご意見・ご要望": "의견 및 요청",
  パートナーになる: "파트너 되기",
  パートナーシップのご相談: "파트너십 문의",
  "DFSChainを学び、Web3の未来を一緒に創る学習プラットフォーム。":
    "DFSChain을 배우고 Web3의 미래를 함께 만들어가는 학습 플랫폼입니다.",
  "プライバシー・ポリシー": "개인정보 처리방침",
  利用規約: "이용약관",

  // Q&A listing
  初心者向けによくある質問をわかりやすくまとめました:
    "초보자를 위해 자주 묻는 질문을 알기 쉽게 정리했습니다",
  "公開Q&A数": "공개된 Q&A",
  初心者向け: "초보자용",
  はじめての方でも安心: "처음이신 분도 안심",
  更新中: "업데이트 중",
  定期的に最新情報を追加: "정기적으로 최신 정보를 추가",
  "人気のQ&A": "인기 Q&A",
  すべて見る: "전체 보기",
  すべて: "전체",
  "Q&Aを検索する（例：ウォレット、送金、ガス代）":
    "Q&A 검색 (예: 지갑, 송금, 가스비)",
  "条件に一致するQ&Aが見つかりませんでした。": "조건에 맞는 Q&A를 찾을 수 없습니다.",
  さらに表示する: "더 보기",

  // Content tags
  基礎知識: "기초 지식",
  使い方: "사용 방법",
  ウォレット: "지갑",
  ガス代: "가스비",
  セキュリティ: "보안",
  ブリッジ: "브리지",

  // Q&A detail
  ホーム: "홈",
  見つかりません: "찾을 수 없음",
  "Q&Aが見つかりません": "Q&A를 찾을 수 없습니다",
  "お探しの質問は存在しないか、移動した可能性があります。":
    "찾으시는 질문이 존재하지 않거나 이동되었을 수 있습니다.",
  "この記事は役に立ちましたか？": "이 글이 도움이 되었나요?",
  役に立った: "도움이 되었어요",
  役に立たなかった: "도움이 되지 않았어요",
  "関連Q&A": "관련 Q&A",
  "Q&A一覧に戻る": "Q&A 목록으로 돌아가기",
  最終更新: "최종 업데이트",
  読了目安: "예상 소요 시간",
  "他のQ&Aも見る": "다른 Q&A 보기",
  "初心者から上級者まで、よくある質問をわかりやすく解説！":
    "초보자부터 상급자까지, 자주 묻는 질문을 알기 쉽게 설명합니다!",
  "すべてのQ&Aを見る": "모든 Q&A 보기",
  "DFSChainのよくある質問への回答です。":
    "DFSChain에 대한 자주 묻는 질문의 답변입니다.",

  // Home + promo bar
  "DFSChainの知識を深めて、未来のWeb3を一緒に創りましょう！":
    "DFSChain 지식을 넓히고 미래의 Web3를 함께 만들어가요!",
  今すぐ学ぶ: "지금 배우기",
  "を理解し、": "을 이해하고,",
  AIと共に新しい経済圏へ: "AI와 함께 새로운 경제권으로",
  "DFSChainとAIの基礎から、アプリ活用まで段階的に学べます。":
    "DFSChain과 AI의 기초부터 앱 활용까지 단계적으로 배울 수 있습니다.",
  "Q&Aを見る": "Q&A 보기",
  "注目のQ&A": "주목받는 Q&A",
  回答を見る: "답변 보기",
  初心者におすすめの記事: "초보자에게 추천하는 아티클",
  "Learn & Earn": "Learn & Earn",
  関連コース: "관련 코스",
  コースを見る: "코스 보기",

  // Metadata
  "DFSChain Q&A — DFS Academy": "DFSChain Q&A — DFS Academy",
  "DFSChainのよくある質問を初心者向けにわかりやすくまとめました。":
    "DFSChain에 대한 자주 묻는 질문을 초보자도 알기 쉽게 정리했습니다.",
  "DFS Academy — DFSChainを学び、Web3の未来を切り拓こう":
    "DFS Academy — DFSChain을 배우고 Web3의 미래를 열어가세요",
  "初心者から上級者まで、Web3とDFSChainの知識をわかりやすく学べる学習プラットフォーム。":
    "초보자부터 상급자까지, Web3와 DFSChain 지식을 알기 쉽게 배울 수 있는 학습 플랫폼입니다.",

  // Translation notice
  "この記事はまだ翻訳されていないため、日本語で表示しています。":
    "이 글은 아직 번역되지 않아 일본어로 표시됩니다.",
};

export const ACADEMY_DICTIONARIES: Record<AcademyLocale, Dictionary> = {
  ja: {},
  en,
  ko,
};

/** Translate a Japanese chrome string, falling back to the Japanese source. */
export function translate(locale: AcademyLocale, key: string): string {
  return ACADEMY_DICTIONARIES[locale]?.[key] ?? key;
}

export type Translator = (key: string) => string;

export function createTranslator(locale: AcademyLocale): Translator {
  return (key: string) => translate(locale, key);
}
