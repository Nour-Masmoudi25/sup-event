import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    // Validation pour signup
    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        setMessage('❌ Les mots de passe ne correspondent pas');
        setLoading(false);
        return;
      }
      if (formData.password.length < 6) {
        setMessage('❌ Le mot de passe doit contenir au moins 6 caractères');
        setLoading(false);
        return;
      }
    }

    try {
      const endpoint = isLogin ? '/api/login' : '/api/signup';
      const body = isLogin 
        ? { username: formData.username, password: formData.password }
        : formData;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage(isLogin ? '✅ Connexion réussie!' : '✅ Inscription réussie!');
        setTimeout(() => {
          // window.location.href = '/dashboard';
        }, 1500);
      } else {
        setMessage(data.message || '❌ Une erreur est survenue');
      }
    } catch (error) {
      setMessage('⚠️ Erreur réseau');
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage('');
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      userType: 'student'
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #004C97 0%, #002F5E 100%)',
      fontFamily: "'Poppins', sans-serif",
      padding: '20px'
    }}>
      {/* Logo et titre */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          background: '#fff',
          borderRadius: '20px',
          padding: '40px 35px',
          width: '100%',
          maxWidth: '420px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Accent décoratif rouge */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '5px',
          background: 'linear-gradient(90deg, #E2001A 0%, #FF4458 100%)'
        }} />

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#004C97',
              margin: '0 0 5px 0',
              fontFamily: "'Montserrat', sans-serif"
            }}>
              SUP'EVENT
            </h1>
            <p style={{
              fontSize: '14px',
              color: '#666',
              margin: 0,
              fontWeight: '400'
            }}>
              {isLogin ? 'Bienvenue de retour!' : 'Rejoignez la communauté'}
            </p>
          </motion.div>
        </div>

        {/* Toggle Buttons */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '25px',
          background: '#F4F4F4',
          padding: '5px',
          borderRadius: '12px'
        }}>
          <button
            onClick={() => setIsLogin(true)}
            style={{
              flex: 1,
              padding: '10px',
              border: 'none',
              borderRadius: '8px',
              background: isLogin ? '#004C97' : 'transparent',
              color: isLogin ? '#fff' : '#666',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            Connexion
          </button>
          <button
            onClick={() => setIsLogin(false)}
            style={{
              flex: 1,
              padding: '10px',
              border: 'none',
              borderRadius: '8px',
              background: !isLogin ? '#004C97' : 'transparent',
              color: !isLogin ? '#fff' : '#666',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            Inscription
          </button>
        </div>

        {/* Form */}
        <AnimatePresence mode="wait">
          <motion.form
            key={isLogin ? 'login' : 'signup'}
            initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
          >
            {/* Username */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontSize: '13px',
                fontWeight: '600',
                color: '#333'
              }}>
                Nom d'utilisateur
              </label>
              <input
                type="text"
                name="username"
                placeholder="Votre nom d'utilisateur"
                value={formData.username}
                required
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  borderRadius: '10px',
                  border: '2px solid #E8E8E8',
                  outline: 'none',
                  fontSize: '14px',
                  transition: 'border 0.3s ease',
                  fontFamily: "'Open Sans', sans-serif",
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.border = '2px solid #004C97'}
                onBlur={(e) => e.target.style.border = '2px solid #E8E8E8'}
              />
            </div>

            {/* Email (signup only) */}
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ marginBottom: '18px' }}
              >
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="votre.email@supcom.tn"
                  value={formData.email}
                  required={!isLogin}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    borderRadius: '10px',
                    border: '2px solid #E8E8E8',
                    outline: 'none',
                    fontSize: '14px',
                    transition: 'border 0.3s ease',
                    fontFamily: "'Open Sans', sans-serif",
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.border = '2px solid #004C97'}
                  onBlur={(e) => e.target.style.border = '2px solid #E8E8E8'}
                />
              </motion.div>
            )}

            {/* User Type (signup only) */}
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ marginBottom: '18px' }}
              >
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  Type de compte
                </label>
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    borderRadius: '10px',
                    border: '2px solid #E8E8E8',
                    outline: 'none',
                    fontSize: '14px',
                    fontFamily: "'Open Sans', sans-serif",
                    boxSizing: 'border-box',
                    cursor: 'pointer'
                  }}
                  onFocus={(e) => e.target.style.border = '2px solid #004C97'}
                  onBlur={(e) => e.target.style.border = '2px solid #E8E8E8'}
                >
                  <option value="student">Étudiant</option>
                  <option value="club">Responsable de club</option>
                  <option value="admin">Administrateur</option>
                </select>
              </motion.div>
            )}

            {/* Password */}
            <div style={{ marginBottom: '18px', position: 'relative' }}>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontSize: '13px',
                fontWeight: '600',
                color: '#333'
              }}>
                Mot de passe
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                required
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '12px 45px 12px 15px',
                  borderRadius: '10px',
                  border: '2px solid #E8E8E8',
                  outline: 'none',
                  fontSize: '14px',
                  transition: 'border 0.3s ease',
                  fontFamily: "'Open Sans', sans-serif",
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.border = '2px solid #004C97'}
                onBlur={(e) => e.target.style.border = '2px solid #E8E8E8'}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '15px',
                  top: '38px',
                  cursor: 'pointer',
                  fontSize: '18px'
                }}
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>

            {/* Confirm Password (signup only) */}
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ marginBottom: '18px', position: 'relative' }}
              >
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  Confirmer le mot de passe
                </label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  required={!isLogin}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 45px 12px 15px',
                    borderRadius: '10px',
                    border: '2px solid #E8E8E8',
                    outline: 'none',
                    fontSize: '14px',
                    transition: 'border 0.3s ease',
                    fontFamily: "'Open Sans', sans-serif",
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.border = '2px solid #004C97'}
                  onBlur={(e) => e.target.style.border = '2px solid #E8E8E8'}
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: 'absolute',
                    right: '15px',
                    top: '38px',
                    cursor: 'pointer',
                    fontSize: '18px'
                  }}
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </span>
              </motion.div>
            )}

            {/* Forgot Password (login only) */}
            {isLogin && (
              <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                <a href="#" style={{
                  fontSize: '13px',
                  color: '#E2001A',
                  textDecoration: 'none',
                  fontWeight: '500'
                }}>
                  Mot de passe oublié?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                border: 'none',
                borderRadius: '10px',
                background: loading ? '#999' : 'linear-gradient(135deg, #E2001A 0%, #C40015 100%)',
                color: '#fff',
                fontWeight: '700',
                fontSize: '15px',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: loading ? 'none' : '0 4px 15px rgba(226, 0, 26, 0.3)',
                fontFamily: "'Montserrat', sans-serif",
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
              onMouseOver={(e) => {
                if (!loading) e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
              }}
            >
              {loading ? '⏳ Chargement...' : (isLogin ? 'Se connecter' : "S'inscrire")}
            </button>
          </motion.form>
        </AnimatePresence>

        {/* Message */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                marginTop: '20px',
                padding: '12px',
                borderRadius: '10px',
                background: message.includes('✅') ? '#E8F5E9' : '#FFEBEE',
                color: message.includes('✅') ? '#2E7D32' : '#C62828',
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div style={{
          marginTop: '25px',
          textAlign: 'center',
          fontSize: '13px',
          color: '#666'
        }}>
          {isLogin ? "Vous n'avez pas de compte?" : 'Vous avez déjà un compte?'}
          {' '}
          <span
            onClick={toggleForm}
            style={{
              color: '#004C97',
              fontWeight: '600',
              cursor: 'pointer',
              textDecoration: 'none'
            }}
          >
            {isLogin ? "S'inscrire" : 'Se connecter'}
          </span>
        </div>

        {/* SUP'COM Footer */}
        <div style={{
          marginTop: '25px',
          textAlign: 'center',
          fontSize: '12px',
          color: '#999',
          paddingTop: '20px',
          borderTop: '1px solid #F4F4F4'
        }}>
          <span style={{ fontWeight: '600', color: '#004C97' }}>SUP'COM</span> - École Supérieure des Communications
        </div>
      </motion.div>
    </div>
  );
}

export default App;