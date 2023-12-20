let button = document.querySelector(".btn-generate")
var req_data;
let calorie;
var ids;
const api_url = "https://content.newtonschool.co/v1/pr/64995a40e889f331d43f70ae/categories  ";
const recipie_url = "https://content.newtonschool.co/v1/pr/64996337e889f331d43f70ba/recipes";
// function recepie(meal){
//     console.log("method called")
//     // var x = document.getElementsByClassName(div)
//     console.log(" recipie button clicked")
//     var x = document.querySelector(".table-1")
//     x.style.display=x.style.display == "block" ? "none" :"block";

// } 

button.addEventListener("click", e =>{
    e.preventDefault();
    let bmr;
    let height = document.getElementById("height").value
    let weight = document.getElementById("weight").value
    let age = document.getElementById("age").value
    let gender = document.getElementById("gender");
    let gen = gender.value;
    let activity = document.getElementById("activity");
    let act = activity.value;
    console.log(height, weight, age, gen, act)

    if(gen == "Women"){
        bmr = 665.1 + (9.563*weight)+(1.850*height)-(4.676*age);
        console.log("women",bmr)
    }
    if(gen == "Men"){
        bmr = 66.47 + (13.75*weight)+(5.003*height)-(6.755*age);
        console.log("male",bmr)
    }

    if(act == "Light"){
        calorie = bmr *1.375
        console.log("light",calorie)
    }
    if(act == "Moderate"){
        calorie = bmr *1.55
        console.log("moderate",calorie)
    }
    if(act == "Active"){
        calorie = bmr * 1.725
        console.log("activity",calorie)
    }

    
    getapi(api_url);

    var x = document.querySelector(".card-container1")
    x.style.display=x.style.display == "block" ? "none" :"block";
})


async function getapi(url) {
   
    // Storing response
    const response = await fetch(url);
   
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);

    data.forEach(element => {
        console.log(calorie)
        if(element.min<=calorie && element.max>=calorie){
            req_data = element
            console.log(req_data);
        }
       
    });
    var breakfast = req_data.breakfast
    document.getElementById('card1').src =breakfast.image
    document.getElementById('title1').innerHTML =breakfast.title
    // document.getElementById('cal1').innerHTML =breakfast.title
    

   var lunch = req_data.lunch
   document.getElementById('title2').innerHTML =lunch.title
   document.getElementById('card2').src =lunch.image
//    document.getElementById('cal2').innerHTML =lunch.title


   var dinner = req_data.dinner
   document.getElementById('title3').innerHTML =dinner.title
   document.getElementById('card3').src = dinner.image
//    document.getElementById('cal3').innerHTML =dinner.title


}

async function recepie(meal) {
   
    // Storing response
    const response = await fetch(recipie_url);
    // Storing data in form of JSON
    var recipes = await response.json();
    var req_Recipie;


    if(meal =='breakfast'){
        ids =req_data.breakfast.id
    }
    if(meal =='lunch'){
        ids =req_data.lunch.id
    }
    if(meal =='dinner'){
        ids =req_data.dinner.id
    }
    console.log(ids)
    recipes.forEach(element=>{
        if(element.id==ids){
            req_Recipie = element
        }
    })
    console.log(req_Recipie);
    // var img1 = req_Recipie.image
//    document.getElementById('card4').src =img1;
   document.getElementById('ingredients').innerHTML +=req_Recipie.ingredients;
   document.getElementById('steps').innerHTML +=req_Recipie.steps;
   document.getElementById('time').innerHTML +=req_Recipie.readyInMinutes;



    var x = document.querySelector(".table-1")
    x.style.display=x.style.display == "block" ? "none" :"block";

}
