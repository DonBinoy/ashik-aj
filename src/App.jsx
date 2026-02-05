import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import AuroraBackground from './components/AuroraBackground';
import GravityMode from './components/GravityMode';

function App() {
  console.log('App component rendering...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    }
  }, []);

  return (
    <div className="bg-premium-black min-h-screen text-white selection:bg-premium-yellow selection:text-black cursor-none relative overflow-x-hidden">
      <AnimatePresence mode='wait'>
        {loading && <Preloader setLoading={setLoading} />}
      </AnimatePresence>

      {!loading && (
        <>
          <AuroraBackground />

          {/* Global Noise Texture */}
          <div className="fixed inset-0 pointer-events-none z-[50] opacity-[0.05] mix-blend-overlay"
            style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}>
          </div>



          <GravityMode />

          <CustomCursor />
          <Navbar />
          <main className="relative z-10">
            <Hero />
            <Portfolio />
            <About />
            <Contact />
          </main>
        </>
      )}
    </div>
  );
}

export default App;
