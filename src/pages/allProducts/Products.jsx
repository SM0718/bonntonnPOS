import React from 'react'
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Button from '../../components/Button'
import UpArrow from '../../svg/UpArrow'

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

  return (
    <div className='w-3/4 z-40 mx-auto py-8'>
      
      <div className='w-full flex justify-between'>
        <h1 className='text-[32px] trajan'>PRODUCTS</h1>
        <NavLink to={'/product-upload'}>
          <Button className={`bg-[#285EFE] p-3 flex gap-2 rounded-xl`}>                    
            <UpArrow />
            <p className='text-white times'>Upload Product</p>
          </Button>
        </NavLink>
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
                <Button>
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