import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import HomeComponent from '@/Components/Home/home'
import DeleteMoviesComponent from '@/Components/DeleteMoviesComponent/DeleteMoviesComponent'
export default function Home() {
  return (
    <>
    <DeleteMoviesComponent/>
    </>
  )
}
