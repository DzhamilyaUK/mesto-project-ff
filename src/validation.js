const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
  };
  
  const hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
  };
  
  const checkInputValidity = (formElement, inputElement, validationConfig) => {
    let isInputValid = inputElement.validity.valid;
    let errorMessage = inputElement.validationMessage;
  
    if (inputElement.dataset.validationType === 'pattern') {
      const regex = new RegExp(inputElement.dataset.pattern);
      if (!regex.test(inputElement.value)) {
        isInputValid = false;
        errorMessage = inputElement.dataset.errorMessage;
      }
    }
  
    if (!isInputValid) {
      showInputError(formElement, inputElement, errorMessage, validationConfig);
    } else {
      hideInputError(formElement, inputElement, validationConfig);
    }
    return isInputValid;
  };
  
  const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => !inputElement.validity.valid);
  };
  
  export const disableSubmitButton = (buttonElement, validationConfig) => {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  };
  
  const enableSubmitButton = (buttonElement, validationConfig) => {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  };
  
  const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    if (hasInvalidInput(inputList)) {
      disableSubmitButton(buttonElement, validationConfig);
    } else {
      enableSubmitButton(buttonElement, validationConfig);
    }
  };
  
  const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, validationConfig);
        toggleButtonState(inputList, buttonElement, validationConfig);
      });
    });
  
    toggleButtonState(inputList, buttonElement, validationConfig);
  };
  
  export const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach(formElement => {
      formElement.addEventListener('submit', (evt) => evt.preventDefault());
      setEventListeners(formElement, validationConfig);
    });
  };
  
  export const clearValidation = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  
    inputList.forEach(inputElement => {
      hideInputError(formElement, inputElement, validationConfig);
    });
  
    toggleButtonState(inputList, buttonElement, validationConfig);
  };