

export const FormBuscarPacientes=({onSubmit,searchText,onInputChange})=>{

    return(
        <form onSubmit={onSubmit} className="d-flex justify-content-center">
        <input
          type="text"
          placeholder="Buscar un paciente"
          className="form-control me-2"
          name="searchText"
          autoComplete="off"
          value={searchText}
          onChange={onInputChange}
        />
        <button className="btn btn-primary" type="submit">Buscar</button>
      </form>
    )
}