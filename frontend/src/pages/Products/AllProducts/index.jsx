import LoaderComponent from '@/components/ui/LoaderComponent'
import { axiosClient } from '@/utils/axiosClient'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import moment from 'moment'
import { IoMdTrash } from 'react-icons/io'
const AllProducts = () => {


    const [loading,setLoading] = useState(true)
    const [products,setProducts] = useState([])
    const fetchAllProducts=async()=>{
        try {
            setProducts([])
            const response =await axiosClient.get("/product/all-products",{
                headers:{
                    'Authorization':'Bearer '+ localStorage.getItem("token")
                }
            })
            const data = await response.data 
setProducts(data)
            
        } catch (error) {
            toast.error(error?.response?.data?.detail || error.message)
        }finally{
            setLoading(false)
        }
    }


        useEffect(()=>{
            fetchAllProducts()
        },[])

    if(loading){
        return <div className='flex items-center justify-center min-h-56'>
            <LoaderComponent/>
        </div>
    }


  return (
    <>
           <section className="text-gray-600 body-font">
  <div className="container px-5 py-10 mx-auto">
    <div className="flex flex-wrap -m-4">
                    {
                        products.length>0 ? <>
                                    {
                                        products.map((cur,i)=>{
                                            return <Card fetchAllProducts={fetchAllProducts} key={i} data={cur} />
                                        })
                                    }

                        </> :<>
                        <h3 className="text-4xl w-full font-bold text-center">
                            No Product Have
                        </h3>
                        </>
                    }
     
    </div>
  </div>
</section>

    
    </>
  )
}

export default AllProducts


const Card=({data,fetchAllProducts})=>{
    
    const [loading,setLoading] = useState(false)

    const deleteHandler = async()=>{
        try {
            setLoading(true)
            const response =await axiosClient.delete("/product/delete/"+data._id,{
                headers:{
                    'Authorization':'Bearer '+localStorage.getItem("token")
                }
            })
            const datas = await response.data 
            await fetchAllProducts()
            toast.success(datas.msg)
            
        } catch (error) {
            toast.error(error?.response?.data?.detail || error.message)
            
        }finally{
            setLoading(false)
        }
    }

    
    return <>
        <div className="p-4 md:w-1/3">
        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
          <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={data.image} alt="blog" />
          <div className="px-6 pt-5">
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">CATEGORY</h2>
            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{data.category}</h1>
            <p className="leading-relaxed mb-3">{data.title}</p>

                    <div className="mb-3 flex items-center justify-between">
                        <p className="text-sm text-zinc-500">
                            {moment(data.created_at).format("LLL")}
                        </p>
                        <button onClick={deleteHandler} disabled={loading} className="text-2xl rounded-full bg-red-500 p-2 disabled:bg-black cursor-pointer text-white">
                            <IoMdTrash/>
                        </button>
                    </div>

          </div>
        </div>
      </div>
    </>

    /**
     * category
: 
"PICTURES"
created_at
: 
"2025-11-30T13:48:43.017000"
image
: 
"https://res.cloudinary.com/dspqukl0w/image/upload/v1764490725/gaqcl59bdzsmllhcizft.jpg"
slug
: 
"sadd-31ec4faf-b2bc-4623-9dce-f2439a3a37af"
title
: 
"sadd"
_id
: 
"692bfde8ec0e37b8f92621e0"
     */
}