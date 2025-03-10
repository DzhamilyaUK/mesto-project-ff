
function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.name}`);
  if (!errorElement) return; // Если элемент ошибки не найден, выходим из функции
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.name}`);
  if (!errorElement) return; // Если элемент ошибки не найден, выходим из функции
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
}

function checkInputValidity(formElement, inputElement, config) {
  const fieldConfig = config[inputElement.name];
  if (!fieldConfig) {
      if (!inputElement.validity.valid) {
          if (inputElement.type === 'url') {
              showInputError(formElement, inputElement, 'Введите адрес сайта', config);
          } else {
              showInputError(formElement, inputElement, inputElement.validationMessage, config);
          }
      } else {
          hideInputError(formElement, inputElement, config);
      }
      return;
  }

  if (!inputElement.validity.valid) {
      if (inputElement.value.length === 0) {
          showInputError(formElement, inputElement, 'Вы пропустили это поле', config);
      } else if (inputElement.value.length < fieldConfig.minLength) {
          showInputError(
              formElement,
              inputElement,
              `Минимальное число символов: ${fieldConfig.minLength}. Длина текста: ${inputElement.value.length}`,
              config
          );
      } else if (inputElement.value.length > fieldConfig.maxLength) {
          showInputError(
              formElement,
              inputElement,
              `Максимальное число символов: ${fieldConfig.maxLength}. Длина текста: ${inputElement.value.length}`,
              config
          );
      } else if (inputElement.type === 'url' && !inputElement.validity.valid) {
          showInputError(formElement, inputElement, 'Введите адрес сайта', config);
      } else {
          showInputError(formElement, inputElement, inputElement.validationMessage, config);
      }
  } else {
      hideInputError(formElement, inputElement, config);
  }
}

function toggleButtonState(inputList, buttonElement, config) {
  const hasInvalidInput = inputList.some((inputElement) => !inputElement.validity.valid);
  if (hasInvalidInput) {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.disabled = true;
  } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.disabled = false;
  }
}

function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
          checkInputValidity(formElement, inputElement, config);
          toggleButtonState(inputList, buttonElement, config);
      });
  });
}

export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
      setEventListeners(formElement, config);
  });
}

export function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, config);
  });
  toggleButtonState(inputList, buttonElement, config);
}
