import React, {useState} from 'react'
import { useAuth } from '../context/AuthContext';
import {useNavigate} from "react-router-dom";


function LoginDominio(props) {
    const[user, setUser] = useState({
        email:"",
        password:"",
    });

    const {login} = useAuth();
    
    const navigate = useNavigate();
    

    const handleChange = ({ target: {name, value}}) =>
        setUser({...user, [name]: value});

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await login(user.email, user.password);
            navigate("/panel");
        }catch (error){
            
        }
    };

    const handleRegister = async () => {
        navigate('/registrarUsuario');
    }

  return (
    <>
    {props.children({
      
      handleRegister,
      handleSubmit,
      handleChange            
    })}
  </>
  )
}

export default LoginDominio;