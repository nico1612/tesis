import { DERMISOLUTION, cuadrocentral, textoDERMISOLUTION } from "../helpers/estilosHome"

export const HomePage=()=>{

    return(
        <div style={cuadrocentral}>
            <h1 style={DERMISOLUTION}>DERMI-SOLUTION</h1>
            <p style={textoDERMISOLUTION}>Esta cerca tuyo para mejorar tu calidad de vida</p>
        </div>
    )
}