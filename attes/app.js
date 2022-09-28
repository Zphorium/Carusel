var carousel = document.querySelector(".carousel");


var nextButton = document.querySelector(".right-btn");


var previousButton = document.querySelector(".left-btn");


var nav = document.querySelector(".nav");


var dots = [...nav.children];

var slides = [...carousel.children];


var slideWidth = slides[0].getBoundingClientRect().width;


function positionSlides(slides){
    for(let index = 0; index < slides.length; index++){
        slides[index].style.left = slideWidth * index + "px";
    }
}

positionSlides(slides);

nextButton.addEventListener("click", function(){
    const currentSlide = carousel.querySelector(".active");
    const nextSlide = currentSlide.nextElementSibling;
    
    moveToSlide(carousel, currentSlide, nextSlide);
    hideButton(nextSlide, slides);
    moveToDot(nextSlide, slides, nav, dots);
});


previousButton.addEventListener("click", function(){
    const currentSlide = carousel.querySelector(".active");
    const previousSlide = currentSlide.previousElementSibling;
    
    moveToSlide(carousel, currentSlide, previousSlide);
    hideButton(previousSlide, slides);
    moveToDot(previousSlide, slides, nav, dots);
});


nav.addEventListener("click", function(e){

    if(e.target === nav) return;

    
    var targetDot = e.target;

   
    var currentDot = nav.querySelector(".active");

    
    var currentSlide = carousel.querySelector(".active");

    
    var targetDotIndex = findIndex(targetDot, dots);
    
    
    var targetSlide = slides[targetDotIndex];

    moveToSlide(carousel, currentSlide, targetSlide);
    toggleActive(currentDot, targetDot);
    hideButton(targetSlide, slides);
})


function moveToDot(targetSlide, slides, nav, dots){
    let slideIndex = findIndex(targetSlide, slides);
    const currentDot = nav.querySelector(".active");
    const targetDot = dots[slideIndex];
    toggleActive(currentDot, targetDot);
}

function moveToSlide(carousel, currentSlide, targetSlide){
    const position = targetSlide.style.left;
    carousel.style.transform = `translateX(-${position})`;
    toggleActive(currentSlide, targetSlide);
}

function toggleActive(current, target){
    current.classList.remove("active");
    target.classList.add("active");
}


function hideButton(targetSlide, slides){
    
    if(targetSlide === slides[0]){
        previousButton.classList.add("hide");
        nextButton.classList.remove("hide");
    }else if(targetSlide === slides[slides.length - 1]){
       
        nextButton.classList.add("hide");
        previousButton.classList.remove("hide");
    }else{
        
        previousButton.classList.remove("hide");
        nextButton.classList.remove("hide");
    }
}


function findIndex(item, items){
    for(let index = 0; index < items.length; index++){
        if(item === items[index]){
            return index;
        }
    }
}

