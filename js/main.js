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

   const template = arr.map(
  ({ preview, description, original },index) =>
    `<li class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" data-index="${index}"/></a></li>`,
);

galleryRef.insertAdjacentHTML('afterbegin', template.join(''));

}

function onArrowTap(e) {
    let imageIndex = Number(imageInModal.dataset.index)

    if (e.code === "ArrowRight") {
        if (imageIndex + 1 > galleryItems.length - 1) {
            return
        }
        imageInModal.setAttribute('src', '')
        imageInModal.setAttribute('alt', '')
        
        imageIndex +=1
        imageInModal.src = galleryItems[imageIndex].original;
        imageInModal.alt = galleryItems[imageIndex].description;
        imageInModal.dataset.index = imageIndex
    } else if (e.code === "ArrowLeft") {
        if (imageIndex - 1 < 0) {
            return
        }
        imageInModal.setAttribute('src', '')
        imageInModal.setAttribute('alt', '')

        imageIndex -=1
        imageInModal.src = galleryItems[imageIndex].original;
        imageInModal.alt = galleryItems[imageIndex].description;
        imageInModal.dataset.index = imageIndex
    }
}

function onImageClick(e) {
    const href = document.querySelector('.gallery__link');

       const imagePreview = e.target
    if (imagePreview.className !== 'gallery__image') {
        return
    } 
    e.preventDefault()

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


