import Loader from 'react-loader-spinner'
import React from 'react';

class LoaderComponent extends React.Component {
    render() {
        return (<div className="d-flex justify-content-center align-content-center py-5 my-5"><Loader
        type="MutatingDots"
        color="#FFBF37"
        secondaryColor="#5EBDDB"
        height={150}
        width={150}/></div>);
    }
  }
  
  export default LoaderComponent;