
export const ActualizarTransaccion=async({Id,Datas,token,url})=>{

    const Data={
        transactionTypeId:Datas.TransactionTypeId,
        date:Datas.date,
        amount:Datas.Amount,
        concept:Datas.Concept,
        categoryId:Datas.CategoryId,
    }

    const option ={
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Authorization":`bearer ${token}`
        },
        body: JSON.stringify(Data)
    }
    const result=await fetch(`${url}/transaction/${Id}`,option)

    return {
        result
    }
}