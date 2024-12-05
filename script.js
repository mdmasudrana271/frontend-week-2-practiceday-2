const container = document.getElementById("meal-container");
const p = document.getElementById("no-data");
const cardContainer = document.getElementById("cards-container");

const handleSearch = (event) => {
  event.preventDefault();
  //   let meals = [];
  const searchInput = document.getElementById("search");
  const searchValue = searchInput.value;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data.meals);
      //   meals = data.meals;
      showdata(data.meals);
    })
    .catch((error) => {
      console.error(error);
    });
  searchInput.value = "";
};

const showdata = (data) => {
  if (data == null) {
    console.log("No data found");
    p.innerText = "No Meals Found !";
    container.innerHTML = "";
    cardContainer.innerHTML = "";
  } else {
    console.log(data);
    p.innerText = "";
    container.innerHTML = "";
    data.forEach((element) => {
      const div = document.createElement("div");
      //   div.classList.add("meal");
      div.classList.add("meal");
      div.classList.add("col-md-6");
      div.classList.add("col-lg-3");
      div.classList.add("my-3");
      div.innerHTML = `
      <div class="card" >
          <img src=${element.strMealThumb} class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${element.strMeal}</h5>
            <p class="card-text">${element.strInstructions.slice(0, 50)}</p>
            <p class="card-text">Area: ${element.strArea}</p>
            <a href="#" class="btn btn-primary dettailss" data-id="${
              element.idMeal
            }" id="details-btn">Details</a>
          </div>
        </div>
          `;
      container.appendChild(div);
      cardContainer.innerHTML = "";
    });

    const btn = container.querySelectorAll(".dettailss");
    btn.forEach((button) => {
      button.addEventListener("click", (e) => {
        const mealId = e.target.getAttribute("data-id");
        handleDetails(mealId);
        container.innerHTML = "";
      });
    });
  }
};

const handleDetails = (id) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
      showDetails(data.meals);
    });
};

const showDetails = (data) => {
  console.log(data[0]);
  const meal = data[0];

  cardContainer.innerHTML = " ";
  cardContainer.innerHTML = `
     <div class="card mb-3 ">
      <div class="row g-0">
        <div class="col-md-4">
          <img src=${
            meal.strMealThumb
          } class="img-fluid rounded-start" alt="..." />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title fw-bolder">${meal.strMeal}</h5>
            <p class="card-text"><span class="fw-bolder">Instructions: </span> ${meal.strInstructions?.slice(
              0,
              750
            )}</p>
            <p class="card-text"><span class="fw-bolder">Ingredients: </span>${
              meal.strIngredient1
            },${meal.strIngredient2},${meal.strIngredient3},${
    meal.strIngredient4
  },${meal.strIngredient5},${meal.strIngredient6},${meal.strIngredient7},${
    meal.strIngredient8
  },${meal.strIngredient9},${meal.strIngredient10}</p>
          <p class="card-text"><span class="fw-bolder">Category: </span>${
            meal.strCategory
          }</p>
          <p class="card-text"><span class="fw-bolder">Region: </span>${
            meal.strArea
          }</p>
          </div>
        </div>
      </div>
    </div>
  `;
};
