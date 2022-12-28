class ValidationError extends Error {
    constructor(message) {
      super();
      this.message = message;
    }
  }
  
  function validateName(name) {
    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(name)) {
      throw new ValidationError('Please enter a valid name');
    }
  }
  
  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9]{1}[a-zA-Z0-9@._-]+[a-zA-Z]$/;
    if (!emailRegex.test(email)) {
      throw new ValidationError('Please enter a valid email');
    }
    const necessaryEmailCharacters = ['@', '.'];
    for (const necessaryEmailCharacter of necessaryEmailCharacters) {
      if (!email.includes(necessaryEmailCharacter)) {
        throw new ValidationError('Please enter a valid email');
      }
    }
  }
  
  function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9._]+$/;
    if (!usernameRegex.test(username)) {
      throw new ValidationError('Please enter a valid username');
    }
  }
  
  function validateDay(day) {
    const dayRegex = /^[0-9]{1,2}$/;
    if (!dayRegex.test(day)) {
      throw new ValidationError('Please enter a valid day');
    }
  }
  
  function validateYear(year) {
    const yearRegex = /^[0-9]{4}$/;
    if (!yearRegex.test(year)) {
      throw new ValidationError('Please enter a valid year');
    }
  }
  
  function validatePhoneNumber(phoneNumber) {
    const FORMATTING_CHARACTERS = ['(', ')', '-'];
    function validateFormattedNumber() {
      const regex = /^[0-9(]{1}[0-9)-]+[0-9]$/;
      const hasOpeningParentheses = phoneNumber.includes('(');
      const hasClosingParentheses = phoneNumber.includes(')');
      if (hasOpeningParentheses && !hasClosingParentheses) {
        throw new ValidationError('Phone number missing closing parentheses');
      }
      if (!regex.test(phoneNumber)) {
        throw new ValidationError('Please enter valid phone number');
      }
    }
    function validateNonformattedNumber() {
      const regex = /^[0-9]+$/;
      if (!regex.test(phoneNumber)) {
        throw new ValidationError('Please enter valid phone number');
      }
    }
    for (const formattingCharacter of FORMATTING_CHARACTERS) {
      if (phoneNumber.includes(formattingCharacter)) {
        return validateFormattedNumber();
      }
    }
    validateNonformattedNumber();
  }
  
  const validationMapping = {
    'name': validateName,
    'email': validateEmail,
    'username': validateUsername,
    'day': validateDay,
    'year': validateYear,
    'phoneNumber': validatePhoneNumber
  }
  
  function validate(event) {
    const inputElement = event.target;
  
    const field = inputElement.dataset.field;
    
    if (field === 'password') {
      // TODO: Something special
      return;
    }
  
    const errorMessageElement = event.target.parentElement.getElementsByClassName('signup__field__error')[0];
    try {
      validationMapping[field](inputElement.value); 
      errorMessageElement.innerHTML = '';
      inputElement.classList.remove('signup__field__input--error');
    } catch (err) {
      if (!(err instanceof ValidationError)) {
        // Log real error
        throw err 
      }
      errorMessageElement.innerHTML = err.message;
      inputElement.classList.add('signup__field__input--error');
    }
  }
  
  const inputs = document.getElementsByClassName('signup__field__input');
  
  for (const input of inputs) {
    input.onblur = validate;
  }
  