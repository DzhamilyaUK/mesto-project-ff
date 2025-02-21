
export function createCard ({name,link}, deleteCard, likeCard, handleImageClick) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');

    cardImage.src = link;
    cardImage.alt = name;
    cardElement.querySelector('.card__title').textContent = name;
    
    deleteButton.addEventListener('click', () => deleteCard(cardElement));

    likeButton.addEventListener('click', () => likeCard(likeButton));
    
    cardImage.addEventListener('click', () => handleImageClick(link, name));
  
    return cardElement;
}

 export function deleteCard (cardElement) {
    cardElement.remove();
}

export function likeCard (likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}

