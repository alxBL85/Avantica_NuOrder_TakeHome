import React, { useState, useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { requestIssuesThunk,// Thunk 
    selectIssue,       // Action
    getIssues,         // Selector
    getSelectedIssue,  // Selector
    isLoading,         // Selector
    getError,             // Selector
    } from '../slice/githubSlice';

import '../styles/body.css';

const Body = () => {

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

// ---------------------  RENDER --------------------------------------------

 return (<div className='bodyContainer'>    
      
    <form className={"inputSearchIssue"} noValidate autoComplete="off">
      
      {loading? 'Loading...' : <Autocomplete
      id="searchInput"
      freeSolo
      className="inputTextField"
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
 );   
}

export default Body;