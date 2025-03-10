
import { likeCards, unlikeCards, deleteCards } from './api';

// Обработчик лайков
export function handleLikeClick(cardId, likeButton, likeCount) {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    unlikeCards(cardId)
      .then((updatedCard) => {
        likeButton.classList.remove('card__like-button_is-active');
        likeCount.textContent = updatedCard.likes.length;
      })
      .catch((err) => console.error(`Ошибка при удалении лайка: ${err}`));
  } else {
    likeCards(cardId)
      .then((updatedCard) => {
        likeButton.classList.add('card__like-button_is-active');
        likeCount.textContent = updatedCard.likes.length;
      })
      .catch((err) => console.error(`Ошибка при добавлении лайка: ${err}`));
  }
}

// Обработчик удаления карточки
export function handleDeleteClick(cardId, cardElement) {
  deleteCards(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => console.error(`Ошибка при удалении карточки: ${err}`));
}

// Функция создания карточки 
export function createCard(cardData, userId, { handleDeleteClick, handleLikeClick, handleImageClick }) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeCount = cardElement.querySelector('.card__like-count');

  // Заполняем данные карточки 
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCount.textContent = cardData.likes.length; // Отображаем количество лайков

  // Лайк карточки 
  likeButton.addEventListener('click', () => {
    handleLikeClick(cardData._id, likeButton, likeCount);
  });

  //Проверяем, лайкнул ли пользователь карточку
  if (cardData.likes.some((user) => user._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  // Удаление карточки 
  if (cardData.owner._id === userId) {
    deleteButton.addEventListener("click", () => {
      handleDeleteClick(cardData._id, cardElement);
    });
  } else {
    deleteButton.remove();
  }

  // Открытие попапа с картинкой 
  cardImage.addEventListener('click', () => {
    handleImageClick(cardData); // Вызываем переданную функцию для обработки клика по изображению 
  });

  return cardElement;
}