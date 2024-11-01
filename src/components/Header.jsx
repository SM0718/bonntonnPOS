import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import ProductUploadIcon from '../svg/ProductUploadIcon'
import Products from '../svg/Products'
import Analytics from '../svg/Analytics'
import OrdersIcon from '../svg/OrdersIcon'

function Header() {

    const [open, setOpen] = useState(false)

    const headerItems = [
        {
            name: 'Analytics',
            icon: <Analytics />,
            slug: '/'
        },
        {
            name: 'Upload Product',
            icon: <ProductUploadIcon />,
            slug: '/product-upload'
        },
        {
            name: 'All Product',
            icon: <Products />,
            slug: '/all-products'
        },
        {
            name: 'Orders',
            icon: <OrdersIcon />,
            slug: '/orders'
        },
    ]
  
    return (
        <div 
        onMouseEnter={() => setOpen(true)} 
        onMouseLeave={() => setOpen(false)} 
        className={`h-screen fixed bg-black text-white ${open ? "w-64" : "w-16"} transition-all flex items-center justify-center gap-8`}>
            <ul className='flex flex-col gap-6'>
                {headerItems.map(item => (
                    <NavLink key={item.name} to={item.slug}>
                        <li className="flex items-center space-x-2 p-2 transition-all">
                           
                            {!open?  <span>{item.icon}</span> : <span className='flex items-center gap-4'>
                                <p>{item.icon}</p>
                                <p>{item.name}</p>
                                </span>}
                        </li>
                    </NavLink>
                ))}
            </ul>
        </div>
    )
}

export default Header
