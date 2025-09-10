async function getAllUserFunction() {
  try {
    const res = await fetch(`http://localhost:3000/users`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await res.json();

    if (!res.ok) {
      console.log(data.description);
      return;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}

async function postUserFunction(body) {
  try {
    const res = await fetch(`http://localhost:3000/users`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: body,
    });
    const data = await res.json();

    if (!res.ok) {
      console.log(data.description);
      return;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const surface = document.getElementById("surface");

function loginSurface() {
  surface.innerHTML = "<label for='emailInput'>Kérem az email címét: </label>";
  surface.innerHTML += "<input type='email' id='emailInput'>";
  surface.innerHTML += "<p id='emailInputError'> </p>";
  surface.innerHTML += "<label for='passwordInput'>Kérem a jelszót: </label>";
  surface.innerHTML += "<input type='password' id='passwordInput'>";
  surface.innerHTML += "<p id='passwordInputError'> </p>";
  surface.innerHTML +=
    "<button onclick='login()'> bejelentkezés</button>";
    surface.innerHTML +=
    "<button onclick='logout()'> vissza</button>";
}
function registerSurface() {
  surface.innerHTML = "<label for='emailInput'>Kérem az email címét: </label>";
  surface.innerHTML += "<input type='email' id='emailInput'>";
  surface.innerHTML += "<p id='emailInputError'> </p>";
  surface.innerHTML += "<label for='passwordInput'>Kérem a jelszót: </label>";
  surface.innerHTML += "<input type='password' id='passwordInput'>";
  surface.innerHTML += "<p id='passwordInputError'> </p>";
  surface.innerHTML +=
    "<label for='passwordInputMeg'>Kérem a jelszó megerősítést: </label>";
  surface.innerHTML += "<input type='password' id='passwordInputMeg'>";
  surface.innerHTML += "<p id='passwordInputMegError'> </p>";
  surface.innerHTML +=
    "<button onclick='registration()'> regisztráció</button>";
    surface.innerHTML +=
    "<button onclick='logout()'> vissza</button>";
}

async function login() {
  const email = document.getElementById("emailInput").value.trim();
  const password = document.getElementById("passwordInput").value.trim();
  const emailInputError = document.getElementById("emailInputError");
  const passwordInputError = document.getElementById("passwordInputError");
  let userFound = false;
  if (!emailPattern.test(email)) {
    emailInputError.innerHTML = "Hibás email cím!";
    return;
  }

  if (password.trim() == "") {
    passwordInputError.innerHTML = "Adjon meg jelszót!";
    return;
  }

  const users = await getAllUserFunction();
  console.log("")
  users.forEach((user) => {
    if (user.emailAddress == email && user.password == password) {
      userFound = true;
      return;
    }
  });
  if (userFound) {
    surface.innerHTML = `<p>Gratulálok ${email}, bejelentkezett!</p>`;
    surface.innerHTML += "<button onclick='logout()'> Kilépés </button>";
  } else {
    alert("hibás felhasználónév vagy jelszó!");
  }
}
async function registration() {
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;
  const passwordMeg = document.getElementById("passwordInputMeg").value;
  const emailInputError = document.getElementById("emailInputError");
  const passwordInputError = document.getElementById("passwordInputError");
  const passwordInputMegError = document.getElementById(
    "passwordInputMegError"
  );
  let userFound = false;
  if (!emailPattern.test(email)) {
    emailInputError.innerHTML = "Hibás email cím!";
    return;
  }

  if (password.trim() == "") {
    passwordInputError.innerHTML = "Adjon meg jelszót!";
    return;
  }
  if (passwordMeg.trim() == "") {
    passwordInputMegError.innerHTML = "Adjon meg megerősítő jelszót!";
    return;
  }
  if (password.trim() != passwordMeg.trim()) {
    passwordInputMegError.innerHTML = "Nem egyezik meg a jelszóval!";
    return;
  }
  const users = await getAllUserFunction();
  users.forEach((user) => {
    if (user.emailAddress == email) {
      userFound = true;
      return;
    }
  });
  if (userFound == false) {
    let body = {
      emailAddress: `${email}`,
      password: `${password}`,
    };

    let res = await postUserFunction(JSON.stringify(body));
    if (res.id) {
      surface.innerHTML = "<p>Gratulálok, regisztrált!</p>";
      setTimeout(function (){
logout()
            
}, 1000);
    }
  } else {
    alert("Ilyen email címmel már regisztráltak!");
  }
}
function logout() {
  surface.innerHTML =
    "<button onclick='loginSurface()'>Bejelentkezés</button>";
  surface.innerHTML +=
    "<button onclick='registerSurface()'>Regisztráció</button>";
}
