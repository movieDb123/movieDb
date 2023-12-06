import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
// import Home from '../../Components/Home/home'
import HomeComponent from '@/Components/Home/home'
import LoginComponent from '@/Components/Login/Login'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
     <HomeComponent child={<LoginComponent/>}></HomeComponent>
    </>
  )
}
