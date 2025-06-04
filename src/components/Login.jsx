import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { AuthContext } from '../Contexts/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/');
    } else {
      setError('Невірна пошта або пароль');
    }
  };

  const styles = {
    wrapper: {
      height: '100vh',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1rem',
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'transparent',
    },
    card: {
      width: '100%',
      maxWidth: '420px',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
      backgroundColor: '#fff',
      boxSizing: 'border-box',
    },
    title: {
      fontWeight: '700',
      color: '#333',
      letterSpacing: '1px',
      textAlign: 'center',
      marginBottom: '1.5rem',
      fontSize: '2rem',
    },
    label: {
      fontWeight: '600',
      color: '#555',
      fontSize: '1rem',
    },
    input: {
      borderRadius: '8px',
      borderColor: '#ddd',
      padding: '0.6rem 1rem',
      fontSize: '1rem',
      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
      transition: 'border-color 0.3s ease',
    },
    button: {
      borderRadius: '10px',
      padding: '0.7rem',
      fontSize: '1.1rem',
      fontWeight: '600',
      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
      border: 'none',
      boxShadow: '0 4px 15px rgba(102,126,234,0.4)',
      transition: 'background 0.3s ease',
      width: '100%',
    },
  };

  return (
    <div style={styles.wrapper}>
      <Card style={styles.card}>
        <h2 style={styles.title}>Вхід</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label style={styles.label}>Пошта</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введіть пошту"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = '#667eea')}
              onBlur={(e) => (e.target.style.borderColor = '#ddd')}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={styles.label}>Пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Введіть пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = '#667eea')}
              onBlur={(e) => (e.target.style.borderColor = '#ddd')}
            />
          </Form.Group>

          <Button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background =
                'linear-gradient(90deg, #5a6fd4, #6f3b9f)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background =
                'linear-gradient(90deg, #667eea, #764ba2)')
            }
          >
            Увійти
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;