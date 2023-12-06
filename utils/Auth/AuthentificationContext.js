import React, {useState, useEffect} from 'react'
import axios from 'axios';
import data from '../Data/data.js';
import authContext from './authContext.js';
import { useRouter } from 'next/router.js';

const {serverUrl} = data;

export default function AuthentificationContext(props) {
  const router = useRouter();

    const [authenticationData, setauthenticationData] = useState(null)
    
    const getUserInfo = async () => {
        axios.defaults.withCredentials = true;
        try{
          const userData = await axios.get('/api/getUserInfo', { withCredentials: true })
          setauthenticationData(userData.data);
        }
        catch(error){
          if(error.response && error.response.status == 401){
            setauthenticationData(false);
            router.push('../login')
          }
          
        }
    }

    useEffect(() => {
        getUserInfo();
    }, [])


  return (
    <authContext.Provider value={authenticationData} >
        {props.children}
    </authContext.Provider>
  )
}
