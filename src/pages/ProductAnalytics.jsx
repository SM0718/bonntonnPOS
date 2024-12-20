import React from 'react'
import axios from "axios";
import { saveAs } from "file-saver";

function ProductAnalytics() {

  const handleDownload = async () => {
    try {
        const response = await axios.get("api/v1/products/download-products", {
            responseType: "blob",
        });
        const blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "productDetails.xlsx");
    } catch (error) {
        console.error("Error downloading the Excel file:", error);
    }
};

  return (
    <button onClick={handleDownload}>Download Products as Excel</button>
  )
}

export default ProductAnalytics