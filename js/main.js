import galleryItems from './gallery-items.js'

const galleryRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const imageRef = document.querySelector('.lightbox__image');
const closeBtnRef = document.querySelector('button[data-action="close-lightbox"]');


function createImageList(arr) {

    arr.forEach(obj => {
        const { preview, original, description } = obj

        const galleryItem = document.createElement('li');
        galleryItem.classList.add('gallery__item');

        const galleryLink = document.createElement('a');
        galleryLink.classList.add('gallery__link');
        galleryLink.setAttribute('href', original);

        const galleryImage = document.createElement('img');
        galleryImage.classList.add('gallery__image');
        galleryImage.setAttribute('src', preview);
        galleryImage.setAttribute('data-source', original);
        galleryImage.setAttribute('alt', description);

        galleryLink.appendChild(galleryImage)
        galleryItem.appendChild(galleryLink)

        galleryRef.appendChild(galleryItem)
        }
    )
}


createImageList(galleryItems)


document.addEventListener('click', onImageClick);
document.addEventListener('click', onCloseBtnClick);
document.addEventListener('click', onOverlayClick);


function onImageClick(e) {
    const href = document.querySelector('.gallery__link');

    const imagePreview = e.target
        if (imagePreview.nodeName !== 'IMG') {
        return
    } else if (imagePreview.nodeName !== 'A') {
        e.preventDefault()
    }
    imageRef.setAttribute('src', imagePreview.dataset.source)
    modalRef.classList.add('is-open')


}

function onCloseBtnClick(e) {
    const closeButton = e.target
    
    if (closeButton.nodeName !== 'BUTTON' && closeButton.dataset !== "close-lightbox" ) {
        return
    }

    modalRef.classList.remove('is-open')
    
}


    function onOverlayClick(e) {
        const overlay = e.target

        if (overlay.className !== 'lightbox__overlay') {
            return
        }
        
        modalRef.classList.remove('is-open')

    }



