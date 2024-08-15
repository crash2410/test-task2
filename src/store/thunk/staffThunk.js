import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGetStaffList = createAsyncThunk(
    "staff/getStaffList",
    async (rejectWithValue ) => {
        try {
            const response=  await axios.get(
                `${process.env.REACT_APP_DB_HTTPS_URL}/staffList`
            )
            return response.data;
        } catch (e) {
            console.error(e)
            if (!e.response) {
                throw e
            }
            return rejectWithValue(e.response)
        }
    }
)

export const fetchGetStaffById = createAsyncThunk(
    "staff/getStaffById",
    async (staffId, thunkAPI ) => {
        try {
            const response=  await axios.get(
                `${process.env.REACT_APP_DB_HTTPS_URL}/staffList/${staffId}`
            )

            return response.data;
        } catch (e) {
            console.error(e)
            if (!e.response) {
                throw e
            }
            return thunkAPI.rejectWithValue(e.response);
        }
    }
)

export const fetchCreateStaff = createAsyncThunk(
    "staff/createStaff",
    async (staffData, thunkAPI ) => {
        try {
            const response=  await axios.post(
                `${process.env.REACT_APP_DB_HTTPS_URL}/staffList`, staffData
            )
            return response.data;
        } catch (e) {
            console.error(e)
            if (!e.response) {
                throw e
            }
            return thunkAPI.rejectWithValue(e.response);
        }

    }
)

export const fetchUpdateStaffList = createAsyncThunk(
    "staff/updateStaffList",
    async (arg, thunkAPI) => {
        try {
            const response=  await axios.put(
                `${process.env.REACT_APP_DB_HTTPS_URL}/staffList/${arg.id}`, arg
            )
            return response.data;
        } catch (e) {
            if (!e.response) {
                throw e
            }
            return thunkAPI.rejectWithValue(e.response);
        }
    }
)