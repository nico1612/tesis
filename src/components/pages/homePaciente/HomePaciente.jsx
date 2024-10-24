import { Link } from "react-router-dom";
import { Container, Typography, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

export const HomePaciente = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Utiliza el siguiente menú para acceder a las diferentes funcionalidades del sistema.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Card>
            <CardActionArea component={Link} to="/imagenes">
              <CardContent>
                <CameraAltIcon sx={{ fontSize: 50, color: '#1976d2' }} />
                <Typography variant="h5" gutterBottom>
                  Cargar Imágenes
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Ver historial y carga de imágenes.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardActionArea component={Link} to="/medicos">
              <CardContent>
                <MedicalServicesIcon sx={{ fontSize: 50, color: '#1976d2' }} />
                <Typography variant="h5" gutterBottom>
                  Médicos Tratantes
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Consulta y gestiona tus médicos tratantes. Envía una solicitud a un médico.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
