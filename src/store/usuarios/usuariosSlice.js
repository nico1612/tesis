import { createSlice } from '@reduxjs/toolkit'

export const pacientesSlice = createSlice({
    name: 'pacientes',
    initialState: {
        isSaving: false,
        messageSaved: '',
        pacientes: [],
        active: null,
        change: true,
    },
    reducers: {
        addNewEmpty: (state, action) => {
            state.pacientes.push(action.payload)
            state.isSaving = false
        },
        setActivePaciente: (state, action) => {
            state.active = action.payload

        },
        setPacientes: (state, action) => {
            state.pacientes = action.payload
        },
        setSaving: (state) => {
            state.isSaving = false
            state.messageSaved = ''
        },
        updatePacientes: (state, action) => {

            state.pacientes = state.pacientes.map((paciente) => {
                if (paciente.uid === action.payload.paciente.uid) {
                    paciente.estado = !paciente.estado
                    return paciente
                }
                return paciente
            })
        },
        clearPacienteLogout: (state) => {
            state.isSaving = false
            state.messageSaved = ''
            state.pacientes = []
            state.active = null
            state.change = true
        }
    },
})

export const { 
    addNewEmpty,
    setActivePaciente,
    setPacientes,
    setSaving,
    updatePacientes,
    clearPacienteLogout,
} = pacientesSlice.actions

export default pacientesSlice.reducer