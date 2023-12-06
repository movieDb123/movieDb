import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import HomeComponent from '@/Components/Home/home'
// import CreateMovieComponent from '@/Components/CreateMovieForm/CreateMovieComponent'
import UpdateMovieComponent from '@/Components/UpdateMovieComponent/UpdateMovieComponent'
export default function Home() {
  return (
    <>
    <UpdateMovieComponent/>
    </>
  )
}
