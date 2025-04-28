import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { BookA, ChartLine, Upload, PackageSearch, Package2, BookCopy, ReceiptText, ChartNoAxesCombined, ChartNetwork} from 'lucide-react'

function Header() {

    const [open, setOpen] = useState(false)

    const headerItems = [
        {
            name: 'Product Analytics',
            icon: <ChartLine />,
            slug: '/'
        },
        {
            name: 'Course Analytics',
            icon: <ChartNoAxesCombined />,
            slug: '/course-analytics'
        },
        {
            name: 'Ebooks Analytics',
            icon: <ChartNetwork />,
            slug: '/ebook-analytics'
        },
        {
            name: 'Upload Product',
            icon: <Upload />,
            slug: '/product-upload'
        },
        {
            name: 'All Product',
            icon: <PackageSearch />,
            slug: '/products'
        },
        {
            name: 'Orders',
            icon: <Package2 />,
            slug: '/orders'
        },
        {
            name: 'Course Upload',
            icon: <BookA />,
            slug: '/course-upload'
        },
        {
            name: 'Ebooks Upload',
            icon: <BookCopy />,
            slug: '/ebook-upload'
        },
        {
            name: 'All Content',
            icon: <ReceiptText />,
            slug: '/contents'
        },
    ]
  
    return (
        <div 
        onMouseEnter={() => setOpen(true)} 
        onMouseLeave={() => setOpen(false)} 
        className={`h-screen fixed bg-black text-white ${open ? "w-64" : "w-12"} transition-all flex items-center justify-start gap-8 z-50`}>
            <ul className='flex flex-col gap-6'>
                {headerItems.map(item => (
                    <NavLink key={item.name} 
                    to={item.slug} 
                    className={({ isActive }) => 
                        (isActive && open) ? "translate-x-4" : "transition duration-500 hover:translate-x-4"
                      }>
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
