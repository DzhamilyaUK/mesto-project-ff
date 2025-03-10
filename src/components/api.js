// Конфигурация для запросов
const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-33', // Адрес сервера с идентификатором группы
  headers: {
    authorization: 'dd0aeae4-79da-4511-8815-c9c80a0045b9', // Токен
    'Content-Type': 'application/json', // Тип данных
  },
};

// Проверка ответа сервера
function checkResponse(res) {
  if (res.ok) {
    return res.json(); // Если запрос успешен, возвращаем JSON
  }
  return Promise.reject(`Ошибка: ${res.status}`); // Если ошибка, возвращаем её статус
}

// Получение данных пользователя
export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
}

// Получение карточек
export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
}

// Обновление данных пользователя
export function updateUserInfo(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then(checkResponse);
}

// Добавление новой карточки
export function addNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(checkResponse);
}

// Удаление карточки
export function deleteCards(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(checkResponse);
}

// Лайк карточки
export function likeCards(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  }).then(checkResponse);
}

// Удаление лайка карточки
export function unlikeCards(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(checkResponse);
}

export function updateAvatar(avatarUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  }).then(checkResponse);
}