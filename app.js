const searchMeal = async () => {
  const mealInput = document.getElementById('search-input');

  if (mealInput.value != '') {
    document.getElementById('meal-container').innerHTML = "";  // clear previous result
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealInput.value}`);
    const data = await response.json();
    if (data.meals != null) {
      showMeals(data.meals);
    } else {
      errorMessage("Sorry, No Meals Found !");
    }

  } else {
    document.getElementById('meal-container').innerHTML = "";  // clear previous result
    errorMessage("You Should Write Something To Search !")
  }
  mealInput.value = ''; // clear input value after search
}

// show meals if found
const showMeals = meals => {
  const mealsContainer = document.getElementById('meal-container');
  meals.forEach(meal => {
    const singleMeal = `
      <img src="${meal.strMealThumb}/preview" />
      <p>${meal.strMeal}</p>
    `;
    const div = document.createElement('div');
    div.setAttribute("onclick", `mealDetails('${meal.strMeal}')`);
    div.innerHTML = singleMeal;
    mealsContainer.appendChild(div);
  });
}

// error function for no meals
const errorMessage = (error) => {
  const mealsContainer = document.getElementById('meal-container');
  const errorText = `<h4>${error}</h4>`;
  mealsContainer.innerHTML = errorText;
}

// display meal details with pop up
const mealDetails = async (mealName) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
  const data = await response.json();
  const meal = await data.meals[0];

  document.getElementById('details-mealName').innerText = meal.strMeal;
  document.getElementById('details-thumbnail').src = meal.strMealThumb + "/preview";
  const ingredienList = document.getElementById('details-ingredient');
  ingredienList.innerHTML = "";

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal['strIngredient' + i];
    const measure = meal['strMeasure' + i];

    if (ingredient !== '') {
      let items = document.createElement('p');
      items.innerHTML = `<i class="fas fa-check-square"></i> ${measure} - ${ingredient}`;
      ingredienList.appendChild(items);
    }
  }

  document.getElementById('meal-details').style.display = 'block'; // show pop up with meal details
}

// close pop up after click on it
const closeDetails = () => {
  document.getElementById('meal-details').style.display = 'none';
}