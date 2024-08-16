import { useDispatch } from 'react-redux'
import { Login } from './store'
import { AppRouter } from './router/routerGeneral/AppRouter'

function App() {
  const dataJSON = localStorage.getItem("usuario")
  let usuario = null
  
  try {
    if (dataJSON !== undefined) {
      usuario = JSON.parse(dataJSON)
    }
  } catch (error) {
  }
  
  const dispatch = useDispatch()
  
  if (usuario) {
    dispatch(Login({ usuario }))
  }
  

  return (
    <AppRouter />
  )
}

export default App
