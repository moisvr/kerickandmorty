import React from 'react';

import './Loader.css';

function Loader(props) {
    if(props.loading){
        return (
            <div className="lds-ripple">
                <div>    
                </div>  
                <div>
                </div>
            </div>
        )
    }else{
        return(
            <React.Fragment></React.Fragment>
        )
    }
}

export default Loader;