const logout = async (e) => {
  e.preventDefault();
  const res = await fetch("/api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
};

document.querySelector("#logoutBtn").addEventListener("click", logout);
