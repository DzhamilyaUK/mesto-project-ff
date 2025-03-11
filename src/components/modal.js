function openPopup(modal) {
  document.addEventListener('keydown', handleEscClose);
  setTimeout(() => {
      modal.classList.add('popup_is-opened');
  }, 0);
}

function closePopup(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
  modal.addEventListener('transitionend', function handleTransitionEnd() {
       modal.removeEventListener('transitionend', handleTransitionEnd);
  });
}

function handleEscClose(evt) {
  if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      if (openedPopup) {
          closePopup(openedPopup);
      }
  }
}

function closeModalOnOverlayClick(modal) {
  modal.addEventListener('mousedown', (evt) => {
      if (evt.target === modal) {
          closePopup(modal);
      }
  });
}

function addCloseButtonHandler(modal) {
  const closeButton = modal.querySelector('.popup__close');
  closeButton.addEventListener('click', () => closePopup(modal));
}

export {openPopup, closePopup, closeModalOnOverlayClick, addCloseButtonHandler}