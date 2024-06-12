const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.getElementById('project-name').value.trim();
    const description = document.getElementById('project-funding').value.trim();
  
    if (name && description) {
      const response = await fetch(`/api/project`, {
        method: 'POST',
        body: JSON.stringify({ name, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        const errorText = await response.text(); // Get response body text
        console.error('Error:', errorText);
        alert('Failed to create project');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/project/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  
  const addCommentHandler = async (event) => {
  
  const commentText = document.getElementbyId('comment-text');
  
  if (commentText) {
    const response = await fetch(`/api/project/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ commentText }),
    headers: {
      'Content-Type': 'application/json',
    },
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      const errorText = await response.text(); // Get response body text
      console.error('Error:', errorText);
      alert('Failed to add comment');
  }
  }
  };
  document
    .querySelector('.new-project-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.project-list')
    .addEventListener('click', delButtonHandler);
  
   document
    .getElementById('saveBtn')
    .addEventListener('click', addCommentHandler);