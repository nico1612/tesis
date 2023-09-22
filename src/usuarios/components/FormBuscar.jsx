
export const FormBuscar=({onSubmit,searchText,onInputChange})=>{

  return(
      <form className="d-flex" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Buscar un médico"
        className="form-control me-2"
        name="searchText"
        autoComplete="off"
        value={searchText}
        onChange={onInputChange}
      />
      <button className="btn btn-primary" type="submit">
        Buscar
      </button>
    </form>
  )
}