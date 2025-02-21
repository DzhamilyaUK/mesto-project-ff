export const handleEscKeyUp = (e) => {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened'); // находим открытый попап
    closePopup(popup);
  }
};
  
// Открытие модального окна
export const openPopup = (popup) => {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keyup', handleEscKeyUp);   
};


// Закрытие модального окна
export const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', handleEscKeyUp);
};

  //добавляем слушатель события
export const addPopupCloseByClickListeners = (popup) => {
   const closer= popup.querySelector('.popup__close');
    closer.addEventListener('click', () => {
      closePopup(popup);
    });
     //закрытие попапа кликом по оверлею
    popup.addEventListener('mousedown', (event) => {
        if (event.target.classList.contains('popup')) {
        closePopup(popup);
      }
    });
  }