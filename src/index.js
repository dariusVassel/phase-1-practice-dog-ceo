console.log('%c HI', 'color: firebrick')

//------------------------------------ENSURE DOM CONTENT LOADED ------------------------------------//
document.addEventListener('DOMContentLoaded', function() {
    fetchDogImages();
    fetchDogBreeds();
    selectLetter();
  });

//------------------------------------URLS FOR REFERENCE------------------------------------//
const imgUrl = "https://dog.ceo/api/breeds/image/random/4" 
const breedUrl = 'https://dog.ceo/api/breeds/list/all' 

//------------------------------------CHALLENGE 1------------------------------------//
function fetchDogImages(){
    fetch('https://dog.ceo/api/breeds/image/random/4')
        .then(resp => resp.json())
        .then(json => renderImages(json.message))
}

function renderImages(imagesArray){
    //console.log(imagesArray)
    imagesArray.forEach(imageURL => renderOneImage(imageURL))
}

function renderOneImage(image){
    let imageDisplay = document.createElement('li');
    imageDisplay.className = 'card';
    imageDisplay.innerHTML = `
        <img src= "${image}">
    `
    //console.log(imageDisplay);
    document.querySelector('#dog-image-container').appendChild(imageDisplay)
}

//------------------------------------CHALLENGE 2------------------------------------//
let breedsList = [];

function fetchDogBreeds(){
    fetch('https://dog.ceo/api/breeds/list/all')
        .then(resp => resp.json())
        .then(json => {
            breedsList = Object.keys(json.message);
            listingBreeds(breedsList)
        })           
}

function listingBreeds(elements){
    let ul = document.querySelector('#dog-breeds');
    searchList(ul);

    elements.forEach(element => addElement(element))
}

function addElement(element){
    let ul = document.querySelector('#dog-breeds')
    let li = document.createElement('li')
    li.innerText = element
    ul.appendChild(li)
    li.addEventListener('click', changeColor)
}


// function listingBreeds(elements){
//     for (const element in elements){
//         let entry = element;
//         let ul = document.querySelector('#dog-breeds')
//         let li = document.createElement('li')

//         //li.setAttribute('id', entry);
//         li.classList.add('colorSelector')
//         li.appendChild(document.createTextNode(entry));
//         ul.appendChild(li);
//         //console.log(entry);
//     }   
// }

//------------------------------------CHALLENGE 3------------------------------------//
function changeColor(e){
    e.target.style.color = "blue"
}


//------------------------------------CHALLENGE 4------------------------------------//

function selectLetter(){
    let selectedLetter = document.querySelector('#breed-dropdown');
    selectedLetter.addEventListener('change', matchBreed);
}



function matchBreed(letter) {
    console.log(letter.target.value);
    listingBreeds(breedsList.filter(breed => breed.startsWith(letter.target.value)));
  }

//search and delete entire UL child in order to add a new UL and up  
function searchList(element) {
    let searchElement = element.lastElementChild;
    while (searchElement) {
      element.removeChild(searchElement);
      searchElement = element.lastElementChild;
    }
}