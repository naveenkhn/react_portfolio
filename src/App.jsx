import './App.css';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Footer from './components/Footer';
import Loading from './components/Loading';
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
            <Skills />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}