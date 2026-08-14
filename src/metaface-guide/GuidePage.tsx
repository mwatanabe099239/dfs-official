import {
  localePath as academyLocalePath,
  type AcademyLocale,
} from "@academy/i18n/locales";

export type MetafaceGuideLang = AcademyLocale;

const GUIDE_PATH = "/academy/guide/metaface";
const ASSET_BASE = "/academy/guide/metaface";
const REGISTER_URL = "https://metaface.dfsscan.com";

const asset = (path: string) =>
  `${ASSET_BASE}${path.startsWith("/") ? path : `/${path}`}`;

const STEP_IMAGES = [1, 2, 3, 4, 5, 6].map((n) => asset(`/guide/step-${n}.png`));

const guideLocalePath = (lang: MetafaceGuideLang) =>
  academyLocalePath(lang, GUIDE_PATH);

const copy = {
  ja: {
    code: "JA",
    badge: "新規登録でポイントゲット！",
    hero: ["MetaFaceの登録は", "約3分で完了。"],
    lead: "メールアドレスだけで、DFSChainの共通アカウントを作成。今すぐ登録して、無料ポイントを受け取りましょう。",
    method: "登録方法を見る",
    now: "今すぐMetaFaceを登録",
    free: "登録無料",
    time: "約3分",
    adv: "事前登録で有利にスタート",
    concept: ["最初の接続はWeb3方式。", "その後はGoogleアカウント方式。"],
    desc: "MetaFaceは、DFSChain上のアプリを利用するための共通ウォレット兼アカウントです。一度登録すれば、DFSChain上のすべての対応アプリを共通アカウントで利用できます。",
    features: [
      ["メールで登録", "複雑な準備は不要"],
      ["共通アカウント", "対応アプリで利用可能"],
      ["すぐに使える", "登録後、そのまま開始"],
    ],
    stepsTitle: "MetaFace 登録方法",
    stepsLead: "画面を見ながら順番に進めるだけです。",
    steps: [
      ["MetaFaceを開く", "公式サイトへアクセスします。"],
      ["新しいウォレットを作成", "「Create a new wallet」を選択します。"],
      ["メールとパスワードを登録", "普段使うメールアドレスと、安全なパスワードを入力します。"],
      ["ログインコードを確認", "メールに届いた6桁のコードを確認します。"],
      ["コードを入力", "6桁のコードを入力して「Confirm」を押します。"],
      [
        "登録完了",
        "MetaFaceが開けば登録完了です。無料ポイントを受け取り、DFSChain上のアプリをお楽しみください。",
      ],
    ],
    finalReady: "READY FOR DFSCHAIN",
    final: ["登録を済ませて、", "無料ポイントを受け取りましょう。"],
    finalLead:
      "MetaFaceの登録は無料です。今すぐ共通アカウントを作成して、無料ポイントを受け取りましょう。",
    finalBtn: "MetaFaceを無料で登録",
  },
  en: {
    code: "EN",
    badge: "Get Points When You Sign Up!",
    hero: ["Create your MetaFace", "in about 3 minutes."],
    lead: "Create your shared DFSChain account with just your email address. Sign up now and receive free points.",
    method: "View Registration Guide",
    now: "Create MetaFace Now",
    free: "Free registration",
    time: "About 3 minutes",
    adv: "Get a head start with pre-registration",
    concept: ["Connect once like Web3.", "Then use it like a Google Account."],
    desc: "MetaFace is the shared wallet and account used to access apps on DFSChain. Once registered, you can use the same account across all supported DFSChain apps.",
    features: [
      ["Register by email", "No complicated setup"],
      ["One shared account", "Use it across supported apps"],
      ["Ready right away", "Start as soon as you register"],
    ],
    stepsTitle: "How to Register for MetaFace",
    stepsLead: "Simply follow these six steps on screen.",
    steps: [
      ["Open MetaFace", "Go to the official MetaFace website."],
      ["Create a new wallet", "Select “Create a new wallet.”"],
      ["Enter your email and password", "Use your regular email and set a secure password."],
      ["Check your login code", "Find the six-digit code sent to your email."],
      ["Enter the code", "Enter the six-digit code and select “Confirm.”"],
      [
        "Registration complete",
        "Once MetaFace opens, your registration is complete. Receive your free points and start exploring apps on DFSChain.",
      ],
    ],
    finalReady: "READY FOR DFSCHAIN",
    final: ["Sign Up and Receive", "Free Points."],
    finalLead:
      "MetaFace registration is free. Create your shared account now and receive free points.",
    finalBtn: "Create MetaFace for Free",
  },
  ko: {
    code: "KO",
    badge: "신규 가입하고 포인트 받기!",
    hero: ["MetaFace 가입은", "약 3분이면 완료."],
    lead: "이메일 주소만으로 DFSChain 공용 계정을 만드세요. 지금 가입하고 무료 포인트를 받아보세요.",
    method: "가입 방법 보기",
    now: "지금 MetaFace 가입하기",
    free: "가입 무료",
    time: "약 3분",
    adv: "사전 가입으로 먼저 시작",
    concept: ["첫 연결은 Web3 방식.", "이후에는 Google 계정처럼."],
    desc: "MetaFace는 DFSChain의 앱을 이용하기 위한 공용 지갑 겸 계정입니다. 한 번 가입하면 하나의 공용 계정으로 DFSChain의 모든 지원 앱을 이용할 수 있습니다.",
    features: [
      ["이메일로 가입", "복잡한 준비 불필요"],
      ["하나의 공용 계정", "지원 앱에서 함께 사용"],
      ["바로 이용 가능", "가입 후 즉시 시작"],
    ],
    stepsTitle: "MetaFace 가입 방법",
    stepsLead: "화면을 보며 순서대로 진행하면 됩니다.",
    steps: [
      ["MetaFace 열기", "MetaFace 공식 사이트에 접속합니다."],
      ["새 지갑 만들기", "‘Create a new wallet’을 선택합니다."],
      ["이메일과 비밀번호 등록", "자주 사용하는 이메일과 안전한 비밀번호를 입력합니다."],
      ["로그인 코드 확인", "이메일로 전송된 6자리 코드를 확인합니다."],
      ["코드 입력", "6자리 코드를 입력하고 ‘Confirm’을 누릅니다."],
      [
        "가입 완료",
        "MetaFace가 열리면 가입이 완료됩니다. 무료 포인트를 받고 DFSChain의 다양한 앱을 이용해 보세요.",
      ],
    ],
    finalReady: "DFSCHAIN을 시작할 준비",
    final: ["가입하고", "무료 포인트를 받으세요."],
    finalLead:
      "MetaFace 가입은 무료입니다. 지금 공용 계정을 만들고 무료 포인트를 받으세요.",
    finalBtn: "MetaFace 무료 가입",
  },
} as const;

const HTML_LANG: Record<MetafaceGuideLang, string> = {
  ja: "ja",
  en: "en",
  ko: "ko",
};

export default function GuidePage({ lang }: { lang: MetafaceGuideLang }) {
  const c = copy[lang];

  return (
    <main lang={HTML_LANG[lang]}>
      <header className="siteHeader">
        <a className="brand" href={guideLocalePath(lang)}>
          <span className="brandLockup">
            <img className="brandFace" src={asset("/brand/face-logo.png")} alt="" />
            <img
              className="brandLogo"
              src={asset("/brand/metaface-logo-black.png")}
              alt="MetaFace"
            />
          </span>
        </a>
        <nav className="languages" aria-label="Language">
          <a className={lang === "ja" ? "active" : ""} href={guideLocalePath("ja")}>
            日本語
          </a>
          <a className={lang === "en" ? "active" : ""} href={guideLocalePath("en")}>
            English
          </a>
          <a className={lang === "ko" ? "active" : ""} href={guideLocalePath("ko")}>
            한국어
          </a>
        </nav>
        <a className="headerCta" href={REGISTER_URL} target="_blank" rel="noreferrer">
          {c.free}
        </a>
      </header>

      <section className="hero">
        <div className="heroGlow" />
        <div className="heroInner">
          <div className="eyebrow">
            <span>●</span>
            {c.badge}
          </div>
          <h1>
            {c.hero[0]}
            <br />
            <em>{c.hero[1]}</em>
          </h1>
          <p>{c.lead}</p>
          <div className="heroActions">
            <a className="primary" href="#steps">
              {c.method} <span>↓</span>
            </a>
            <a className="secondary" href={REGISTER_URL} target="_blank" rel="noreferrer">
              {c.now} ↗
            </a>
          </div>
          <div className="trust">
            <span>✓ {c.free}</span>
            <span>✓ {c.time}</span>
            <span>✓ {c.adv}</span>
          </div>
        </div>
        <div className="walletPreview">
          <div className="previewTop">
            <span className="previewLockup">
              <img className="previewFace" src={asset("/brand/face-logo.png")} alt="" />
              <img
                className="previewMetaface"
                src={asset("/brand/metaface-logo.png")}
                alt="MetaFace"
              />
            </span>
            <img
              className="previewDfs"
              src={asset("/brand/dfschain-logo-light.png")}
              alt="DFSChain"
            />
          </div>
          <div className="balance">
            <small>YOUR BALANCE</small>
            <strong>0.000000 DFS</strong>
          </div>
          <div className="previewActions">
            <span>RECEIVE</span>
            <span>SEND</span>
            <span>HISTORY</span>
          </div>
          <div className="asset">
            <span className="assetName">
              <img
                className="assetLogo"
                src={asset("/brand/dfschain-logo-light.png")}
                alt=""
              />
              <b>DFS</b>
            </span>
            <span>0.000000</span>
          </div>
        </div>
      </section>

      <section className="intro">
        <span className="sectionLabel">BEFORE YOU START</span>
        <h2>
          {c.concept[0]}
          <br />
          {c.concept[1]}
        </h2>
        <p>{c.desc}</p>
        <div className="featureRow">
          {c.features.map((feature, index) => (
            <div key={feature[0]}>
              <b>0{index + 1}</b>
              <strong>{feature[0]}</strong>
              <span>{feature[1]}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="stepsSection" id="steps">
        <div className="sectionHead">
          <div>
            <span className="sectionLabel green">6 SIMPLE STEPS</span>
            <h2>{c.stepsTitle}</h2>
          </div>
          <p>{c.stepsLead}</p>
        </div>
        <div className="stepsGrid">
          {c.steps.map((step, index) => (
            <article className="stepCard" key={step[0]}>
              <div className="stepImage">
                <img src={STEP_IMAGES[index]} alt={step[0]} />
              </div>
              <div className="stepCopy">
                <span>STEP 0{index + 1}</span>
                <h3>{step[0]}</h3>
                <p>{step[1]}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="finalCta">
        <div>
          <span className="sectionLabel light">{c.finalReady}</span>
          <h2>
            {c.final[0]}
            <br />
            {c.final[1]}
          </h2>
          <p>{c.finalLead}</p>
        </div>
        <a href={REGISTER_URL} target="_blank" rel="noreferrer">
          {c.finalBtn} <span>↗</span>
        </a>
      </section>

      <footer className="guideFooter">
        <span className="footerBrand">
          <img src={asset("/brand/dfschain-logo-light.png")} alt="DFSChain" />
        </span>
        <span>
          MetaFace Registration Guide · {c.code}
        </span>
      </footer>
    </main>
  );
}
