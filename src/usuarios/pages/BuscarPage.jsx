import { useForm } from '../../hooks';

export const BuscarPage = () => {
  const { searchText, onInputChange } = useForm({
    searchText: ''
  });

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(searchText);
    // dispatch()
  };

  return (
    <div className="app">
      <h1>Buscar médico</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Buscar un médico"
          className="form-control"
          name="searchText"
          autoComplete="off"
          value={searchText}
          onChange={onInputChange}
        />
        <button className="btn btn-primary">Buscar</button>
      </form>
    </div>
  );
};