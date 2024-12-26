import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { api } from "../utilities";
import { useNavigate } from "react-router-dom";
import NavBar from "/Users/miyapollard/Desktop/leaflet_proj-3/src/components/NavBar.jsx";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMode, setAuthMode] = useState("login");
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("users/signup/", { email, password });
      alert("Registration successful! You can now log in.");
      setAuthMode("login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("users/login/", { email, password });
      const { token } = response.data;

      localStorage.setItem("authToken", response.data.token);
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      setIsAuthenticated(true);
      alert("Login successful!");
      navigate("/about");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid email or password. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    delete api.defaults.headers.common["Authorization"];
    setIsAuthenticated(false);
  };

  return (
    <div>
      <NavBar />
      <h1 className="pl-2">Log in or Create an Account</h1>
      <h3 className="pl-2">Welcome to Travel Notebook! If you are a new user, please register with your email address to create your account. If you are a returning user, welcome back! Please login to use the application's features.</h3>
      <div className="flex-col justify-center p-4 size-1/2 outline-black">
      {!isAuthenticated ? (
        <>
          <div className="auth-toggle">
            <Button
              variant={authMode === "login" ? "primary" : "secondary"}
              onClick={() => setAuthMode("login")}
              className="me-2"
            >
              Login
            </Button>
            <Button
              variant={authMode === "register" ? "primary" : "secondary"}
              onClick={() => setAuthMode("register")}
            >
              Register
            </Button>
          </div>

          {authMode === "login" && (
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="formLoginEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formLoginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
          )}

          {authMode === "register" && (
            <Form onSubmit={handleRegister}>
              <Form.Group className="mb-3" controlId="formRegisterEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formRegisterPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Register
              </Button>
            </Form>
          )}
        </>
      ) : (
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      )}
    </div>
    </div>
  );
};

export default SignUp;
