import { dermiSolution, parrafo, textoPrincipal } from "../estilos/estilos"

export const HomePage=()=>{

    return(
        <div style={textoPrincipal}>
            <h1 style={dermiSolution} >DERMI-SOLUTION</h1>
            <p style={parrafo}>Esta cerca tuyo para mejorar tu calidad de vida</p>
        </div>
    )
}