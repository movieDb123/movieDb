import React, { useState, useEffect, useRef, use } from 'react'
// import styles from './Show.module.css'
import styles from './UpdateSelectedMovie.module.css'
import { CiSearch } from "react-icons/ci";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Pagination from 'react-bootstrap/Pagination';
import { MdOutlineStar } from "react-icons/md";
import { MdOutlineStarBorder } from "react-icons/md";
import { useRouter } from 'next/router';

import { MdDelete } from "react-icons/md";



axios.defaults.withCredentials = true;



export default function UpdateSelectedMovie() {


const router = useRouter();

const [show, setshow] = useState(null);

const getShow = async ()=>{
    console.log('getting shows');
    console.log(router.query)
    const data = await axios.post('/api/getShow', {id: router.query.id})
    console.log(data.data);
    setshow(data.data);
}

useEffect(()=>{
    if(!router.query || !router.query.id)
    return;

    getShow();

}, [router.query])


  // Cast and Filter Cast

  const [casts, setcasts] = useState(null);
  const [filterCasts, setfilterCasts] = useState(null);
  const [searchCast, setsearchCast] = useState(null);


  const getCasts = async () => {
    const response = await axios.get('/api/getCasts');
    setcasts(response.data);
  }


  const alterCasts = async (str) => {
    str = str.toLowerCase();


    const filterCasts = casts.filter(cast =>
      cast.cast_name.toLowerCase().includes(str)
    );
    setfilterCasts(filterCasts);
  }



  useEffect(() => {
    getCasts();
  }, [])

  useEffect(() => {
    if (searchCast != null)
      alterCasts(searchCast);
  }, [searchCast])


  // adding filter

  const filters = useRef({ genres: [], directors: [], casts: [],});



  const addCast = async (cast_id) => {
    const index = filters.current.casts.indexOf(cast_id);

    if (index == -1) {
      filters.current.casts.push(cast_id);
      return;
    }
    filters.current.casts.splice(index, 1);

  }


  

  const addActors = async () => {

    if(filters.current.casts.length == 0){
        return;
    }
    console.log(filters.current.casts);

    const  data = await axios.post('/api/addCast', {show_id: show.show_id, casts: filters.current.casts});

    window.location.reload();
   
  }

  const deleteCast = async (name)=>{
    console.log(name)
    const  data = await axios.post('/api/deleteCast', {show_id: show.show_id, cast: name});
    window.location.reload();

  }




  // save movies

  

  return (
    <div className={styles.page}>

      <div className={styles.filters}>
        <h1 className='text-main'>Filters</h1>
        

        

        <div className={styles.filter}>
          <h3 className='text-main'>Actors</h3>

          <div className={styles.searchBox}>
            <Form.Control type="text" placeholder="search actors" onChange={e => setsearchCast(e.target.value)} />
            {/* <CiSearch size={'32px'} /> */}
          </div>

          <div className={styles.results}>

            {
              casts == null ?
                <></>

                :

                filterCasts != null ?

                  filterCasts.map((elem) =>
                    <div className={styles.result} key={elem.cast_id}>
                      <label htmlFor={`cast${elem.cast_id}`} className='text-main' >{elem.cast_name}</label>
                      <input type="checkbox" id={`cast${elem.cast_id}`} onClick={() => { addCast(elem.cast_name) }} />
                    </div>
                  )
                  :
                  casts.map((elem) =>
                    <div className={styles.result} key={elem.cast_id}>
                      <label htmlFor={`cast${elem.cast_id}`} className='text-main' >{elem.cast_name}</label>
                      <input type="checkbox" id={`cast${elem.cast_id}`} onClick={() => { addCast(elem.cast_name) }} />
                    </div>
                  )
            }

          </div>

        </div>
        <div className={styles.buttons}>
          <Button variant="primary" onClick={addActors}>Add Cast To Movie</Button>
          <Button variant="secondary" onClick={() => { window.location.reload() }}>Reset Filters</Button>
        </div>
      </div>


      <div className={styles.movies}>
        <h1 className='text-main'>Netflix Shows</h1>

        
        
        <div className={styles.container}>

          {
            show&&
            <div className={styles.movie}>
            <h4 className='text-dark'>{show.title}</h4>
            
            <Accordion className={styles.accordions}>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Casts</Accordion.Header>
                <Accordion.Body>
                  <div className={styles.castContainer}>

                    {
                      show.cast != null &&
                      show.cast.map(elem => 
                      <div className='text-main'>
                        <p>{elem}</p>
                        <MdDelete onClick={()=>{deleteCast(elem)}} />

                      </div>)
                    }
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

           
                
                

          </div>
          }
        </div>

        

      </div>

    </div>
  )
}