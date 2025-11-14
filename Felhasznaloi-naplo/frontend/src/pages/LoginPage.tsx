import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import apiClient from "../api/apiClient.ts";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>();
  const [passwordShowType, setPasswordShowType] = useState<string>("password");
  const [passwordShowButton, setPasswordShowButton] =
    useState<string>("fa fa-eye");
  const navigate = useNavigate();
  const regex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  useEffect(() => {
    setAppTheme();
  }, []);
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
    setEmail(email.trim());
    setPassword(password.trim());
    apiClient
    .post("/user/login", { email, password })
    .then((respone) => {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${respone.data.token}`;
      sessionStorage.setItem("userId",respone.data.userId);
      navigate("/entry/list")
    })
    .catch((e) => {
      if (e.status == 401) {
        setError("Téves felhasználó név vagy jelszó");
      }
    });
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

  const setAppTheme = () => {
    let theme = localStorage.getItem("theme");
    if (!theme) {
      theme = "light";
    }
    if (theme == "light") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  };

  return (
    <>
      <div>
        <div className="inputField">
          <h2>Email</h2>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
        </div>
        <div className="inputField">
          <h2>Jelszó</h2>
          <input
            type={passwordShowType}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="jelszó"
          />
          <button
            className="passwordHideButton"
            onClick={ChangePasswordVisibility}
          >
            <i className={passwordShowButton}></i>
          </button>
        </div>
        <a onClick={() => navigate("/register")}>
          Nincs fiókod? Regisztrálj itt!
        </a>
        <button className="buttons" onClick={signIn}>
          Bejelentkezés
        </button>
        <p className="error">{error}</p>
      </div>
    </>
  );
};

export default LoginPage;
