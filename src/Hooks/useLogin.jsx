import { useState } from "react";
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom';
import { backend } from "../components/data/url";
// import { useHistory } from 'react-router-dom';
export const useLogin = ()=>{
    const [ error, setError] = useState(null)
    const [ isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext();
    const navigate = useNavigate()
    const history = useNavigate();
    const login = async (email, password)=>{
        setError(null)
        setIsLoading(true)
console.log(email, password)
        const response = await fetch(`${backend}/user/Login`, {
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({ email, password })
        })

        const json = await response.json()
        console.log(json)
        if(!response.ok){
            setIsLoading(false)
            setError(json.error)   

        }
        if(response.ok){
            //save  user to localstorage
            localStorage.setItem('user', JSON.stringify(json))
            //update the auth context
            dispatch({type:'LOGIN', payload:json})
            setIsLoading(false)
            // navigate('/')
            if (navigate.canGoBack()) {
                navigate.goBack();
              }
            //   history.goBack();
        }
    }
    return { login, isLoading, error }
}