import  { useState, useEffect, useRef, useContext } from 'react';
import styles from './Navbar.module.css';
// import authContext from '../Home/authContext';
import authContext from '../../utils/Auth/authContext';
import { useRouter,Link } from 'next/router';
import Image from 'next/image';
import {signOut} from 'next-auth/react'
import { FaCircleUser } from "react-icons/fa6";
import { CgMenu } from "react-icons/cg";
import axios from 'axios';

const links = [
  {
    name: 'Shows',
    href: '../',
  },
  {
    name: 'Watch List',
    href: 'WatchList',
  },

]

export default function Navbar({ sideBarOpen, setsideBarOpen }) {

  const userInfo = useContext(authContext);
  
  const router = useRouter();
 
  const [dropDown, setdropDown] = useState({ practice: false, more: false, account: false });
  const dropDownRef = useRef(dropDown);

  const openMoreDropdown = (e) => {
    setdropDown((prev) => {
      dropDownRef.current = { practice: false, more: !prev.more, account: false };
      return { practice: false, more: !prev.more, account: false }
    })
    e.stopPropagation();
  }

  const openPracticeDropdown = (e) => {
    setdropDown((prev) => {
      dropDownRef.current = { practice: !prev.practice, more: false, account: false };
      return { practice: !prev.practice, more: false, account: false }
    })
    e.stopPropagation();
  }
  

  const openAccountDropdown = (e) => {
    setdropDown((prev) => {
      console.log(prev);
      dropDownRef.current = { practice: false, more: false, account: !prev.account };
      return { practice: false, more: false, account: !prev.account }
    })
    e.stopPropagation();
  }

  const closeDropdown = () => {
    setdropDown({ practice: false, more: false, account: false })
  }

  useEffect(() => {
    if (dropDown.practice || dropDown.more || dropDown.account) {
      document.addEventListener('click', closeDropdown)
    }
    return () => {
      document.removeEventListener('click', closeDropdown)
    }
  }, [dropDown])



  return (
    <div className={styles.navContainer}>
      
      <nav className={styles.navbar}>
        <div className={styles.left}>

          <div className={`${styles.menuIcon} bg-main`}>
            <CgMenu size='32px' color='#333'
            onClick={
              () => {
                setsideBarOpen(true);
              }
            }
            />
          </div>
         
          <div className={`${styles.logo}`}>
            <img src='/images/logo.png' alt="logo" />
            <p>Movie<span>Db</span></p>
          </div>
          <div className={styles.links}>
            {
              links.map((link) => {
                return(

                  <p className="text-main" onClick={()=>{router.push('../' + link.href)}} >{link.name}</p>
                  )
              })
            }
          </div>
        </div>
        <div className={styles.right}>
         
          <div className={styles.accountContainer}>
            {
              userInfo ?

                <img src={userInfo.pic}  referrerPolicy="no-referrer" alt="user pic" style={{ width: '1.875rem', borderRadius: '50%', cursor: 'pointer' }}
                  onClick={openAccountDropdown}
                />

                :
                <>

                  <FaCircleUser 
                  size='32px' 
                  onClick={openAccountDropdown} />



                </>
            }

            {
              userInfo ?

                dropDown.account &&
                <SignedInDropDown />
                :
                dropDown.account &&
                <SignedOutDropDown />
            }
          </div>
        </div>
      </nav>
    </div>
  )
}


function PracticeDropDown() {
  const router = useRouter();
  const items = [
    {
      name: 'Topical Questions',
      link:'TopicalQuestions'
    },
    {
      name: 'Custom Quiz',
      link:'CustomQuiz'
    },
    {
      name: 'Random Quiz',
      link:'RandomQuiz',
    },
    {
      name: 'Yearly Papers',
      link:'YearlyPapers'
    },
    {
      name:'Flash Cards',
      link:'FlashCards'
    }
  ]

  return (
    <div className={`${styles.dropdown} border-1`}>
      {
        items.map((item) => {
          return (
            <p className='text-main' onClick={()=>{router.push('../../../../' + item.link)}}>{item.name}</p>
          )
        })
      }
    </div>
  )
}
function MoreDropDown() {
  const router = useRouter();

  const items = [
    {
      name: 'Contact Us',
      link: 'Contact'
    },
    {
      name: 'Pricing',
      link: 'Pricing'
    },

  ]

  return (
    <div className={`${styles.dropdown} border-1`}>
      {
        items.map((item) => {
          return (
            <p className="text-main" onClick={()=>{router.push('../../../../' + item.link)}} >{item.name} </p>
          )
        })
      }
    </div>
  )
}
function SignedInDropDown() {
  const router = useRouter();

  const logout = async ()=> {
    // try{
    //   await axios.get( serverUrl + 'logout', {withCredentials: true})
    //   console.log('logout done')
    //   router.push('/')
    // }
    // catch(error){
    //   console.log(error);
    // }
    signOut();
    
  } 

  const items = [
    {
      name: 'Logout'
    },
  ]

  return (
    <div className={`${styles.dropdown2} border-1`}
    >
      {
        items.map((item) => {
          return (
            <div onClick={logout}>
             
              <p className="text-main" >{item.name}</p>
            </div>
          )
        })
      }
    </div>
  )

}
function SignedOutDropDown() {
  const items = [
    {
      name: 'Sign Up'
    },
    {
      name: 'Login'
    },
  ]

  const router = useRouter();


  return (
    <div className={`${styles.dropdown2} border-1`}
      style={{
        right: 0,
      }}
    >
      {
        items.map((item) => {
          return (
            <div href='/login' onClick={()=>{router.push('/login')}}>
              <div>
                
                <p className="text-main" >{item.name}</p>
              </div>
            </div>
          )
        })
      }
    </div>
  )

}
