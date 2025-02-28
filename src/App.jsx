// App.jsx
import './App.css';
import Header from './components/Header';
import About from './components/About';
import Footer from './components/Footer';
import Skills from './components/Skills';

export default function App() {
  return (
    <div className="container">
      <Header />
      <main className="main-content">
        <About />
        <Skills />
      </main>
      <Footer />
    </div>
  );
}