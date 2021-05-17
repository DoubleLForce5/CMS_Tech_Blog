// console.log("comment js linked")

const comment = async () => {
  
  const comment = document.querySelector('#comment-content').value.trim();
  
  if (comment) {
    console.log('comment front end route')
    console.log(comment);
    const response = await fetch(`/api/comment`, {
      method: 'POST',
      body: JSON.stringify({ content: comment }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/')
    } else {
      alert('Failed to add comment')
    }
  }
};

document
  .querySelector('#commentBtn')
  .addEventListener('click', comment());