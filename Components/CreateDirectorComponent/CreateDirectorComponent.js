import React, { useState, useRef } from 'react'
import { Formik } from 'formik';
// import styles from './CreateMovie.module.css'
import styles from '../CreateMovieForm/CreateMovie.module.css'
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

export default function CreateDirectorComponent() {


    

    async function sendInfo(values) {
        console.log('sending info')
        console.log(values);
        try {
            let data = await axios.post('/api/createDirector', { info: values })
            window.location.reload();
        }
        catch (e) {
            alert('there was an error');
        }

    }

    

    return (
        <div className={styles.page}>

            <div className={styles.formCard}>
                <h1 className='text-main'>Create Movie Form</h1>
                <Formik
                    initialValues={{ director_name: '' }}
                    validate={values => {
                        const errors = {};

                        if (!values.director_name) {
                            errors.title = 'Required'
                        }

                        
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        
                        sendInfo(values)

                        
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

                                    <p className={` ${styles.label} ${styles.compulsory}`}>Director Name *</p>

                                    <input
                                        type="text"
                                        name="director_name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.director_name}
                                    />
                                    <br />
                                    <div className={styles.error}>
                                        {errors.director_name && touched.director_name && errors.director_name}
                                    </div>
                                </div>
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
