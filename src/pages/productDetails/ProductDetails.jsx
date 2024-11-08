import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import Button from '../../components/Button'

function ProductDetails() {

    const detailUpload = [
        {
            name: "Upload Products",
            slug: "/product-upload"
        },
        {
            name: "Catagory",
            slug: "/product-upload/catagory-upload"
        },
    ]
  return (
    <div className='w-[940px] mx-auto'>
        <div className='mx-auto flex gap-8 pt-4 border-b-2'>

                {
                detailUpload.map(item => <NavLink 
                    key={item.name} 
                    to={item.slug}
                    end
                    className={({isActive}) => 
                    `${isActive? "border-b-4 border-[#285EFE]" : 
                        "hover:border-b-4 hover:border-[#285EFE] transition duration-300"} 
                        text-[18px] times`}
                >
                    <Button>
                    {item.name}
                    </Button>
                </NavLink>
                
                )
                }
     </div>

        <Outlet />
    </div>
  )
}

export default ProductDetails