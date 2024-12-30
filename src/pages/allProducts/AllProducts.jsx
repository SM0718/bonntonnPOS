import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Slider } from "@nextui-org/react"; 
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { toast } from 'react-toastify';
import ProductsList from '../../components/ProductsList';

function AllProducts() {
  const [catagoryList, setCatagoryList] = useState([]);
  const [error, setError] = useState('');
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [product, setProduct] = useState([]);
  const [deleteProduct, setDeleteProduct] = useState("");
  const [selectedCatagory, setSelectedCatagory] = useState('');
  const [priceRange, setPriceRange] = useState("100-9999");
  const [foodType, setFoodType] = useState("");

  // Function to fetch all products initially or with filters
  const fetchProducts = async (filters = {}) => {
    try {
      const { catagory, priceRange, foodType, productName } = filters;

      let query = `https://bonnbackend.up.railway.app/api/v1/products/filter-products?priceRange=${priceRange || '100-9999'}&productName=${productName || ''}`;
      if (catagory) {
        query += `&catagory=${catagory}`;
      }

      if (foodType) {
        query += `&foodType=${foodType}`;
      }

      const response = await fetch(query, { method: 'GET' });
      if (response.ok) {
        const result = await response.json();
        setProduct(result.data.products);
      } else {
        console.error('Error fetching products:', response.status, response.statusText);
      }
    } catch (error) {
      toast.error("Error fetching products", { position: "top-center", autoClose: 3000, theme: "dark" });
    }
  };

  const handleFilter = async (data) => {
    fetchProducts({
      catagory: selectedCatagory,
      priceRange,
      foodType,
      productName: data.productName,
    });
  };

  const handlePriceChange = (e) => {
    const newPriceRange = `${e[0]}-${e[1]}`;
    setPriceRange(newPriceRange);
    // Trigger the fetch with updated price range
    fetchProducts({ catagory: selectedCatagory, priceRange: newPriceRange, foodType, productName: "" });
  };

  const getCatagoryList = async () => {
    try {
      const response = await fetch('https://bonnbackend.up.railway.app/api/v1/products/get-catagories', { method: 'GET' });
      if (response.ok) {
        const data = await response.json();
        setCatagoryList(data.data);
      } else {
        console.error('Error fetching categories:', response.status, response.statusText);
      }
    } catch (error) {
      toast.error("Error fetching categories", { position: "top-center", autoClose: 3000, theme: "dark" });
    }
  };

  useEffect(() => {
    // Fetch all products initially
    fetchProducts({});
    getCatagoryList();
  }, []);

  useEffect(() => {
    if (deleteProduct) {
      productDelete();
    }
  }, [deleteProduct]);

  const productDelete = async () => {
    try {
      const request = await fetch(`https://bonnbackend.up.railway.app/api/v1/products/delete-product?productId=${deleteProduct}`, { method: 'DELETE' });
      if (request.ok) {
        toast.info("Product Deleted Successfully", { position: "top-center", autoClose: 2000, theme: "dark" });
        fetchProducts({ catagory: selectedCatagory, priceRange, foodType, productName: "" }); // Refresh the list
      }
    } catch (error) {
      toast.error("Error deleting product", { position: "top-center", autoClose: 2000, theme: "dark" });
    }
  };

  const handleReset = () => {
    reset();
    setSelectedCatagory("");
    setFoodType("");
    setPriceRange("100-9999");
    fetchProducts({}); // Fetch all products again with no filters
  };

  return (
    <div>
      <div className='flex flex-col gap-4 py-4'>
        <form onSubmit={handleSubmit(handleFilter)} className='flex gap-2'>

            <Dropdown>
              <DropdownTrigger size="lg">
                <Button variant="bordered" color="solid">
                  {selectedCatagory ? `Selected: ${catagoryList.find(item => item._id === selectedCatagory)?.catagory}` : "Search For Category"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                onAction={(key) => {
                  setSelectedCatagory(key);
                }}
                aria-label="Category Selection"
              >
                {catagoryList.map((item) => (
                  <DropdownItem key={item._id} value={item._id}>
                    {item.catagory}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

          <Slider
            size="sm"
            label="Price Range"
            step={50}
            minValue={100}
            maxValue={9999}
            defaultValue={[100, 9999]}
            formatOptions={{ style: "currency", currency: "INR" }}
            className="w-[300px]"
            onChange={handlePriceChange}
          />

          <Dropdown>
            <DropdownTrigger size="lg">
              <Button variant="bordered" color="solid">
                {foodType ? `Selected: ${foodType}` : "Dietry Selection"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              onAction={(key) => {
                setFoodType(key);
              }}
              aria-label="Dietry Selection"
            >
              <DropdownItem key="VEG" value="VEG">
                VEG
              </DropdownItem>
              <DropdownItem key="NON-VEG" value="NON-VEG">
                NON-VEG
              </DropdownItem>
              <DropdownItem key="EGG" value="EGG">
                EGG
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>


          <Input
            size="sm"
            type='text'
            {...register('productName')}
            label="Search Products"
            className={"w-[200px]"}
          />

          <div className='flex gap-4'>
            <Button color="primary" variant="ghost" size="lg" className={'w-[200px] times rounded-xl px-2 py-1'} type="submit">Search</Button>
            <Button color="default" variant="ghost" size="lg" className={'w-[200px] times rounded-xl px-2 py-1'} type="button" onClick={handleReset}>Reset Filters</Button>
          </div>
        </form>
      </div>

      <div>
        <ProductsList data={product} setDeleteProduct={setDeleteProduct} />
      </div>
    </div>
  );
}

export default AllProducts;
