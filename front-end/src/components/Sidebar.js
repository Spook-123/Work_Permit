import React, { useEffect,useState } from 'react'
import { BiLogOutCircle } from "react-icons/bi";
import { BsGrid1X2Fill, BsPeopleFill,  BsFillEjectFill,BsFiles, BsPerson}from 'react-icons/bs'
 import { Link,useNavigate } from 'react-router-dom'
 import { IoMdAdd } from "react-icons/io";
 import toast from 'react-hot-toast';
function Sidebar({openSidebarToggle, OpenSidebar}) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [Admin1, setAdmin1] = useState("");
    const [Admin2, setAdmin2] = useState("");
    const [Admin3, setAdmin3] = useState("");
    const navigate = useNavigate();
  useEffect(()=>{
    setAdmin1(process.env.REACT_APP_ADMIN1);
    setAdmin2(process.env.REACT_APP_ADMIN2);
    setAdmin3(process.env.REACT_APP_ADMIN1);
    console.log("this is sidebar console",process.env.REACT_APP_ADMIN1)
    const user = JSON.parse(localStorage.getItem("user"));
        if(user.email === process.env.REACT_APP_ADMIN1 || user.email === process.env.REACT_APP_ADMIN1 || user.email === process.env.REACT_APP_ADMIN3){
            setIsAdmin(true)
        }
  },[])

  const Logout = ()=>{
    localStorage.removeItem("user");
    toast.success("Logged out");
    navigate("/");
  }

  return (
    <aside id="sidebar" className={"h-[100%] overflow-y-scroll"}>
        <div className='sidebar-title'>
            <div className='sidebar-brand flex flex-col gap-2 text-sm text-[#9e9ea4]'>
                <BsPerson  className='icon'/>
                <p>{isAdmin?"Admin":"User"}</p>
                <p>{JSON.parse(localStorage.getItem("user")).email}</p>
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            {/* <li className='sidebar-list-item'>
                <Link to={"/Dashboard"}>
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </Link>
            </li> */}
            {/* <li className='sidebar-list-item'>
                <a href="">
                    <BsPeopleFill className='icon'/> Users
                </a>
            </li> */}
            <li className='sidebar-list-item'>
                <a href="/acceptedForms">
                    <BsFiles className='icon'/> Forms Accepted 
                </a>
            </li>
            <li className='sidebar-list-item'>
                <Link to={"/formpending"}>
                    <BsFillEjectFill className='icon'/> Forms Pending
                </Link>
            </li>
            {
                isAdmin===false?(<li className='sidebar-list-item'>
                <Link to={"/Permit"}>
                    <IoMdAdd className='icon'/> Create New Permit
                </Link>
            </li>):(<></>)
            }
            <li className='sidebar-list-item'>
                <div onClick={Logout} className='text-[#9e9ea4]'>
                    <BiLogOutCircle className='icon'/> Log out
                </div>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar