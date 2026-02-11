import Hero from '../components/Hero';
import Portfolio from '../components/Portfolio';
import About from '../components/About';
import Contact from '../components/Contact';
import Hero3DScene from '../components/Hero3DScene';

const Home = () => {
    return (
        <main className="relative z-10">
            <Hero />
            <Portfolio />
            <About />
            <Contact />
        </main>
    );
};

export default Home;
