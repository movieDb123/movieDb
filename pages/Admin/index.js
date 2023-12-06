import React, {useContext} from 'react'
import Button from 'react-bootstrap/Button';
import styles from './index.module.css'
import { useRouter } from 'next/router';
import authContext from '@/utils/Auth/authContext'



export default function index() {

    const router = useRouter();


    const userInfo = useContext(authContext);

    console.log(userInfo)



  return (
    <div className={styles.page}>

        <h3 className='text-main'>Admin Pannel</h3>

        <div className={styles.buttons}>

        <Button variant="primary" onClick={()=>{router.push('/Admin/CreateMovie')}}>Add Movie</Button>
      <Button variant="secondary" onClick={()=>{router.push('/Admin/CreateDirector')}}>Add Director</Button>
      <Button variant="success" onClick={()=>{router.push('/Admin/UpdateMovies')}}>Update Cast</Button>
      <Button variant="danger" onClick={()=>{router.push('/Admin/DeleteMovie')}}>Delete Movie</Button>
        </div>
      
    </div>
  )
}
