import axios from "axios";
import { Apihistograms } from "../../API/Api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const Histograms = createAsyncThunk(
    "documents/histograms",
    async ({ accessToken, body }, { rejectWithValue }) => {
        try {
            const header = {
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + accessToken,
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(Apihistograms, body, header);
            
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

const initialState = {
    error: null,
    success: false,
    status: null,
    loading: false,
    histograms: null,
    requestbody: {}
};

const HistogramsSlicer = createSlice({
    name: "histograms",
    initialState,
    reducers: {
        clearHistograms: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.status = null;
            state.histograms = null;
        },
        requestBody: (state, action) => {
            state.requestbody = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(Histograms.fulfilled, (state, action) => {
            state.status = "OK";
            state.loading = false;
            state.histograms = action.payload;
            state.success = true;
           
        });

        builder.addCase(Histograms.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(Histograms.rejected, (state, action) => {
            state.status = "BAD";
            state.error = action.payload;
           
        });
    },
});
export const { clearHistograms, requestBody } = HistogramsSlicer.actions;
export default HistogramsSlicer.reducer;
