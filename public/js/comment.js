// console.log("comment js linked")

const comment = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#comment-content').value.trim();

  if (comment) {
    console.log('comment front end route')
    console.log(comment);
    const response = await fetch(`/api/comment/posts`, {
      method: 'POST',
      body: JSON.stringify({
        content: comment
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      // document.location.replace('/posts')
      document.location.reload()
    } else {
      alert('Failed to add comment')
    }
  }
};

const deleteComment = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/comment/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to delete comment');
    }
  }
}

document
  .querySelector('#commentBtn')
  .addEventListener('click', comment);

document
.querySelector('#deleteComment')
.addEventListener('click', deleteComment);