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
                    <img src='/Assets/Images/img/frontpage/onlyLogo1.png' alt="logo" />
                    <p className={styles.heading}>Prep<span>Knight</span></p>
                </div>
            </div>
            <div className={styles.items}>

                {
                    sideBarItems.map((item, index) => {

                        if (index == 1) {
                            return (
                                <div className={styles.flexCont}>


                                    <Box className={`${styles.item} `}
                                        onClick={() => {
                                            setaccordianOpen(prev=>!prev);
                                        }}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: "30px 0px 30px 20px",
                                            gap: '20px',
                                            position: 'relative',
                                            // '&:hover': {
                                            //     backgroundColor: 'primary.lightest',
                                            // }
                                        }}
                                    >
                                        {/* {item.icon} */}
                                        <Typography className={styles.name} paragraph={true} sx={{
                                            margin: 0,
                                            color: 'primary.main',
                                            cursor: 'pointer',
                                            fontWeight: 550,
                                        }} >{item.name}</Typography>
                                       

                                    </Box>
                                        {
                                            accordianOpen
                                            &&
                                        <div className={`${styles.accordian} text-main`}>
                                            <p onClick={()=>{router.push('')}}>Excercises</p>
                                            <p onClick={()=>{router.push('../../../../YearlyPapers')}}>Yearly Papers</p>
                                            <p onClick={()=>{router.push('../../../../CustomQuiz')}}>Custom Quizes</p>
                                            <p onClick={()=>{router.push('../../../RandomQuiz')}}>Random Quizes</p>
                                            
                                        </div>
                                        }
                                </div>

                            )
                        }
                        else

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
