import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import axios from 'axios';
import './Cards.css'
// import { toast } from 'react-toastify';
import toast from 'react-hot-toast';
import MultiSelect from 'react-multiple-select-dropdown-lite'
import 'react-multiple-select-dropdown-lite/dist/index.css'



function Cards() {
  let navigate = useNavigate();
  const [DataArr, setDataArr] = useState([]);
  const [userData, setUserData] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [Admin1, setAdmin1] = useState("");
  const [Admin2, setAdmin2] = useState("");
  const [Admin3, setAdmin3] = useState("");
  const [isAdmin1, setIsAdmin1] = useState(false);
  const [isAdmin2, setIsAdmin2] = useState(false);
  const [isAdmin3, setIsAdmin3] = useState(false);
  const [reRender, setreRender] = useState(false);

  const [value, setvalue] = useState('')
  const [requiredDocs, setRequiredDocs] = useState([]);


  const handleOnchange = val => {
    setvalue(val)
    console.log(val)
  }

  const paths = {
    "Confined_space": "/confinedSpacePermit",
    "Permit_to_Move": "/permitToMove",
    // "Work_At_height": "/"
  }

  const options = [
    { label: 'Confined space Permit', value: 'Confined_space' },
    { label: 'Permit to Move', value: 'Permit_to_Move' },
    // { label: 'Work At height Permit', value: 'Work_At_height' },
    // { label: 'Electrical work Permit', value: 'Electrical_work' },
  ]



  useEffect(() => {
    setAdmin1(process.env.REACT_APP_ADMIN1);
    setAdmin2(process.env.REACT_APP_ADMIN2);
    setAdmin3(process.env.REACT_APP_ADMIN1);
    console.log("this is process admin", process.env.REACT_APP_ADMIN1);
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.email === process.env.REACT_APP_ADMIN1 || user.email === process.env.REACT_APP_ADMIN2 || user.email === process.env.REACT_APP_ADMIN3) {
      setIsAdmin(true);
      if (user.email === process.env.REACT_APP_ADMIN1) {
        console.log("called 1")
        setIsAdmin1(true)
      }
      else if (user.email === process.env.REACT_APP_ADMIN2) {
        console.log("called 2")
        setIsAdmin2(true);
      }
      else if (user.email === process.env.REACT_APP_ADMIN3) setIsAdmin3(true);
      adminFetchData();
    } else {
      fetchData();
    }
  }, [])

  const fetchData = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserData(user);
    const response = await axios.post('http://localhost:4000/api/v1/getAllForms', { userId: user._id });
    console.log("This is the response", response?.data?.data);
    const filteredData=response?.data?.data.filter((object)=>{return object.approve3===false});
    setDataArr(filteredData);
  }

  const adminFetchData = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("this is frontend admni", userData.email);
    const response = await axios.post('http://localhost:4000/api/v1/getAllAdminForm', { admin: user.email });
    console.log("This is the response", response?.data?.data);
    const filteredData=response?.data?.data.filter((object)=>{return object.approve3===false});
    setDataArr(filteredData);
  }

  const AdminRequiredForm = async (e) => {
    let reqArr = value.split(",")
    setRequiredDocs(reqArr);
    const { id } = e.target;
    console.log("This is the form id", id);
    let response = null;
    if (reqArr.length === 0) {
      toast.error("Required docs is empty")
    } else {
      response = await axios.post('http://localhost:4000/api/v1/sendReqDocs', { formId: id, reqDocs: reqArr });
    }
    console.log("This is the response", response?.data?.data);
    if (response) {
      toast.success("sent Required Form");
      adminFetchData();
    } else {
      toast.error("Please try again");
    }


  }

  const admin1Approval = async (e) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { id } = e.target;
    const response = await axios.post('http://localhost:4000/api/v1/setApproval', { formId: id, admin: user.email });
    adminFetchData();
    if (response) {
      toast.success("Approved");
    } else {
      toast.error("Please try again");
    }
    console.log("This is the response", response?.data?.data);
  }

  const adminDisApproval = async (e) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { id } = e.target;
    const Data = id.split("/");
    const FormId = Data[0];
    const userEid = Data[1];
    const response = await axios.post('http://localhost:4000/api/v1/setDisapproval', { formId: FormId, admin: user.email, userEmail: userEid });
    adminFetchData();
    if (response) {
      toast.success("Disapproved");
    } else {
      toast.error("Please try again");
    }
    console.log("This is the response", response?.data?.data);
  }

  const ePassHandler = async(e)=>{
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await axios.post('http://localhost:4000/api/v1/epassSender', { email:user.email });
    if(!response){
      toast.error("Please try Again");
    }
    window.open("https://mail.google.com/mail/", "_blank");
  }

{/* */}

  return (
    <div className='w-[80vw] h-[70vh] px-8'>
      <div className="w-[100%] h-[70%] flex flex-wrap gap-5">
        {DataArr.map((form, index) => (
          <div className="w-[30%]  h-[100%] rounded-xl p-5 text-white gap-2 bg-[#263043] m-3 inline-block" key={index}>
            <div className=' w-[100%] h-[100%] flex flex-col gap-3 items-center justify-center'>
              <div className="font-semibold flex gap-2 text-md bg-[#1d2634] px-4 rounded-lg"><p>User :</p><p>{form.user.email}</p></div>
              <div className='flex flex-col w-[100%] mb-3'>
                <p>Status :</p>
                {
                  form.isDissApproved === false && form.approve3===false ? (<div className='flex flex-col gap-2 mb-6'>
                    <div>
                      <div className='flex justify-center items-center gap-8'>
                        <div>Admin 1</div>
                        <div>Admin 2</div>
                        <div>Admin 3</div>
                      </div>
                    </div>
                    <div className='flex justify-center items-center'>
                      <div className={`w-[2rem] h-[2rem] rounded-full ${form.approve1?"bg-green-500":"bg-red-500"}  border-solid border-2 border-white`}></div> 
                      <div className='w-[4rem] h-[0.3em] bg-white'></div>
                      <div className={`w-[2rem] h-[2rem] rounded-full ${form.approve2?"bg-green-500":"bg-red-500"} bg-green-500 border-solid border-2 border-white`}></div> 
                      <div className='w-[4rem] h-[0.3em] bg-white'></div>
                      <div className={`w-[2rem] h-[2rem] rounded-full ${form.approve3?"bg-green-500":"bg-red-500"} bg-green-500 border-solid border-2 border-white`}></div> 
                    </div>
                  </div>) : form.approve3===true?(<p className='font-bold ml-5 bg-[#1d2634] text-center rounded-lg text-xl mt-2 mb-5 py-2'>Approved</p>) :(<p className='font-bold ml-5 bg-[#1d2634] text-center rounded-lg text-xl mt-2 mb-5 py-2'>Disapproved</p>)
                }

                {
                  isAdmin1 && form.reqDocsSubmit === false && form.isDissApproved===false && form.approve1===false ? (
                    <div className='w-[100%] h-[80%] flex flex-col gap-3'>
                      <div className="preview-values">
                        <h4>Required Forms</h4>
                        {/* {value} */}
                      </div>

                      <MultiSelect
                        onChange={handleOnchange}
                        options={options}
                        className="text-black"
                      />
                      <button id={`${form.formID._id}`} onClick={AdminRequiredForm} className='flex mx-auto justify-center items-center w-[50%] h-[2.3rem] bg-red-500 rounded-lg'>Submit</button>
                    </div>
                  ) : (<div></div>)
                }
                {
                  isAdmin === false && form.reqDocsSubmit === true ? (<div className=' mx-auto flex flex-col w-[18rem] py-3 px-4 border-solid border-2 border-white rounded-xl bg-[#1d2634]'>
                    {
                      <div className='w-[100%] h-[100%] flex flex-col gap-3'>{form.requiredDocs.reqDocs.map((object, index) => (
                        <div className='flex flex-row items-center justify-between gap-5 w-[100%]' key={index}>
                          <p className='text-md'>{object}</p>
                          {
                            object in form.requiredDocs.submitedDocs ? (<div>
                              <button className='bg-blue-500 p-1 rounded-lg text-semibold' onClick={() => navigate(paths[object] + `/${form.formID._id}/${form.requiredDocs.submitedDocs[object]}`)}>Preview</button>
                            </div>) : (<div className='flex justify-center item-center w-[100%]'>
                              <button className='bg-blue-500 px-2 py-1 rounded-lg text-semibold' onClick={() => navigate(paths[object] + `/${form.formID._id}`)}>Submit</button>
                            </div>)
                          }
                        </div>
                      ))}</div>
                    }




                  </div>) : (<></>)
                }
                {
                  isAdmin === true && form.reqDocsSubmit === true && form.requiredDocs.reqDocs.length === Object.keys(form.requiredDocs.submitedDocs).length ? (<div className=' mx-auto flex flex-col w-[18rem] py-3 px-4 border-solid border-2 border-white rounded-xl bg-[#1d2634]'>
                    {
                      <div className='w-[100%] h-[100%] flex flex-col gap-3'>{form.requiredDocs.reqDocs.map((object, index) => (
                        <div className='flex flex-row items-center justify-between gap-5 w-[100%]' key={index}>
                          <p className='text-md'>{object}</p>
                          {
                            object in form.requiredDocs.submitedDocs ? (<div>
                              <button className='bg-blue-500 p-1 rounded-lg text-semibold' onClick={() => navigate(paths[object] + `/${form.formID._id}/${form.requiredDocs.submitedDocs[object]}`)}>Preview</button>
                            </div>) : (<div>
                            </div>)
                          }
                        </div>
                      ))}</div>
                    }




                  </div>) : (<></>)
                }

              </div>
              <div className='flex flex-row item-center align-middle justify-center w-[100%] h-[18%] gap-3'>
                <div className='w-[33.33%] h-[100%] flex justify-center items-center'>
                <button className='flex justify-center items-center w-[100%] h-[80%] bg-orange-500 rounded-lg' onClick={() => { navigate(`/permit/${form.formID._id}`) }}>Form preview</button>
                </div>
                {
                  isAdmin === true ? (
                    <div className='w-[66.66%] h-[100%] flex justify-center items-center'>
                      {
                        isAdmin1 ? (
                          <div className='flex gap-3 w-[100%] h-[100%] justify-center items-center'>
                            <button disabled={form.approve1 === true ? true : false} className={`${form.approve1 === true ? "disabled:opacity-75" : ""} ${form.isDissApproved === true ? "invisible" : ""} flex justify-center items-center w-[50%] h-[80%] bg-green-500 rounded-lg`} id={`${form.formID._id}`} onClick={admin1Approval}>{form.approve1 === true ? "Approved" : "Approve"}</button>
                            <button disabled={form.isDissApproved === true ? true : false} className={`${form.isDissApproved === true ? "disabled:opacity-75" : ""} ${form.approve1 === true ? "invisible" : ""} flex justify-center items-center w-[50%] h-[80%] bg-red-500 rounded-lg`} id={`${form.formID._id}/${form.user.email}`} onClick={adminDisApproval}>{form.isDissApproved === true ? "Disapproved" : "Disapprove"}</button>
                          </div>
                        ) : (<></>)

                      }
                      {
                        isAdmin2 ? (
                          <div className='flex gap-3 w-[100%] h-[100%] justify-center items-center'>
                            <button disabled={form.approve2 === true ? true : false} className={`${form.approve2 === true ? "disabled:opacity-75" : ""} ${form.isDissApproved === true ? "invisible" : ""} flex justify-center items-center w-[50%] h-[80%] bg-green-500 rounded-lg`} id={`${form.formID._id}`} onClick={admin1Approval}>{form.approve2 === true ? "Approved" : "Approve"}</button>
                            <button disabled={form.isDissApproved === true ? true : false} className={`${form.isDissApproved === true ? "disabled:opacity-75" : ""} ${form.approve2 === true ? "invisible" : ""} flex justify-center items-center w-[50%] h-[80%] bg-red-500 rounded-lg`} id={`${form.formID._id}/${form.user.email}`} onClick={adminDisApproval}>{form.isDissApproved === true ? "Disapproved" : "Disapprove"}</button>
                          </div>
                        ) : (<></>)

                      }
                      {
                        isAdmin3 ? (
                          <div className='flex gap-3 w-[100%] h-[100%] justify-center items-center'>
                            <button disabled={form.approve3 === true ? true : false} className={`${form.approve3 === true ? "disabled:opacity-75" : ""} ${form.isDissApproved === true ? "invisible" : ""} flex justify-center items-center w-[50%] h-[80%] bg-green-500 rounded-lg`} id={`${form.formID._id}`} onClick={admin1Approval}>{form.approve3 === true ? "Approved" : "Approve"}</button>
                            <button disabled={form.isDissApproved === true ? true : false} className={`${form.isDissApproved === true ? "disabled:opacity-75" : ""} ${form.approve3 === true ? "invisible" : ""} flex justify-center items-center w-[50%] h-[80%] bg-red-500 rounded-lg`} id={`${form.formID._id}/${form.user.email}`} onClick={adminDisApproval}>{form.isDissApproved === true ? "Disapproved" : "Disapprove"}</button>
                          </div>
                        ) : (<></>)

                      }


                    </div>
                  ) : (<div>{
                      form.approve3===true?(<button className='flex justify-center p-3 mt-1.5 items-center w-[100%] h-[80%] bg-green-500 rounded-lg' onClick={ePassHandler}>E-Pass</button>):(<></>)
                    }</div>)
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cards


