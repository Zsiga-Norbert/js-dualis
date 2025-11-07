import { useState } from "react";
import { useNavigate } from "react-router";
import apiClient from "../api/apiClient";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>();
  const [passwordShowType, setPasswordShowType] = useState<string>("password");
  const [passwordShowButton, setPasswordShowButton] =
    useState<string>("fa fa-eye");
  const navigate = useNavigate();
  const regex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const signIn = () => {
    if (email.trim().length == 0 && password.trim().length == 0) {
      setError("Addj meg email címet és jelszót");
      return;
    } else if (password?.trim().length == 0) {
      setError("Addj meg jelszót");
      return;
    } else if (email?.trim().length == 0) {
      setError("Addj meg emailt");
      return;
    }
    if (!email?.match(regex)) {
      setError("Addj meg rendes emailt (pl:alma@sajt.com)");
      return;
    }
    setEmail(email.trim())
    setPassword(password.trim())
    apiClient
      .post("/user/login", { email, password })
      .then((respone) => { 
        sessionStorage.setItem("userId", respone.data)
        navigate("/entry/list") 
    })
      .catch((e) => console.log(e));
  };

  const ChangePasswordVisibility = () => {
    if (passwordShowButton == "fa fa-eye") {
      setPasswordShowType("text");
      setPasswordShowButton("fa fa-eye-slash");
    } else {
      setPasswordShowType("password");
      setPasswordShowButton("fa fa-eye");
    }
  };

  return (
    <>
      <div>
        <h2>Email</h2>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <h2>Password</h2>
        <input
          type={passwordShowType}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="jelszó"
        />
        <button onClick={ChangePasswordVisibility}>
          <i className={passwordShowButton}></i>
        </button>
        <a href="/Register">Nincs fiókod? Regisztrálj itt!</a>
        <button onClick={signIn}>Bejelentkezés</button>
        <p>{error}</p>
      </div>
    </>
  );
};

export default LoginPage;
