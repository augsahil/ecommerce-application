import { Categies } from '@/constant/products.constant'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, {useCallback, useState} from 'react'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import {useDropzone} from 'react-dropzone'
import { IoIosImages } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdClose } from 'react-icons/md'
import AuthButton from '@/components/ui/AuthButton'
import { axiosClient } from '@/utils/axiosClient'

const AddProduct = () => {

    const [loading,setLoading] = useState(false)

    const validationSchema = yup.object({
        title:yup.string().required("Title is Required"),
        category:yup.string().required("Category is Required").oneOf(Object.keys(Categies),"Choose Valid Category"),
        images: yup.array(yup.mixed()).required("Iamges are Requried"),
        description: yup.string().required("Product Description is Required"),
        price:yup.number().required("Price is Required")

    })

    const initialValues = {
        title:'',
        category:'',
        images:[],
        description:'',
        price:''
    }


    const  onSubmitHandler =async(values,helpers)=>{
        try {
            setLoading(true)
            // console.log(values);
            const formData = new FormData();

            formData.append("title",values.title)
            formData.append("category",values.category)
            formData.append("description",values.description)
            formData.append("price",values.price)
            // formData.append("title",values.title)
            values.images.forEach((cur)=>{
            formData.append("images",cur)

            })

            const response = await axiosClient.post("/product/add-product",formData,{
                headers:{
                    'Authorization':'Bearer '+ localStorage.getItem("token")
                }
            })
            const data = await response.data 
            console.log(data);
            toast.success(data.msg)
            
            
            
            helpers.resetForm()
        } catch (error) {
            toast.error(error?.response?.data?.detail || error.message)
        }finally{
            setLoading(false)
        }
    }

  return (
    <>
                    <div className="py-10 rounded px-4 bg-gray-50 border border-gray-200">
                        <h3 className="text-3xl font-semibold">Add Product</h3>

                    <Formik
                    onSubmit={onSubmitHandler}
                    initialValues={initialValues}
                    validationSchema={validationSchema}

                    >
                          {({values, setFieldValue ,  })=>{
                      return  <Form className='py-10'>
                          
                               
                                    <div className="mb-3">
                                        <label> Title
                                        <Field type="text" className="w-full py-2 px-3 rounded bg-white border border-gray-200 outline-none" placeholder='Enter Product Title' name='title' />
                                        <ErrorMessage className='text-red-500' name='title' component={'p'} />
                                        </label>
                                    </div>


                         

                                     <div className="mb-3">
                                        <label> Category
                                        <Field as="select" className="w-full py-2 px-3 rounded bg-white border border-gray-200 outline-none"  name='category' >
                                            <option value="">Select</option>
                                            {
                                                Object.keys(Categies).map((cur,i)=>{
                                                    return <option key={i} value={cur}>{cur}</option>
                                                })
                                            }


                                        </Field>
                                           <ErrorMessage className='text-red-500' name='category' component={'p'} />
                                        </label>
                                    </div>
                                

                                    <div className="mb-3">
                                        <label>  Description
                                        <Field as="textarea" rows={5} className="w-full py-2 px-3 rounded bg-white border border-gray-200 outline-none" placeholder='Enter Product  Description' name='description' />
                                        <ErrorMessage className='text-red-500' name='description' component={'p'} />
                                        </label>
                                    </div>

                                     <div className="mb-3">
                                        <label>  Product Images </label>
                        <ProductImageComponent images={values.images} setImages={(data)=>setFieldValue('images',data)} />


                                    </div>


                                    
                                    <div className="mb-3">
                                        <label>  Price (in &#8377;)
                                        <Field 
                                        onInput={(e)=>{
                                    e.target.value = e.target.value.replace(/[^0-9]/g,"")
                                        }}
                                        type="text" className="w-full py-2 px-3 rounded bg-white border border-gray-200 outline-none" placeholder='Enter Product  Price' name='price' />
                                        <ErrorMessage className='text-red-500' name='price' component={'p'} />
                                        </label>
                                    </div>

                                    <div className="mb-3">
                                        <AuthButton isLoading={loading} text={'Add Product'} />
                                    </div>
                           
                         
                        </Form>
                           }}
                    </Formik>

                    </div>
    
    </>
  )
}

export default AddProduct



const ProductImageComponent =({images,setImages})=>{

    // const [images,setImages ] = useState([])
 

     const onDrop = useCallback(acceptedFiles => {
                if(acceptedFiles && acceptedFiles.length>0){
setImages(acceptedFiles)
                }


  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    multiple:true,
    maxFiles:5,
     accept:{
         'image/jpeg': ['.jpeg', '.jpg'],
          'image/png': ['.png'],
    }
  })


  const deleteHandler =(idx)=>{
      let all_image =   images.filter((_,i)=> i!= idx )
      setImages(all_image)
  }

    return <>
             {images && images.length>0 ? <> 
             <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 mx-auto gap-x-3 gap-y-2">

                    {
                        
                             images.map((cur,i)=>{
                            return <div key={i} className='w-full relative h-[200px] p-2 rounded-sm'>
                                <img src={URL.createObjectURL(cur)} alt={i+1} className='w-full h-full  object-cover' />

                                        <button 
                                        onClick={()=>deleteHandler(i)}
                                        className="p-2 absolute right-0 top-0 text-xl bg-blue-500 cursor-pointer text-white rounded-full">
                                            <MdClose/>
                                        </button>
                            </div>
                        })
                    }
                    </div>
             
             </> : <div {...getRootProps()} className='border w-full min-h-44 flex justify-center items-center border-dashed border-blue-500 bg-white'>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                   
                     <div className='flex items-center justify-center flex-col'>
                                <IoCloudUploadOutline className='text-6xl text-blue-500 ' />
                                <p className="text-center">Uplaoding....</p>

                    </div>
                    :
                    <div className='flex items-center justify-center flex-col'>
                                <IoIosImages className='text-6xl text-blue-500 ' />
                                <p className="text-center">Uplaod Images</p>

                    </div>
                }
                </div>}
    </>
}