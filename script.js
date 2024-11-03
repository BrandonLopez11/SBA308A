const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const mealList = document.getElementById('meal');
const mealDetails = document.getElementById('meal-details');
const mealDetailsContent = document.getElementById('meal-details-content');
const closeBtn = document.getElementById('recipe-close-btn');


searchBtn.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    mealList.innerHTML = 'Loading...';
    if (query) {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
            const data = await response.json();
            mealList.innerHTML = '';

            if (data.meals) {
                data.meals.forEach(meal => {
                    const mealItem = document.createElement('div');
                    mealItem.classList.add('meal-item');

                    mealItem.innerHTML = `
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="recipe-btn" data-id="${meal.idMeal}">Get Recipe</a>
                        </div>
                    `;
                    mealList.appendChild(mealItem);
                });
            } else {
                mealList.innerHTML = '<p class="notFound">No meals found.</p>';
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            mealList.innerHTML = '<p>Error fetching meals. Please try again later.</p>';
        }
    }
});

mealList.addEventListener('click', async (e) => {
    if (e.target.classList.contains('recipe-btn')) {
        const mealID = e.target.getAttribute('data-id');
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
            const data = await response.json();
            const meal = data.meals[0];
            
            mealDetailsContent.innerHTML = `
                <h2 class="recipe-title">${meal.strMeal}</h2>
                <p class="recipe-category">${meal.strCategory}</p>
                <div class="recipe-instruct">
                    <h3>Instructions:</h3>
                    <p>${meal.strInstructions}</p>
                </div>
                <div class="recipe-meal-img">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                </div>
                <div class="recipe-link">
                    <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
                </div>
            `;
            mealDetails.classList.add('showRecipe');
        } catch (error) {
            console.error('Error fetching meal details:', error);
            mealDetailsContent.innerHTML = '<p>Error fetching meal details. Please try again later.</p>';
        }
    }
});


closeBtn.addEventListener('click', () => {
    mealDetails.classList.remove('showRecipe');
});

