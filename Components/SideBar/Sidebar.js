import React, { useState } from 'react'
import styles from './Sidebar.module.css';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import { useNavigate } from "react-router-dom";
import { useRouter } from 'next/router';





export default function Sidebar({ sideBarItems }) {
    let router = useRouter();


    

    

    const [accordianOpen, setaccordianOpen] = useState(false)
    console.log(accordianOpen)

    return (
        <div className={styles.sideBar} >
            <div className={styles.top}>
                <div className={styles.logo}>
                    <img src='/images/logo.png' alt="logo" />
                    <p className={styles.heading}>Movie<span>Db</span></p>
                </div>
            </div>
            <div className={styles.items}>

                {
                    sideBarItems.map((item, index) => {

                        

                        return (
                            <Box className={`${styles.item}`}
                                onClick={() => {
                                    console.log('fnfjkn')
                                    router.push('../../../../' + item.link)
                                }}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: "30px 0px 30px 20px",
                                    gap: '20px',
                                    borderBottom: 'solid rgba(0,0,0,0.1) 1px',
                                    '&:hover': {
                                        backgroundColor: 'primary.lightest',
                                    }
                                }}
                            >
                                <Typography className={styles.name} paragraph={true} sx={{
                                    margin: 0,
                                    color: 'primary.main',
                                    cursor: 'pointer',
                                    fontWeight: 550,
                                }} >{item.name}</Typography>
                            </Box>
                        )
                    })
                }

            </div>
        </div>
    )
}
