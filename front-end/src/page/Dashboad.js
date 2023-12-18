import React,{useState} from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Cards from '../components/Cards'
import Home from '../components/Home'
import { Routes, Route,useLocation } from 'react-router-dom'
import AcceptedCards from '../components/AcceptedCard'


function Dashboad() {
    let location = useLocation();
    let currPath = location.pathname.split("/").at(-1);
    console.log("This is the currPath",currPath)
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }

  return (
    <div className='grid-container bg-[#1d2634]'>
      <Header OpenSidebar={OpenSidebar}/>
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <div className='flex flex-row'>
        <div className='overflow-y-scroll overflow-x-hidden'>
          {
            currPath==="acceptedForms"?(<AcceptedCards/>):currPath ==="formpending"?(<Cards/>):(<></>)
          }
          
          
        </div>
      </div>
    </div>
  )
}

export default Dashboad