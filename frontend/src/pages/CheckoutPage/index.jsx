import LoaderComponent from '@/components/ui/LoaderComponent'
import { useAuthContext } from '@/context/AuthContext'
import { axiosClient } from '@/utils/axiosClient'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import AddAdressModel from '../auth/ProfileUser/components/AddAddressModel'
import * as yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { ENVConstants } from '@/constant/env.constants'
const CheckoutPage = () => {


    
      const [loading,setLoading] = useState(true)
      const {user} = useAuthContext()
    
      // const [products,setProducs] = useState([])
      const [cartData,setCartData] = useState(null)


      
    const initialValues ={
        'name': user.name,
        "email":user.email,

        'address':'',
        "phone_no":''
    }

    const validationSchema = yup.object({
        phone_no:yup.string().required("Phone No is Required"),
        address:yup.string().required("Address is Required")
        
    })
    
      const fetchAllProducts = async()=>{
    try {
    
      const token = localStorage.getItem("token")
      if(!token) return 
      const response =await axiosClient.get("/cart/get",{
        headers:{
          'Authorization':'Bearer '+ localStorage.getItem("token")
        }
      })
      const data =await response.data 
      
    
        setCartData(data)
    } catch (error) {
      
      toast.error(error?.response?.data?.detail || error.message)
    }finally{
      setLoading(false)
    }
      }
    


      const onSubmitHandler= async(values,helpers)=>{
        try {
            // console.log(values)
            const response = await axiosClient.post("/checkout",{
                "phone_no":values.phone_no,
                "address":values.address
            },{
                headers:{
                    'Authorization':'Bearer ' + localStorage.getItem("token")
                }
            })
            const data =await response.data 
            console.log(data)
            //razarpay checkout
             const options = {
            key: ENVConstants.VITE_APP_RAZORPAY_KEY_ID,
            amount: data.amount,
            currency: "INR",
            name: 'Code With Krishna',
            description: 'E Com Payments',
            order_id: data.id,
             "callback_url": `${ENVConstants.VITE_APP_BACKEND_URI}/checkout/callback`,
            prefill: {
                name: user.name,
                email: user.email,
                "contact": "99999999"
            },
            theme: {
                color: '#000000',
            },
        }; 

        
        const rzp = new window.Razorpay(options); // Or new Razorpay(options) if using useRazorpay hook
        rzp.open();

            helpers.resetForm()
            
        } catch (error) {
                toast.error(error?.response?.data?.detail || error.message)

        }
      }
    
      useEffect(()=>{
        fetchAllProducts()
      },[])


      if(loading){
        return <div className='min-h-44 flex items-center justify-center'>
            <LoaderComponent/>
             </div>
      }



  return (
    <>
          <section className="bg-white py-8 antialiased container  dark:222bg-gray-900 md:py-16">
 
            {cartData && cartData.total ==0?<>
            
                <h4 className='text-3xl font-bold text-center'>No Item In Cart</h4>
            </>:  <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler} 
            >
                { ({values,setFieldValue})=> {
                return <>
                 <Form className="mx-auto px-4 2xl:px-0">

    <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
      <div className="p-10 flex-1 space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:222text-white">Delivery Details</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="your_name" className="mb-2 block text-sm font-medium text-gray-900 dark:222text-white"> Your name </label>
              <Field  name="name" type="text" id="your_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:222border-gray-600 dark:222bg-gray-700 dark:222text-white dark:222placeholder:text-gray-400 dark:222focus:border-primary-500 dark:222focus:ring-primary-500" placeholder="Bonnie Green" required disabled={true} />
            </div>
            <div>
              <label htmlFor="your_email" className="mb-2 block text-sm font-medium text-gray-900 dark:222text-white"> Your email* </label>
              <Field disabled={true}  name="email" type="email" id="your_email" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:222border-gray-600 dark:222bg-gray-700 dark:222text-white dark:222placeholder:text-gray-400 dark:222focus:border-primary-500 dark:222focus:ring-primary-500" placeholder="name@flowbite.com" required />
            </div>
            <div className='col-span-2'>


 <div>
              <label htmlFor="your_phone" className="mb-2 block text-sm font-medium text-gray-900 dark:222text-white"> Your Phone* </label>
              <Field
              name="phone_no"
                onInput={(e)=>{
                    e.target.value = e.target.value.replace(/[^+0-9]/g,"")
                }}
              type="text" id="your_phone" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:222border-gray-600 dark:222bg-gray-700 dark:222text-white dark:222placeholder:text-gray-400 dark:222focus:border-primary-500  dark:222focus:ring-primary-500" placeholder="+91xxxxxx"  />
              <ErrorMessage className='text-red-500' name="phone_no" component={'p'} />
            </div>
      
                
            
            </div>
          
          

                   <div className="col-span-2  w-full">
                     {
                        user && user.address && user.address.map((cur,i)=>{
                            return <div
                            onClick={()=>{
                                setFieldValue('address',cur._id)
                            }}
                            className='w-full border border-gray-300 bg-gray-50 py-4 mb-3 px-4 rounded-xl flex items-center justify-between' key={i} >
                                <div className="flex flex-col">
                                     <h5 className='text-xl font-semibold '>Address {i+1}</h5>
                                   <p className="text-xl text-zinc-600">{
                            `  ${cur.landmark} ${cur.city} ${cur.state} ${cur.country}-${cur.pin_code}`
                              }</p>
                                </div>
                                <span className={clsx("w-8 h-8 rounded-full ",cur._id==values.address ?"bg-blue-500 p-1 outline-2 outline-blue-500 border-2 border-white":"bg-transparent border-2 border-black" )}></span>

                            </div>
                        })
                    }
                    <ErrorMessage name="address" component={'p'} className='text-red-500' />
                   </div>

          
         
            <div className="sm:col-span-2">
                <AddAdressModel  className={'flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 cursor-pointer bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:222border-gray-600 dark:222bg-gray-800 dark:222text-gray-400 dark:222hover:bg-gray-700 dark:222hover:text-white dark:222focus:ring-gray-700'} text='Add New Address' />
              
            </div>
          </div>
        </div>
    
      
        
      </div>
      <div className="mt-6 p-10 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
        <div className="flow-root">
          <div className="-my-3 divide-y divide-gray-200 dark:222divide-gray-800">
            <dl  className="flex items-center justify-between gap-4 py-3">
                 <dt className="text-base font-normal text-gray-500 dark:222text-gray-400">View Cart</dt>
              <dd className="text-base font-medium text-gray-900 dark:222text-white">
                <Link to={'/cart'}>Cart</Link>
              </dd>
            </dl>
            <dl className="flex items-center justify-between gap-4 py-3">

                
             
              <dt className="text-base font-normal text-gray-500 dark:222text-gray-400">Subtotal</dt>
              <dd className="text-base font-medium text-gray-900 dark:222text-white">&#8377;{cartData.total}</dd>
            </dl>
            <dl className="flex items-center justify-between gap-4 py-3">
              <dt className="text-base font-normal text-gray-500 dark:222text-gray-400">Savings</dt>
              <dd className="text-base font-medium text-green-500">0</dd>
            </dl>
            <dl className="flex items-center justify-between gap-4 py-3">
              <dt className="text-base font-normal text-gray-500 dark:222text-gray-400">Store Pickup</dt>
              <dd className="text-base font-medium text-gray-900 dark:222text-white">0</dd>
            </dl>
            <dl className="flex items-center justify-between gap-4 py-3">
              <dt className="text-base font-normal text-gray-500 dark:222text-gray-400">Tax</dt>
              <dd className="text-base font-medium text-gray-900 dark:222text-white">0</dd>
            </dl>
            <dl className="flex items-center justify-between gap-4 py-3">
              <dt className="text-base font-bold text-gray-900 dark:222text-white">Total</dt>
              <dd className="text-base font-bold text-gray-900 dark:222text-white">&#8377;{cartData.total}</dd>
            </dl>
            <dl className='w-full'>
                <button type='submit' className="py-2 text-white rounded-md text-center w-full bg-blue-500">
                    Pay
                </button>
            </dl>
          </div>
        </div>
      
      </div>
    </div>
  </Form>
                </>
                
                }}
            </Formik>
}

</section>

    </>
  )
}

export default CheckoutPage