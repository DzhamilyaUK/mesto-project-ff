import './pages/index.css';
import { initialCards } from './scripts/cards';
import { createCard, deleteCard, likeCard } from './components/card';
import { handleEscKeyUp, openPopup, closePopup, addPopupCloseByClickListeners } from './components/modal';

const placesList = document.querySelector('.places__list');
initialCards.forEach(({ name, link }) => {
  const card = createCard({ name, link }, deleteCard, likeCard, openImagePopup);
  placesList.append(card);
});

const editButton = document.querySelector('.profile__edit-button'); // Кнопка "Редактировать"
const addCardButton = document.querySelector('.profile__add-button'); // Кнопка "+"

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

// Выносим поиск элементов формы редактирования профиля
const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
const descriptionInput = popupEditProfile.querySelector('.popup__input_type_description');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Обработчик открытия попапа редактирования профиля
editButton.addEventListener('click', () => {
  // Используем уже найденные элементы
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

// Обработчик отправки формы редактирования профиля
const editProfileForm = popupEditProfile.querySelector('.popup__form');
editProfileForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  // Используем уже найденные элементы
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupEditProfile);
});

addCardButton.addEventListener('click', () => {
  openPopup(popupAddCard);
});

addPopupCloseByClickListeners(popupEditProfile);
addPopupCloseByClickListeners(popupAddCard);
addPopupCloseByClickListeners(popupImage);

// Функция для открытия попапа с изображением
function openImagePopup(link, name) {
  const popupImageElement = popupImage.querySelector('.popup__image');
  const popupCaptionElement = popupImage.querySelector('.popup__caption');

  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupCaptionElement.textContent = name;

  openPopup(popupImage);
}


// Находим элементы попапа добавления карточки
const addCardForm = popupAddCard.querySelector('.popup__form');
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url');


// Обработчик отправки формы добавления карточки
function handleAddCardSubmit(evt) {
    evt.preventDefault();
    
    // Получаем значения из полей ввода
    const cardName = cardNameInput.value;
    const cardLink = cardLinkInput.value;
    
    // Создаем новую карточку
    const newCard = addCard(
        { name: cardName, link: cardLink },
        deleteCard,
        likeCard,
        openImagePopup
    );
    
    // Добавляем карточку в начало списка
    placesList.prepend(newCard);
    
    // Закрываем попап и очищаем форму
    closePopup(popupAddCard);
    addCardForm.reset();
}
// Вешаем обработчик на форму
addCardForm.addEventListener('submit', handleAddCardSubmit);