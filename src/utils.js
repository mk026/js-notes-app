export const validatePassword = (password, minLength, maxLength) => {
  let error = null;
  if (!password.trim().length) {
    error = 'Password should not be empty';
  }
  if (password.trim().length < minLength) {
    error = `Password should be at least ${minLength} character(s) long`;
  }
  if (password.trim().length > maxLength) {
    error = `Password should not be more than ${maxLength} character(s) long`;
  }
  return error;
};

export const validateEmail = (email) => {
  let error = null;
  if (!email.trim().length) {
    error = 'Email should not be empty';
  }
  if (!/^\w+@\w+\.\w+/.test(email)) {
    error = 'Incorrect email format';
  }
  return error;
};

export const validateInput = (inputStr, inputName, minLength, maxLength) => {
  let error = null;
  if (!inputStr.trim().length) {
    error = `${inputName} should not be empty`;
  }
  if (minLength && inputStr.trim().length < minLength) {
    error = `${inputName} should be at least ${minLength} character(s) long`;
  }
  if (maxLength && inputStr.trim().length > maxLength) {
    error = `${inputName} should not be more than ${maxLength} character(s) long`;
  }
  return error;
};
