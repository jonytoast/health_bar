// selects the text input of user's food query
const query = document.getElementById('food-query');
const search = document.getElementById('search');

// async function that handles user food nutrition queries and display related recipes if user is logged in
async function handleFoodQuery() {

    const foodName = query.value.trim().toLowerCase();

    const response = await fetch(`/api/nutrition/${foodName}`,{
        method: 'GET',
        headers: { 'Content-Type':'application/json' }
    });

    if (response.ok) {
        window.location.replace(`/api/nutrition/${foodName}`);
    };

    if (response.status === 404) {
        window.location.replace(`/api/nutrition/${foodName}`);
    }

};


search.addEventListener("click",handleFoodQuery);