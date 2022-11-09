//function that calls the logout api route which removes the session from the server
const logout = async (e) => {
  e.preventDefault();
  const res = await fetch("/api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  //if logout is successful, redirects to the home directory
  if (res.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
};

document.querySelector("#logoutBtn").addEventListener("click", logout);
