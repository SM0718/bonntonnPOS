import React, { useState, useEffect } from 'react'
import Button from '../../components/Button'
import Input from '../../components/Input';
import { toast } from 'react-toastify'
import { useForm } from "react-hook-form";

function CatagoryUpload() {

  const [data, setData] = useState([])
  const [reloadData, setReloadData] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    async function fetchData() {
        try {
            const response = await fetch('/api/v1/catagory/get-catagory', {
                method: 'GET',
            });

            if (response.ok) {
                const catagoryData = await response.json();
                setData(catagoryData.data)
            }
        } catch (error) {
          toast.error(error, {
            position: "top-right",
            autoClose: 2000,
            theme: "dark",
        })
        }
    }
    fetchData();
}, [reloadData]);

const deleteCatagory = async(catagoryId, catagory) => {
  try {
    const response = await fetch(`/api/v1/catagory/delete-catagory?catagoryId=${catagoryId}`, {
      method: 'DELETE',
    })

    if(response.ok) {
      if(response.status === 204) {
        toast.error(`${catagory} Linked With Product`, {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
      })
      } else {
        const data = await response.json()
      if(data.success === true) {
        setReloadData(!reloadData)
        toast.success(`${catagory} Deleted Successfully`, {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
      })
      }
      }
      
    }
  } catch (error) {
    toast.error(error, {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
  })
  }
}

const addCatagory = async(data) => {
  try {
    const response = await fetch(`/api/v1/catagory/add-catagory?catagory=${data.catagory}`, {
      method: 'POST'
    })

    if(response.ok) {
      if (response.status === 204) {
        toast.info(`${data.catagory} Already Exist`, {
          position: "top-right",
          autoClose: 2000,
          theme: "dark"
        })
        reset()
      } else {
          toast.success(`${data.catagory} Added Successfully`, {
            position: "top-right",
            autoClose: 2000,
            theme: "dark"
          })
          setReloadData(!reloadData)
          reset()
          setShowModal(false)
      } 
    }
  } catch (error) {
    toast.error(error, {
      position: "top-right",
      autoClose: 2000,
      theme: "dark"
    })
  }
}

  return (
    <div className="w-full py-8 relative">

      <div className='w-full flex justify-between'>
        <h1 className='trajan text-[28px]'>
          Catagory Details
        </h1>
        <div className='relative'>
          <Button onClick={() => setShowModal(!showModal)} className={`bg-[#285EFE] p-3 rounded-xl text-white`}>
            Add New Catagory               
          </Button>

          {
            showModal && <div className='w-[170px] h-[120px] my-2 rounded-xl absolute bg-slate-200'>
                  <form onSubmit={handleSubmit(addCatagory)} className='w-5/6 h-full py-4 mx-auto flex flex-col justify-between'>
                    <Input
                        type='text'
                        {...register(`catagory`, { required: 'Catagory is required' })}
                        className='w-full border-2 p-1 rounded-xl'
                        placeholder="Catagory"
                    />
                    {errors[`catagory`] && <p>{errors[`catagory`].message}</p>}
                    <Button type="submit" className={`bg-[#285EFE] p-2 text-[15px] rounded-xl text-white`}>
                        Add Catagory               
                    </Button>
                  </form>
              </div>
          }
        </div>
        
      </div>

      <div className='w-full flex justify-center'>
<table className='w-[700px] py-8 flex flex-col items-center'>
  <thead className='w-full px-2 flex justify-between bg-slate-200'>
    <tr className='times text-[20px]'>
      <td>Catagory</td>
    </tr>
    <tr className='times text-[20px]'>
      <td>Actions</td>
    </tr>
  </thead>

  <tbody className='w-full h-[500px] flex flex-col overflow-scroll gap-6 py-4 px-2'>
    { 
    (data.length > 0) ?
      data.map(item => <tr className='flex justify-between' key={item._id}>
        <td className='times text-[18px]'>
          {item.catagory}
        </td>
        <td className='times text-[18px] text-[#F00]'>
          <Button onClick={() => deleteCatagory(item._id, item.catagory)}>Delete Catagory</Button>
        </td>
      </tr>) :
      <tr className='flex justify-center'>
        <td>
          <iframe src="https://lottie.host/embed/e011563a-0c85-4bab-b2b7-de26fa45c4df/J9tyyzqUNV.json"></iframe>
        </td>
      </tr> 
    }
  </tbody>
</table> 
      </div>
    </div>
  )
}

export default CatagoryUpload