import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays,faClock } from '@fortawesome/free-solid-svg-icons';

const Clock = () => {
    const [time,setTime]=useState(new Date());
    useEffect(()=>{
        setInterval(()=>{
            setTime(new Date());
        },1000)
    },[])
  return (
    <div className='flex flex-col bg-white px-[10px] items-center justify-center border rounded-[5px]'>
        <p ><FontAwesomeIcon icon={faCalendarDays} /> <span className='px-[5px]'>{time.toLocaleDateString()}</span></p>
        <p><FontAwesomeIcon icon={faClock} /> {time.toLocaleTimeString()}</p>

    </div>
  )
}

export default Clock