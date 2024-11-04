export function renderMealList(mealList, meals) {
    mealList.innerHTML = '';
    meals.forEach(meal => {
        const mealItem = document.createElement('div');
        mealItem.classList.add('meal-item');
        mealItem.innerHTML = `
            <div class="meal-img">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            </div>
            <div class="meal-name">
                <h3>${meal.strMeal}</h3>
                <a href="#" class="recipe-btn" data-id="${meal.idMeal}">Get Recipe</a>
                <button class="favorite-btn" data-id="${meal.idMeal}">❤️ Save Favorite</button>
            </div>
        `;
        mealList.appendChild(mealItem);
    });
}

export function renderMealDetails(mealDetailsContent, meal) {
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
}

export function showRecipeModal(mealDetails) {
    mealDetails.classList.add('showRecipe');
}

export function closeRecipeModal(mealDetails) {
    mealDetails.classList.remove('showRecipe');
}
