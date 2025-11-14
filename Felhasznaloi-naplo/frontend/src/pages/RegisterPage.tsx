import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { UserModel } from "../models/UserModel";
import apiClient from "../api/apiClient.ts";

const RegisterPage = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>();

  const [passwordShowType, setPasswordShowType] = useState<string>("password");
  const [passwordShowButton, setPasswordShowButton] =
    useState<string>("fa fa-eye");
  const [confirmPasswordShowType, setConfirmPasswordShowType] =
    useState<string>("password");
  const [confirmPasswordShowButton, setConfirmPasswordShowButton] =
    useState<string>("fa fa-eye");

  const navigate = useNavigate();
  const regex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  useEffect(() => {
    setAppTheme();
  }, []);

  const register = () => {
    setEmail(email.trim());
    setName(name.trim());
    setPassword(password.trim());
    setConfirmPassword(confirmPassword.trim());
    if (
      email.length == 0 &&
      password.length == 0 &&
      name.length == 0 &&
      confirmPassword.length == 0
    ) {
      setError("Addj meg email címet, nevet, jelszót és jelszót mégegyszer");
      return;
    } else if (password.length == 0) {
      setError("Addj meg jelszót");
      return;
    } else if (email.length == 0) {
      setError("Addj meg emailt");
      return;
    } else if (name.length == 0) {
      setError("Addj meg nevet");
      return;
    } else if (confirmPassword.length == 0) {
      setError("Add meg a jelszót mégegyszer");
      return;
    }
    if (!email.match(regex)) {
      setError("Addj meg rendes emailt (pl:alma@sajt.com)");
      return;
    }
    if (password != confirmPassword) {
      setError("A jelszó és a jelszó megerősítés nem egyezik meg.");
      return;
    }
    const user: UserModel = { email, name, password };
    apiClient
    .post("/user", user)
    .then(() => {
      {
        alert("Sikeresen regisztrált");
        navigate("/Login");
      }
    })
    .catch((e) => {
      if (e.status == 404) {
        setError("Nem adott meg minden adatot");
      } else if (e.status == 500) {
        setError("Ez az email cím már létezik");
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

  const ChangeConfirmPasswordVisibility = () => {
    if (confirmPasswordShowButton == "fa fa-eye") {
      setConfirmPasswordShowType("text");
      setConfirmPasswordShowButton("fa fa-eye-slash");
    } else {
      setConfirmPasswordShowType("password");
      setConfirmPasswordShowButton("fa fa-eye");
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
          <h2>Név</h2>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="név"
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
        <div className="inputField">
          <h2>Jelszó ismétlése</h2>
          <input
            type={confirmPasswordShowType}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="jelszó ismétlése"
          />
          <button
            className="passwordHideButton"
            onClick={ChangeConfirmPasswordVisibility}
          >
            <i className={confirmPasswordShowButton}></i>
          </button>
        </div>
        <a onClick={() => navigate("/login")}>Van fiókod? Jelentkezz be itt!</a>
        <button className="buttons" onClick={register}>
          Regisztráció
        </button>
        <p className="error">{error}</p>
      </div>
    </>
  );
};
export default RegisterPage;
