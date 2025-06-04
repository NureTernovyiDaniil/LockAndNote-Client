import React, { useState, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAccessHash, setPasswordAccessHash] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Паролі не співпадають");
      return;
    }

    const success = await register(email, password, passwordAccessHash);
    if (success) {
      navigate("/login");
    } else {
      setError("Помилка під час реєстрації");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: "100%", maxWidth: "400px" }} className="p-4 shadow">
        <h3 className="text-center mb-4">Реєстрація</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Ім’я користувача</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введіть логін"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Введіть пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Підтвердити пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ще раз"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Кодова фраза для шифрування</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введіть фразу"
              value={passwordAccessHash}
              onChange={(e) => setPasswordAccessHash(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="success" type="submit" className="w-100">
            Зареєструватися
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default Register;