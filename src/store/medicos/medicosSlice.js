import { createSlice } from '@reduxjs/toolkit'

export const medicosSlice = createSlice({
    name: 'medicos',
    initialState: {
        isSaving: false,
        messageSaved: '',
        medicos: [],
        active: null,
        change: true,
    },
    reducers: {
        addNewEmpty: (state, action) => {
            state.medicos.push(action.payload)
            state.isSaving = false
        },
        setActiveMedico: (state, action) => {
            state.active = action.payload
        },
        setMedicos: (state, action) => {
            state.medicos = action.payload
        },
        setSaving: (state) => {
            state.isSaving = false
            state.messageSaved = ''
        },
        updateMedicos: (state, action) => {

            state.medicos = state.medicos.map((medico) => {
                if (medico.uid === action.payload.medico.medico.uid) {
                    medico.estado = !medico.estado
                    console.log(medico.estado)
                    return medico
                }
                return medico
            })
        },
        clearMedicosLogout: (state) => {
            state.isSaving = false
            state.messageSaved = ''
            state.medicos = []
            state.active = null
            state.change = true
        },
    },
})

// Action creators are generated for each case reducer function
export const { 
    addNewEmpty,
    setActiveMedico,
    setMedicos,
    setSaving,
    updateMedicos,
    clearMedicosLogout,
} = medicosSlice.actions

export default medicosSlice.reducer