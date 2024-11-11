// import React, { useState, useEffect } from 'react'
// import Button from '../../components/Button'
// import Input from '../../components/Input';
// import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/table";
// import { toast } from 'react-toastify'
// import { useForm } from "react-hook-form";

// function CatagoryUpload() {

//   const [data, setData] = useState([])
//   const [reloadData, setReloadData] = useState(false)
//   const [showModal, setShowModal] = useState(false)
//   const { register, handleSubmit, reset, formState: { errors } } = useForm();

//   useEffect(() => {
//     async function fetchData() {
//         try {
//             const response = await fetch('/api/v1/catagory/get-catagory', {
//                 method: 'GET',
//             });

//             if (response.ok) {
//                 const catagoryData = await response.json();
//                 setData(catagoryData.data)
//             }
//         } catch (error) {
//           toast.error(error, {
//             position: "top-right",
//             autoClose: 2000,
//             theme: "dark",
//         })
//         }
//     }
//     fetchData();
// }, [reloadData]);

// const deleteCatagory = async(catagoryId, catagory) => {
//   try {
//     const response = await fetch(`/api/v1/catagory/delete-catagory?catagoryId=${catagoryId}`, {
//       method: 'DELETE',
//     })

//     if(response.ok) {
//       if(response.status === 204) {
//         toast.error(`${catagory} Linked With Product`, {
//           position: "top-right",
//           autoClose: 2000,
//           theme: "dark",
//       })
//       } else {
//         const data = await response.json()
//       if(data.success === true) {
//         setReloadData(!reloadData)
//         toast.success(`${catagory} Deleted Successfully`, {
//           position: "top-right",
//           autoClose: 2000,
//           theme: "dark",
//       })
//       }
//       }
      
//     }
//   } catch (error) {
//     toast.error(error, {
//       position: "top-right",
//       autoClose: 2000,
//       theme: "dark",
//   })
//   }
// }

// const addCatagory = async(data) => {
//   try {
//     const response = await fetch(`/api/v1/catagory/add-catagory?catagory=${data.catagory}`, {
//       method: 'POST'
//     })

//     if(response.ok) {
//       if (response.status === 204) {
//         toast.info(`${data.catagory} Already Exist`, {
//           position: "top-right",
//           autoClose: 2000,
//           theme: "dark"
//         })
//         reset()
//       } else {
//           toast.success(`${data.catagory} Added Successfully`, {
//             position: "top-right",
//             autoClose: 2000,
//             theme: "dark"
//           })
//           setReloadData(!reloadData)
//           reset()
//           setShowModal(false)
//       } 
//     }
//   } catch (error) {
//     toast.error(error, {
//       position: "top-right",
//       autoClose: 2000,
//       theme: "dark"
//     })
//   }
// }

//   return (
//     <div className="w-full py-8 relative">

//       <div className='w-full flex justify-between'>
//         <h1 className='trajan text-[28px]'>
//           Catagory Details
//         </h1>
//         <div className='relative'>
//           <Button onClick={() => setShowModal(!showModal)} className={`bg-[#285EFE] p-3 rounded-xl text-white`}>
//             Add New Catagory               
//           </Button>

//           {
//             showModal && <div className='w-[170px] h-[120px] my-2 rounded-xl absolute bg-slate-200'>
//                   <form onSubmit={handleSubmit(addCatagory)} className='w-5/6 h-full py-4 mx-auto flex flex-col justify-between'>
//                     <Input
//                         type='text'
//                         {...register(`catagory`, { required: 'Catagory is required' })}
//                         className='w-full border-2 p-1 rounded-xl'
//                         placeholder="Catagory"
//                     />
//                     {errors[`catagory`] && <p>{errors[`catagory`].message}</p>}
//                     <Button type="submit" className={`bg-[#285EFE] p-2 text-[15px] rounded-xl text-white`}>
//                         Add Catagory               
//                     </Button>
//                   </form>
//               </div>
//           }
//         </div>
        
//       </div>

//       <div className='w-full flex justify-center'>

// <Table className='my-4' aria-label="Example static collection table">
//       <TableHeader>
//         <TableColumn className=''>CATAGORY</TableColumn>
//         <TableColumn className=''>ACTIONS</TableColumn>
//       </TableHeader>
//       <TableBody className='bg-black'>
//         { 
//       data.map(item => <TableRow className='w-full flex justify-between' key={item._id}>
//         <TableCell className='times text-[18px]'>
//           {item.catagory}
//         </TableCell>
//         <TableCell className='times text-[18px] text-[#F00]'>
//           <Button onClick={() => deleteCatagory(item._id, item.catagory)}>Delete Catagory</Button>
//         </TableCell>
//       </TableRow>)
//     }
//       </TableBody>
//     </Table>
//       </div>
//     </div>
//   )
// }

// export default CatagoryUpload


import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/table";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";

const CategoryUpload = () => {
  const [data, setData] = useState([]);
  const [reloadData, setReloadData] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/v1/catagory/get-catagory', {
          method: 'GET',
        });

        if (response.ok) {
          const categoryData = await response.json();
          setData(categoryData.data);
        }
      } catch (error) {
        toast.error(error, {
          position: "top-right",
          autoClose: 2000,
          theme: "dark",
        });
      }
    }
    fetchData();
  }, [reloadData]);

  const deleteCategory = async (categoryId, category) => {
    try {
      const response = await fetch(`/api/v1/catagory/delete-catagory?catagoryId=${categoryId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        if (response.status === 204) {
          toast.error(`${category} Linked With Product`, {
            position: "top-right",
            autoClose: 2000,
            theme: "dark",
          });
        } else {
          const data = await response.json();
          if (data.success === true) {
            setReloadData(!reloadData);
            toast.success(`${category} Deleted Successfully`, {
              position: "top-right",
              autoClose: 2000,
              theme: "dark",
            });
          }
        }
      }
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    }
  };

  const addCategory = async (data) => {
    try {
      const response = await fetch(`/api/v1/catagory/add-catagory?catagory=${data.catagory}`, {
        method: 'POST'
      });

      if (response.ok) {
        if (response.status === 204) {
          toast.info(`${data.catagory} Already Exist`, {
            position: "top-right",
            autoClose: 2000,
            theme: "dark"
          });
          reset();
        } else {
          toast.success(`${data.catagory} Added Successfully`, {
            position: "top-right",
            autoClose: 2000,
            theme: "dark"
          });
          setReloadData(!reloadData);
          reset();
          setShowModal(false);
        }
      }
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000,
        theme: "dark"
      });
    }
  };

  return (
    <div className="w-full py-8 relative">
      <div className="w-full flex justify-between mb-6">
        <h1 className="trajan text-2xl">Category Details</h1>
        <div className="relative">
          <Button
            onClick={() => setShowModal(!showModal)}
            className="bg-blue-600 px-4 py-2 rounded-xl text-white"
          >
            Add New Category
          </Button>

          {showModal && (
            <div className="absolute right-0 w-64 mt-2 p-4 rounded-xl bg-slate-200 shadow-lg z-50">
              <form onSubmit={handleSubmit(addCategory)} className="space-y-4">
                <Input
                  type="text"
                  {...register('catagory', { required: 'Category is required' })}
                  className="w-full border-2 p-2 rounded-xl"
                  placeholder="Category"
                />
                {errors.catagory && (
                  <p className="text-red-500 text-sm">{errors.catagory.message}</p>
                )}
                <Button
                  type="submit"
                  className="w-full bg-blue-600 py-2 rounded-xl text-white"
                >
                  Add Category
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>

      <div className="w-full">
        <Table aria-label="Category management table" className="min-w-full">
          <TableHeader>
            <TableColumn className="w-2/3 text-left px-6 py-3">CATEGORY</TableColumn>
            <TableColumn className="w-1/3 text-center px-6 py-3">ACTIONS</TableColumn>
          </TableHeader>
          <TableBody>
            {data.map(item => (
              <TableRow key={item._id} className="border-t">
                <TableCell className="w-2/3 px-6 py-4 text-lg times">
                  {item.catagory}
                </TableCell>
                <TableCell className="w-1/3 px-6 py-4 text-center">
                  <Button
                    onClick={() => deleteCategory(item._id, item.catagory)}
                    className="text-red-500 hover:text-red-700 times text-lg"
                  >
                    Delete Category
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CategoryUpload;