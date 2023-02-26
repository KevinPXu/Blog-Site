//handles the edit post button on the edit post page
const editPostHandler = async (e) => {
  e.preventDefault();

  //retrieves the current url of the page
  const url = window.location.href;

  //obtains the current URL to pass into the fetch request
  const id = url.substring(url.lastIndexOf("/") + 1);

  //obtains the inputs of the user for the post
  const title = document.querySelector("#editPost-title").value.trim();
  const text = document.querySelector("#editPost-text").value.trim();

  //checks to make sure that title and text are not undefined and fetches a PUT method from the server
  if (title && text) {
    const res = await fetch(`/api/post/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, text }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to update post");
    }
  }
};

//handles the delete button on the edit post page
const deletePostHandler = async (e) => {

  //retrieves the current url of the page
  const url = window.location.href;

  //obtains the current URL to pass into the fetch request
  const id = url.substring(url.lastIndexOf("/") + 1);

  //fetches a Delete method from the server to delete the current post
  const res = await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to delete post");
  }
};

//selects the buttons on the edit page
document
  .querySelector(".edit-post")
  .addEventListener("submit", editPostHandler);
document
  .querySelector("#delete-post")
  .addEventListener("click", deletePostHandler);
