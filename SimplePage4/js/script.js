const burger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");
const sectionList = document.querySelectorAll("nav li");

burger.addEventListener('click', () =>{
    nav.classList.contains("show") ? nav.classList.remove("show") : nav.classList.add("show");
});

const sectionBlocks = [
    "header",
    ".aboutus",
    ".services",  
    ".projects", 
    ".team",
    ".clients",
    ".price",  
    ".facts", 
    ".contact"
];

sectionList.forEach((element, index) => {
    element.addEventListener('click', function(e) {
        let x = document.querySelector(sectionBlocks[index])
        x.scrollIntoView();
        nav.classList.remove("show");
        e.preventDefault();
        
    });
});

