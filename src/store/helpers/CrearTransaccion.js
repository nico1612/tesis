import axios from "axios"

export const crearTransaccion=async({url,data,token})=>{

  await axios.post(`${url}/transaction/new`, {
    userId:data.userId,
    concept: data.Concept,
    categoryId:data.TransactionTypeId,
    amount: data.Amount,
    date: data.date,
    transactionTypeId: data.TransactionTypeId,
  },
  {
    headers: {
    'Content-Type': 'application/json',
    "Authorization":`Bearer ${token}`
   }
  }
  )
  .then(function (response) {

  })
  .catch( (error)=> {
    console.log(error);
  });
}