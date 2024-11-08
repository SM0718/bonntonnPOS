import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { toast } from 'react-toastify';
import ProductsList from '../../components/ProductsList'

function AllProducts() {
  const [catagoryList, setCatagoryList] = useState([]);
  const [error, setError] = useState('');
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [product, setProduct] = useState([])
  const [deleteProduct, setDeleteProduct]  = useState("")
  const [selectedCatagory, setSelectedCatagory] = useState('');

  const prices = [
    { value: "100-1000" },
    { value: "1001-2000" },
    { value: "2001-3000" },
    { value: "3001-4000" },
    { value: "4001-9999" },
  ];

  const handleFilter = async (data) => {
    console.log(data);
    let response
    try {
      if(data) {
        response = await fetch(`api/v1/products/filter-products?catagory=${selectedCatagory}&priceRange=${data.priceRange}&foodType=${data.foodType}&productName=${data.productName}`, {
          method: 'GET',
        });
      } else {
        response = await fetch(`api/v1/products/filter-products`, {
          method: 'GET',
        });
      }
  
      if(response.ok) {
        const result = await response.json()
        console.log(result.data.products)
        setProduct(result.data.products)
      } 
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      })
    }
  };

  const getCatagoryList = async () => {
    setError('');
    try {
      const response = await fetch('api/v1/products/get-catagories', {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        setCatagoryList(data.data);
        console.log(data);
      } else {
        console.error(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const productDelete = async () => {

    console.log(deleteProduct)
   try {
     if(deleteProduct) {
       const request = await fetch(`api/v1/products/delete-product?productId=${deleteProduct}`, {
        method: 'DELETE',
      })

       if(request.ok) {
        const response = await request.json()
        console.log(response)
        toast.info("Product Deleted Successfully", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
        })
        handleFilter()
       }
     }
   } catch (error) {
    console.log(error)
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      })
   }
  }

  useEffect(() => {
    getCatagoryList();
  }, []);

  useEffect(() => {
    handleFilter()
  }, [])
  
  useEffect(() => {

    productDelete()
  }, [deleteProduct])
  const handleReset = () => {
    reset();
    handleFilter()
  };

  return (
    <div>
      <div className='flex flex-col gap-4 py-4'>
        <form onSubmit={handleSubmit(handleFilter)} className='flex gap-2'>
          
          <select
              {...register(`catagory`, { required: 'Category is required' })}
              className="w-64 border-2 p-1"
              value={selectedCatagory}
               onChange={(e) => setSelectedCatagory(e.target.value)}
          >
              <option value="" disabled>Select an option</option>
              {catagoryList.map(item => (
              <option key={item._id} value={item._id}>
                {item.catagory}
              </option>
            ))}
          </select>

          <select
            {...register('priceRange')}
            className="w-[150px] border-1 p-1 bg-transparent times" // "bg-transparent" removes background color
            defaultValue=""
          >
            <option value="" disabled>Price Range</option>
            {prices.map(item => (
              <option key={item.value} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>

          <select
            {...register('foodType')}
            className="w-[150px] border-1 p-1 bg-transparent times cursor-pointer"
            defaultValue=""
          >
            <option value="" disabled>Food Type</option>
            <option value={"VEG"}>VEG</option>
            <option value={"NON-VEG"}>NON-VEG</option>
            <option value={"EGG"}>EGG</option>
          </select>

          <Input 
           {...register('productName')}
           placeholder="Search Products..."
           className={"w-[200px] border-[2px] px-1 rounded-md"}
           />

          <div className='flex gap-4'>
            <Button className={'w-[200px] times rounded-xl bg-slate-300 px-2 py-1'} type="submit">Search</Button>
            <Button className={'w-[200px] times rounded-xl bg-slate-300 px-2 py-1'} type="button" onClick={handleReset}>Reset Filters</Button>
          </div>
          
        
          
          
      </form>
      </div>


      <div>
        <ProductsList data={product} setDeleteProduct={setDeleteProduct}/>
      </div>
    </div>
  );
}

export default AllProducts;
