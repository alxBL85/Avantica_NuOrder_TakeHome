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
    getSelectedDescription, // Selector
    } from '../slice/githubSlice';

import '../styles/body.css';

const Body = () => {

  const dispatch = useDispatch();

  // ------------ SELECTORS ---------------------------
  
  const issues = useSelector(getIssues);
  const selectedIssue = useSelector(getSelectedIssue);
  const loading = useSelector(isLoading);
  const error = useSelector(getError);
  const selectedDescription = useSelector(getSelectedDescription);

  // ------------ LOCAL STATE -------------------------
  
  const [localValue, setLocalValue] = useState('');
  const [timerId, setTimerId] = useState('');

  // ------------ EFFECTS -----------------------------

  useEffect(()=>{
   dispatch(requestIssuesThunk('alxBL85'));    
  }, []);

  useEffect(()=>{}, [selectedIssue])

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

  const handleSubmit = (event) => {
      event.preventDefault();
  };

  /**
   * This function handles the event when the user click's over one of the displayed options
   * @param {*} event 
   * @param {*} option 
   * @param {*} reason 
   */
  const handleInputChange = (event, option, reason) => {
    if (reason === 'reset' || reason === 'clear')
    {
     const theEvent = {
        target: {
            value: option,
        }
     }
    
     handleChange(theEvent);
    }
  }
  
// ---------------------  RENDER --------------------------------------------

 return (<div className='bodyContainer'>    
      
    <form className={"inputSearchIssue"} noValidate autoComplete="off" onSubmit={handleSubmit}>
      
      {loading? 'Loading...' : <Autocomplete
      id="searchInput"
      freeSolo
      className="inputTextField"
      handleHomeEndKeys
      onInputChange = {handleInputChange}
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

     {selectedDescription && <textarea className="issueDescription" rows={16} value = {selectedDescription} readOnly/>
        
     }
    
    
  </div>
 );   
}

export default Body;