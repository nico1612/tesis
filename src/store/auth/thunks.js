import axios from "axios";
import { checkingCredentials, login, logout, setError } from "./authSlice";

export const startLogin = ({ Email, Password }) => {
  return async (dispatch) => {
    try {
      dispatch(checkingCredentials());
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: { "correo": Email, "password": Password },
      };

      const result = await axios(`http://localhost:8080/api/auth/login`, options);

      if (result.data.ok) {
        const { data } = result;
        console.log(data);
        dispatch(login(data));
      } else {
        dispatch(setError());
      }
    } catch (error) {
      dispatch(setError());
    }
  };
};

export const startRegister=({email,surname,name,password})=>{
    
    return async(dispatch)=>{


        dispatch( checkingCredentials() );

        /*const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"name":name,"surname":surname,"eMail":email,"password":password})
        };
        const data=await fetch(`${url}/user/register`,config)
    
        
        if(data.ok){dispatch( startLogin( {email,password} ));}
        else{
            dispatch(logout(data.ok))
            dispatch(setError())

        }*/
        console.log({email,surname,name,password})

    }
}

export const startLogout=()=>{
    return (dispatch)=>{

        dispatch(logout())
        
    }

}