const a_logo = document.querySelector(".a-logo");
const img_logo = document.querySelector(".logo-container img");
var photos = document.querySelector(".photos");

a_logo.addEventListener("mouseenter",()=>{
    a_logo.style.backgroundColor = "black;";
    console.log("mouse enter")
});

// fetch('image').then((image)=>{
//     image.text().then((the_text)=>{
//         // photos.src = the_text;
//     })
// })