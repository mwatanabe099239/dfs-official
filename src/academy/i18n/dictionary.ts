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
  ガイド: "Guides",
  ガイド一覧: "All guides",
  "ガイド — DFS Academy": "Guides — DFS Academy",
  "DFSChainの使い方をステップで学べるガイド一覧です。":
    "Step-by-step guides for getting started with DFSChain.",
  "登録・設定・使い方を、画面どおりに進められるガイドをまとめました。":
    "Practical guides that walk you through registration, setup, and everyday use.",
  "DFSChainを、もっと簡単に。迷ったときはガイドから始めましょう。":
    "Make DFSChain easier. When you’re unsure, start from the guides.",
  "DFSChainを初めて使う方から、目的に合わせて学びたい方まで。知りたいことを、順番にわかりやすくご案内します。":
    "From first-time DFSChain users to learners with a clear goal — find what you need, step by step.",
  知りたいことから選ぶ: "Choose by what you want to know",
  初めての方: "For beginners",
  "まず何をすればよいか知りたい方": "Start here if you’re not sure what to do first",
  基本操作: "Basics",
  "MetaFaceやアプリの使い方を知りたい方": "Learn MetaFace and how to use apps",
  目的別ガイド: "By goal",
  "自分に合った学び方を見つけたい方": "Find a learning path that fits you",
  困ったとき: "Troubleshooting",
  "問題の解決方法をすぐに探したい方": "Quick fixes when something goes wrong",
  ガイドを検索: "Search guides",
  すべて: "All",
  準備中: "Coming soon",
  "該当するガイドがありません。別の言葉で検索してください。":
    "No matching guides. Try a different search term.",
  ガイドの特徴: "Why these guides",
  順番どおりに進められる: "Follow steps in order",
  画像つきでわかりやすい: "Clear visuals included",
  初心者向けの簡単な説明: "Beginner-friendly explanations",
  目的別にすぐ探せる: "Find guides by goal",
  はじめての方へ: "For beginners",
  まずはここから始めましょう: "Start here first",
  "MetaFaceの登録方法を画面どおりに進められます。":
    "Follow the MetaFace signup steps on screen.",
  スタートガイドを見る: "Open starter guide",
  "解決しませんでしたか？": "Still stuck?",
  "Q&Aから詳しい回答を探せます。": "Find detailed answers in Q&A.",
  "Q&Aを見る": "Browse Q&A",
  ガイドを見る: "View guides",
  "DFS Academyの使い方": "How to use DFS Academy",
  "記事・コース・Q&Aの違いと、目的に合った学び方をわかりやすく案内します。":
    "A clear intro to articles, courses, and Q&A — and how to learn with purpose.",
  "MetaFaceの登録方法": "How to register for MetaFace",
  "メールアドレスからMetaFaceを作成し、DFSChainを使い始めるまでの手順です。":
    "Create MetaFace with your email and start using DFSChain.",
  "DFSChainの基本を知る": "Learn DFSChain basics",
  "DFSChainとは何か、一般的なブロックチェーンとの違いを初心者向けに説明します。":
    "What DFSChain is, and how it differs from typical blockchains — explained for beginners.",
  "アプリの始め方・使い方": "Starting and using apps",
  "MetaFaceで対応アプリに接続し、サービスを利用する基本の流れを学びます。":
    "Connect supported apps with MetaFace and learn the basic flow.",
  "目的から学び方を探す": "Find a path by your goal",
  "利用者・企業・投資家・開発者など、あなたの目的に合う学習ルートを紹介します。":
    "Learning routes for users, businesses, investors, developers, and more.",
  "よくある問題と解決方法": "Common problems and fixes",
  "登録、ログイン、接続、表示などで困ったときの確認方法をまとめています。":
    "Checks for signup, login, connection, and display issues.",
  入門: "Intro",
  アカウント: "Account",
  基礎知識: "Basics",
  実践: "Hands-on",
  学習案内: "Learning path",
  サポート: "Support",
  約3分: "About 3 min",
  約5分: "About 5 min",
  約8分: "About 8 min",
  約6分: "About 6 min",
  約4分: "About 4 min",
  約7分: "About 7 min",
  かんたん: "Easy",
  初級: "Beginner",
  "MetaFace 登録ガイド": "MetaFace registration guide",
  "約3分で完了するMetaFaceの登録方法。":
    "Create your MetaFace account in about 3 minutes.",
  パートナーシップ: "Partnership",
  メニュー: "Menu",
  メニューを開く: "Open menu",
  検索: "Search",
  閉じる: "Close",
  "記事、コース、Q&Aを検索": "Search articles, courses, and Q&A",
  キーワードを入力して検索してください: "Type a keyword to search",
  "検索中…": "Searching…",
  "条件に一致する結果が見つかりませんでした。": "No results matched your search.",

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
  "Q&Aを検索する（例：ウォレット、アプリケーション、Web3）":
    "Search Q&A (e.g. wallet, applications, Web3)",
  検索対象: "Search by",
  タイトル: "Title",
  本文: "Text",
  質問タイトルで探す: "Match question titles",
  回答の本文で探す: "Match answer body text",
  "タイトルでQ&Aを検索（例：ウォレット、アプリケーション）":
    "Search Q&A by title (e.g. wallet, applications)",
  "本文でQ&Aを検索（例：ガス代、送金、ブリッジ）":
    "Search Q&A by text (e.g. gas fees, transfers, bridge)",
  "条件に一致するQ&Aが見つかりませんでした。": "No Q&A matched your search.",
  さらに表示する: "Show more",

  // Content tags
  基礎知識: "Basics",
  使い方: "How to use",
  ウォレット: "Wallet",
  ガス代: "Gas fees",
  セキュリティ: "Security",
  ブリッジ: "Bridge",
  アプリケーション: "Applications",
  収入を得る: "Earn",
  導入する: "Get started",
  Web3: "Web3",
  "記事を検索する（例：ウォレット、アプリケーション、収入を得る）":
    "Search articles (e.g. wallet, applications, earn)",

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
  "Learn & Earn": "Earn",
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
  ガイド: "가이드",
  ガイド一覧: "가이드 목록",
  "ガイド — DFS Academy": "가이드 — DFS Academy",
  "DFSChainの使い方をステップで学べるガイド一覧です。":
    "DFSChain 사용법을 단계별로 배울 수 있는 가이드 목록입니다.",
  "登録・設定・使い方を、画面どおりに進められるガイドをまとめました。":
    "가입·설정·사용 방법을 화면 순서대로 따라 할 수 있는 가이드를 모았습니다.",
  "DFSChainを、もっと簡単に。迷ったときはガイドから始めましょう。":
    "DFSChain을 더 쉽게. 막힐 때는 가이드부터 시작하세요.",
  "DFSChainを初めて使う方から、目的に合わせて学びたい方まで。知りたいことを、順番にわかりやすくご案内します。":
    "DFSChain을 처음 쓰는 분부터 목적에 맞게 배우고 싶은 분까지. 필요한 내용을 순서대로 안내합니다.",
  知りたいことから選ぶ: "알고 싶은 것으로 고르기",
  初めての方: "처음이신 분",
  "まず何をすればよいか知りたい方": "무엇을 해야 할지 궁금한 분",
  基本操作: "기본 조작",
  "MetaFaceやアプリの使い方を知りたい方": "MetaFace와 앱 사용법이 궁금한 분",
  目的別ガイド: "목적별 가이드",
  "自分に合った学び方を見つけたい方": "나에게 맞는 학습법을 찾는 분",
  困ったとき: "困을 때",
  "問題の解決方法をすぐに探したい方": "문제 해결 방법을 바로 찾는 분",
  ガイドを検索: "가이드 검색",
  すべて: "전체",
  準備中: "준비 중",
  "該当するガイドがありません。別の言葉で検索してください。":
    "해당하는 가이드가 없습니다. 다른 단어로 검색해 보세요.",
  ガイドの特徴: "가이드 특징",
  順番どおりに進められる: "순서대로 진행 가능",
  画像つきでわかりやすい: "이미지로 알기 쉬움",
  初心者向けの簡単な説明: "초보자용 쉬운 설명",
  目的別にすぐ探せる: "목적별로 바로 찾기",
  はじめての方へ: "처음이신 분께",
  まずはここから始めましょう: "먼저 여기서 시작하세요",
  "MetaFaceの登録方法を画面どおりに進められます。":
    "MetaFace 가입 방법을 화면 순서대로 따라 할 수 있습니다.",
  スタートガイドを見る: "스타터 가이드 보기",
  "解決しませんでしたか？": "해결되지 않았나요?",
  "Q&Aから詳しい回答を探せます。": "Q&A에서 자세한 답변을 찾을 수 있습니다.",
  "Q&Aを見る": "Q&A 보기",
  ガイドを見る: "가이드 보기",
  "DFS Academyの使い方": "DFS Academy 사용법",
  "記事・コース・Q&Aの違いと、目的に合った学び方をわかりやすく案内します。":
    "아티클·코스·Q&A의 차이와 목적에 맞는 학습법을 쉽게 안내합니다.",
  "MetaFaceの登録方法": "MetaFace 가입 방법",
  "メールアドレスからMetaFaceを作成し、DFSChainを使い始めるまでの手順です。":
    "이메일로 MetaFace를 만들고 DFSChain을 시작하기까지의 절차입니다.",
  "DFSChainの基本を知る": "DFSChain 기본 알아보기",
  "DFSChainとは何か、一般的なブロックチェーンとの違いを初心者向けに説明します。":
    "DFSChain이 무엇인지, 일반 블록체인과의 차이를 초보자용으로 설명합니다.",
  "アプリの始め方・使い方": "앱 시작·사용법",
  "MetaFaceで対応アプリに接続し、サービスを利用する基本の流れを学びます。":
    "MetaFace로 지원 앱에 연결해 서비스를 이용하는 기본 흐름을 배웁니다.",
  "目的から学び方を探す": "목적에 맞는 학습법 찾기",
  "利用者・企業・投資家・開発者など、あなたの目的に合う学習ルートを紹介します。":
    "이용자·기업·투자자·개발자 등 목적에 맞는 학습 루트를 소개합니다.",
  "よくある問題と解決方法": "자주 있는 문제와 해결 방법",
  "登録、ログイン、接続、表示などで困ったときの確認方法をまとめています。":
    "가입, 로그인, 연결, 표시 등에서 막혔을 때 확인 방법을 정리했습니다.",
  入門: "입문",
  アカウント: "계정",
  基礎知識: "기초 지식",
  実践: "실습",
  学習案内: "학습 안내",
  サポート: "지원",
  約3分: "약 3분",
  約5分: "약 5분",
  約8分: "약 8분",
  約6分: "약 6분",
  約4分: "약 4분",
  約7分: "약 7분",
  かんたん: "쉬움",
  初級: "초급",
  "MetaFace 登録ガイド": "MetaFace 가입 가이드",
  "約3分で完了するMetaFaceの登録方法。":
    "약 3분이면 완료되는 MetaFace 가입 방법.",
  パートナーシップ: "파트너십",
  メニュー: "메뉴",
  メニューを開く: "메뉴 열기",
  検索: "검색",
  閉じる: "닫기",
  "記事、コース、Q&Aを検索": "아티클, 코스, Q&A 검색",
  キーワードを入力して検索してください: "키워드를 입력해 검색하세요",
  "検索中…": "검색 중…",
  "条件に一致する結果が見つかりませんでした。": "검색 조건에 맞는 결과가 없습니다.",

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
  "Q&Aを検索する（例：ウォレット、アプリケーション、Web3）":
    "Q&A 검색 (예: 지갑, 애플리케이션, Web3)",
  検索対象: "검색 대상",
  タイトル: "제목",
  本文: "본문",
  質問タイトルで探す: "질문 제목으로 찾기",
  回答の本文で探す: "답변 본문으로 찾기",
  "タイトルでQ&Aを検索（例：ウォレット、アプリケーション）":
    "제목으로 Q&A 검색 (예: 지갑, 애플리케이션)",
  "本文でQ&Aを検索（例：ガス代、送金、ブリッジ）":
    "본문으로 Q&A 검색 (예: 가스비, 송금, 브리지)",
  "条件に一致するQ&Aが見つかりませんでした。": "조건에 맞는 Q&A를 찾을 수 없습니다.",
  さらに表示する: "더 보기",

  // Content tags
  基礎知識: "기초 지식",
  使い方: "사용 방법",
  ウォレット: "지갑",
  ガス代: "가스비",
  セキュリティ: "보안",
  ブリッジ: "브리지",
  アプリケーション: "애플리케이션",
  収入を得る: "수익 창출",
  導入する: "시작하기",
  Web3: "Web3",
  "記事を検索する（例：ウォレット、アプリケーション、収入を得る）":
    "아티클 검색 (예: 지갑, 애플리케이션, 수익 창출)",

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
  "Learn & Earn": "수익 창출",
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
