
export function createCard (cardData, userId, handleDelete, handleLike, handleImageClick) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardLikeCount = cardElement.querySelector('.card__like-count');
    const cardImage = cardElement.querySelector('.card__image');

    
    cardElement.querySelector('.card__title').textContent = cardData.name;;

    // Устанавливаем данные карточки
    cardElement.setAttribute('data-card-id', cardData._id); // Добавляем уникальный ID
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardLikeCount.textContent = cardData.likes.length;

    // Проверка, является ли пользователь владельцем карточки
    if (cardData.owner._id !== userId) {
        deleteButton.style.display = 'none'; // Скрываем кнопку удаления
    }
    
    // Проверка, поставил ли пользователь лайк
    if (cardData.likes.some((like) => like._id === userId)) {
        likeButton.classList.add('card__like-button_is-active');
    };


    // Обработчик удаления карточки
    deleteButton.addEventListener('click', () => handleDelete(cardData._id));
    
    // Обработчик лайка карточки
    likeButton.addEventListener('click', () => {
        handleLike(cardData, likeButton, (updatedCard) => {
          cardLikeCount.textContent = updatedCard.likes.length;
          likeButton.classList.toggle('card__like-button_is-active');
        });
      });
    
     // Обработчик открытия изображения  
     cardImage.addEventListener('click', () => handleImageClick(cardData.link, cardData.name));
  
    return cardElement;
}




