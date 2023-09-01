import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const TerminosYCondiciones = () => {

    const navigate=useNavigate()
    const [scrollAtBottom, setScrollAtBottom] = useState(false);

    const handleScroll = (e) => {
      const element = e.target;
      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        setScrollAtBottom(true);
      } else {
        setScrollAtBottom(false);
      }
    };
    useEffect(() => {
        const contentElement = document.getElementById("contenido");
        if (contentElement) {
          contentElement.addEventListener("scroll", handleScroll);
          return () => {
            contentElement.removeEventListener("scroll", handleScroll);
          };
        }
    }, []);

    const estiloTerminos = {
        fontFamily: 'Arial, sans-serif',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        maxHeight: '500px',
        overflowY: 'scroll', 
        position: 'absolute',
        top: '10%', 
        left:"30%"
    };

    const estiloTitulo = {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
    };

    const estiloSubtitulo = {
        fontSize: '18px',
        fontWeight: 'bold',
        marginTop: '20px',
    };

    const estiloParrafo = {
        fontSize: '16px',
        marginBottom: '10px',
        lineHeight: '1.5',
    };

    const estiloLista = {
        listStyleType: 'disc',
        marginLeft: '20px',
    };

    const estiloBoton = {
        backgroundColor: "green",
        color: "white",
        border: "none",
        borderRadius: "15%",
        cursor: "pointer",
        position: 'absolute',
        top: '80%', 
        left:"55%"
      };
    

    const aceptar=()=>{
        navigate(-1)
    }

    return (
        <div>
            <div id="contenido" style={estiloTerminos} onScroll={handleScroll}>
                <h1 style={estiloTitulo}>Términos y Condiciones</h1>
                <p style={estiloParrafo}>La política de privacidad es de suma importancia debido a la naturaleza de la información que se maneja. Por lo tanto, cuando los usuarios se registran en la aplicación, deben aceptar los términos y condiciones de la política de privacidad impuesta por los desarrolladores. Esta política comprende lo siguiente:</p>
                <ul style={estiloLista}>
                    <li>El tratamiento de los datos personales.</li>
                    <li>La información recopilada.</li>
                    <li>El acceso, almacenamiento, procesamiento, uso, seguridad y compartimiento de los mismos.</li>
                </ul>

                <p style={estiloParrafo}>Política de Privacidad de DERMI-SOLUTION (en adelante, la “Aplicación”). [Insertar nombre legal de la sociedad] se compromete a proteger su privacidad y garantiza el cumplimiento de la legislación de protección de datos personales aplicable. Sus datos personales serán tratados de forma lícita, leal y transparente, conforme a fines determinados explícitos y legítimos, y solo si son adecuados, pertinentes y limitados a lo necesario en relación con dichos fines. Además, mantendremos sus datos exactos y actualizados, conservándolos de forma que se permita su identificación solo durante el tiempo necesario para cumplir los fines del tratamiento.</p>

                <p style={estiloParrafo}>Por medio del presente aviso de privacidad, describimos el modo en que se llevará a cabo el tratamiento de sus datos personales, incluyendo cómo recopilamos, usamos y compartimos información, incluidas las imágenes, proporcionadas por los usuarios en relación con el uso de la Aplicación. Al utilizar la Aplicación, el usuario acepta las prácticas descritas en esta Política de Privacidad. En caso de proceder a actualizar este aviso de privacidad, se lo comunicaremos a través de este sitio web.</p>

                <h2 style={estiloSubtitulo}>Responsable del Tratamiento de los Datos Personales</h2>
                <p style={estiloParrafo}>El responsable del tratamiento de sus datos personales es [Insertar nombre legal de la sociedad]. [Insertar datos de contacto de la sociedad]</p>

                <h2 style={estiloSubtitulo}>Información Recopilada</h2>
                <p style={estiloParrafo}>Los datos personales que tratamos pertenecen a las siguientes categorías:</p>
                <ul style={estiloLista}>
                    <li>Datos de carácter identificatorio y de contacto: nombre y apellidos, DNI/Pasaporte o documento de identidad análogo, dirección postal y/o electrónica, teléfono.</li>
                    <li>Datos relativos a características personales: fecha y lugar de nacimiento, edad, sexo, nacionalidad, idiomas y, en caso de que los invitados acudan con familiares, datos del/los familiares/es.</li>
                    <li>Imágenes: Los usuarios pueden subir imágenes a la Aplicación. Al hacerlo, nos otorgan el derecho de acceder, almacenar, procesar y usar estas imágenes en relación con el funcionamiento y la mejora de la Aplicación.</li>
                </ul>

                <h2 style={estiloSubtitulo}>Uso de la Información</h2>
                <p style={estiloParrafo}>Utilizamos las imágenes proporcionadas por los usuarios para:</p>
                <ul style={estiloLista}>
                    <li>Mejorar la Aplicación: Esto puede incluir la optimización de la carga y visualización de las imágenes, así como la incorporación de características relacionadas con el contenido visual.</li>
                    <li>Desarrollo y Análisis: Podemos utilizar las imágenes para llevar a cabo análisis de datos y estudios de mercado con el objetivo de mejorar la experiencia del usuario y comprender las preferencias y patrones de uso.</li>
                </ul>

                <h2 style={estiloSubtitulo}>Compartir Información</h2>
                <p style={estiloParrafo}>No compartimos las imágenes proporcionadas por los usuarios con terceros, a menos que sea necesario para proporcionar un servicio específico solicitado por el usuario o estemos legalmente obligados a hacerlo.</p>

                <h2 style={estiloSubtitulo}>Seguridad</h2>
                <p style={estiloParrafo}>Tomamos medidas razonables para proteger la información recopilada y almacenada, incluidas las imágenes, contra accesos no autorizados, alteraciones, divulgación o destrucción.</p>

                <h2 style={estiloSubtitulo}>Retención de Datos</h2>
                <p style={estiloParrafo}>Retendremos las imágenes proporcionadas por los usuarios durante el tiempo necesario para cumplir con los propósitos para los que fueron recopiladas, o según lo requiera la ley.</p>

                <h2 style={estiloSubtitulo}>Consentimiento</h2>
                <p style={estiloParrafo}>Al subir imágenes a la Aplicación, otorga su consentimiento para que utilicemos esas imágenes de acuerdo con los términos de esta Política de Privacidad.</p>

                <h2 style={estiloSubtitulo}>Cambios en la Política de Privacidad</h2>
                <p style={estiloParrafo}>Esta Política de Privacidad puede ser actualizada periódicamente. En caso de cambios significativos en la forma en que utilizamos las imágenes proporcionadas por los usuarios, se lo notificaremos a través de la Aplicación o los medios apropiados.</p>

                <h2 style={estiloSubtitulo}>Contacto</h2>
                <p style={estiloParrafo}>Preguntas: Si tiene preguntas sobre esta Política de Privacidad, puede ponerse en contacto con nosotros en [dirección de correo electrónico de contacto]. Le recomendamos leer esta Política de Privacidad detenidamente y asegurarse de que comprende nuestras prácticas en relación con el uso de las imágenes proporcionadas por los usuarios. Al utilizar la Aplicación, acepta los términos descritos en esta Política de Privacidad.</p>
            </div>
            <button  style={estiloBoton} onClick={aceptar} disabled={!scrollAtBottom}>aceptar</button>
        </div>
    )
}