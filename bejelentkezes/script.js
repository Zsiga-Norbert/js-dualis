const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const surface = document.getElementById("surface");

function loginSurface() {
  surface.innerHTML = "<label for='emailInput'>Kérem az email címét: </label>";
  surface.innerHTML += "<input type='email' id='emailInput'>";
  surface.innerHTML += "<label for='passwordInput'>Kérem a jelszót: </label>";
  surface.innerHTML += "<input type='password' id='passwordInput'>";
  surface.innerHTML +=
    "<button onclick='login()'> bejelentkezés</button>";
    surface.innerHTML +=
    "<button onclick='logout()'> vissza</button>";
}
function registerSurface() 
{
    surface.innerHTML = "<label for='emailInput'>Kérem az email címét: </label>";
  surface.innerHTML += "<input type='email' id='emailInput'>";
  surface.innerHTML += "<label for='passwordInput'>Kérem a jelszót: </label>";
  surface.innerHTML += "<input type='password' id='passwordInput'>";
    surface.innerHTML += "<label for='passwordInputMeg'>Kérem a jelszó megerősítést: </label>";
  surface.innerHTML += "<input type='password' id='passwordInputMeg'>";
  surface.innerHTML +=
    "<button onclick='registration()'> regisztráció</button>";
    surface.innerHTML +=
    "<button onclick='logout()'> vissza</button>";
}

function login() {
  const email = document.getElementById("emailInput").value;
  const jelszo = document.getElementById("passwordInput").value;

  if(!emailPattern.test(email))
  {
    alert("Hibás felhasználónév!")
    return
  }

  if(jelszo.trim() == "")
  {
    alert("adjon meg jelszót!")
    return
  }
  surface.innerHTML = "<p>Gratulálok, bejelentkezett!</p>"
  surface.innerHTML += "<button onclick='logout()'> Kilépés </button>";
}
function registration()
{
const email = document.getElementById("emailInput").value;
  const jelszo = document.getElementById("passwordInput").value;
  const jelszoMeg = document.getElementById("passwordInputMeg").value;

  if(!emailPattern.test(email))
  {
    alert("Hibás emailcím!")
    return
  }

  if(jelszo.trim() == "")
  {
    alert("adjon meg jelszót!")
    return
  }
  if(jelszoMeg.trim() == "")
  {
    alert("adjon meg jelszó megerősítést!")
    return
  }
  if(jelszo.trim() != jelszoMeg.trim())
  {
    alert("Nem egyezik a jelszó és a megerősítés")
    return
  }
  surface.innerHTML = "<p>Gratulálok, regisztrált!</p>"
  setTimeout(function (){
logout()
            
}, 1000);
}

function logout() {
  surface.innerHTML =
    "<button onclick='loginSurface()'>Bejelentkezés</button>";
  surface.innerHTML +=
    "<button onclick='registerSurface()'>Regisztráció</button>";
}