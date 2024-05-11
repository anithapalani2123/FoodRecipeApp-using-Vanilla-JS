const close_button=document.querySelector('.close_button');
const cards=document.querySelector('.cards');
const search=document.getElementById('search');
const mealDetailsContent=document.querySelector('.meal-details-content');
close_button.addEventListener('click',()=>{
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});
cards.addEventListener('click',(e)=>{
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn'))
    {
        let mealItem=e.target.parentElement.parentElement;
        console.log(mealItem);
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(res=>res.json())
        .then(data=> mealrecipeModal(data.meals));
    }

})

function mealrecipeModal(meal)
{
    console.log(meal);
    meal=meal[0];
    let html=`
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <div class="recipe-instruct">
            <h3>Instruction:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class="recipe-meal-img">
            <img  src="${meal.strMealThumb}" alt="food">
        </div>
        <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank">Watch video</a>
        </div>
    `;
    mealDetailsContent.innerHTML=html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}
search.addEventListener('click',()=>{
    let SearchText=document.getElementById('SearchText').value.trim();
    console.log(SearchText);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${SearchText}`)
    .then(response=>response.json())
    .then((data)=>{
        // console.log(data);
        let html="";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                        <div class="card" data-id="${meal.idMeal}">
                            <img src="${meal.strMealThumb}" alt="food">
                            <div class="CardContent">
                                <h3>${meal.strMeal}</h3>
                                <button class="recipe-btn">Get Recipe</button>
                            </div>
                        </div>
                     `;

            });
        }
        else{
            html+=`<h2> Sorry, we didn't find any meal!</h2>`;
            cards.classList.add('noResult');
        }
        cards.innerHTML=html;
    });
})  