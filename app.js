const mealsContainer = document.getElementById('meal-container');

const searchMeal = async () => {
  const mealInput = document.getElementById('search-input');

  if (mealInput.value != '') {
    document.getElementById('meal-container').innerHTML = "";  // clear previous elements
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealInput.value}`);
    const data = await response.json();

    if (data.meals != null) {
      showMeals(data.meals);
      mealDetails();
    } else {
      errorMessage();
    }
  }
  mealInput.value = ''; // clear input value after search
}

// show meals if found
const showMeals = meals => {
  meals.forEach(meal => {
    const singleMeal = `
      <img src="${meal.strMealThumb}/preview" />
      <p>${meal.strMeal}</p>
    `;
    const div = document.createElement('div');
    div.className = "meal-box";
    div.innerHTML = singleMeal;
    mealsContainer.appendChild(div);
  });
}

// error function for no meals
const errorMessage = () => {
  const h4 = document.createElement('h4');
  h4.innerText = "Sorry, No Meals Found !";
  mealsContainer.appendChild(h4);
}

const mealDetails = () => {
  const allMeals = document.getElementsByClassName('meal-box');

  for (let i = 0; i < allMeals.length; i++) {
    const singleMeal = allMeals[i];
    singleMeal.addEventListener('click', async ()=> {
      const mealName = singleMeal.children[1].innerText;
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
      const data = await response.json();
      const meal = data.meals[0];

      document.getElementById('details-mealName').innerText = meal.strMeal;
      document.getElementById('details-thumbnail').src = meal.strMealThumb+"/preview";
      const ul = document.getElementById('details-ingredient');
      ul.innerHTML = "";

      for (let i = 1; i <= 20 ; i++) {
        const ingredient = meal['strIngredient' + i];
        const measure = meal['strMeasure' + i];

        if (ingredient !== '') {
          let items = document.createElement('p'); 
          items.innerHTML = `<i class="fas fa-check-square"></i> ${measure} ${ingredient}`
          ul.appendChild(items);
        }
      }

      document.getElementById('meal-details').style.display = 'block';
    })
  }
}


const closeDetails = ()=> {
  document.getElementById('meal-details').style.display = 'none';
}