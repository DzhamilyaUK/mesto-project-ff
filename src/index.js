import './pages/index.css';
import { initialCards } from './scripts/cards';
import { addCard, deleteCard, likeCard } from './components/card';
import { handleEscKeyUp, openPopup, closePopup, addListener } from './components/modal';

const placesList = document.querySelector('.places__list');
initialCards.forEach(({ name, link }) => {
  const card = addCard({ name, link }, deleteCard, likeCard, openImagePopup);
  placesList.append(card);
});

const editButton = document.querySelector('.profile__edit-button'); // Кнопка "Редактировать"
const addCardButton = document.querySelector('.profile__add-button'); // Кнопка "+"

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const profileTitle = document.querySelector('.profile__title'); // Элемент с именем
const profileDescription = document.querySelector('.profile__description'); // Элемент с информацией о себе

// Обработчик открытия попапа редактирования профиля
editButton.addEventListener('click', () => {
  // Заполняем поля формы текущими значениями
  const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
  const descriptionInput = popupEditProfile.querySelector('.popup__input_type_description');

  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;

  openPopup(popupEditProfile);
});

// Обработчик отправки формы редактирования профиля
const editProfileForm = popupEditProfile.querySelector('.popup__form');
editProfileForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Отменяем стандартное поведение формы

  // Обновляем данные на странице
  const nameInput = popupEditProfile.querySelector('.popup__input_type_name');
  const descriptionInput = popupEditProfile.querySelector('.popup__input_type_description');

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closePopup(popupEditProfile); // Закрываем попап
});

addCardButton.addEventListener('click', () => {
  openPopup(popupAddCard);
});

addListener(popupEditProfile);
addListener(popupAddCard);
addListener(popupImage);

// Функция для открытия попапа с изображением
function openImagePopup(link, name) {
  const popupImageElement = popupImage.querySelector('.popup__image');
  const popupCaptionElement = popupImage.querySelector('.popup__caption');

  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupCaptionElement.textContent = name;

  openPopup(popupImage);
}


// Находим форму в DOM
const formElement = document.querySelector('.popup_type_edit .popup__form');

// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
    evt.preventDefault(); // Отменяем стандартную отправку формы
    
    // Получаем значения полей
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    // Находим элементы профиля на странице
    const profileName = document.querySelector('.profile__title');
    const profileJob = document.querySelector('.profile__description');

    // Вставляем новые значения
    profileName.textContent = nameValue;
    profileJob.textContent = jobValue;

    // Закрываем попап (добавляем эту логику, так как она требуется по заданию)
    const popup = formElement.closest('.popup');
    closePopup(popup);
}
// Прикрепляем обработчик к форме
formElement.addEventListener('submit', handleFormSubmit);


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