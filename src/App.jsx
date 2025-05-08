import './App.css';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loading from './components/Loading';
import Experience from './components/Experience';
import { useState } from 'react';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="container">
      {loading && <Loading onComplete={() => setLoading(false)} />}
      {!loading && (
        <>
          <Header />
          <main className="main-content">
            <About />
            <Experience />            
            <Skills />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}