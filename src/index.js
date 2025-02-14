import './pages/index.css';

function renderCard() {
    const placesList = document.querySelector('.places__list');
    initialCards.forEach(({name,link,alt}) => {
       const card = addCard({name,link,alt}, deleteCard);
       placesList.append(card);
    });
}

function addCard ({name,link}, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
    cardElement.querySelector('.card__title').textContent = name;
    
    deleteButton.addEventListener('click', () => deleteCard(cardElement));

    return cardElement;
}

function deleteCard(cardElement) {
    cardElement.remove();
}

renderCard();