(()=>{"use strict";var e;function t(e){e.remove()}e=document.querySelector(".places__list"),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(n){var r=function(e,t){var n=e.name,r=e.link,a=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),c=a.querySelector(".card__delete-button");return a.querySelector(".card__image").src=r,a.querySelector(".card__image").alt=n,a.querySelector(".card__title").textContent=n,c.addEventListener("click",(function(){return t(a)})),a}({name:n.name,link:n.link,alt:n.alt},t);e.append(r)}))})();