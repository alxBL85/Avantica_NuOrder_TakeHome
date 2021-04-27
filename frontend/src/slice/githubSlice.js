import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIssuesService } from '../services';

// ---------------------------------------------------------------

export const requestIssuesThunk = createAsyncThunk('requestIssuesThunk', async (data, thunkApi) => {
    const { username } = data;

   try {
    const response = await getIssuesService(username);

    const openIssues = response.data.map(issue => {
        const { number, title, body, labels } = issue;
        const theLabels = labels.map(label => label.name).join(' , ');

        return { text: `${number} - ${title} (${theLabels})`, 
                value: number, 
              tooltip: body.substring(0, 25) }; 
    }).sort( (a,b) => a.value - b.value);

    return { openIssues };
    }
    catch( error )
    {
        return { error };
    }
});

// -------------------------------------------------------------------------------------------------

const initialState = {
  issues: [],
  selectedIssue: null,
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
    },

    extraReducers: {

    [requestIssuesThunk.pending]: (state) => {
        state.issues = [];
        state.error = '';
        state.loading = true;
        state.selectedIssue = null;
    },

    [requestIssuesThunk.fulfilled]: (state, action) => {
        if(action.payload.error)
        {
            state.error = action.payload.error.message;
        }
        else if (action.payload.openIssues)
        {
            state.issues = action.payload.openIssues;
            state.error = '';
        }
        
        state.loading = false;        
    },

    [requestIssuesThunk.rejected]: (state, action) => {
        state.issues = [];
        state.error = action.error;
        state.loading = false;
    },

    }
});

// ------------- Action Creators: -------------------

export const { selectIssue } = gitHubSlice.actions;

// ------------- Selectors: -------------------------

export const getIssues = (state) => state.gitHubReact.issues;
export const getSelectedIssue = (state) => state.gitHubReact.selectedIssue;
export const isLoading = (state) => state.gitHubReact.loading;
export const getError = (state) => state.gitHubReact.error;

// ------------- Reducer: ---------------------------

export default gitHubSlice.reducer;