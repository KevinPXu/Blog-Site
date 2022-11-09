const loginFormHandler = async (e) => {
  e.preventDefault();

  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();
  console.log(username);
  if (username && password) {
    const res = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(res.statusText);
    }
  }
};

const signupFormHandler = async (e) => {
  e.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  console.log(username);

  if (username && password) {
    const res = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(res.statusText);
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
