export async function fetchMeals(query) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching meals:', error);
        throw error;
    }
}

export async function fetchMealDetails(mealID) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching meal details:', error);
        throw error;
    }
}

export function saveFavorite(meal) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(meal);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}
