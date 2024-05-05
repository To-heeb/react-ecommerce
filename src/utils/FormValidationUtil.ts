
export const validateEmail = (email: string) => {
    const regex_email =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex_email.test(String(email.trim()).toLowerCase());
  };

export const validatePasswordLength = (password: string) => {
    return password.length >= 8;
};

export const validateNonAlphanumericPassword = (password: string) => {
  const nonAlphanumericRegex = /[^a-zA-Z0-9]/;
  return nonAlphanumericRegex.test(password);
};

export const validateLowerCasePassword = (password: string) => {
  const lowerRegex  = /[a-z]/;
  return lowerRegex.test(password);
};

export const validateUpperCasePassword = (password: string) => {
  const upperRegex = /[A-Z]/;
  return upperRegex.test(password);
};

export const validatePassword = (password: string) => {
  return password.length >= 8;
};

export const validateName = (name: string) => {
  return name.trim().length != 0;
};

export const validateText = (name: string) => {
  return name.trim().length != 0;
};
