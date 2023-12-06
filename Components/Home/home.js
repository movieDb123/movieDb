import React, { useState, useEffect } from 'react';
// import Sidebar from '../SideBar/Sidebar';
import Sidebar from '../SideBar/Sidebar'
import styles from './Home.module.css'
import { useRouter } from 'next/router';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import AuthentificationContext from '../../utils/Auth/AuthentificationContext';
import {SessionProvider} from 'next-auth/react'



// const { serverUrl } = data;
const sideBarItems = [
    {
        name: 'Shows',
        link: '../'
    },
   
    {
        name: 'Watched List',
        link: '../'
    },
]



export const LoaderContext = React.createContext();

export default function HomeComponent({child}) {



    const router = useRouter();
       
    // switch (pageName) {
    //     case value:
            
    //         break;
    
    //     default:
    //         break;
    // }

    const [loading, setloading] = useState(false)

    const [sideBarOpen, setsideBarOpen] = useState(false);

    const closeSideBar = () => {
        setsideBarOpen(false)
    }



    return (

        <>
        <SessionProvider>

            <AuthentificationContext>

                <Navbar sideBarOpen={sideBarOpen} setsideBarOpen={setsideBarOpen} />
                {

                }


                <div
                    style={{
                        marginTop: '70px',
                        // border: 'solid black 1px',
                        position: 'relative',
                       
                        height: '100%'
                    }}
                >
                    {
                        loading &&
                        <div className={styles.overlay}>
                            <img src='/Assets/Images/loader1.gif' alt="loader" />
                        </div>
                    }
                    {
                        sideBarOpen
                        &&
                        <>
                            <Sidebar sideBarItems={sideBarItems} />
                            <div className={` ${styles.overlay}`} onClick={closeSideBar}></div>
                        </>
                    }

                    <div
                        style={{
                            // padding: '50px 7% 0px 7%',
                            boxSizing: 'border-box',
                            width: '100%',
                            margin: 'auto',
                            // padding: '20px 0 20px 0',
                            position: 'relative',
                            // border: 'solid black 1px'
                        }}
                        className={styles.mainContent}
                    >
                        {/* <Outlet context={{loading:loading,setloading:setloading}}/> */}

                        <LoaderContext.Provider value={{loading: loading, setloading: setloading}}>
                        {child}
                        </LoaderContext.Provider>

                    </div>
                </div>

            </AuthentificationContext>
            </SessionProvider>

        </>
    )
}
