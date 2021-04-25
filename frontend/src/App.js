import React, { useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

import { selectIssue, getIssues, getSelectedIssue } from './slice/githubSlice';

const App = () => {
  const dispatch = useDispatch();

  // ------------ SELECTORS ---------------------------
  const issues = useSelector(getIssues);
  const selectedIssue = useSelector(getSelectedIssue);

  // ------------ LOCAL STATE -------------------------
  const [localValue, setLocalValue] = useState('');
  const [timerId, setTimerId] = useState('');

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
        <TextField id="outlined-basic" label="Search Issue" variant="outlined" value={localValue} onChange={handleChange}/>
      </form>

      
    </div>
</Box>


    
  );
}

export default App;
