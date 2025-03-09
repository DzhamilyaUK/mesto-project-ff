import './pages/index.css';
//import { initialCards } from './scripts/cards';
import { createCard } from './components/card';
import { handleEscKeyUp, openPopup, closePopup, addPopupCloseByClickListeners } from './components/modal';
import { enableValidation, clearValidation } from "./validation.js";
import {
  getUserInfo,
  getCards,
  addCard,
  updateUserInfo,
  updateUserAvatar,
  deleteCardFromServer,
  likeCard,
  unlikeCard,
} from "./components/api.js";

// Настройки валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__input-error_visible",
};

//ВАЛИДАЦИЯ 
document.addEventListener("DOMContentLoaded", () => {
  enableValidation(validationConfig);

const placesList = document.querySelector('.places__list');

const editProfileButton = document.querySelector('.profile__edit-button'); // Кнопка "Редактировать"
const addCardButton = document.querySelector('.profile__add-button'); // Кнопка "+"

const avatarForm = document.querySelector(".popup_type_avatar .popup__form");
const avatarInput = avatarForm.querySelector(".popup__input_type_avatar");
const profileAvatarContainer = document.querySelector(".profile__avatar-container");
const updateAvatarPopup = document.querySelector(".popup_type_avatar");

const popupEditProfile = document.querySelector('.popup_type_edit');
if (!popupEditProfile) {
  console.error('Попап редактирования профиля не найден! Проверьте селектор.');
};
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

// Выносим поиск элементов формы редактирования профиля
const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const descriptionInput = popupEditProfile.querySelector('.popup__input_type_description');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector(".profile__image");
if (!profileTitle || !profileDescription || !profileImage || !placesList) {
  console.error('Один из критических элементов не найден!');
}

const confirmPopup = document.querySelector(".popup_type_confirm");
const confirmForm = confirmPopup.querySelector(".popup__form");

let userData;

// Получение информации о пользователе и карточек с сервера
Promise.all([getUserInfo(), getCards()])
    .then(([user, cards]) => {
      if (!user || !cards) {
        throw new Error("Данные не загружены");
      }
      userData = user;
      if (!userData || !userData._id) {
        throw new Error("Данные пользователя не загружены!");
      }
      if (profileTitle) profileTitle.textContent = userData.name || '';
      if (profileDescription) profileDescription.textContent = userData.about || '';
      if (profileImage) profileImage.src = userData.avatar || '';

      // Добавляем карточки на страницу
      cards.forEach((card) => {
        const createdCard = createCard(card, userData._id, handleDelete, handleLike, handleImageClick);
        placesList.append(createdCard);
      });
    })
    .catch((err) => {
      console.error(err);
    });

    // Функция для открытия попапа с изображением
function handleImageClick(link, name) {
  const popupImageElement = popupImage.querySelector('.popup__image');
  const popupCaptionElement = popupImage.querySelector('.popup__caption');

  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupCaptionElement.textContent = name;

  openPopup(popupImage);
}

// Обработчик лайка карточки
function handleLike(cardData, cardLikeButton, updateLikeState) {
  if (cardLikeButton.classList.contains('card__like-button_is-active')) {
    // Убираем лайк
    unlikeCard(cardData._id)
      .then((updatedCard) => {
        updateLikeState(updatedCard);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    // Ставим лайк
    likeCard(cardData._id)
      .then((updatedCard) => {
        updateLikeState(updatedCard);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

// Обработчик удаления карточки
function handleDelete(cardId) {
  window.cardToDeleteId = cardId;
  openPopup(confirmPopup);
}

// Обработчик открытия попапа редактирования профиля
editProfileButton.addEventListener('click', () => {
  editProfileButton.addEventListener('click', () => {
    if (!popupEditProfile) { // Защита от null
      console.error('Попап не существует!');
      return;
    }
    
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
    clearValidation(editProfileForm, validationConfig);
    openPopup(popupEditProfile);
  });

  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;

  clearValidation(editProfileForm, validationConfig);

  openPopup(popupEditProfile);
});

// Обработчик отправки формы редактирования профиля
const editProfileForm = popupEditProfile.querySelector('.popup__form');
editProfileForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const saveButton = editProfileForm.querySelector(".popup__button");
  const originalButtonText = saveButton.textContent; // Сохраняем исходный текст кнопки
  saveButton.textContent = "Сохранение..."; // Меняем текст на "Сохранение..."

  updateUserInfo(nameInput.value.trim(), descriptionInput.value.trim())
      .then((userData) => {
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        closePopup(popupEditProfile);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        saveButton.textContent = originalButtonText; // Возвращаем исходный текст кнопки
      });
  });


addPopupCloseByClickListeners(popupEditProfile);
addPopupCloseByClickListeners(popupAddCard);
addPopupCloseByClickListeners(popupImage);
addPopupCloseByClickListeners(confirmPopup);
addPopupCloseByClickListeners(updateAvatarPopup);


// Открытие попапа "Добавление карточки"
addCardButton.addEventListener('click', () => {
  openPopup(popupAddCard);
});

// Находим элементы попапа добавления карточки
const addCardForm = popupAddCard.querySelector('.popup__form');
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');


// Обработчик отправки формы добавления карточки
function handleAddCardSubmit(evt) {
  evt.preventDefault();

  // Проверка элементов формы
  const addCardForm = popupAddCard.querySelector('.popup__form');
  if (!addCardForm) {
    console.error("Форма добавления карточки не найдена!");
    return;
  }

  const saveButton = addCardForm.querySelector(".popup__button");
  if (!saveButton) {
    console.error("Кнопка .popup__button не найдена!");
    return;
  }

  const originalButtonText = saveButton.textContent;
  saveButton.textContent = "Сохранение...";

  // Проверка полей ввода
  const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
  const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');
  if (!cardNameInput || !cardLinkInput) {
    console.error("Поля ввода не найдены!");
    return;
  }

  const name = cardNameInput.value.trim();
  const link = cardLinkInput.value.trim();

  // Проверка userData
  if (!userData || !userData._id) {
    console.error("Данные пользователя не загружены!");
    return;
  }

  addCard(name, link)
    .then((card) => {
      const newCard = createCard(card, userData._id, handleDelete, handleLike, handleImageClick);
      placesList.prepend(newCard);
      addCardForm.reset();
      closePopup(popupAddCard);
    })
    .catch(console.error)
    .finally(() => {
      saveButton.textContent = originalButtonText;
    });
}
    
// Вешаем обработчик на форму
addCardForm.addEventListener('submit', handleAddCardSubmit);

 // Открытие попапа "Обновление аватара"
 profileAvatarContainer.addEventListener("click", () => {
  avatarForm.reset();
  openPopup(updateAvatarPopup);
});

// Обработчик отправки формы "Обновление аватара"
avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const saveButton = avatarForm.querySelector(".popup__button");
  const originalButtonText = saveButton.textContent; // Сохраняем исходный текст кнопки
  saveButton.textContent = "Сохранение..."; // Меняем текст на "Сохранение..."

  updateUserAvatar(avatarInput.value.trim())
    .then((userData) => {
      profileImage.src = userData.avatar;
      closePopup(updateAvatarPopup);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      saveButton.textContent = originalButtonText; // Возвращаем исходный текст кнопки
    });
});


// Обработчик формы подтверждения удаления карточки
if (confirmForm) {
  confirmForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    if (window.cardToDeleteId) {
      deleteCardFromServer(window.cardToDeleteId)
        .then(() => {
          const cardElement = document.querySelector(
            `[data-card-id="${window.cardToDeleteId}"]`
          );
          if (cardElement) {
            cardElement.remove(); // Удаляем карточку из DOM
          }
          closePopup(confirmPopup); // Закрываем попап
          window.cardToDeleteId = null; // Сбрасываем ID
        })
        .catch((err) => {
          console.error(err);
        });
    }
  });
};

});