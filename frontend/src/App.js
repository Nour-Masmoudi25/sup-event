// App.js
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default function App() {
  const [isLogin, setIsLogin] = useState(true);

  // Toggle et reset éventuel (ici très simple)
  const toggleForm = () => setIsLogin(prev => !prev);

  // Styles partagés
  const pageStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    // fond discret puis flou sous la carte pour l'effet app
    background: 'linear-gradient(180deg, rgba(0,76,151,0.10) 0%, rgba(0,47,94,0.08) 100%)',
    fontFamily: "'Open Sans', sans-serif",
  };

  return (
    <div style={pageStyle}>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45 }}
        style={{
          width: '100%',
          maxWidth: 420,
          borderRadius: 18,
          padding: '26px',
          // glassmorphism
          background: 'linear-gradient(180deg, rgba(255,255,255,0.65), rgba(255,255,255,0.45))',
          boxShadow: '0 10px 30px rgba(2,12,34,0.18)',
          backdropFilter: 'blur(10px) saturate(120%)',
          WebkitBackdropFilter: 'blur(10px) saturate(120%)',
          border: '1px solid rgba(255,255,255,0.5)',
          overflow: 'hidden',
        }}
      >
        {/* top accent */}
        <div style={{
          height: 6,
          borderRadius: 6,
          background: 'linear-gradient(90deg, #E2001A 0%, #FF4458 100%)',
          marginBottom: 18,
        }} />

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 14 }}>
          <h1 style={{
            margin: 0,
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 26,
            color: '#004C97',
            letterSpacing: 0.6
          }}>SUP'EVENT</h1>
          <p style={{ margin: '8px 0 0', color: '#333', fontSize: 13 }}>
            {isLogin ? "Bienvenue — connectez-vous" : "Créez votre compte SUP'Event"}
          </p>
        </div>

        {/* Toggle pills */}
        <div style={{
          display: 'flex',
          gap: 10,
          background: '#F4F4F4',
          padding: 6,
          borderRadius: 12,
          marginBottom: 18
        }}>
          <button
            onClick={() => setIsLogin(true)}
            aria-pressed={isLogin}
            style={{
              flex: 1,
              padding: 10,
              border: 'none',
              borderRadius: 8,
              background: isLogin ? '#004C97' : 'transparent',
              color: isLogin ? '#fff' : '#666',
              fontWeight: 600,
              fontFamily: "'Poppins', sans-serif",
              cursor: 'pointer'
            }}
          >
            Connexion
          </button>
          <button
            onClick={() => setIsLogin(false)}
            aria-pressed={!isLogin}
            style={{
              flex: 1,
              padding: 10,
              border: 'none',
              borderRadius: 8,
              background: !isLogin ? '#004C97' : 'transparent',
              color: !isLogin ? '#fff' : '#666',
              fontWeight: 600,
              fontFamily: "'Poppins', sans-serif",
              cursor: 'pointer'
            }}
          >
            Inscription
          </button>
        </div>

        {/* Animated forms */}
        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.28 }}
            >
              <LoginForm onToggleForm={toggleForm} />
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.28 }}
            >
              <SignupForm onToggleForm={toggleForm} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* footer mention */}
        <div style={{
          marginTop: 20,
          textAlign: 'center',
          fontSize: 12,
          color: '#666'
        }}>
          SUP'COM — Plateforme SUP'Event
        </div>
      </motion.div>
    </div>
  );
}
