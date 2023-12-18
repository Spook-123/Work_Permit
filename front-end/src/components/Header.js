import React from 'react'
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch}
 from 'react-icons/bs'

function Header({OpenSidebar}) {
  return (
    <header className='header w-[95%] flex flex-row-reverse'>
        
        
        <div className='header-right flex gap-4'>
            <BsFillBellFill className='icon' size={23} style={{"color":"#9e9ea4"}}/>
            <BsFillEnvelopeFill className='icon' size={23} style={{"color":"#9e9ea4"}}/>
            <BsPersonCircle className='icon' size={23} style={{"color":"#9e9ea4"}}/>
        </div>
    </header>
  )
}

export default Header