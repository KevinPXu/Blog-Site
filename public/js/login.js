//function to handle login information
const loginFormHandler = async (e) => {
  e.preventDefault();

  //selectors for the login side of the page
  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  //checks that both username and password have content then runs a post call to /api/user/login
  if (username && password) {
    const res = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    //if the response is 200 then redirect the user to their dashboard
    if (res.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(res.statusText);
    }
  }
};

//function to handle signup information
const signupFormHandler = async (e) => {
  e.preventDefault();

  //selectors for the signup side of the page
  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  //checks that both username and password have content then runs a post call to /api/user
  if (username && password) {
    const res = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    //if the response is 200 then redirect the user to their dashboard
    if (res.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(res.statusText);
    }
  }
};

//event listeners for both forms
document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
