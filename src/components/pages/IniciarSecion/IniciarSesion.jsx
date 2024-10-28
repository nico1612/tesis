import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useError, useForm } from "../../../hooks";
import { setError, startLogin } from "../../../store";
import { checkFormLogin } from "../../helpers/checkFormLogin";
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import "./IniciarSesion.css";

const formData = {
  Email: "",
  Password: ""
};

export const IniciarSesion = () => {
  const dispatch = useDispatch();
  const { Email, Password, onInputChange } = useForm(formData);
  const { errorMail, setErrorMail, errorPassword, setErrorPassword } = useError();
  const { error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      dispatch(setError());
    }
  }, [error, dispatch]);

  const onSubmit = (event) => {
    event.preventDefault();
    if (checkFormLogin({ Email, Password, setErrorMail, setErrorPassword })) {
      dispatch(startLogin({ Email, Password }));
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="main-container">
      <Box className="login-box">
        <Typography component="h1" variant="h5" className="header-text">
          Iniciar Sesión
        </Typography>
        {error && (
          <Typography className="error-text">
            Usuario y/o contraseña incorrectas
          </Typography>
        )}
        <Box component="form" onSubmit={onSubmit} className="form-container">
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="Email"
            autoComplete="email"
            autoFocus
            value={Email}
            onChange={onInputChange}
            error={!!errorMail}
            helperText={errorMail && "Mail es requerido correctamente"}
            className="form-field"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="Password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={Password}
            onChange={onInputChange}
            error={!!errorPassword}
            helperText={errorPassword && "Contraseña es requerida"}
            className="form-field"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="submit-button"
          >
            Iniciar sesión
          </Button>
          <Typography align="center" className="link-text">
            No tienes cuenta? <Link to="/auth/register">Registrarse</Link>
          </Typography>
          <Typography align="center" className="link-text">
            Registro médico <Link to="/auth/medico">Registrarse</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};
