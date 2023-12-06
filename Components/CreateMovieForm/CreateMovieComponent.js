import React, { useState, useRef } from 'react'
import { Formik } from 'formik';
import styles from './CreateMovie.module.css'
import axios from 'axios';
import { useRouter } from 'next/router';
import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect } from 'react';


function checkReleaseYear(year) {
    const y = parseInt(year);

    if (Number.isNaN(y)) {
        return false;
    }
    else if (y < 1899 || y > 2023) return false;
    return true;
}


axios.defaults.withCredentials = true;

export default function CreateMovieComponent() {


    const router = useRouter();

    const [type, settype] = useState(null)

    async function sendInfo(values) {
        console.log('sending info')
        console.log(values);
        try {
            let data = await axios.post('/api/createMovie', { info: values })
            window.location.reload();
        }
        catch (e) {
            alert('there was an error');
        }

    }

    const [directors, setdirectors] = useState(null);

    const [filterDirectors, setfilterDirectors] = useState(null);
    const [searchDirector, setsearchDirector] = useState(null)
    const [selectedDirector, setselectedDirector] = useState(null)

    useEffect(() => {
        if (searchDirector != null)
            alterDirectors(searchDirector);
    }, [searchDirector])


    const getDirectors = async function () {
        const response = await axios.get('/api/getDirectors');
        setdirectors(response.data);
    }
    const alterDirectors = async (str) => {
        str = str.toLowerCase();
        const filteredDirectors = directors.filter(director =>
            director.director_name.toLowerCase().includes(str)
        );
        setfilterDirectors(filteredDirectors);
    }

    useEffect(() => {
        getDirectors();
    }, [])

    const [genres, setgenres] = useState(null);
    const [selectedGenres, setselectedGenres] = useState([])





    const getGenres = async function () {
        const response = await axios.get('/api/getGenres');
        setgenres(response.data);
    }

    useEffect(() => {
        getGenres();
    }, [])

    const selectGenre = async function (genre) {


        const index = selectedGenres.indexOf(genre);
        if (index == -1) {
            const arr = selectedGenres;
            arr.push(genre);
            setselectedGenres([...arr]);
            return;
        }

        const arr = [...selectedGenres];
        arr.splice(index, 1);
        setselectedGenres([...arr]);
    }

    console.log(selectedGenres)


    return (
        <div className={styles.page}>

            <div className={styles.formCard}>
                <h1 className='text-main'>Create Movie Form</h1>
                <Formik
                    initialValues={{ title: '', release_year: null, duration: null, rating: '' }}
                    validate={values => {
                        const errors = {};

                        if (!values.title) {
                            errors.title = 'Required'
                        }

                        if (!values.release_year) {
                            errors.release_year = 'required'
                        }
                        if (!checkReleaseYear(values.release_year)) {
                            errors.release_year = 'Enter Valid Release Year'
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log('submitting')
                        console.log(values)
                        
                        if(selectedDirector == null){
                            alert('select director');
                            setSubmitting(false);
                            return;

                        }
                        console.log(selectedGenres.length)
                        if(selectedGenres.length == 0){
                            alert('select atleast one genre')
                            setSubmitting(false);
                            return;
                        }
                        if(type == null){
                            alert('select type of movie')
                            return;
                        }
                        let data = {...values, type: type, director: selectedDirector, genres: selectedGenres}
                        sendInfo(data)

                        
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                    }) => (

                        <form onSubmit={handleSubmit} className='text-main'>
                            <div className={styles.row}>
                                <div className={`${styles.inputContainer} ${styles.half}`}>

                                    <p className={` ${styles.label} ${styles.compulsory}`}>Title *</p>

                                    <input
                                        type="text"
                                        name="title"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.title}
                                    />
                                    <br />
                                    <div className={styles.error}>
                                        {errors.title && touched.title && errors.title}
                                    </div>
                                </div>
                                <div className={`${styles.inputContainer} ${styles.half}`}>

                                    <p className={` ${styles.label} ${styles.compulsory}`}>Relase Year *</p>

                                    <input
                                        type="text"
                                        name="release_year"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.release_year}
                                    />
                                    <br />
                                    <div className={styles.error}>
                                        {errors.release_year && touched.release_year && errors.release_year}
                                    </div>
                                </div>


                            </div>


                            <div className={styles.row}>
                                <div className={`${styles.inputContainer} ${styles.half}`}>

                                    <p className={` ${styles.label} ${styles.compulsory}`}>duration *</p>

                                    <input
                                        type="text"
                                        name="duration"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.duration}
                                    />
                                    <br />
                                    <div className={styles.error}>
                                        {errors.duration && touched.duration && errors.duration}
                                    </div>
                                </div>
                                <div className={`${styles.inputContainer} ${styles.half}`}>

                                    <p className={` ${styles.label} ${styles.compulsory}`}>Rating *</p>

                                    <input
                                        type="text"
                                        name="rating"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.rating}
                                    />
                                    <br />
                                    <div className={styles.error}>
                                        {errors.rating && touched.rating && errors.rating}
                                    </div>
                                </div>


                            </div>

                            <div className={styles.row}>

                                <Dropdown>
                                    {
                                        type != null ?

                                            <Dropdown.Toggle variant="success" id="dropdown-basic3">
                                                {type}
                                            </Dropdown.Toggle>
                                            :
                                            <Dropdown.Toggle variant="success" id="dropdown-basic3">
                                                Type
                                            </Dropdown.Toggle>
                                    }

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => { settype('Movie') }}>Movie</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { settype('TV Show') }}>TV Show</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                            </div>




                            <div className={styles.row}>
                                <Dropdown>

                                    {
                                        selectedDirector ?
                                            <Dropdown.Toggle variant="success" id="dropdown-basic1">
                                                Director: {selectedDirector.director_name}
                                            </Dropdown.Toggle>
                                            :
                                            <Dropdown.Toggle variant="success" id="dropdown-basic1">
                                                Select Director
                                            </Dropdown.Toggle>
                                    }

                                    <Dropdown.Menu className={styles.dropMenu}>

                                        <input type="text" placeholder='search directors' onChange={e => setsearchDirector(e.target.value)} />

                                        {
                                            directors == null ?
                                                <></>
                                                :
                                                filterDirectors != null ?
                                                    filterDirectors.map(elem => {
                                                        return (

                                                            <Dropdown.Item onClick={() => { setselectedDirector(elem) }}>{elem.director_name}</Dropdown.Item>
                                                        )
                                                    })
                                                    :
                                                    directors.map(elem => {
                                                        return (

                                                            <Dropdown.Item onClick={() => { setselectedDirector(elem) }}>{elem.director_name}</Dropdown.Item>
                                                        )
                                                    })
                                        }

                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>

                            <div className={styles.row}>
                                <Dropdown autoClose="outside">

                                    {
                                        <Dropdown.Toggle variant="success" id="dropdown-basic2">
                                            Select Genre
                                        </Dropdown.Toggle>
                                    }

                                    <Dropdown.Menu className={styles.dropMenu}>
                                        {
                                            genres
                                            &&
                                            genres.map(elem => {
                                                return (

                                                    <div className={styles.genres}>

                                                        <div className={styles.genre}>
                                                            <label htmlFor={`genre${elem.genre_id}`}>{elem.genre_name}</label>
                                                            <input type="checkbox" id={`genre${elem.genre_id}`} checked={selectedGenres.includes(elem.genre_name)} onClick={() => { selectGenre(elem.genre_name) }}/>
                                                        </div>

                                                        
                                                    </div>
                                                )
                                            })
                                        }

                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>

                            




                            <div className={styles.buttonContainer}>
                                <button type="submit" disabled={isSubmitting}>
                                    Submit
                                </button>
                            </div>
                        </form>
                    )}

                </Formik>


            </div>


        </div>
    )
}
