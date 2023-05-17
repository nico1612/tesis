
export const EliminarTransaccion=async({url,TransactionActual,token})=>{

    const option ={
        method: 'DELETE',
        headers:{
            "Content-Type": "application/json",
            "Authorization":`bearer ${token}`
        },

    }

    await fetch(`${url}/transaction/${TransactionActual.id}`,option)
}