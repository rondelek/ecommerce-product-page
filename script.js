const plusEl = document.getElementById('plus');
const minusEl = document.getElementById('minus');
let numberEl = document.getElementById('number');
const cartEl = document.getElementById('cart');
let cartContentEl = document.getElementById('cart-content');
const addBtn = document.getElementById('button-add');
let itemsEl = document.getElementById('items');
const titleEl = document.getElementById('title');
const cartTitleEl = document.getElementById('cart-title');
let priceEl = document.getElementById('price');
let cartPriceEl = document.getElementById('cart-price');
let cartTotalEl = document.getElementById('total');
const deleteEl = document.getElementById('delete');
let emptyEl = document.getElementById('empty');
let fullEl = document.getElementById('full');
let photosDiv = document.getElementsByClassName('photos');

// plus minus

plusEl.addEventListener('click', () => {
    numberEl.innerHTML++;
    if (numberEl.innerHTML === '1') {
        minusEl.classList.add('orange');
        minusEl.classList.remove('gray');
    }
})

minusEl.addEventListener('click', () => {
    if (numberEl.textContent > 0) {
        numberEl.innerHTML--;

        if (numberEl.innerHTML === '0') {
            minusEl.classList.remove('orange');
            minusEl.classList.add('gray');
        }
    } 
})

// add to cart 

cartEl.addEventListener('click', () => cartContentEl.classList.toggle('hidden'));


addBtn.addEventListener('click', addToCart);

function addToCart() {
    if (numberEl.textContent > 0) {
        itemsEl.textContent = Number(itemsEl.textContent) + Number(numberEl.textContent);
        itemsEl.classList.remove('hidden');

        fullCart();

    }
}

// delete 

deleteEl.addEventListener('click', emptyCart);

function fullCart() {
    fullEl.classList.remove('hidden');
    emptyEl.classList.add('hidden');

    cartTitleEl.textContent = titleEl.textContent;
    cartPriceEl.textContent = '$' + priceEl.textContent + ' x ' + itemsEl.textContent;
    cartTotalEl.textContent = '$' + priceEl.textContent * itemsEl.textContent;
}

function emptyCart() {
    fullEl.classList.add('hidden');
    emptyEl.classList.remove('hidden');
    
    itemsEl.textContent = 0;
    itemsEl.classList.add('hidden');
}

// ######### photos ############

const photosSmallArr = document.getElementsByClassName('photo');
let bigPhotoSrc = document.getElementById('big-photo');


for (let item of photosSmallArr) {
    item.addEventListener('click', (e) => {
        bigPhotoSrc.src = e.target.src;
        let current = document.getElementsByClassName('active');
        if (current.length > 0) {
            current[0].classList.remove('active');
        }
        e.target.classList.add('active');
    })
}

// ######### lightbox ############

let mainEl = document.getElementById('main');
let overlayEl = document.getElementById('overlay');
const photosSmallArrLightbox = document.getElementsByClassName('photo-lightbox');
let bigPhotoSrcLightbox = document.getElementById('big-photo-lightbox');

const displayLightbox = () => {
    bigPhotoSrc.addEventListener('click', (e) => {
        overlayEl.classList.replace('hidden', 'show');
        bigPhotoSrcLightbox.src = e.target.src;
    });
}

displayLightbox();



for (let item of photosSmallArrLightbox) {
    item.addEventListener('click', (e) => {
        bigPhotoSrcLightbox.src = e.target.src;
        let current = document.getElementsByClassName('active');
        if (current.length > 0) {
            current[0].classList.remove('active');
        }
        e.target.classList.add('active');
    })
}

const closeEl = document.getElementById('x');

const closeLightbox = () => {
    closeEl.addEventListener('click', () => {
        overlayEl.classList.replace('show', 'hidden');
    })
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            overlayEl.classList.replace('show', 'hidden');
        }
    })
    overlayEl.addEventListener('click', e => {
        if (e.target.classList.contains('overlay')) {
            overlayEl.classList.replace('show', 'hidden');
        }
    })
}
closeLightbox();

// ######### arrows ############
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');

srcArr = []

for (let photo of photosSmallArr) {
    srcArr.push(photo.src)
}

let lastElement = srcArr.length - 1;

const clickPrevious = () => {
    let currentBig = bigPhotoSrcLightbox.src;
    let currentIndex = srcArr.indexOf(currentBig);
    photosSmallArrLightbox[currentIndex].classList.remove('active');
    if (currentIndex != 0) {
        bigPhotoSrcLightbox.src = srcArr[currentIndex - 1];
        photosSmallArrLightbox[currentIndex - 1].classList.add('active');
    } else {
        bigPhotoSrcLightbox.src = srcArr[lastElement];
        photosSmallArrLightbox[lastElement].classList.add('active');
    }  
}

const clickNext = () => {
    let currentBig = bigPhotoSrcLightbox.src;
    let currentIndex = srcArr.indexOf(currentBig);
    photosSmallArrLightbox[currentIndex].classList.remove('active');
    if (currentIndex != lastElement) {
        bigPhotoSrcLightbox.src = srcArr[currentIndex + 1];
        photosSmallArrLightbox[currentIndex + 1].classList.add('active');
    } else {
        bigPhotoSrcLightbox.src = srcArr[0];
        photosSmallArrLightbox[0].classList.add('active');
    } 
}



const navigate = () => {
    leftArrow.addEventListener('click', clickPrevious);
    rightArrow.addEventListener('click', clickNext);
    document.addEventListener('keydown', e => {
        if (e.key === "ArrowLeft") {
            clickPrevious();
        } else if (e.key === "ArrowRight") {
            clickNext();
        }
    })
    
}

navigate();


// ######### hamburger ############

const hamburgerMenu = document.getElementById('hamburger-menu');
const overlayHamburger = document.getElementById('overlay-hamburger');
const hamburgerClose = document.getElementById('hamburger-close');


const showHamburger = () => {
    hamburgerMenu.addEventListener('click', () => {
        overlayHamburger.classList.remove('hidden');
    })
}

const closeHamburger = () => {
    hamburgerClose.addEventListener('click', () => {
        overlayHamburger.classList.add('hidden');
    })
}

showHamburger();
closeHamburger();
