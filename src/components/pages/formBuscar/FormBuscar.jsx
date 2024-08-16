import './FormBuscar.css';
export const FormBuscar = ({ onSubmit, searchText, onInputChange }) => {
    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                name="searchText"
                value={searchText}
                onChange={onInputChange}
            />
            <button type="submit">Buscar</button>
        </form>
    );
};
