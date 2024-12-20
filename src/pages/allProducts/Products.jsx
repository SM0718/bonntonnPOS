import React from 'react'
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
// import Button from '../../components/Button'
import UpArrow from '../../svg/UpArrow'
import axios from "axios";
import { saveAs } from "file-saver";
import { Download } from 'lucide-react';
import {Tooltip, Button} from "@nextui-org/react";

function Products() {

  const productNavigation = [
    {
      name: "All Products",
      slug: '/products'
    },
    {
      name: "Cupon Codes",
      slug: '/products/cupon-codes'
    },
  ]

  const handleDownload = async () => {
    try {
        const response = await axios.get("api/v1/products/download-products", {
            responseType: "blob",
        });
        const blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "Product Details.xlsx");
    } catch (error) {
        console.error("Error downloading the Excel file:", error);
    }
};

  return (
    <div className='w-5/6 z-40 mx-auto py-8'>
      
      <div className='w-full flex justify-between'>
        <h1 className='text-[32px] trajan'>PRODUCTS</h1>

        <div className='flex gap-4'>
          <Tooltip content="Download Product Details">
            <Button onClick={handleDownload} size="md" variant="light"><Download /></Button>
          </Tooltip>
          <NavLink to={'/product-upload'}>
          <Button className={`bg-indigo-600 hover:bg-[#A8A3F4] p-3 flex gap-2 rounded-xl`}>                    
            <UpArrow />
            <p className='text-white times'>Upload Product</p>
          </Button>
        </NavLink>
        </div>
        
      </div>

        <div className='flex gap-8 pt-4 border-b-2'>

            {
              productNavigation.map(item => <NavLink 
                key={item.name} 
                to={item.slug}
                end
                className={({isActive}) => 
                  `${isActive? "border-b-4 border-[#285EFE]" : 
                    "hover:border-b-4 hover:border-[#285EFE] transition duration-300"} 
                    text-[18px] times`}
              >
                <Button size="md" variant="light">
                  {item.name}
                </Button>
              </NavLink>
              
              )
            }
        </div>

      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Products