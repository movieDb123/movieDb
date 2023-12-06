import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
// import Home from '../../Components/Home/home'
import HomeComponent from '@/Components/Home/home'
// import ShowComponent from '@/Components/ShowsComponents/ShowComponent'
import WatchListComponent from '@/Components/WatchListComponent/WatchListComponent'

export default function Home() {
  return (
    <>
     <HomeComponent child={<WatchListComponent/>}></HomeComponent>
    </>
  )
}
