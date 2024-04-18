import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoadingState {
    isLoading: boolean;
}

const initialState: LoadingState = {
    isLoading: true, // Valor inicial, asumiendo que no hay carga al iniciar la app
};

export const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        // Acción para activar el indicador de carga
        setLoadingTrue: (state) => {
            state.isLoading = true;
        },
        // Acción para desactivar el indicador de carga
        setLoadingFalse: (state) => {
            state.isLoading = false;
        },
        // Acción para cambiar el estado de carga con un valor específico
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },
});

// Exportación de las acciones para su uso en otros componentes o middleware
export const { setLoadingTrue, setLoadingFalse, setLoading } = loadingSlice.actions;

// Exportación del reducer para integrarlo al store de Redux
export default loadingSlice.reducer;