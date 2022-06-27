import { galleryItems } from './gallery-items.js';

const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = createGalleryCardsMarkup(galleryItems);
let galleryElModalSrc = '';
let instanceEl = {};

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);
galleryContainer.addEventListener('click', onGalleryElClick);

function createGalleryCardsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </div>
    `;
    })
    .join('');
}

function onGalleryElClick(event) {
  const isGalleryEl = event.target.classList.contains('gallery__image');
  const galleryEl = event.target;
  galleryElModalSrc = galleryEl.dataset.source;

  if (!isGalleryEl) {
    return;
  }

  event.preventDefault();

  modalOpen();
  return galleryElModalSrc;
}

function modalOpen() {
  const instance = basicLightbox.create(
    `
  <img src="${galleryElModalSrc}" width="1280" height="auto">
`,
    {
      onShow: () => {
        document.addEventListener('keydown', modalCloseByEsc);
      },
      onClose: () => {
        document.removeEventListener('keydown', modalCloseByEsc);
      },
    }
  );

  instance.show();
  return (instanceEl = instance);
}

function modalCloseByEsc(event) {
  event.preventDefault();
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;
  if (isEscKey) {
    instanceEl.close();
  }
}
