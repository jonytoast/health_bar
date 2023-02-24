// handle submitting new project (post)
const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#recipe-name').value.trim();
    const recipe_text = document.querySelector('#recipe-text').value.trim();
    const main_ingredient = document.querySelector('#main-ingridient').value.trim();

    if (title && recipe_text && main_ingredient) {
        const response = await fetch(`/api/recipes`, {
            method: 'POST',
            body: JSON.stringify({ title, recipe_text, main_ingridient }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create project');
        };
    };
};

document.querySelector('.new-recipe').addEventListener('submit', newFormHandler);
