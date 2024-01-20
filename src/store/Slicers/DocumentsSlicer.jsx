import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Apidocuments } from "../../API/Api";
import axios from "axios";

export const Documents = createAsyncThunk(
    "documents/documents",
    async ( {accessToken, body} , { rejectWithValue }) => {
        
        try {
            const header = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization":
                    "Bearer " + accessToken,
                    'Accept': "application/json",
                },
            };
            const { data } = await axios.post(Apidocuments, body, header);
            
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
    success: false,
    status: null,
    documents: null,
    loading: false,
    error: null,
 
    limitDocs: 0
};

const DocumentsSlicer = createSlice({
    name: "documents",
    initialState,
    reducers: {
        clearDocuments: (state) => {
            state.success = false
            state.status = null
            state.documents = null
            state.loading = false
            state.error = null
        },
        loadMore: (state, action) => {
            state.limitDocs = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(Documents.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.documents = action.payload;
            state.status = "OK";
        });

        builder.addCase(Documents.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(Documents.rejected, (state, action) => {
            state.error = action.payload;
            state.status = "BAD";
        });
    },
});
export const { clearDocuments, loadMore } = DocumentsSlicer.actions
export default DocumentsSlicer.reducer;
