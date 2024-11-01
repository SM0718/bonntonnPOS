import React from 'react'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import {
  UploadProduct,
  Products,
  CuponCode,
  ProductAnalytics,
  Orders
} from './pages/index.js'

import AllProducts from './pages/allProducts/AllProducts.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<ProductAnalytics />}/>
      <Route path='/product-upload' element={<UploadProduct />}/>
      <Route path='/products' element={<Products />}>
        <Route path='/products' element={<AllProducts />}/>
        <Route path='/products/cupon-codes' element={<CuponCode />}/>
      </Route>
      <Route path='/orders' element={<Orders />}/>
    </Route>
  ))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
       <RouterProvider router={router} />
    {/* </Provider> */}
  </React.StrictMode>,
)
