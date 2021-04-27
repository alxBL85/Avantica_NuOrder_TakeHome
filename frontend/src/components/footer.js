import React from 'react';
import '../styles/footer.css';

const Footer = () => {

 return (<div className='footerContainer'>
         link: <a href="https://github.com/facebook/react/issues">https://github.com/facebook/react/issues</a><br/>
         service: <a href="https://api.github.com/repos/facebook/react/issues?state=open">https://api.github.com/repos/facebook/react/issues?state=open</a>

    </div>
 );   
}

export default Footer;