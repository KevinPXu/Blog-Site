//function to handle new comments for a specific post
const newCommentHandler = async (e) => {
  e.preventDefault();
  console.log("hello");
  //retrieves the current url of the page
  const url = window.location.href;

  //obtains the current URL to pass into the fetch request
  const id = url.substring(url.lastIndexOf("/") + 1);
  const text = document.querySelector("#add-comment").value.trim();
  
  //checks to make sure text has content and then calls a fetch to /api/comment route to post the comment
  if (text) {
    const res = await fetch(`/api/comment`, {
      method: "POST",
      body: JSON.stringify({ text, post_id: id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      console.log(res);
      //reloads the page after each function call to render the new comment to the page
      document.location.reload();
    } else {
      alert("Failed to create comment");
    }
  }
};

//event listener for form
document
  .querySelector(".add-comment")
  .addEventListener("submit", newCommentHandler);
