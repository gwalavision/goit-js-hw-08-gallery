import galleryItems from './gallery-items.js'



const galleryRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.js-lightbox');
const closeBtnRef = document.querySelector('button[data-action="close-lightbox"]');
const imageInModal = document.querySelector('.lightbox__image');

document.addEventListener('click', onImageClick);
closeBtnRef.addEventListener('click', closingClick);
modalRef.firstElementChild.addEventListener('click', closingClick);
document.addEventListener('keydown', onEscClick);
document.addEventListener('keydown', onArrowTap);


createImageList(galleryItems)


function createImageList(arr) {

    arr.forEach((obj, index) => {
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
        galleryImage.setAttribute('data-index', index);

        galleryLink.appendChild(galleryImage)
        galleryItem.appendChild(galleryLink)

        galleryRef.appendChild(galleryItem)
        }
    )
}

function onArrowTap(e) {
    let imageIndex = Number(imageInModal.dataset.index)

    if (e.code === "ArrowRight") {
        if (imageIndex + 1 > galleryItems.length - 1) {
            return
        }
        imageIndex +=1
        imageInModal.src = galleryItems[imageIndex].original;
        imageInModal.alt = galleryItems[imageIndex].description;
        imageInModal.dataset.index = imageIndex
    } else if (e.code === "ArrowLeft") {
        if (imageIndex - 1 < 0) {
            return
        }
        imageIndex -=1
        imageInModal.src = galleryItems[imageIndex].original;
        imageInModal.alt = galleryItems[imageIndex].description;
        imageInModal.dataset.index = imageIndex
    }
}

function onImageClick(e) {
    imageInModal.setAttribute('src', '')

    const href = document.querySelector('.gallery__link');

       const imagePreview = e.target
    if (imagePreview.className !== 'gallery__image') {
        return
    } else if (imagePreview.nodeName !== 'A') {
        e.preventDefault()
    }

    imageInModal.setAttribute('src', imagePreview.dataset.source)
    imageInModal.setAttribute('alt', imagePreview.alt)
    imageInModal.setAttribute('data-index', imagePreview.dataset.index)


    modalRef.classList.add('is-open')

}

function closingClick(e) {
    modalRef.classList.remove('is-open')
}

function onEscClick(e) {
    if (!modalRef.classList.contains('is-open')) {
        return
    } else if (e.code === 'Escape') {
        modalRef.classList.remove('is-open')  
    } 
    return
    }


