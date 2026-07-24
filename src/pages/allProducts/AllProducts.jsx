import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Slider } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Filter, Search, RotateCcw } from 'lucide-react';
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
        fetchProducts({ catagory: selectedCatagory, priceRange, foodType, productName: "" });
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
    fetchProducts({});
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/10">
          <Filter className="w-5 h-5 text-indigo-500" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-white">All Products</h1>
          <p className="text-sm text-neutral-400">Browse and manage your product catalog</p>
        </div>
      </div>

      <div className="card p-4">
        <form onSubmit={handleSubmit(handleFilter)} className="flex flex-wrap items-end gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="label-base">Category</label>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className="input-base min-w-[200px] justify-start text-left font-normal"
                >
                  {selectedCatagory
                    ? catagoryList.find(item => item._id === selectedCatagory)?.catagory
                    : "All Categories"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                onAction={(key) => setSelectedCatagory(key)}
                aria-label="Category Selection"
              >
                {catagoryList.map((item) => (
                  <DropdownItem key={item._id} value={item._id}>
                    {item.catagory}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>

          <div className="flex flex-col gap-1.5">
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
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="label-base">Dietary</label>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className="input-base min-w-[180px] justify-start text-left font-normal"
                >
                  {foodType || "All Dietary"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                onAction={(key) => setFoodType(key)}
                aria-label="Dietary Selection"
              >
                <DropdownItem key="VEG" value="VEG">VEG</DropdownItem>
                <DropdownItem key="NON-VEG" value="NON-VEG">NON-VEG</DropdownItem>
                <DropdownItem key="EGG" value="EGG">EGG</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="label-base">Search</label>
            <Input
              type="text"
              {...register('productName')}
              placeholder="Search products..."
              className="w-[220px]"
              startContent={<Search className="w-4 h-4 text-neutral-400" />}
            />
          </div>

          <div className="flex gap-2">
            <Button
              type="submit"
              className="btn-primary"
            >
              <Search className="w-4 h-4" />
              Search
            </Button>
            <Button
              type="button"
              className="btn-ghost"
              onClick={handleReset}
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </form>
      </div>

      <div>
        <ProductsList data={product} setDeleteProduct={setDeleteProduct} />
      </div>
    </motion.div>
  );
}

export default AllProducts;
