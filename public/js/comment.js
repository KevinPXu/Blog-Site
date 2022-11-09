const newCommentHandler = async (e) => {
  e.preventDefault();

  //retrieves the current url of the page
  const url = window.location.href;

  //obtains the current URL to pass into the fetch request
  const id = url.substring(url.lastIndexOf("/") + 1);
  const text = document.querySelector("#add-comment").value.trim();

  console.log(title);
  if (text) {
    const res = await fetch(`/comment`, {
      method: "POST",
      body: JSON.stringify({ text, post_id: id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      document.location.reload();
    } else {
      alert("Failed to create comment");
    }
  }
};

document
  .querySelector("#submit-comment")
  .addEventListener("submit", newCommentHandler);
