const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages= 0;
let  photosArray = [];

// Unsplash API
const count = 10;
const apiKey = `InEMF8QwQu0m-FEtNElZiVU9nNjiiCqwkAoJkGdixIg`;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// check images load
function imageLoad() {
    
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready =',ready);
    }
}





// set attributes for elements
function setAttributes(element, attributes) {
    for (let key in attributes) {
        element.setAttribute(key,attributes[key]);
    }
}

// create elements for links and photos
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {
        // <a> link to unsplash
        var item = document.createElement('a');

        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');

        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        // create <img>
        var img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);


        // put <img> inside <a> then both in image-conatiner
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}



//  Get Photos
async function getPhotos () {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }
    catch (error) {

    }
}


// user scrolled bottom
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
    {
        ready = false;
        getPhotos();
    }
} );


// On load 1st time
getPhotos();


