// events.js
import { fetchMeals, fetchMealDetails, saveFavorite } from './api.js';
import { renderMealList, renderMealDetails, showRecipeModal, closeRecipeModal } from './dom.js';

export function initializeEventListeners() {
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
                const data = await fetchMeals(query);
                if (data.meals) {
                    renderMealList(mealList, data.meals);
                } else {
                    mealList.innerHTML = '<p class="notFound">No meals found.</p>';
                }
            } catch (error) {
                mealList.innerHTML = '<p>Error fetching meals. Please try again later.</p>';
            }
        }
    });

    mealList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('recipe-btn')) {
            const mealID = e.target.getAttribute('data-id');
            try {
                const data = await fetchMealDetails(mealID);
                const meal = data.meals[0];
                renderMealDetails(mealDetailsContent, meal);
                showRecipeModal(mealDetails);
            } catch (error) {
                mealDetailsContent.innerHTML = '<p>Error fetching meal details. Please try again later.</p>';
            }
        } else if (e.target.classList.contains('favorite-btn')) {
            const mealID = e.target.getAttribute('data-id');
            try {
                const data = await fetchMealDetails(mealID);
                saveFavorite(data.meals[0]);
                alert('Meal saved to favorites!');
            } catch (error) {
                console.error('Error saving favorite:', error);
            }
        }
    });

    closeBtn.addEventListener('click', () => {
        closeRecipeModal(mealDetails);
    });
}
