import { useState } from "react";
import { useNavigate } from "react-router";
import apiClient from "../api/apiClient";
import type { UserModel } from "../models/UserModel";

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

  const register = () => {
    setEmail(email.trim())
    setName(name.trim())
    setPassword(password.trim())
    setConfirmPassword(confirmPassword.trim())
    if (email.length == 0 && password.length == 0 && name.length == 0 && confirmPassword.length == 0) {
      setError("Addj meg email címet, nevet, jelszót és jelszót mégegyszer");
      return;
    } else if (password.length == 0) {
      setError("Addj meg jelszót");
      return;}
      else if (email.length == 0) {
      setError("Addj meg emailt");
      return;}
      else if (name.length == 0) {
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
    if(password != confirmPassword)
    {
        setError("A jelszó és a jelszó megerősítés nem egyezik meg.");
      return;
    }
    const user: UserModel = { email, name, password };
    apiClient
      .post("/user", user)
      .then((respone) => {
         {
            alert("Sikeresen regisztrált")
          navigate("/Login");
        }
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

  const ChangeConfirmPasswordVisibility = () => {
    if (confirmPasswordShowButton == "fa fa-eye") {
      setConfirmPasswordShowType("text");
      setConfirmPasswordShowButton("fa fa-eye-slash");
    } else {
      setConfirmPasswordShowType("password");
      setConfirmPasswordShowButton("fa fa-eye");
    }
  };

  return (
    <>
      <div>
        <h2>Email</h2>
        <input type="text" onChange={(e) => setEmail(e.target.value)} />
        <h2>Name</h2>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <h2>Password</h2>
        <input type={passwordShowType} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={ChangePasswordVisibility}>
          <i className={passwordShowButton}></i>
        </button>
        <h2>Confirm password</h2>
        <input
          type={confirmPasswordShowType}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={ChangeConfirmPasswordVisibility}>
          <i className={confirmPasswordShowButton}></i>
        </button>
        <a href="/Login">Van fiókod? Jelentkezz be itt!</a>
        <button onClick={register}>Regisztárió</button>
        <p>{error}</p>
      </div>
    </>
  );
};
export default RegisterPage;
