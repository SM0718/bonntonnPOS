import React from 'react'
import Spinner from '../svg/Spinner'
import Button from './Button'
import ThreeDot from '../svg/ThreeDot'
import { NavLink } from 'react-router-dom'

function Products({data, setDeleteProduct}) {

  const cols = [
    {name: "Products", style: "w-[400px]"}, 
    {name: "Price", style: "w-[150px]"}, 
    {name: "Status", style: "w-[200px]"}, 
    {name: "Food Type", style: "w-[100px]"}, 
    {name: "Actions", style: "w-[100px]"}
  ]

  const NoProduct = () => {

    return <div className='flex flex-col justify-center items-center' role="status">
      <Spinner />
      <span className="times">Searching For Products - You can try other filters if this is taking too long</span>
    </div>

  }

  return (
    <div className='py-4 flex justify-center'>

{data.length > 0?  
<table className='w-full'>
  <thead>
    <tr className='flex justify-between bg-slate-300'>
      {cols.map(item => (
        <th key={item.name} className={`${item.style} times`}>{item.name}</th>
      ))}
    </tr>
  </thead>

  <tbody className='flex flex-col gap-6 py-4'>
    {data.map((item, index) => (
      <tr key={item._id} className='flex justify-between'>
        <td className='flex items-center gap-2 w-[400px]'>
          <img 
          src={item.variant[0].variantPic_1} 
          alt={item.variant[0].variantName}
          className='w-14 h-14 rounded-xl'
          />
          <p className='times'>{item.variant[0].variantName}</p>
        </td>

        <td className="w-[150px]">
          <p className="w-full times text-center">₹ {item.variant[0].variantPrice}</p>
        </td>

        <td className='w-[200px]'>
            <p className={`${item.variant[0].active? "bg-[#14AE5C]" : "bg-[#E33629]"} w-[200px] rounded-xl times text-center text-white`}>{
            item.variant[0].active? "Active" : "Inactive"
          }</p>
        </td>

        <td className='w-[100px]'>
          <p className="w-full times">{item.variant[0].foodType}</p>
        </td>

        <td className='w-[100px] pb-2 relative overflow-visible'>
          <div className='group w-8 mx-auto'>
            <Button className='flex justify-center items-center mx-auto rounded-full px-1 py-2 hover:bg-slate-200'>
              <ThreeDot />
            </Button>
            
            <div className='w-[150px] hidden group-hover:flex flex-col items-start gap-2 border absolute right-0 z-50 bg-white'>
              <NavLink to={'#'} className='w-full px-2 py-1 hover:bg-slate-400 text-center'>Edit Product</NavLink>
              <NavLink to={'#'} className='w-full px-2 py-1 hover:bg-slate-400 text-center'>Change Status</NavLink>
              <Button onClick={() => setDeleteProduct(item._id)} className='w-full px-2 py-1 hover:bg-slate-400'>Delete Product</Button>
            </div>
          </div>
        </td>

      </tr>
    ))}
  </tbody>
</table> 
:
<NoProduct />

}

    </div>
  )
}

export default Products