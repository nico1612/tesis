import React from 'react'
import './stylesHome.css'

export const Home = () => {
    return (
        <div>
            <div className="home-container">
                <div className="home-title">
                    <h1>DERMITECTION</h1>
                    <p>Está cerca tuyo para mejorar tu calidad de vida</p>
                </div>
            </div>
            <div className='quienesSomosSeccion'>
                <div className="iconoQS">
                    <i class="fas fa-question-circle"></i>
                </div>
                <h2>¿Quiénes Somos?</h2>
                
                <p className='descriptionQS'>En Dermitection, nos dedicamos a proporcionar una herramienta avanzada y accesible para identificar y comparar diferentes condiciones dermatológicas. Utilizando algoritmos de Machine Learning, nuestra app analiza imágenes de la piel y las compara con una extensa base de datos, ayudándote a obtener una mejor comprensión de tus problemas dermatológicos.</p>
                
                <p className="descriptionQS">
                    En nuestra plataforma para dermatitis atópica, de contacto y psoriasis, nos comprometemos a ofrecer una solución innovadora y accesible para aquellos que buscan comprender y gestionar sus condiciones dermatológicas de manera eficaz. Nuestra misión es proporcionar a los pacientes una herramienta confiable y fácil de usar que les permita obtener información instantánea y precisa sobre sus síntomas a través de la comparación de fotos con nuestra extensa base de datos. Nos esforzamos por empoderar a los usuarios al brindarles acceso a diagnósticos tempranos y orientación personalizada, mejorando así su calidad de vida y bienestar dermatológico. En cada paso, nos comprometemos a mantener los más altos estándares de precisión, seguridad y atención al cliente, con el objetivo de convertirnos en un aliado confiable y de confianza en el manejo de las enfermedades de la piel.
                </p> 
            </div>

            <div className='importanteSeccion'>
                <div className="iconoImportante">
                    <i class="fas fa-exclamation-circle"></i>
                </div>                
                <h2>Importante</h2>
                <p className='descriptionImportante'>Queremos aclarar que DERMITECTION ha sido desarrollada por un equipo de especialistas en tecnología y datos, y no por médicos o profesionales de la salud. La app no pretende sustituir el consejo médico profesional, diagnóstico o tratamiento. Siempre recomendamos consultar a un dermatólogo u otro profesional de la salud para obtener una evaluación y diagnóstico precisos.</p>
            </div>

            <div className='objetivoSeccion'>
                <h2>Nuestro objetivo es ofrecerte:</h2>
                <div className='textoObjetivo'>
                <p><strong> Acceso a la tecnología avanzada:</strong> Con algoritmos de Machine Learning, facilitamos el análisis y
                comparación de imágenes de la piel.</p>
                <p><strong> Fácil de usar:</strong> Una interfaz intuitiva que te permite obtener información rápidamente.</p>
                </div>
            </div>


            <div className='compromisoSeccion'>
                <h2>Nuestro compromiso</h2>
                <div className='textoCompromiso'>
                    <p>
                    Nos comprometemos a mejorar continuamente nuestra tecnología y a ofrecerte una herramienta fiable y segura. Tu
                    privacidad y la seguridad de tus datos son nuestra prioridad. Agradecemos tus comentarios y sugerencias para
                    seguir mejorando.
                    </p>
                </div>
            </div>

            <div className="contactoSeccion">
                <div className="iconoContacto">
                    <div className="iconoTelefonoCirculo">
                        <i className="fas fa-phone"></i>
                    </div>
                </div>
                <h2>Contacto</h2>
                <p>Si tienes alguna pregunta o inquietud, no dudes en ponerte en contacto con nosotros a través de los siguientes medios:</p>

                <div className="contact-details">
                    <div className="contact-item">
                        <p>Email: <a href="mailto:info@tuempresa.com">info@dermisolution.com</a></p>
                    </div>
                    <div className="contact-item">
                        <p>Teléfono: <a href="tel:+123456789">+1 234 567 89</a></p>
                    </div>
                    <div className="contact-item">
                        <p>Dirección: Lima 757, C1073 Cdad. Autónoma de Buenos Aires</p>
                    </div>
                </div>
            </div>




            

        </div>

    )
}