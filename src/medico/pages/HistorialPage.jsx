import { useForm } from "../../hooks";

export const HistorialPage = () => {
  const { searchText, onInputChange } = useForm({
    searchText: ''
  });

  return (
    <div className="app">
      <h1>Buscar paciente</h1>
      <form>
        <input
          type="text"
          placeholder="Buscar un paciente"
          className="form-control"
          name="searchText"
          autoComplete="off"
          value={searchText}
          onChange={onInputChange}
        />
      </form>
    </div>
  );
};
