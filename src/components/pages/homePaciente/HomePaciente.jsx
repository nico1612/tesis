import { Link } from "react-router-dom"
import { Typography, Grid, Card, CardContent, CardActionArea, Box } from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import imagenMedico from "../homePaciente/medico.jpg"

export const HomePaciente = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        backgroundImage: `linear-gradient(to right, rgba(0, 128, 128, 1) 30%, rgba(0, 0, 0, 0.7) 70%), url(${imagenMedico})`,
        backgroundSize: 'cover',  // Asegura que la imagen cubra todo el fondo
        backgroundPosition: 'center',  // Centra la imagen
        backgroundRepeat: 'no-repeat',  // Evita que la imagen se repita
        height: '100vh',  // Altura completa de la pantalla
        display: 'flex',  // Opcional: para centrar el contenido
        flexDirection: 'column',  // Opcional: para centrar el contenido
        justifyContent: 'center',  // Opcional: para centrar el contenido
        alignItems: 'center',  // Opcional: para centrar el contenido
        color: 'white',  // Cambia el color del texto para mayor contraste con el fondo
      }}
    >
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center', // Centra horizontalmente
        alignItems: 'center', // Centra verticalmente
        mt: 5,
        height: '100vh', // Asegura que el contenedor ocupe toda la altura de la pantalla
        flexDirection: { xs: 'column', md: 'row' }, // Cambia dirección en pantallas pequeñas
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center', // Centra horizontalmente
          textAlign: 'center', // Alinea el texto al centro
          padding: "40px"
        }}
      >
        <Typography variant="h4" gutterBottom>
          Bienvenido
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Utiliza el siguiente menú para acceder a las diferentes funcionalidades del sistema.
        </Typography>
      </Box>
      <Box sx={{ flex: 2, mt: 4, padding: "40px" }}> {/* Agregado: margen superior */}
        <Grid container direction="column" spacing={4} justifyContent="center">
          <Grid item xs={12}>
            <Card sx={{ borderRadius: "25px", height: "100%", backgroundColor: "rgba(255, 255, 255, 0)", border: "2px solid white" }}>
              <CardActionArea component={Link} to="/imagenes">
                <CardContent>
                  <CameraAltIcon sx={{ fontSize: 50, color: '#1976d2' }} />
                  <Typography variant="h5" style={{color: "#fff", fontFamily: "DM Sans"}} gutterBottom> 
                    Cargar Imágenes
                  </Typography>
                  <Typography variant="body2" color="textSecondary" style={{color: "#fff", fontFamily: "DM Sans"}}>
                    Ver historial y carga de imágenes.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ borderRadius: "25px", height: "100%", backgroundColor: "rgba(255, 255, 255, 0)", border: "2px solid white" }}>
              <CardActionArea component={Link} to="/medicos">
                <CardContent>
                  <MedicalServicesIcon sx={{ fontSize: 50, color: '#1976d2' }} />
                  <Typography variant="h5" style={{color: "#fff", fontFamily: "DM Sans"}} gutterBottom>
                    Médicos Tratantes
                  </Typography>
                  <Typography variant="body2" color="textSecondary" style={{color: "#fff", fontFamily: "DM Sans"}}>
                    Consulta y gestiona tus médicos tratantes. Envía una solicitud a un médico.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>

    </Box>
  )
}
