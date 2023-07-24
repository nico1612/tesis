export const checkFormRegister = ({ Name, Surname, setErrorName, setErrorSurname }) => {
    const checkField = (value, setError) => {
      if (value === '') {
        setError(true);
        return false;
      } else {
        setError(false);
        return true;
      }
    };
  
    const isNameValid = checkField(Name, setErrorName);
    const isSurnameValid = checkField(Surname, setErrorSurname);
  
    return isNameValid && isSurnameValid;
  };