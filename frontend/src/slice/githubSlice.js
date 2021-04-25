import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  issues: ['hello', 'world'],
  selectedIssue: 'Holis',
  isLoading: false,
  error: '',  
};

export const gitHubSlice = createSlice({
    name: 'gitHubReactSlice',
    initialState,
    reducers: {
        selectIssue: (state, action) => {
            state.selectedIssue = action.payload;
        },

    }
});

// Action Creators:
export const { selectIssue } = gitHubSlice.actions;

// Selectors:
export const getIssues = (state) => state.gitHubReact.issues;
export const getSelectedIssue = (state) => state.gitHubReact.selectedIssue;

// Reducer:
export default gitHubSlice.reducer;