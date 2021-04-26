import React, { useState, useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';


import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { requestIssuesThunk,// Thunk 
         selectIssue,       // Action
         getIssues,         // Selector
         getSelectedIssue,  // Selector
         isLoading,         // Selector
         getError,             // Selector
         } from './slice/githubSlice';

const App = () => {
  const dispatch = useDispatch();

  // ------------ SELECTORS ---------------------------
  const issues = useSelector(getIssues);
  const selectedIssue = useSelector(getSelectedIssue);
  const loading = useSelector(isLoading);
  const error = useSelector(getError);

  // ------------ LOCAL STATE -------------------------
  const [localValue, setLocalValue] = useState('');
  const [timerId, setTimerId] = useState('');

  // ------------ EFFECTS -----------------------------

  useEffect(()=>{
   dispatch(requestIssuesThunk('alxBL85'));    
  }, []);

  // ------------ EVENT HANDLERS ----------------------
  const handleChange = (event) => {
    
    clearTimeout(timerId);
    
    const { value } = event.target;
    setLocalValue(value);

    const timeOutId = setTimeout(()=>{
      dispatch(selectIssue(value));
    }, 1000);

    setTimerId(timeOutId);

    
  };
  
  // ------------ RENDER ------------------------------
  return (

    <Box component="span" m={1}>
 <div>
      Developer: Bacilio Alexander Bolaños Lima <br/>
      Email: alexander.bl85@gmail.com <br/>
      Date: 21/04/2021
      <hr/>

      <form className={"inputSearchIssue"} noValidate autoComplete="off">
        
        {loading? 'Loading...' : <Autocomplete
        id="searchInput"
        freeSolo
        options={issues.map(issue => issue.text)}
        renderInput={(params) => (
          <TextField 
            {...params} 
            label="Search Open Issues" 
            margin="normal" 
            variant="outlined"
            value={localValue} 
            onChange={handleChange}           
          />
        )}
        />}    

      </form>

      {selectedIssue}
      
    </div>
</Box>
    
  );
}

export default App;
