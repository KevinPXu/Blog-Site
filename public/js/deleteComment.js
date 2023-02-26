const deleteCommentHandler = async (e) => {
  //retrieves the current URL of the page

  //get the id of the comment from the end of the URL
  const id = e.target.getAttribute('data-id');
  console.log(id);
  const res = await fetch(`/api/comment/${id}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    console.log(res);
    document.location.reload();
  } else {
    alert('Failed to delete comment');
  }
};

document
  .querySelector('#delete-comment')
  .addEventListener('click', deleteCommentHandler);
