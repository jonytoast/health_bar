// Selects required html elements for event handlers
const projectComment = document.getElementById("commentText");
const submitButton = document.getElementById("postButton");
const editButtons = document.getElementsByClassName('edit');
const cancelButtons = document.getElementsByClassName("cancel")

// Submitting new comment
const submitButtonHandler = async (event) => {
  event.preventDefault();
  const body = projectComment.value;
  const recipe_id = submitButton.getAttribute("project-id");

  if (!body) {
    window.alert("Please enter comment text.");
  };

  if (body && recipe_id) {
    const newComment = await fetch('/api/comments/', {
      method: 'POST',
      body: JSON.stringify({ body, recipe_id }),
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

// Deleting a comment
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

// Updating a comment
const editButtonHandler = async (event) => {

  event.preventDefault();

  // Displays edit comment section and hide edit comment button
  event.target.nextSibling.nextElementSibling.removeAttribute("style", "display:none");
  event.target.setAttribute("style", "display:none");

  const comment_id = event.target.getAttribute("comment-id");
  const saveButton = event.target.nextElementSibling.children[3];


  async function saveComment(e) {

    e.preventDefault();

    const updatedText = event.target.nextElementSibling.children[1].value;

    // If textarea is left blank by mistake
    if (updatedText.length === 0) {
      window.alert("Please enter updated comment!");
      return;
    };

    // PUT request to the server to update user comment
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
  }

  // Event listener for update comment button
  saveButton.addEventListener("click", saveComment);

};

// Handles cancelled comment edit
function cancelUpdate() {

  window.location.reload();

}


// Handles comment deletion
const handleDelete = async (event) => {

  if (event.target.getAttribute("id") === "deleteButton") {
    deleteButtonHandler(event);
  };

};

// Event listener for when user clicks the submit form button
submitButton.addEventListener("click", submitButtonHandler);

// Adds event listener to each editable comment
for (editButton of editButtons) {
  editButton.addEventListener("click", editButtonHandler);
};

for (cancelButton of cancelButtons) {
  cancelButton.addEventListener("click", cancelUpdate);
};

// Event listener for when user clicks delete comment buttons
document.querySelector('.previousComments').addEventListener('click', handleDelete);