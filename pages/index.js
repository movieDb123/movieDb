import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
// import Home from '../../Components/Home/home'
import HomeComponent from '@/Components/Home/home'
import ShowComponent from '@/Components/ShowsComponents/ShowComponent'
const inter = Inter({ subsets: ['latin'] })
import authContext from '@/utils/Auth/authContext'

export default function Home() {


  return (
    <>
     <HomeComponent child={<ShowComponent/>}></HomeComponent>
    </>
  )
}
