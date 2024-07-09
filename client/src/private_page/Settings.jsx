import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, updateFailure, updateStart, updateSuccess } from "../redux/userSlice";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const Settings = ()=>{


  const {currentUser} = useSelector((state=> state.user))
  const currentError = useSelector((state=> state.user))

  const dispatch = useDispatch()
  const [ form , setForm ] = useState({})

//open update the account 
  const updateUser = async (e)=>{
     e.preventDefault()
     dispatch(updateStart())

     if (form.password && form.password !== form.verifiedPassword) {//verified the two password
      dispatch(updateFailure());
      return;
    }
     
  
    try {
      const res = await fetch(`/api/user/put/${currentUser._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
        headers: {
          'Authorization': `Bearer ${currentUser.token}`,
          'Content-Type': 'application/json',
        },
      });

          if (!res.ok){
            dispatch(updateFailure())
          }else{
            const data = await res.json()
            dispatch(updateSuccess(data))
            setForm({});
          }
          
          
        } catch (err){
          console.error(err)
        }
      
     
  }


  const deleteUser = async ()=>{
    dispatch(deleteUserStart())
   try {
     const res = await fetch(`/api/user/delete/${currentUser._id}`, {
       method: 'DELETE',
       headers: {
         'Authorization': `Bearer ${currentUser.token}`,
         'Content-Type': 'application/json',
       },
     });

         if (!res.ok){
           dispatch(deleteUserFailure())
         }else{
          dispatch(deleteUserSuccess())
         }
       
       } catch (err){
         console.error(err)
       }
     
    
 }

  const handleChange =(e)=>{
    setForm({...form , [e.currentTarget.id] : e.currentTarget.value})
    console.log(form)
  }

  //open delete account modal
  const[openDeleteModal, setOpenDeleteModal]  = useState(false)

    return(
      <>

      <div className="flex flex-col  gap-y-20  ">
        <div >
          <h1>Paramaters</h1>
        </div>
        {/*update form */}
        <form onSubmit={updateUser} className="grid   gap-4">

          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="ms-1 text-sm text-neutral-400">username</label>
            <input maxLength={30} type="text" name="username" id="username" defaultValue={currentUser.username} className="border border-neutral-300 px-3 py-1" onChange={handleChange}  />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="firstname" className="ms-1 text-sm text-neutral-400">firstname</label>
            <input type="text" name="firstname" id="firstname"  defaultValue={currentUser.firstname} className="border border-neutral-300 px-3 py-1  cursor-not-allowed bg-neutral-100" disabled/>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="lastname" className="ms-1 text-sm text-neutral-400">lastname</label>
            <input type="text" name="lastname" id="lastname" defaultValue={currentUser.lastname} className="border border-neutral-300 px-3 py-1  cursor-not-allowed bg-neutral-100"  disabled />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="ms-1 text-sm text-neutral-400">email</label>
            <input type="email" name="email" id='email' defaultValue={currentUser.email} className="border border-neutral-300 px-3 py-1 cursor-not-allowed bg-neutral-100" disabled />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="ms-1 text-sm text-neutral-400">password</label>
            <input type="password" name="password" id='password' className="border border-neutral-300 px-3 py-1 "  onChange={handleChange} disabled={currentUser.email =="example@account.com" }  />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="verifedpassword" className="ms-1 text-sm text-neutral-400">password</label>
            <input type="password" name="verifedpassword" id='verifedpassword' className="border border-neutral-300 px-3 py-1 " onChange={handleChange} disabled={currentUser.email =="example@account.com" }/>
          </div>

        {/*buttons for update and delete */}

          <div className="flex justify-end w-full gap-1">
            <input type="submit" name="update" value='Update' className="border-2 border-amber-300 px-5 py-3 lg:px-3 lg:py-1 w-fit bg-amber-400 text-white hover:bg-black hover:border-none transition-all"  />
            <input type="button" name="delete" value='Delete the account' className="border-2 border-red-600 px-5 py-3 lg:px-3 lg:py-1 w-fit bg-red-700 text-white hover:bg-black hover:border-none transition-all" onClick={()=>setOpenDeleteModal(true)}   />
          </div>
          <div>

        </div>
              {/* */}
      {(!currentError.error ) && <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
        <div className="flex">
          <div className="py-1 pe-3">
            <FontAwesomeIcon icon={faThumbsUp} size="2xl"/>
            </div>
          <div>
            <p className="font-bold">Your account has been updated</p>
          </div>
        </div>
      </div>}

      {(currentError.error ) &&<div className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md" role="alert">
        <div className="flex">
          <div className="py-1 pe-3">
            <FontAwesomeIcon icon={faThumbsDown} size="2xl"/>
            </div>
          <div>
            <p className="font-bold">The update has failed</p>
            <p className="text-sm">try again later</p>
          </div>
        </div>
      </div>}
      </form>


 

      </div>

    {/* delete account modal*/}
          {
            openDeleteModal && (
            <div className="fixed w-screen h-screen bg-neutral-300 top-0 right-0 z-50 bg-opacity-40 flex jusitify-center items-center">
              
                <div className="relative p-4 w-fit mx-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="p-4 md:p-5 text-center">
                         
                         {(currentUser.email =="example@account.com") && (
                          <>
                         <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">You cannot delete this account because <br/>this is the example account , PEDIODT ! </h3>
                          
                            <button  onClick={()=>setOpenDeleteModal(false)} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-amber-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>
                          </>
 
                            )}

                    {(currentUser.email !="example@account.com") && (
                          <>
                         <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete your account?</h3>
                            <button  onClick={deleteUser} type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                Yes, I&apos;m sure
                            </button>
                            <button  onClick={()=>setOpenDeleteModal(false)} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-amber-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                          </>
 
                            )}
                        </div>
                    </div>
                </div>

            </div>
 )
          }
      
      </>
    )
}


export default Settings;