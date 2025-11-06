// SignupForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function SignupForm({ onToggleForm }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    userType: 'student',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    // validations
    if (formData.password !== formData.confirmPassword) {
      setMessage('❌ Les mots de passe ne correspondent pas');
      return;
    }
    if (formData.password.length < 6) {
      setMessage('❌ Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Inscription réussie');
      } else {
        setMessage(data.message || '❌ Erreur lors de l\'inscription');
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
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#333', fontSize: 13 }}>
          Nom d'utilisateur
        </label>
        <input name="username" required value={formData.username} onChange={handleChange} placeholder="Votre nom d'utilisateur" style={inputStyle}
          onFocus={(e) => e.currentTarget.style.border = '2px solid #004C97'}
          onBlur={(e) => e.currentTarget.style.border = '2px solid #E8E8E8'} />
      </div>

      {/* Email */}
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#333', fontSize: 13 }}>
          Email
        </label>
        <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="votre.email@supcom.tn" style={inputStyle}
          onFocus={(e) => e.currentTarget.style.border = '2px solid #004C97'}
          onBlur={(e) => e.currentTarget.style.border = '2px solid #E8E8E8'} />
      </div>

      {/* User Type */}
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#333', fontSize: 13 }}>
          Type de compte
        </label>
        <select name="userType" value={formData.userType} onChange={handleChange} style={inputStyle}
          onFocus={(e) => e.currentTarget.style.border = '2px solid #004C97'}
          onBlur={(e) => e.currentTarget.style.border = '2px solid #E8E8E8'}>
          <option value="student">Étudiant</option>
          <option value="club">Responsable de club</option>
          <option value="admin">Administrateur</option>
        </select>
      </div>

      {/* Password */}
      <div style={{ marginBottom: 12, position: 'relative' }}>
        <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#333', fontSize: 13 }}>
          Mot de passe
        </label>
        <input name="password" required type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange}
          placeholder="••••••••" style={{ ...inputStyle, paddingRight: 48 }}
          onFocus={(e) => e.currentTarget.style.border = '2px solid #004C97'}
          onBlur={(e) => e.currentTarget.style.border = '2px solid #E8E8E8'} />
        <button type="button" onClick={() => setShowPassword(s => !s)} style={{ position: 'absolute', right: 12, top: '34px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 18 }}>
          {showPassword ? '🙈' : '👁️'}
        </button>
      </div>

      {/* Confirm */}
      <div style={{ marginBottom: 12, position: 'relative' }}>
        <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, color: '#333', fontSize: 13 }}>
          Confirmer le mot de passe
        </label>
        <input name="confirmPassword" required type={showConfirm ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange}
          placeholder="••••••••" style={{ ...inputStyle, paddingRight: 48 }}
          onFocus={(e) => e.currentTarget.style.border = '2px solid #004C97'}
          onBlur={(e) => e.currentTarget.style.border = '2px solid #E8E8E8'} />
        <button type="button" onClick={() => setShowConfirm(s => !s)} style={{ position: 'absolute', right: 12, top: '34px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 18 }}>
          {showConfirm ? '🙈' : '👁️'}
        </button>
      </div>

      {/* Submit */}
      <button type="submit" disabled={loading} style={{
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
      }}>
        {loading ? '⏳ Chargement...' : "S'inscrire"}
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
      <div style={{ marginTop: 16, textAlign: 'center', color: '#666', fontSize: 13 }}>
        Vous avez déjà un compte ?{' '}
        <span onClick={onToggleForm} style={{ color: '#004C97', fontWeight: 600, cursor: 'pointer' }}>Se connecter</span>
      </div>
    </motion.form>
  );
}
