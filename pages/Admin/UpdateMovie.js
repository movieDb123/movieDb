import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import HomeComponent from '@/Components/Home/home'
import UpdateSelectedMovie from '@/Components/UpdateSelectedMovie/UpdateSelectedMovie'
export default function Home() {
  return (
    <>
    <UpdateSelectedMovie/>
    </>
  )
}
