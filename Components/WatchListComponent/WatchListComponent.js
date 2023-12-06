import React from 'react'
import styles from './WatchList.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import { MdOutlineStar } from "react-icons/md";
import { MdOutlineStarBorder } from "react-icons/md";
import { ConstructionOutlined } from '@mui/icons-material';
import { IoCheckmark } from "react-icons/io5";




axios.defaults.withCredentials = true;

export default function WatchListComponent() {

    const [shows, setshows] = useState(null);
    const [savedMovies, setsavedMovies] = useState([])

    const getSavedShows = async ()=>{
        const data = await axios.get('api/getSavedMovies');
        setshows(data.data)
        setactiveShows(data.data);
    }

    useEffect(()=>{
        getSavedShows();
    }, [])

    async function saveMovie(id) {

        const data = await axios.get('api/saveMovie', { params: { id } })
        window.location.reload();
      }
    
      async function getSavedMovies() {
        const data = await axios.get('api/getSavedMovieIds');
        setsavedMovies(data.data);
      }
    
      useEffect(() => {
        getSavedMovies();
      }, [])


      const [filter, setfilter] = useState(0)

      const [activeShows, setactiveShows] = useState(null);


      const filterShows = async ()=>{
        console.log(filter)
        if(filter == 0){
            console.log('get all movies')
            setactiveShows([...shows])
            return;
        }
        if(filter == 1){
            console.log('filter out watching movies')
            const array = shows.filter((elem)=>{
                return elem.status == 0
            })
            console.log(array)
            setactiveShows([...array])

        }
        if(filter == 2){
            console.log('filter out watched movies')
            const array = shows.filter((elem)=>{
                return elem.status == 1
            })
            console.log(array)
            setactiveShows([...array])

        }
      }

      useEffect(()=>{
        if(!shows)return;
        filterShows();
      }, [filter])

      const markAsWatched = async (id)=>{
        const data = await axios.get('api/markAsWatched', {params: {id}})
        window.location.reload();
      }


    if(!shows || !activeShows)return

  return (

    <div className={styles.page}>

        <h1 className='text-main'>My Watch List</h1>

        <div className={styles.filters}>
            {
                filter == 0?
                <Button variant="outline-secondary active" onClick={()=>{setfilter(0)}}>All</Button>
                :
                <Button variant="outline-secondary" onClick={()=>{setfilter(0)}}>All</Button>
            }
            {
                filter == 1?
                <Button variant="outline-primary active" onClick={()=>{setfilter(1)}}>Watching</Button>
                :
                <Button variant="outline-primary" onClick={()=>{setfilter(1)}}>Watching</Button>
            }
            {
                filter == 2?
                <Button variant="outline-success active" onClick={()=>{setfilter(2)}}>Watched</Button>
                :
                <Button variant="outline-success" onClick={()=>{setfilter(2)}}>Watched</Button>
            }

        </div>


        <div className={styles.movies}>
            <div className={styles.container}>

        {
            activeShows.map(elem => {
              return (
                <div className={styles.movie}>

                <div className={styles.status}>
                    {
                        elem.status == 0?
                        <>
                            <div className={`${styles.dot} ${styles.watching}`}></div>
                            <p className='text-main'>Watching</p>
                        </>
                        :
                        <>
                            <div className={`${styles.dot} ${styles.watched}`}></div>
                            <p className='text-main'>Watched</p>
                        </>
                    }
                </div>

                  <h4 className='text-dark'>{elem.showDetails[0].title}</h4>
                  <p className={`${'text-dark'} ${styles.date}`}>{elem.showDetails[0].release_year}</p>
                  {
                    elem.duration ?

                      <p className='text-main'>Duration: {elem.showDetails[0].duration}</p>
                      :
                      <p className='text-main'>
                        duration not found
                      </p>
                  }
                  <p className='text-main'>{elem.showDetails[0].rating}</p>
                  {
                    elem.showDetails[0].director ?

                      <p className='text-main'>Directed By {elem.showDetails[0].director}</p>
                      :
                      <p className='text-main'>
                        director not found
                      </p>
                  }
                  <Accordion className={styles.accordions}>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Genres</Accordion.Header>
                      <Accordion.Body>
                        <ul>

                          {
                            elem.showDetails[0].listed_in != null &&
                            elem.showDetails[0].listed_in.map(elem => <li className='text-main'>{elem}</li>)
                          }
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Casts</Accordion.Header>
                      <Accordion.Body>
                        <ul>

                          {
                            elem.showDetails[0].cast != null &&
                            elem.showDetails[0].cast.map(elem => <li className='text-main'>{elem}</li>)
                          }
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

                  {

                    elem.status == 0
                    &&
                      <div className={styles.save}>
                        <IoCheckmark size='20px' className='text-main' onClick={() => { markAsWatched(elem.show_id) }} />
                        <p onClick={() => { markAsWatched(elem.show_id) }} className='text-main'>mark as watched</p>
                      </div>
                    
                  }
                  
                  {

                    savedMovies.includes(elem.show_id) ?
                      <div className={styles.save}>
                        <MdOutlineStar size='20px' className='text-main' onClick={() => { saveMovie(elem.show_id) }} />
                        <p onClick={() => { saveMovie(elem.show_id) }} className='text-main'>remove from watch list</p>
                      </div>
                      :
                      <div className={styles.save}>
                        <MdOutlineStarBorder size='20px' className='text-main' onClick={() => { saveMovie(elem.show_id) }} />
                        <p onClick={() => { saveMovie(elem.show_id) }} className='text-main'>add to watch list</p>
                      </div>
                  }

                </div>
              )
            })
          }
                      </div>

        </div>

    </div>

  )
}
