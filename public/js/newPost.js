//function to handle new posts
const newPostHandler = async (e) => {
  e.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const text = document.querySelector("#post-text").value.trim();

  //checks to see if title and text have content then runs an api route
  if (title && text) {
    const res = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({ title, text }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    //if response is ok, then get redirected to your dashboard
    if (res.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create project");
    }
  }
};

//event listener to create a new post
document.querySelector(".new-post").addEventListener("submit", newPostHandler);
