import { ROLE_TYPE } from '@/constant/auth.constant'
import { useAuthContext } from '@/context/AuthContext'
import clsx from 'clsx'
import React from 'react'
import { RiVerifiedBadgeFill } from "react-icons/ri";


const AccountType = () => {
    const {user} = useAuthContext()

    const Ac_Type= [
        {
            "id":1,
            "image":"https://cdn-icons-png.flaticon.com/512/4990/4990476.png",
            "type":ROLE_TYPE.BUYER
        },
         {
            "id":2,
            "image":"https://cdn-icons-png.flaticon.com/512/4515/4515469.png",
            "type":ROLE_TYPE.SELLER
        }
    ]

  return (
    <>
    <h4 className="text-2xl py-3 font-bold">Account Type</h4>
            <div className="grid grid-cols-2 gap-x-2">
                {   
        Ac_Type.map((cur,i)=>{
            return <div key={i} className={clsx('w-full relative p-2 rounded-xl  bg-gray-100',cur.type ==user.role ?" border-blue-400 border-2 ":"border border-gray-200")} title={cur.type}>
                     {user.role ==cur.type &&   <RiVerifiedBadgeFill className='absolute  text-2xl text-blue-500 right-4' />}

                            <img src={cur.image} alt={cur.type}/>
            </div>
        })
                }
            </div>
    </>
  )
}

export default AccountType