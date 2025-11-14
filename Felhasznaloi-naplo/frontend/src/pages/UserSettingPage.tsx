import { useNavigate } from "react-router";
import { useEffect, useState, type CSSProperties } from "react";
import apiClient from "../api/apiClient.ts";

const UserSettingPage = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<string>(localStorage.getItem("theme")!);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setnewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [userId, setUserId] = useState<number>()
  const [dataDisplay, setDataDisplay] = useState<CSSProperties>({
    display: "none",
  });
  const [passwordDisplay, setPasswordDisplay] = useState<CSSProperties>({
    display: "none",
  });

  const [currentPasswordShowType, setCurrentPasswordShowType] =
    useState<string>("password");
  const [currentPasswordShowButton, setCurrentPasswordShowButton] =
    useState<string>("fa fa-eye");
  const [newPasswordShowType, setNewPasswordShowType] =
    useState<string>("password");
  const [newPasswordShowButton, setNewPasswordShowButton] =
    useState<string>("fa fa-eye");
  const [confirmPasswordShowType, setConfirmPasswordShowType] =
    useState<string>("password");
  const [confirmPasswordShowButton, setConfirmPasswordShowButton] =
    useState<string>("fa fa-eye");
  const regex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    setAppTheme();
    setUserId(Number(sessionStorage.getItem("userId")))
    apiClient
    .get(`/user/${userId}`)
    .then((res) => {
      setEmail(res.data.email);
      setName(res.data.name);
    })
    .catch(() => {setError("Nem található a felhasználó")});
  }, []);

  if (theme == null) {
    setTheme("dark");
    localStorage.setItem("theme", "dark");
  }
  const changeTheme = () => {
    if (theme == "dark") {
      setTheme("light");
      localStorage.setItem("theme", "light");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
      document.documentElement.setAttribute("data-theme", "light");
    }
  };

  const deleteUser = () => {
    if (confirm("Biztos törli?")) {
      apiClient.delete(`/user/${userId}`).then(() => {
        sessionStorage.removeItem("userId")
        apiClient.defaults.headers.common["Authorization"] = ""
    alert("Felhasználó sikeresen törölve. Viszlát uram/hölgyem.");
navigate("/login")
  });
    }
  };

  const changeDataDisplay = () => {
    if (dataDisplay.display == "none") {
      setDataDisplay({ display: "block" });
      setPasswordDisplay({ display: "none" });
    } else {
      setDataDisplay({ display: "none" });
    }
  };

  const changePasswordDisplay = () => {
    if (passwordDisplay.display == "none") {
      setPasswordDisplay({ display: "block" });
      setDataDisplay({ display: "none" });
    } else {
      setPasswordDisplay({ display: "none" });
    }
  };

  const ChangeCurrentPasswordVisibility = () => {
    if (currentPasswordShowButton == "fa fa-eye") {
      setCurrentPasswordShowType("text");
      setCurrentPasswordShowButton("fa fa-eye-slash");
    } else {
      setCurrentPasswordShowType("password");
      setCurrentPasswordShowButton("fa fa-eye");
    }
  };

  const ChangeNewPasswordVisibility = () => {
    if (newPasswordShowButton == "fa fa-eye") {
      setNewPasswordShowType("text");
      setNewPasswordShowButton("fa fa-eye-slash");
    } else {
      setNewPasswordShowType("password");
      setNewPasswordShowButton("fa fa-eye");
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

  const updateUserData = () => {
    setEmail(email.trim());
    setName(name.trim());
    if (email.length == 0 && name.length == 0) {
      setError("Addj meg email címet és nevet");
      return;
    } else if (email.length == 0) {
      setError("Addj meg emailt");
      return;
    } else if (name.length == 0) {
      setError("Addj meg nevet");
      return;
    }
    if (!email.match(regex)) {
      setError("Addj meg rendes emailt (pl:alma@sajt.com)");
      return;
    }
    apiClient
    .patch(`/user/${userId}`, { email, name })
    .then(() => {
      {
        alert("Sikeresen módosította a felhasználó adatait");
        navigate("/entry/list");
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

  const updatePassword = () => {
    setPassword(password.trim());
    setnewPassword(newPassword.trim());
    setConfirmPassword(confirmPassword.trim());
    if (
      password.length == 0 &&
      newPassword.length == 0 &&
      confirmPassword.length == 0
    ) {
      setError("Add meg mind három jelszót");
      return;
    } else if (password.length == 0) {
      setError("Add meg a jelszót");
      return;
    } else if (newPassword.length == 0) {
      setError("Add meg az új jelszót");
      return;
    } else if (confirmPassword.length == 0) {
      setError("Add meg a jelszó ismétlését");
      return;
    }
    if (password == newPassword) {
      setError("A régi és az új jelszó nem egyezhet meg!");
      return;
    }
    if (newPassword != confirmPassword) {
      setError("Az új jelszó és az ismétlés nem egyezik meg!");
      return;
    }
    apiClient
    .patch(`/user/${userId}`, { password, newPassword })
    .then(() => {
      {
        alert("Sikeresen módosította a felhasználó jelszavát");
        navigate("/entry/list");
      }
    })
    .catch((e) => {
      if (e.status == 404) {
        setError("Nem adott meg minden adatot");
      } else if (e.status == 500) {
        setError("Ez az email cím már létezik");
      } else if (e.status == 401) {
        setError("Hibás jelenlegi jelszó");
      }
    });
  };

  const logOut = () => {
    apiClient.defaults.headers.common["Authorization"] = "";
    sessionStorage.removeItem("userId")
    navigate("/login");
  };
  const setAppTheme = () => {
    setTheme(localStorage.getItem("theme")!);
    if (!theme) {
      setTheme("light");
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
        <div style={passwordDisplay}>
          <div className="inputField">
            <h2>Jelenlegi jelszó</h2>
            <input
              type={currentPasswordShowType}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={ChangeCurrentPasswordVisibility}>
              <i className={currentPasswordShowButton}></i>
            </button>
          </div>
          <div className="inputField">
            <h2>Új jelszó</h2>
            <input
              type={newPasswordShowType}
              onChange={(e) => setnewPassword(e.target.value)}
            />
            <button onClick={ChangeNewPasswordVisibility}>
              <i className={newPasswordShowButton}></i>
            </button>
          </div>
          <div className="inputField">
            <h2>Új jelszó ismétlése</h2>
            <input
              type={confirmPasswordShowType}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={ChangeConfirmPasswordVisibility}>
              <i className={confirmPasswordShowButton}></i>
            </button>
          </div>
          <button onClick={() => updatePassword()}>Jelszó mentése</button>
        </div>

        <div style={dataDisplay}>
          <div className="inputField">
            <h2>Név</h2>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="inputField">
            <h2>Email</h2>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <button onClick={() => updateUserData()}>Módosítások mentése</button>
        </div>
        <div className="buttonCollection">
          <button onClick={() => changePasswordDisplay()} className="buttons">
            Jelszó módosítás
          </button>
          <button onClick={() => changeDataDisplay()} className="buttons">
            Adatok módosítása
          </button>
          <button onClick={() => changeTheme()} className="buttons">
            {theme} mód
          </button>
          <button onClick={() => deleteUser()} className="buttons">
            Felhasználó törlése
          </button>
          <button onClick={() => logOut()} className="buttons">
            Kijelentkezés
          </button>
          <button onClick={() => navigate("/entry/list")} className="buttons">
            Vissza
          </button>
        </div>
        <p>{error}</p>
      </div>
    </>
  );
};

export default UserSettingPage;
