import React, { useState, useEffect } from 'react'
import Button from '../../components/Button'
import { toast } from 'react-toastify'

function CatagoryUpload() {

  const [data, setData] = useState([])
  const [reloadData, setReloadData] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    async function fetchData() {
        try {
            const response = await fetch('/api/v1/catagory/get-catagory', {
                method: 'GET',
            });

            if (response.ok) {
                const catagoryData = await response.json();
                console.log(catagoryData.data)
                setData(catagoryData.data)
            }
        } catch (error) {
            console.log(error);
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
  } catch (error) {
    console.log(error)
  }
}


  return (
    <div className="w-full py-8 relative">

      <div className='w-full flex justify-between'>
        <h1 className='trajan text-[28px]'>
          Catagory Details
        </h1>
        <Button onClick={() => setShowModal(true)} className={`bg-[#285EFE] p-3 rounded-xl text-white`}>
            Add New Catagory               
        </Button>
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