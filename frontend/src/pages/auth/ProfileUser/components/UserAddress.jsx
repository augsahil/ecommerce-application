import React from 'react'
import { FaRegEdit, FaTrash } from "react-icons/fa";
import AddAdressModel from './AddAddressModel';
import { useAuthContext } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import { axiosClient } from '@/utils/axiosClient';

const UserAddress = () => {

  const {user,fetchUserProfile} = useAuthContext()

    const address = [
        {
            "id":1,
            "address":"Lucknow"
        },
          {
            "id":2,
            "address":"Gurgoan"
        }
    ]


    const deleteAddressHandler= async(id)=>{
      try {
        if(!confirm("Are You Sure ?")) return 
          const response = await axiosClient.delete("/auth/delete-address/"+id,{
          headers:{
            'Authorization':'Bearer '+ localStorage.getItem("token")
          }
        })
        const data = await response.data 
        toast.success(data.msg)
        await fetchUserProfile()
        
      } catch (error) {
        toast.error(error?.response?.data?.detail || error.message)
      }
    }


  return (
    <>
        <div className="py-10">
           <div className="flex  mb-4 items-center justify-between">
             <h4 className="text-2xl font-bold">Address</h4>
              <AddAdressModel/>
           </div>

               <div className="flex flex-col gap-y-3">
                 {
                    user && user.address && user.address.length>0 ? user.address.map((cur,i)=>{
                        return <div key={i} className='w-full py-2 border border-gray-200 bg-gray-100 rounded px-2 flex items-center justify-between'>
                            <div className="flex flex-col">
                                <h3 className="text-xl font-bold">Address {i+1}</h3>
                            <p className="text-xl text-zinc-600">{
                            `  ${cur.landmark} ${cur.city} ${cur.state} ${cur.country}-${cur.pin_code}`
                              }</p>
                            </div>
                            <div className="flex items-center gap-x-3">
                               
                               <button
                              onClick={()=>deleteAddressHandler(cur._id)}
                              >
                                 <FaTrash  className='text-red-500'  />
                               </button>
                            </div> 
                             </div>
                    }):<>
                    <h3 className='text-center py-5 border border-gray-200 bg-gray-100 '>No Address Found</h3>
                    </>
                }
               </div>


        </div>
    </>
  )
}

export default UserAddress