// handle submitting new project (post)
const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#recipe-name').value.trim();
    const recipe_text = document.querySelector('#recipe-text').value.trim();
    const main_ingredient = document.querySelector('#main-ingridient').value.trim();

    if (title && recipe_text && main_ingredient) {
        const response = await fetch(`/api/recipes`, {
            method: 'POST',
            body: JSON.stringify({ title, recipe_text, main_ingredient }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        window.alert(`${title} and ${recipe_text} and ${main_ingredient}`);

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create recipe');
        };
    };
};

//NEED TO MAKE THIS WORK
// handle deleting a project (post)
const delButtonHandler = async (event) => {
    event.preventDefault();
    const recipe_id = event.target.getAttribute('data-id');

    if (recipe_id) {
        const deleteRecipe = await fetch(`/api/recipes/${recipe_id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (deleteRecipe.ok) {
            // If successful, reload page without project
            window.location.reload();
        } else {
            window.alert('Failed to delete recipe');
        };
    };
};

// handle editing a project (post)
const editButtonHandler = async (event) => {
    event.preventDefault();
    const id = event.target.getAttribute('data-id');
    const updatedName = window.prompt("What do you want the title to be?");
    const updatedBody = window.prompt("What do you want the body to be?");
    const mainIngredient = window.prompt("What do you want the main ingredient to be?");


    if (updatedBody && updatedName && mainIngredient) {
        const updateProject = await fetch(`/api/recipes/${id}`,
            {
                method: 'PUT',
                body: JSON.stringify({ updatedName, updatedBody, mainIngredient }),
                headers: { 'Content-Type': 'application/json' },
            });

        if (updateProject.ok) {
            // If successful, reload page with updated comment
            window.location.reload();
        } else {
            window.alert('Failed to update post');
        };
    };
};

// determine if the user clicked the edit or delete button (and then redirect them to the corresponding function)
const handleEditOrDelete = async (event) => {

    if (event.target.getAttribute("id") === "updatepostbutton") {
        editButtonHandler(event);
    };

    if (event.target.getAttribute("id") === "deletepostbutton") {
        delButtonHandler(event);
    };
};

document
    .querySelector('.new-recipe')
    .addEventListener('submit', newFormHandler);

document
    .querySelector('.project-list')
    .addEventListener('click', handleEditOrDelete);
