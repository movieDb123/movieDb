import React, { useState, useEffect, useRef, use } from 'react'
import styles from './UpdateMovie.module.css'
import { CiSearch } from "react-icons/ci";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Pagination from 'react-bootstrap/Pagination';
import { MdOutlineStar } from "react-icons/md";
import { MdOutlineStarBorder } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useRouter } from 'next/router';



axios.defaults.withCredentials = true;



export default function UpdateMovieComponent() {

    const router = useRouter()

    const filters = useRef({ genres: [], directors: [], casts: [], });

    const movieSearch = useRef('');

    const searchMovie = async () => {
        console.log(movieSearch.current.value);
        console.log(movieSearch.current.value == "");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        setcurrentPage(0);
        const response = await axios.post('/api/getShowsWithFilters', { ...filters.current, page: 0, movieSearch: movieSearch.current.value });
        console.log(response)
        setshows(response.data);


    }


    const addGenre = async (genre_id) => {
        const index = filters.current.genres.indexOf(genre_id);

        if (index == -1) {
            filters.current.genres.push(genre_id);
            return;
        }
        filters.current.genres.splice(index, 1);
    }



    const addDirector = async (director_id) => {
        const index = filters.current.directors.indexOf(director_id);

        if (index == -1) {
            filters.current.directors.push(director_id);
            return;
        }
        filters.current.directors.splice(index, 1);
    }




    const addCast = async (cast_id) => {
        const index = filters.current.casts.indexOf(cast_id);

        if (index == -1) {
            filters.current.casts.push(cast_id);
            return;
        }
        filters.current.casts.splice(index, 1);

    }


    const [shows, setshows] = useState(null)


    const perPage = 12;
    const [currentPage, setcurrentPage] = useState(0)

    const nextPage = async () => {

        const response = await axios.post('/api/getShowsWithFilters', { ...filters.current, page: currentPage + 1, movieSearch: movieSearch.current.value });
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        setshows(response.data);
        setcurrentPage(currentPage + 1);

    }
    const prevPage = async () => {
        const response = await axios.post('/api/getShowsWithFilters', { ...filters.current, page: currentPage - 1, movieSearch: movieSearch.current.value });
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        setshows(response.data);
        setcurrentPage(currentPage - 1);
    }


    const applyFilters = async () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        setcurrentPage(0);
        const response = await axios.post('/api/getShowsWithFilters', { ...filters.current, page: 0, movieSearch: movieSearch.current.value });
        setshows(response.data);
    }

    const getShows = async () => {
        const response = await axios.post('/api/getShowsWithFilters', { ...filters.current, page: 0, movieSearch: movieSearch.current.value });
        setshows(response.data);
    }


    useEffect(() => {
        getShows();
    }, [])



    // save movies


    async function selectMovie(id) {

       router.push('../../Admin/UpdateMovie?id=' + id);

    }



    return (
        <div className={styles.page}>




            <div className={styles.movies}>
                <h1 className='text-main'>Netflix Shows</h1>


                <div className={styles.searchMovie}>
                    <Form.Control type="text" placeholder="search movies" ref={movieSearch} />
                    <CiSearch className='text-main' size='32px' onClick={searchMovie} />

                </div>

                <div className={styles.container}>

                    {
                        shows
                        &&
                        shows.movies.map(elem => {
                            return (
                                <div className={styles.movie}>
                                    <h4 className='text-dark'>{elem.title}</h4>
                                    <p className={`${'text-dark'} ${styles.date}`}>{elem.release_year}</p>
                                    {
                                        elem.duration ?

                                            <p className='text-main'>Duration: {elem.duration}</p>
                                            :
                                            <p className='text-main'>
                                                duration not found
                                            </p>
                                    }
                                    <p className='text-main'>{elem.rating}</p>
                                    {
                                        elem.director ?

                                            <p className='text-main'>Directed By {elem.director}</p>
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
                                                        elem.listed_in != null &&
                                                        elem.listed_in.map(elem => <li className='text-main'>{elem}</li>)
                                                    }
                                                </ul>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header>Casts</Accordion.Header>
                                            <Accordion.Body>
                                                <ul>

                                                    {
                                                        elem.cast != null &&
                                                        elem.cast.map(elem => <li className='text-main'>{elem}</li>)
                                                    }
                                                </ul>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>




                                    <div className={styles.save}>
                                        <p onClick={() => { selectMovie(elem.show_id) }} className='text-main'>Select Movie</p>
                                    </div>



                                </div>
                            )
                        })
                    }
                </div>

                {
                    shows &&
                    <div className={styles.pagination}>

                        <Pagination>
                            {
                                currentPage == 0 ?
                                    <></>
                                    :
                                    <Pagination.Prev onClick={prevPage} />
                            }
                            <Pagination.Ellipsis />

                            {
                                currentPage == 0 ?
                                    <></>
                                    :
                                    <Pagination.Item onClick={prevPage}>{currentPage}</Pagination.Item>
                            }
                            <Pagination.Item active>{currentPage + 1}</Pagination.Item>

                            {
                                (currentPage + 1) * perPage < shows.totalMovies
                                &&
                                <Pagination.Item onClick={nextPage}>{currentPage + 2}</Pagination.Item>
                            }
                            <Pagination.Ellipsis />

                            {
                                (currentPage + 1) * perPage < shows.totalMovies
                                &&
                                <Pagination.Next onClick={nextPage} />
                            }
                        </Pagination>
                    </div>
                }


            </div>

        </div>
    )
}
