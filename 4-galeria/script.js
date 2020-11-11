const apiKey = '19068635-17181881dff5ac883686878fb';
const input = document.querySelector('.search-input');
const btn = document.querySelector('.search-btn');
const galleryList = document.querySelector('.gallery-list');
const galleryBottom = document.querySelector('.gallery-bottom');
let picturesNumber = 0;
const picturesOnOneSide = 20;
const picturesArray = [];

const getImages = (e) => {
    e.preventDefault();
    fetch(`https://pixabay.com/api/?key=${apiKey}&q=${input.value}&image_type=photo`)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Http error: ${response.status}`);
        }
    })
    .then(response => {
        picturesNumber = response.totalHits;
        console.log(response);
        
        createGallery(response);      
    })
    .catch(error => {
        console.error(error)
    });
}

const createGallery = (pictures) => {
    galleryList.innerHTML = "";    
    pictures.hits.forEach(picture => {
        const a = document.createElement('a');
        a.setAttribute('href', picture.largeImageURL);
        a.classList.add('gallery-element');
        a.classList.add('is-loading');
        galleryList.appendChild(a);
        const img = new Image;
        img.src = picture.webformatURL;
        img.alt = picture.tags;
        img.classList.add('gallery-image')
        a.appendChild(img); 
        picturesArray.push(a);
    });
    addNavigation();
}

const addNavigation = () => {
    galleryBottom.innerHTML = "";
    const prevBtn = document.createElement('button');
    prevBtn.classList.add('gallery-bottom-btn');
    prevBtn.id = "prev";
    prevBtn.innerHTML = "Poprzednie";
    galleryBottom.appendChild(prevBtn);
    const nextBtn = document.createElement('button');
    nextBtn.classList.add('gallery-bottom-btn');
    nextBtn.id = "next";
    nextBtn.innerHTML = "Następne";
    galleryBottom.appendChild(nextBtn);

    checkNavigation(prevBtn, nextBtn);
}

const checkNavigation = (prevBtn, nextBtn) => {
    const sidesNumbers = Math.ceil(picturesNumber / picturesOnOneSide);


}

btn.addEventListener('click', getImages);



