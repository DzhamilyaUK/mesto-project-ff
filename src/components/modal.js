export const handleEscKeyUp = (e) => {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened'); // находим открытый попап
    closePopup(popup);
  }
};
  
// Открытие модального окна
export const openPopup = (popup) => {
  if (!popup) { // Проверка на null/undefined
    console.error('Ошибка: Передан несуществующий попап в openPopup');
    return;
  }
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
    // Находим кнопку закрытия внутри попапа
    const closeButton = popup.querySelector('.popup__close');
    
    // Проверяем существование элемента
    if (closeButton) {
      // Закрытие по клику на крестик
      closeButton.addEventListener('click', () => closePopup(popup));
    } else {
      console.error('Кнопка закрытия не найдена в попапе:', popup);
    }
  
    // Закрытие по клику на оверлей
    popup.addEventListener('mousedown', (event) => {
      if (event.target === popup) { // Более точная проверка
        closePopup(popup);
      }
    });
  };