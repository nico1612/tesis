import { useDispatch } from 'react-redux'
import { AppRouter } from './router/AppRouter'
import { Login } from './store'

function App() {
  const dataJSON = localStorage.getItem("usuario")
  const usuario = JSON.parse(dataJSON)
  const dispatch= useDispatch()
  console.log(usuario)
  if(usuario){
    dispatch(Login({usuario}))
  }
  return (
    <AppRouter/>
  )
}

export default App
