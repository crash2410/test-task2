import {createSlice} from "@reduxjs/toolkit";
import {filteredStaffList, sortingStaffList} from "../../utils/sortOrFilter";
import {fetchGetStaffById, fetchGetStaffList, fetchUpdateStaffList} from "../thunk/staffThunk";

const initialState = {
    staffList: [],
    staffListCopy: [],
    staffFilteredList: [],
    editedStaffData: null,
    selectFilter: {
        name: "Сбросить",
        value: "default",
        isArchive: false,
    },
    sortParam: {value: "default", text: "Сбросить"},
    loading: false,
    error: null
}

const staffSlice = createSlice({
    name: "staff",
    initialState,
    reducers: {
        setFilter(state, action) {

            if (action.payload?.type === "changeIsArchive") {
                state.selectFilter = {
                    ...state.selectFilter,
                    isArchive: action.payload?.isArchive
                };
            } else {
                state.selectFilter = {
                    ...action.payload,
                    isArchive: state.selectFilter.isArchive
                };
            }
            state.sortParam = {value: "default", text: "Сбросить"};

            filteredStaffList(state);
        },
        setSortParams(state, action) {
            state.sortParam = action.payload;
            sortingStaffList(state);
        },
        setArchiveStaff(state, action) {
            state.selectFilter = {...state.selectFilter, isArchive: action.payload};
        },
        updateStaffData(state, action) {
            const index = state.staffList.findIndex(emp => emp.id === action.payload.id);
            if (index !== -1) state.staffList[index] = action.payload;
        },
        addEmployee(state, action) {
            state.staffList.push(action.payload);
        },
        editStaff(state, action) {
            const {type, phone, birthday, name, isArchive, role} = action.payload

            switch (type) {
                case "phone":
                    state.editedStaffData = {...state.editedStaffData, phone: phone}
                    break
                case "birthday":
                    state.editedStaffData = {...state.editedStaffData, birthday}
                    break
                case "name":
                    state.editedStaffData = {...state.editedStaffData, name}
                    break
                case "isArchive":
                    state.editedStaffData = {...state.editedStaffData, isArchive}
                    break
                case "role":
                    state.editedStaffData = {...state.editedStaffData, role}
                    break
                default:
                    break
            }

        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGetStaffList.pending, state => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchGetStaffList.fulfilled, (state, action) => {
            state.loading = false;

            state.staffList = action.payload;
            state.staffListCopy = state.staffList;

            state.selectFilter = {
                name: "Сбросить",
                value: "default",
                isArchive: false,
            }
        })
        builder.addCase(fetchGetStaffList.rejected, (state, action) => {
            state.loading = false;
            state.error = action;
        })
        builder.addCase(fetchUpdateStaffList.pending, state => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchUpdateStaffList.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(fetchUpdateStaffList.rejected, (state, action) => {
            state.loading = false;
            state.error = action;
        })
        builder.addCase(fetchGetStaffById.pending, state => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchGetStaffById.fulfilled, (state, action) => {
            state.loading = false;

            state.editedStaffData = action.payload;
        })
        builder.addCase(fetchGetStaffById.rejected, (state, action) => {
            state.loading = false;
            state.error = action;
        })
    }
})

export const {editStaff, setArchiveStaff, setFilter, setSortParams, updateStaffData, addEmployee} = staffSlice.actions;
export default staffSlice.reducer