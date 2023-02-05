import Head from 'next/head'
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import {motion, spring } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '@/redux-store/hooks';
import { setActiveUsers, setInQueue, setUsername } from '../redux-store/userSlice';
import MessagingPage from './messagingPage';
import { io } from "socket.io-client";


const socket = io("http://localhost:5001");


export default function Home() {
  const inQueue = useAppSelector(state => state.uReducer.inQueue);
  const dispatch = useAppDispatch();
  
  socket.on("share-live-counter", (count: number) => {
    
    dispatch(setActiveUsers({
      active: count
    }));
    
    });

  return (
    <>
      <Head>
        <title>Meet Strager Online</title>
        <meta name="description" content="Meet a stranger online" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Dots.ico" />
      </Head>

      {inQueue ? <MessagingPage socket={socket} /> : <HeadPoint />}

    </>
  )
}

const HeadPoint = () => {
  return (
    <div className={styles['content-center']}>
      <div className={styles['main-div']}>

        <motion.div

          className={styles['headings']}>
          <motion.p
            animate={{ opacity: [0, 0.4, 0.5, 0.8, 1] }}
            transition={{ duration: 2, delay: 0.5 }}
          >Meet</motion.p>
          <motion.p animate={{ opacity: [0, 0.4, 0.5, 0.8, 1] }}
            transition={{ duration: 2, delay: 0.8 }}> Fellow </motion.p>
          <motion.p
            animate={{ opacity: [0, 0.4, 0.5, 0.8, 1] }}
            transition={{ duration: 2, delay: 1 }}>Stranger</motion.p>
          <motion.p
            animate={{ opacity: [0, 0.4, 0.5, 0.8, 1] }}
            transition={{ duration: 2, delay: 1.2 }}>Online</motion.p> </motion.div>

        <div>
          <SmallForm />
        </div>
      </div>
    </div>
  )
}

export function SmallForm() {


  const dispatch = useAppDispatch();
  const [username, usernameSetter] = useState("");
  const [emptyUsername, setEmptyUsername] = useState(false);
  const [activeUsers, setActiveUsers] = useState<Number>(0);

  socket.on("share-live-counter", (count: number) => {
  setActiveUsers(count);

  });

  const checkUsername = (un: string) => {
    return !(un.length > 20)
  }

  return (
    <>
      <div className={styles['inputs']}>
        <motion.input
          animate={{ x: [-200, 200, 0] }}
          transition={{ type: spring, dampling: 1000, velocity: 4, duration: 2 }}
          type='text' placeholder={'Username'} className={styles['username']}
          value={username}
          onChange={(e) => {
            if (checkUsername(e.target.value)) {
              usernameSetter(e.target.value)
            }

            if(username.length > -1){
              setEmptyUsername(false)
            }
          }}></motion.input>

    
        
      
        <div>
          <motion.div className={styles['enter-chat']}
            animate={{ y: [300, 0] }}

            onClick={() => {

              
              
              if(username.length === 0){
                setEmptyUsername(true);

              }else{
                dispatch(setUsername({
                  u: username
                }));

                dispatch(setInQueue({
                  inQueue: true
                }));

                
                socket.emit("join-queue", username);
              }
            }}


            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
          >Enter Chat

          </motion.div>
          <p style={{ color: '#800020' }}>{emptyUsername ? `Username field can't be empty` : ""}</p>
        
        </div>

        <div style={{textAlign: 'center', marginTop:'20px', color: 'white'}}>Active Users: <>{activeUsers}</></div>
            
      </div>



    </>
  )
}


