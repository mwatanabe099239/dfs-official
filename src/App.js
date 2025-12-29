import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import ScrollToTop from './components/ScrollToTop';
import Applist from './components/Applist';
import BuildOnBnb from './components/BuildOnBnb';
import DeveloperPrograms from './components/DeveloperPrograms';
import DeveloperResources from './components/DeveloperResources';
import FAQ from './components/FAQ';
import FeaturesSection from './components/FeatureSection';
import Footer from './components/Footer';
import JoinSection from './components/JoinSection ';
import Landing from './components/Landing';
import Migrate from './components/Mirgrate';
import Navbar from './components/Navbar'
import Second from './components/Second';
import Social from './components/Social';
import DappsPage from './components/DappsPage';
import ExploreDapps from './components/ExploreDapps';
import StakingPage from './components/StakingPage';
import WhitepaperPage from './components/WhitepaperPage';
import BlogPage from './components/BlogPage';
import BlogDetailPage from './components/BlogDetailPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsOfUsePage from './components/TermsOfUsePage';
import ContactUsPage from './components/ContactUsPage';
import PayvinerPage from './components/PayvinerPage';
import FAQPage from './components/FAQPage';
import SocialLinksPage from './components/SocialLinksPage';
import AboutPage from './components/AboutPage';
import CookiesPage from './components/CookiesPage';
import CareersPage from './components/CareersPage';
import FeedbackPage from './components/FeedbackPage';
import ReferralPage from './components/ReferralPage';
import PartnersPage from './components/PartnersPage';
import NewsletterPage from './components/NewsletterPage';

// Main Landing Page Component
const HomePage = () => {
  return (
    <div className="App">
      <Navbar />
      <Landing />
      <Second />
      <JoinSection />
      <FeaturesSection />
      <DeveloperPrograms />
      {/* <Applist /> */}
      <Migrate />
      <DeveloperResources />
      <FAQ />
      <BuildOnBnb />
      <Social />
      <Footer />
    </div>
  );
};

// dApps Ranking Page Component
const DappsPageWrapper = () => {
  return (
    <div className="App">
      <Navbar />
      <DappsPage />
      <Footer />
    </div>
  );
};

// Explore dApps Page Component
const ExploreDappsWrapper = () => {
  return (
    <div className="App">
      <Navbar />
      <ExploreDapps />
      <Footer />
    </div>
  );
};

// Staking Page Component
const StakingPageWrapper = () => {
  return (
    <div className="App">
      <Navbar />
      <StakingPage />
      <Footer />
    </div>
  );
};

// Whitepaper Page Component
const WhitepaperPageWrapper = () => {
  return (
    <div className="App">
      <Navbar />
      <WhitepaperPage />
      <Footer />
    </div>
  );
};

// Blog Page Component
const BlogPageWrapper = () => {
  return (
    <div className="App">
      <Navbar />
      <BlogPage />
      <Footer />
    </div>
  );
};

// Blog Detail Page Component
const BlogDetailPageWrapper = () => {
  return (
    <div className="App">
      <Navbar />
      <BlogDetailPage />
      <Footer />
    </div>
  );
};

// Privacy Policy Page Component
const PrivacyPolicyPageWrapper = () => {
  return (
    <div className="App">
      <Navbar />
      <PrivacyPolicyPage />
      <Footer />
    </div>
  );
};

// Terms of Use Page Component
const TermsOfUsePageWrapper = () => {
  return (
    <div className="App">
      <Navbar />
      <TermsOfUsePage />
      <Footer />
    </div>
  );
};

// Contact Us Page Component
const ContactUsPageWrapper = () => {
  return (
    <div className="App">
      <Navbar />
      <ContactUsPage />
      <Footer />
    </div>
  );
};


// Payviner Page Component
const PayvinerPageWrapper = () => {
  return (
    <div className="App">
      <Navbar />
      <PayvinerPage />
      <Footer />
    </div>
  );
};

// FAQ Page Component
const FAQPageWrapper = () => {
  return (
    <div className="App">
      <Navbar />
      <FAQPage />
      <Footer />
    </div>
  );
};

// Social Links / Community Page Component
const SocialLinksPageWrapper = () => {
  return (
    <div className="App">
      <Navbar />
      <SocialLinksPage />
      <Footer />
    </div>
  );
};

// About Page Component
const AboutPageWrapper = () => {
  return (
    <div className="App">
      <Navbar />
      <AboutPage />
      <Footer />
    </div>
  );
};

// Cookies Page Component
const CookiesPageWrapper = () => {
  return (
    <div className="App">
      <Navbar />
      <CookiesPage />
      <Footer />
    </div>
  );
};

// Careers Page Component
const CareersPageWrapper = () => {
  return (
    <div className="App">
      <Navbar />
      <CareersPage />
      <Footer />
    </div>
  );
};

// Feedback Page Component
const FeedbackPageWrapper = () => {
  return (
    <div className="App">
      <Navbar />
      <FeedbackPage />
      <Footer />
    </div>
  );
};

// Referral Page Component
const ReferralPageWrapper = () => {
  return (
    <div className="App">
      <Navbar />
      <ReferralPage />
      <Footer />
    </div>
  );
};

// Partners Page Component
const PartnersPageWrapper = () => {
  return (
    <div className="App">
      <Navbar />
      <PartnersPage />
      <Footer />
    </div>
  );
};

// Newsletter Page Component
const NewsletterPageWrapper = () => {
  return (
    <div className="App">
      <Navbar />
      <NewsletterPage />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dapps" element={<DappsPageWrapper />} />
            <Route path="/explore-dapps" element={<ExploreDappsWrapper />} />
            <Route path="/staking" element={<StakingPageWrapper />} />
            <Route path="/whitepaper" element={<WhitepaperPageWrapper />} />
            <Route path="/blog" element={<BlogPageWrapper />} />
            <Route path="/blog/:id" element={<BlogDetailPageWrapper />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPageWrapper />} />
            <Route path="/terms-of-use" element={<TermsOfUsePageWrapper />} />
            <Route path="/contact" element={<ContactUsPageWrapper />} />
            <Route path="/payviner" element={<PayvinerPageWrapper />} />
            <Route path="/faq" element={<FAQPageWrapper />} />
            <Route path="/community" element={<SocialLinksPageWrapper />} />
            <Route path="/about" element={<AboutPageWrapper />} />
            <Route path="/cookies" element={<CookiesPageWrapper />} />
            <Route path="/careers" element={<CareersPageWrapper />} />
            <Route path="/feedback" element={<FeedbackPageWrapper />} />
            <Route path="/referral" element={<ReferralPageWrapper />} />
            <Route path="/partners" element={<PartnersPageWrapper />} />
            <Route path="/newsletter" element={<NewsletterPageWrapper />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
