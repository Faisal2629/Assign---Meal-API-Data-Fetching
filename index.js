document.addEventListener('DOMContentLoaded', () => {
    const categoryButton = document.getElementById('get-category-data');
    const ingredientButton = document.getElementById('get-ingredient-data');
    const resultsDiv = document.getElementById('results');

    categoryButton.addEventListener('click', async () => {
        try {
            const data = await getCategoriesData();
            console.log(data);
            displayResults(data);
        } catch (error) {
            console.error(error);
            resultsDiv.textContent = 'Something went wrong';
        }
    });

    ingredientButton.addEventListener('click', async () => {
        try {
            const data = await getIngredientData();
            console.log(data);
            displayResults(data);
        } catch (error) {
            console.error(error);
            resultsDiv.textContent = 'Something went wrong';
        }
    });

    async function getCategoriesData() {
        const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood';
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetching category data failed:', error);
            throw error;
        }
    }

    async function getIngredientData() {
        const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast';
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetching ingredient data failed:', error);
            throw error;
        }
    }

    function displayResults(data) {
        resultsDiv.innerHTML = '';
        if (data && data.meals) {
            const mealList = document.createElement('ul');
            data.meals.forEach(meal => {
                const listItem = document.createElement('li');
                listItem.textContent = meal.strMeal;
                mealList.appendChild(listItem);
            });
            resultsDiv.appendChild(mealList);
        } else {
            resultsDiv.textContent = 'No data available';
        }
    }
});
