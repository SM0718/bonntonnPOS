import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import ProductUploadIcon from '../svg/ProductUploadIcon'
import Products from '../svg/Products'

function Header() {

    const [open, setOpen] = useState(false)

    const headerItems = [
        {
            name: 'Upload Product',
            icon: <ProductUploadIcon />,
            slug: '/'
        },
        {
            name: 'All Product',
            icon: <Products />,
            slug: '/all-products'
        },
    ]
  
    return (
        <div 
        onMouseEnter={() => setOpen(true)} 
        onMouseLeave={() => setOpen(false)} 
        className={`h-screen fixed bg-yellow-400 ${open ? "w-64" : "w-16"} transition-all flex items-center justify-center`}>
            <ul>
                {headerItems.map(item => (
                    <NavLink key={item.name} to={item.slug}>
                        <li className="flex items-center space-x-2 p-2 transition-all">
                           
                            {!open?  <span>{item.icon}</span> : <span className=''>{item.name}</span>}
                        </li>
                    </NavLink>
                ))}
            </ul>
        </div>
    )
}

export default Header
