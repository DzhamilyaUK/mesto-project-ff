(()=>{"use strict";function e(e,t,n,r){var o=e.name,p=e.link,u=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),c=u.querySelector(".card__delete-button"),i=u.querySelector(".card__like-button"),a=u.querySelector(".card__image");return u.querySelector(".card__image").src=p,u.querySelector(".card__title").textContent=o,c.addEventListener("click",(function(){return t(u)})),i.addEventListener("click",(function(){return n(i)})),r&&a.addEventListener("click",(function(){return r(p,o)})),u}function t(e){e.remove()}function n(e){e.classList.toggle("card__like-button_is-active")}var r=function(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");p(t)}},o=function(e){e.classList.add("popup_is-opened"),document.addEventListener("keyup",r)},p=function(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keyup",r)},u=function(e){e.querySelector(".popup__close").addEventListener("click",(function(){p(e)})),e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup")&&p(e)}))},c=document.querySelector(".places__list");[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(r){var o=e({name:r.name,link:r.link},t,n,m);c.append(o)}));var i=document.querySelector(".profile__edit-button"),a=document.querySelector(".profile__add-button"),d=document.querySelector(".popup_type_edit"),l=document.querySelector(".popup_type_new-card"),s=document.querySelector(".popup_type_image"),_=document.querySelector(".profile__title"),y=document.querySelector(".profile__description");function m(e,t){var n=s.querySelector(".popup__image"),r=s.querySelector(".popup__caption");n.src=e,n.alt=t,r.textContent=t,o(s)}i.addEventListener("click",(function(){var e=d.querySelector(".popup__input_type_name"),t=d.querySelector(".popup__input_type_description");e.value=_.textContent,t.value=y.textContent,o(d)})),d.querySelector(".popup__form").addEventListener("submit",(function(e){e.preventDefault();var t=d.querySelector(".popup__input_type_name"),n=d.querySelector(".popup__input_type_description");_.textContent=t.value,y.textContent=n.value,p(d)})),a.addEventListener("click",(function(){o(l)})),u(d),u(l),u(s);var v=document.querySelector(".popup_type_edit .popup__form"),f=v.querySelector(".popup__input_type_name"),q=v.querySelector(".popup__input_type_description");v.addEventListener("submit",(function(e){e.preventDefault();var t=f.value,n=q.value,r=document.querySelector(".profile__title"),o=document.querySelector(".profile__description");r.textContent=t,o.textContent=n;var u=v.closest(".popup");p(u)}));var S=l.querySelector(".popup__form"),k=S.querySelector(".popup__input_type_card-name"),L=S.querySelector(".popup__input_type_url");S.addEventListener("submit",(function(r){r.preventDefault();var o=e({name:k.value,link:L.value},t,n,m);c.prepend(o),p(l),S.reset()}))})();