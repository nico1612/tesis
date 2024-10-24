import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useError, useForm } from "../../../hooks";
import { setError, startLogin } from "../../../store";
import { checkFormLogin } from "../../helpers/checkFormLogin";
import { Button, TextField, Typography, Container, Box } from '@mui/material';

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
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            Usuario y/o contraseña incorrectas
          </Typography>
        )}
        <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Iniciar sesión
          </Button>
          <Typography align="center" sx={{ mt: 2 }}>
            No tienes cuenta? <Link to="/auth/register">Registrarse</Link>
          </Typography>
          <Typography align="center" sx={{ mt: 1 }}>
            Registro médico <Link to="/auth/medico">Registrarse</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};
