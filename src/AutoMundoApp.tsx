import React from "react";
import Form from './components/Form';
const AutoMundoApp:React.FC = () => {
  return(
    <div className="container">
      <img src={require('./assets/autoMundo.png')} alt="logo" className="logo"/>
      <Form/>
    </div>
)};
export default AutoMundoApp;
