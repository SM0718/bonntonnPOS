import React from 'react'
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import UpArrow from '../../svg/UpArrow'
import axios from "axios";
import { saveAs } from "file-saver";
import { Download, Plus } from 'lucide-react';
import {Tooltip, Button} from "@nextui-org/react";
import { motion } from 'framer-motion';

function Products() {

  const productNavigation = [
    {
      name: "All Products",
      slug: '/products'
    },
    {
      name: "Coupon Codes",
      slug: '/products/cupon-codes'
    },
  ]

  const handleDownload = async () => {
    try {
        const response = await fetch("https://bonnbackend.up.railway.app/api/v1/products/download-products", {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();
        const file = new Blob([blob], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        saveAs(file, "Product Details.xlsx");
    } catch (error) {
        console.error("Error downloading the Excel file:", error);
    }
};


  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-6"
        >
          <h1 className="page-title">PRODUCTS</h1>

          <div className="flex items-center gap-3">
            <Tooltip content="Download Product Details">
              <button onClick={handleDownload} className="btn-secondary flex items-center gap-2">
                <Download size={18} />
                <span>Download</span>
              </button>
            </Tooltip>
            <NavLink to={'/product-upload'}>
              <button className="btn-primary flex items-center gap-2">
                <Plus size={18} />
                <span>Upload Product</span>
              </button>
            </NavLink>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex gap-8 border-b border-surface-200 mb-6"
        >
          {productNavigation.map(item => (
            <NavLink
              key={item.name}
              to={item.slug}
              end
              className={({ isActive }) =>
                `pb-3 text-sm font-semibold tracking-wide transition-colors duration-200 ${
                  isActive
                    ? 'border-b-2 border-brand-600 text-brand-700'
                    : 'text-surface-500 hover:text-surface-700'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Outlet />
        </motion.div>

      </div>
    </div>
  )
}

export default Products
