import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import instagramQR from './assets/instagram-qr.png';

function App() {
  const [showQR, setShowQR] = useState(false);
  const imgRefs = useRef([]);

  useEffect(() => {
    const callback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };
    const observer = new window.IntersectionObserver(callback, { threshold: 0.2 });
    imgRefs.current.forEach(img => {
      if (img) observer.observe(img);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
    {/* Instagram QR/icon at top left, hover to show QR, click to redirect */}
    <div
      style={{ position: 'fixed', top: 10, left: 0, zIndex: 1000, textAlign: 'center', width: 150, display: 'block' }}
    >
      <div
        style={{ cursor: 'pointer', width: 130, height: 150 }}
        onMouseEnter={() => setShowQR(true)}
        onMouseLeave={() => setShowQR(false)}
        onClick={() => window.open('https://instagram.com/praga_designs._', '_blank')}
      >
        {showQR ? (
          <img src={instagramQR} alt="Instagram QR" style={{ width: 150, height: 150, borderRadius: 16, boxShadow: '0 4px 16px rgba(0,0,0,0.15)', transition: 'all 0.3s' }} />
        ) : (
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#8b0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'all 0.3s', marginTop: 10 }}><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>
        )}
      </div>
    </div>
    {/* Email icon at bottom right */}
    <a href="mailto:pragatheeswaransk03@gmail.com?subject=I%20need%20a%20design%20for..." style={{ position: 'fixed', bottom: 24, right: 24, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, background: '#8b0000', borderRadius: '50%', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', textDecoration: 'none', zIndex: 1000 }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/></svg>
    </a>
    <div className='container'>
      {[1,2,3,4,5,6,7,8].map((num, idx) => (
        <img
          key={num}
          ref={el => imgRefs.current[idx] = el}
          src={`${num}.jpg`}
          alt={num}
          className='responsive-img fade-in'
        />
      ))}
    </div>
    </>
  )
}

export default App
