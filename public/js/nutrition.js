// selects the text input of user's food query
const query = document.getElementById('foodQuery');

// async function that handles user food nutrition queries and display related recipes if user is logged in
async function handleFoodQuery() {

    const foodName = query.value.trim();

    const response = await fetch(`/api/nutrition/${foodName}`,{
        method: 'GET',
        headers: { 'Content-Type':'application/json' }
    });

    if (response.ok) {
        window.location.replace('/nutrition');
    }

};