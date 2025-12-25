import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
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

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dapps" element={<DappsPageWrapper />} />
          <Route path="/explore-dapps" element={<ExploreDappsWrapper />} />
          <Route path="/staking" element={<StakingPageWrapper />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
