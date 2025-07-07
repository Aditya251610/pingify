import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Usage from './components/Usage';
import Documentation from './components/Documentation';
import OpenSource from './components/OpenSource';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <Hero />
      <Features />
      <Usage />
      <Documentation />
      <OpenSource />
      <Footer />
    </div>
  );
}

export default App;