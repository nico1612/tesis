import React from 'react'
import Card from 'react-bootstrap/Card'
import './cardImagen.css'

export const CardImagen = ({ resultados }) => {
  console.log(resultados.resultadosEnfermedades[0].enfermedad)
  return (
    <Card style={{ maxWidth: '500px', margin: '0 auto' }} className="mb-3">
      <Card.Body className="card-body">
        <div className="card-img-container">
          <Card.Img
           style={{ maxWidth: '200px',maxHeight:'1500px' ,margin: '0 auto' }}
            variant="top"
            src={resultados.img}
            alt="Consulta"
            className="card-img"
          />
        </div>
        <div className="card-content">
          <Card.Title className="card-title">Resultado:</Card.Title>
          <Card.Text>
            Fecha: {resultados.dia}/{resultados.mes}/{resultados.ano}
          </Card.Text>
          {resultados.resultadosEnfermedades.map((enfermedad, index) => {
            if(enfermedad.enfermedad!=='no ser ninguna enfermedad'){
              // Supongamos que enfermedad.resultado tiene un valor numérico
              let resultado = enfermedad.resultado * 100;

              // Limitar a dos decimales y reemplazar el punto por una coma
              let resultadoFormateado = resultado.toFixed(2).replace('.', ',');
              return(
            <Card.Text key={index}>
              <Card.Text>
              el area afectada tiene más probabilidad de ser {enfermedad.enfermedad} 
              </Card.Text>
             <Card.Text>
             con un porcentaje de {resultadoFormateado} presicion
             </Card.Text>
            </Card.Text>)}else{
              return  (<Card.Text key={index}>
                <Card.Text>
                no se ha detectado ninguna enfermedad en el area enviada
                </Card.Text>
              </Card.Text>)
            }
          })}
        </div>
      </Card.Body>
    </Card>
  )
}



export default CardImagen
