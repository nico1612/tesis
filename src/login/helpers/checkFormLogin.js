export const checkFormLogin = ({ Email, Password, setErrorMail, setErrorPassword }) => {
    const word = '@';
    let isValid = true;
  
    // Verificar si el campo de correo está vacío o no contiene el símbolo '@'
    if (Email === '' || !Email.includes(word)) {
      setErrorMail(true);
      isValid = false;
    } else {
      setErrorMail(false);
    }
  
    // Verificar si el campo de contraseña está vacío
    if (Password === '') {
      setErrorPassword(true);
      isValid = false;
    } else {
      setErrorPassword(false);
    }
  
    return isValid;
  };