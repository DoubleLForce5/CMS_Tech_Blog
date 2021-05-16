const comment = async () => {
  
  const comment = document.querySelector('#comment-content').nodeValue.trim();
  
  if (comment) {
    const response = await fetch(`/api/posts/${id}/comment`, {
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/posts')
    } else {
      alert('Failed to add comment')
    }
  }
};