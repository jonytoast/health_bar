const projectComment = document.getElementById("commentText");

const submitButton = document.getElementById("postButton");

//submitting new comment
const submitButtonHandler = async (event) => {
  event.preventDefault();
  const body = projectComment.value;
  const project_id = submitButton.getAttribute("project-id");

  if (!body) {
    window.alert("Please enter comment text.");
  };

  if (body && project_id) {
    const newComment = await fetch('/api/comments/', {
      method: 'POST',
      body: JSON.stringify({ body, project_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (newComment.ok) {
      // If successful, reload page with new comment
      window.location.reload();
    } else {
      window.alert('Failed to create comment');
    };
  };
};

//deleting a comment
const deleteButtonHandler = async (event) => {
  const comment_id = event.target.getAttribute("comment-id");

  if (comment_id) {
    const deleteComment = await fetch(`/api/comments/${comment_id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (deleteComment.ok) {
      // If successful, reload page without comment
      window.location.reload();
    } else {
      window.alert('Failed to delete comment');
    };
  };
};

//updating a comment
const editButtonHandler = async (event) => {
  const comment_id = event.target.getAttribute("comment-id");
  const updatedText = window.prompt("What do you want to update the comment to say?");

  if (updatedText && comment_id) {
    const updateComment = await fetch(`/api/comments/${comment_id}`, {
      method: 'PUT',
      body: JSON.stringify({ updatedText }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (updateComment.ok) {
      // If successful, reload page with updated comment
      window.location.reload();
    } else {
      window.alert('Failed to update comment');
    };
  };
};

// determine if the user clicked the edit or delete button (and then redirect them to the corresponding function)
const handleEditOrDelete = async (event) => {
  if (event.target.getAttribute("id") === "editButton") {
    editButtonHandler(event);
  };

  if (event.target.getAttribute("id") === "deleteButton") {
    deleteButtonHandler(event);
  };
};

// event listener for when user clicks the submit form button
submitButton.addEventListener("click", submitButtonHandler);

// event listener for when user clicks the edit or the delete buttons
document.querySelector('.previousComments').addEventListener('click', handleEditOrDelete);