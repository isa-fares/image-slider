
const slides = document.querySelectorAll('.slider img'); // select all images
const prevBtn = document.querySelector(".prev-btn"); // select previous button
const nextBtn = document.querySelector(".next-btn"); // select next button
let galleryContainer = document.querySelector(".gallery-container"); //select gallery container
galleryContainer.style.gridTemplateColumns = `repeat(${slides.length}, 1fr)`; // set grid template columns
let currentSlide = 0; // set current slide to 0

startrundomImage(); // start rundom image function triggered
updateSliderCounter(); // update slider counter function triggered


// function to start rundom image
function startrundomImage(){
  interval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * slides.length); 
    goToSlide(randomIndex);
  }, 4000);
  }


// function to go to slide
function goToSlide(n) {
  slides[currentSlide].classList.remove('active'); // remove active class from current slide
  currentSlide = (n + slides.length) % slides.length; // set current slide to n
  slides[currentSlide].classList.add('active'); // add active class to current slide
  updateSliderCounter(); // update slider counter function triggered
  updateThumbnailActiveStatus(currentSlide); // update thumbnail active status function triggered
}

// add event listener to previous button
prevBtn.addEventListener("click", () => {
  goToSlide(currentSlide - 1); 
  clearInterval(interval); // clear interval
  startrundomImage(); // start rundom image function triggered  after clear interval
});

// add event listener to next button
nextBtn.addEventListener("click", () => {
  goToSlide(currentSlide + 1);
  clearInterval(interval); // clear interval
  startrundomImage(); // start rundom image function triggered  after clear interval
});

// function to update slider counter
function  updateSliderCounter(){
  prevBtn.disabled = currentSlide === 0;  
  nextBtn.disabled = currentSlide === slides.length - 1;  
}

// function to update thumbnail active status
slides.forEach((img ,index) =>{  

  const thumbnail = img.cloneNode(); // clone image
  thumbnail.addEventListener("click", () => {
    goToSlide(index); // go to slide
    thumbnail.classList.add("active"); // add active class to thumbnail
  });
  galleryContainer.appendChild(thumbnail); // append thumbnail to gallery container
});

// function to update thumbnail active status
function  updateThumbnailActiveStatus(index){
  galleryContainer.querySelectorAll("img").forEach((img , i ) => {
    img.classList.toggle("active" , i === index) 
  });
  }

