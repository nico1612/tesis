import { useForm } from "../../hooks";

export const BuscarPage=()=>{

    const { searchText, onInputChange } = useForm({
        searchText: q
      });
    
    return(
        <form>
            <div className="app">
                <h1>buscar paciente</h1>
            </div>
            <input 
                type="text"
                placeholder="Search a hero"
                className="form-control"
                name="searchText"
                autoComplete="off"
                value={ searchText }
                onChange={ onInputChange }
              />
        </form>
    )
}