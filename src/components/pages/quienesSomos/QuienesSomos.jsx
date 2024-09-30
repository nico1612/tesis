import React from 'react'
import './QuienesSomos.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faLightbulb, faBook } from '@fortawesome/free-solid-svg-icons'

export const QuienesSomos = () => {
    return (
        <div className="container mt-5">
            <h1 className="display-4">Quiénes Somos</h1>
            <div class="row">

            <section className="mt-4 section-intro">
                <p>
                En DERMITECTION, nos dedicamos a proporcionar una herramienta avanzada y accesible para identificar y
                comparar diferentes condiciones dermatológicas, tales como la dermatitis de contacto, dermatitis atópica y
                psoriasis. Utilizando algoritmos de Machine Learning, nuestra app analiza imágenes de la piel y las compara con
                una extensa base de datos, ayudándote a obtener una mejor comprensión de tus problemas dermatológicos.
                </p>
            </section>
            <section className="mt-4 section-important">
                <h2>Importante:</h2>
                <p>
                Queremos aclarar que DERMITECTION ha sido desarrollada por un equipo de especialistas en tecnología y
                datos, y no por médicos o profesionales de la salud. La app no pretende sustituir el consejo médico profesional,
                diagnóstico o tratamiento. Siempre recomendamos consultar a un dermatólogo u otro profesional de la salud para
                obtener una evaluación y diagnóstico precisos.
                Te recordamos que esta app no reemplaza ni sustituye el consejo médico.
                Te recomendamos recurrir a un profesional de la salud para obtener una evaluación y diagnóstico preciso.
                </p>
            </section>

            <section className="mt-4 section-objetivos">
                <h2>Nuestro objetivo es ofrecerte:</h2>
                <ul className="card-list">
                    <li className="card-item">
                        <FontAwesomeIcon icon={faCog} className="icon" />
                        <strong> Acceso a la tecnología avanzada:</strong> Con algoritmos de Machine Learning, facilitamos el análisis y
                        comparación de imágenes de la piel.
                    </li>
                    <li className="card-item">
                        <FontAwesomeIcon icon={faLightbulb} className="icon" />
                        <strong> Fácil de usar:</strong> Una interfaz intuitiva que te permite obtener información rápidamente.
                    </li>
                </ul>
            </section>

            <section className="mt-4 section-compromiso">
                <h2>Nuestro compromiso:</h2>
                <p>
                Nos comprometemos a mejorar continuamente nuestra tecnología y a ofrecerte una herramienta fiable y segura. Tu
                privacidad y la seguridad de tus datos son nuestra prioridad. Agradecemos tus comentarios y sugerencias para
                seguir mejorando.
                </p>
            </section>

            <section className="mt-4 section-contacto">
                <h2>Contacto:</h2>
                <p>
                Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nosotros en [correo
                electrónico o enlace de contacto].
                </p>
           </section>
    
           </div>
        </div>
    )
}
