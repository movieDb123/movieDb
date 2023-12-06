import React, { useState, useEffect, useRef, use } from 'react'
import styles from './Show.module.css'
import { CiSearch } from "react-icons/ci";
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Pagination from 'react-bootstrap/Pagination';
import { MdOutlineStar } from "react-icons/md";
import { MdOutlineStarBorder } from "react-icons/md";


axios.defaults.withCredentials = true;



export default function ShowComponent() {





  // Genre and Filter Genre
  const [genres, setgenres] = useState(null);
  const [filterGenres, setfilterGenres] = useState(null);
  const [searchGenre, setsearchGenre] = useState(null);


  const getGenres = async () => {
    const response = await axios.get('api/getGenres');
    setgenres(response.data);
  }


  const alterGenres = async (str) => {
    str = str.toLowerCase();

    const filteredGenres = genres.filter(genre =>
      genre.genre_name.toLowerCase().includes(str)
    );

    // Now set the filteredGenres to your state
    setfilterGenres(filteredGenres);
  }



  useEffect(() => {
    getGenres();
  }, [])

  useEffect(() => {
    if (searchGenre != null)
      alterGenres(searchGenre);
  }, [searchGenre])


  // Director and Filter Director

  const [directors, setdirectors] = useState(null);
  const [filterDirectors, setfilterDirectors] = useState(null);
  const [searchDirector, setsearchDirector] = useState(null);


  const getDirectors = async () => {
    const response = await axios.get('api/getDirectors');
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

  useEffect(() => {
    if (searchDirector != null)
      alterDirectors(searchDirector);
  }, [searchDirector])


  // Cast and Filter Cast

  const [casts, setcasts] = useState(null);
  const [filterCasts, setfilterCasts] = useState(null);
  const [searchCast, setsearchCast] = useState(null);


  const getCasts = async () => {
    const response = await axios.get('api/getCasts');
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

  const movieSearch = useRef('');

  const searchMovie = async ()=>{
    console.log(movieSearch.current.value);
    console.log(movieSearch.current.value == "");
    
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setcurrentPage(0);
    const response = await axios.post('api/getShowsWithFilters', { ...filters.current, page: 0, movieSearch: movieSearch.current.value });
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

    const response = await axios.post('api/getShowsWithFilters', { ...filters.current, page: currentPage + 1, movieSearch: movieSearch.current.value });
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setshows(response.data);
    setcurrentPage(currentPage + 1);

  }
  const prevPage = async () => {
    const response = await axios.post('api/getShowsWithFilters', { ...filters.current, page: currentPage - 1, movieSearch: movieSearch.current.value });
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
    const response = await axios.post('api/getShowsWithFilters', { ...filters.current, page: 0, movieSearch: movieSearch.current.value });
    setshows(response.data);
  }

  const getShows = async () => {
    const response = await axios.post('api/getShowsWithFilters', { ...filters.current, page: 0, movieSearch: movieSearch.current.value });
    setshows(response.data);
  }


  useEffect(() => {
    getShows();
  }, [])



  // save movies

  const [savedMovies, setsavedMovies] = useState([])

  async function saveMovie(id) {

    const data = await axios.get('api/saveMovie', { params: { id } })


    let index = savedMovies.indexOf(id);
    if (index == -1) {
      setsavedMovies([...savedMovies, id]);
      return
    }


    let newArr = savedMovies
    newArr.splice(index, 1)
    setsavedMovies([...newArr])
  }

  async function getSavedMovies() {
    console.log('getting saved movies data')
    const data = await axios.get('api/getSavedMovieIds');
    console.log(data);
    setsavedMovies(data.data);
  }

  useEffect(() => {
    getSavedMovies();
  }, [])



  return (
    <div className={styles.page}>

      <div className={styles.filters}>
        <h1 className='text-main'>Filters</h1>
        <div className={styles.filter}>
          <h3 className='text-main'>Directors</h3>

          <div className={styles.searchBox}>
            <Form.Control type="text" placeholder="search directors" onChange={e => setsearchDirector(e.target.value)} />
          </div>

          <div className={styles.results}>

            {
              directors == null ?
                <></>

                :

                filterDirectors != null ?

                  filterDirectors.map((elem) =>
                    <div className={styles.result} key={elem.director_id}>
                      <label htmlFor={`director${elem.director_id}`} className='text-main' >{elem.director_name}</label>
                      <input type="checkbox" id={`director${elem.director_id}`} checked={filters.current.directors.includes(elem.director_name)} onClick={() => { addDirector(elem.director_name) }} />
                    </div>
                  )
                  :

                  directors.map((elem) =>
                    <div className={styles.result} key={elem.director_id}>
                      <label htmlFor={`director${elem.director_id}`} className='text-main' >{elem.director_name}</label>
                      <input type="checkbox" id={`director${elem.director_id}`} onClick={() => { addDirector(elem.director_name) }} />
                    </div>
                  )
            }

          </div>

        </div>


        <div className={styles.filter}>
          <h3 className='text-main'>Genre</h3>

          <div className={styles.searchBox}>
            <Form.Control type="text" placeholder="search genres" onChange={e => setsearchGenre(e.target.value)} />
            {/* <CiSearch size={'32px'} /> */}
          </div>

          <div className={styles.results}>

            {
              genres == null ?
                <></>

                :

                filterGenres != null ?

                  filterGenres.map((elem) =>
                    <div className={styles.result} key={elem.genre_id}>
                      <label htmlFor={`genre${elem.genre_id}`} className='text-main' >{elem.genre_name}</label>
                      <input type="checkbox" id={`genre${elem.genre_id}`} onClick={() => { addGenre(elem.genre_name) }} />
                    </div>
                  )
                  :

                  genres.map((elem) =>
                    <div className={styles.result} key={elem.genre_id}>
                      <label htmlFor={`genre${elem.genre_id}`} className='text-main'>{elem.genre_name}</label>
                      <input type="checkbox" id={`genre${elem.genre_id}`} onClick={() => { addGenre(elem.genre_name) }} />
                    </div>
                  )
            }

          </div>

        </div>


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
          <Button variant="primary" onClick={applyFilters}>Apply Filters</Button>
          <Button variant="secondary" onClick={() => { window.location.reload() }}>Reset Filters</Button>
        </div>
      </div>


      <div className={styles.movies}>
        <h1 className='text-main'>Netflix Shows</h1>

        
        <div className={styles.searchMovie}>
          <Form.Control type="text" placeholder="search movies" ref={movieSearch}/>
          <CiSearch className='text-main' size='32px' onClick={searchMovie}/>

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

        {
          shows &&
          <div className={styles.pagination}>

            <Pagination>
              {
                currentPage == 0?
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
