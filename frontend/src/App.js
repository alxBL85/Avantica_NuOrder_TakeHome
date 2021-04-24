import React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';


function App() {
  return (

    <Box component="span" m={1}>
 <div>
      Developer: Bacilio Alexander Bolaños Lima <br/>
      Email: alexander.bl85@gmail.com
      <hr/>

      <form className={"inputSearchIssue"} noValidate autoComplete="off">
        <TextField id="outlined-basic" label="Search Issue" variant="outlined" />
      </form>
    </div>
</Box>


    
  );
}

export default App;
