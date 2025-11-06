// LoginForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function LoginForm({ onToggleForm }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      // Remplace l'endpoint par ton API réelle
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Connexion réussie');
        // redirection ou state global ici
      } else {
        setMessage(data.message || '❌ Échec de la connexion');
      }
    } catch (err) {
      setMessage('⚠️ Erreur réseau');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 10,
    border: '2px solid rgba(232,232,232,1)',
    outline: 'none',
    fontSize: 14,
    fontFamily: "'Open Sans', sans-serif",
    boxSizing: 'border-box'
  };

  return (
    <motion.form onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Username */}
      <div style={{ marginBottom: 14 }}>
        <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#333', fontSize: 13 }}>
          Nom d'utilisateur
        </label>
        <input
          required
          type="text"
          placeholder="Votre nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
          onFocus={(e) => e.currentTarget.style.border = '2px solid #004C97'}
          onBlur={(e) => e.currentTarget.style.border = '2px solid #E8E8E8'}
        />
      </div>

      {/* Password */}
      <div style={{ marginBottom: 10, position: 'relative' }}>
        <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#333', fontSize: 13 }}>
          Mot de passe
        </label>
        <input
          required
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ ...inputStyle, paddingRight: 48 }}
          onFocus={(e) => e.currentTarget.style.border = '2px solid #004C97'}
          onBlur={(e) => e.currentTarget.style.border = '2px solid #E8E8E8'}
        />
        <button
          type="button"
          onClick={() => setShowPassword(s => !s)}
          style={{
            position: 'absolute',
            right: 12,
            top: '34px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: 18
          }}
          aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
        >
          {showPassword ? '🙈' : '👁️'}
        </button>
      </div>

      {/* Forgot */}
      <div style={{ textAlign: 'right', marginBottom: 18 }}>
        <a href="#" style={{ color: '#E2001A', fontSize: 13, textDecoration: 'none' }}>Mot de passe oublié ?</a>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        style={{
          width: '100%',
          padding: 14,
          borderRadius: 10,
          border: 'none',
          background: loading ? '#999' : 'linear-gradient(135deg, #E2001A 0%, #C40015 100%)',
          color: '#fff',
          fontWeight: 700,
          fontFamily: "'Montserrat', sans-serif",
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          cursor: loading ? 'not-allowed' : 'pointer',
          boxShadow: loading ? 'none' : '0 6px 18px rgba(226,0,26,0.18)'
        }}
      >
        {loading ? '⏳ Chargement...' : 'Se connecter'}
      </button>

      {/* Message */}
      {message && (
        <div style={{
          marginTop: 14,
          padding: 12,
          borderRadius: 10,
          background: message.includes('✅') ? '#E8F5E9' : '#FFEBEE',
          color: message.includes('✅') ? '#2E7D32' : '#C62828',
          textAlign: 'center',
          fontSize: 14
        }}>
          {message}
        </div>
      )}

      {/* Switch */}
      <div style={{ marginTop: 18, textAlign: 'center', color: '#666', fontSize: 13 }}>
        Vous n'avez pas de compte ?{' '}
        <span onClick={onToggleForm} style={{ color: '#004C97', fontWeight: 600, cursor: 'pointer' }}>S'inscrire</span>
      </div>
    </motion.form>
  );
}
