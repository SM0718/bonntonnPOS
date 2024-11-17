// import React, { useState } from 'react';
// import {Spinner} from "@nextui-org/spinner";
// import ThreeDot from '../svg/ThreeDot';
// import { NavLink } from 'react-router-dom';
// import {
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem,
//   Button,
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   User,
// } from '@nextui-org/react';
// import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
// import { useForm } from 'react-hook-form';

// function Products({ data, setDeleteProduct }) {
//   const cols = [
//     { name: 'Products', style: 'w-[400px]' },
//     { name: 'Price', style: 'w-[150px]' },
//     { name: 'Status', style: 'w-[200px] pl-24' },
//     { name: 'Dietry', style: 'w-[100px]' },
//     { name: 'Actions', style: 'w-[100px] pl-8' },
//   ];

//   const { control: editControl, handleSubmit: handleEditSubmit, reset: resetEdit, setValue } = useForm();
//   const { isOpen: isEditOpen, onOpen: onEditOpen, onOpenChange: onEditOpenChange } = useDisclosure();
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const handleEdit = (product) => {
//     console.log(product)
//     // setSelectedCupon(cupon);
//     // setValue('cuponCode', cupon.name);
//     // setValue('minOrderValue', cupon.minOrderValue);
//     // setValue('date', formatDateForInput(cupon.expiryDate));
//     // onEditOpen();
//   };

//   const NoProduct = () => (
//     <div className="flex flex-col justify-center items-center" role="status">
//       <Spinner />
//       <span className="times">
//         Searching For Products - You can try other filters if this is taking too long
//       </span>
//     </div>
//   );

//   return (
//     <div className="py-4 flex justify-center">
//       {data.length > 0 ? (
//         <Table aria-label="Product Table" className="w-full">
//           <TableHeader>
//             {cols.map((item) => (
//               <TableColumn key={item.name} className={item.style}>
//                 {item.name}
//               </TableColumn>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {data.map((item) => (
//               <TableRow key={item._id}>
//                 <TableCell className="flex items-center gap-2 w-[400px]">
//                   <User
//                     name={item.variant[0].variantName}
//                     description={item.catagoryResult[0].catagory}
//                     avatarProps={{
//                       src: item.variant[0].variantPic_1,
//                     }}
//                   />
//                 </TableCell>
//                 <TableCell className="w-[150px]">
//                   <p className="times">₹ {item.variant[0].variantPrice}</p>
//                 </TableCell>
//                 <TableCell className="w-[200px]">
//                   <p
//                     className={`${
//                       item.variant[0].active ? 'bg-[#14AE5C]' : 'bg-[#E33629]'
//                     } w-[200px] rounded-xl times text-center text-white py-1`}
//                   >
//                     {item.variant[0].active ? 'Active' : 'Inactive'}
//                   </p>
//                 </TableCell>
//                 <TableCell className="w-[100px]">
//                   <p className="times">{item.variant[0].foodType}</p>
//                 </TableCell>
//                 <TableCell className="w-[100px] pb-2 relative overflow-visible">
//                   <Dropdown>
//                     <DropdownTrigger>
//                       <Button className="size-4" variant="light">
//                         <ThreeDot />
//                       </Button>
//                     </DropdownTrigger>
//                     <DropdownMenu aria-label="Product Actions">
//                       <DropdownItem onPress={() => handleEdit(item)} key="edit">Edit code</DropdownItem>
//                       <DropdownItem key="change">
//                         <NavLink to="#">Change Status</NavLink>
//                       </DropdownItem>
//                       <DropdownItem
//                         onClick={() => setDeleteProduct(item._id)}
//                         key="delete"
//                         className="text-danger"
//                         color="danger"
//                       >
//                         Delete Product
//                       </DropdownItem>
//                     </DropdownMenu>
//                   </Dropdown>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       ) : (
//         <NoProduct />
//       )}

// {/* <Modal isOpen={isEditOpen} onOpenChange={onEditOpenChange}>
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1">Edit Cupon</ModalHeader>
//               <ModalBody>
//                 <form onSubmit={handleEditSubmit(onEditSubmit)} className="w-full mx-auto space-y-4 bg-white rounded">
//                   <div>
//                     <label className="block times text-sm font-medium text-gray-700 mb-2">Cupon Code</label>
//                     <Controller
//                       name="cuponCode"
//                       control={editControl}
//                       defaultValue=""
//                       render={({ field }) => (
//                         <Input
//                           type="text"
//                           className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                           {...field}
//                         />
//                       )}
//                     />
//                   </div>

//                   <div>
//                     <label className="block times text-sm font-medium text-gray-700 mb-2">Minimum Order Value</label>
//                     <Controller
//                       name="minOrderValue"
//                       control={editControl}
//                       defaultValue=""
//                       render={({ field }) => (
//                         <Input
//                           type="number"
//                           className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                           {...field}
//                         />
//                       )}
//                     />
//                   </div>

//                   <div>
//                     <label className="block times text-sm font-medium text-gray-700 mb-2">Select Date</label>
//                     <Controller
//                       name="date"
//                       control={editControl}
//                       defaultValue=""
//                       render={({ field }) => (
//                         <Input
//                           type="date"
//                           min={getTodayDate()}
//                           className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                           {...field}
//                         />
//                       )}
//                     />
//                   </div>

//                   <ModalFooter className="w-full flex gap-6">
//                     <Button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700">
//                       Update
//                     </Button>
//                     <Button className="w-full py-2 px-4 bg-[#F00] text-white font-semibold rounded-xl hover:bg-[#db4a4a]" onPress={onClose}>
//                       Close
//                     </Button>
//                   </ModalFooter>
//                 </form>
//               </ModalBody>
//             </>
//           )}
//         </ModalContent>
//       </Modal> */}
//     </div>
//   );
// }

// export default Products;

// import React, { useState } from 'react';
// import { Spinner } from '@nextui-org/spinner';
// import ThreeDot from '../svg/ThreeDot';
// import { NavLink } from 'react-router-dom';
// import {
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem,
//   Button,
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   User,
//   Input,
// } from '@nextui-org/react';
// import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
// import { useForm, Controller } from 'react-hook-form';

// function Products({ data, setDeleteProduct }) {
//   const cols = [
//     { name: 'Products', style: 'w-[400px]' },
//     { name: 'Price', style: 'w-[150px]' },
//     { name: 'Status', style: 'w-[200px] pl-24' },
//     { name: 'Dietry', style: 'w-[100px]' },
//     { name: 'Actions', style: 'w-[100px] pl-8' },
//   ];

//   const { control, handleSubmit, setValue, reset } = useForm();
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const handleEdit = (product) => {
//     setSelectedProduct(product);
//     setValue('productName', product.variant[0].variantName);
//     setValue('price', product.variant[0].variantPrice);
//     setValue('status', product.variant[0].active ? 'Active' : 'Inactive');
//     setValue('diet', product.variant[0].foodType);
//     onOpen();
//   };

//   const onSubmit = (data) => {
//     console.log('Updated product data:', data);
//     // Handle form submission, e.g., send a request to the server to update the product
//     onOpenChange(false); // Close the modal after submission
//   };

//   const NoProduct = () => (
//     <div className="flex flex-col justify-center items-center" role="status">
//       <Spinner />
//       <span className="times">
//         Searching For Products - You can try other filters if this is taking too long
//       </span>
//     </div>
//   );

//   return (
//     <div className="py-4 flex justify-center">
//       {data.length > 0 ? (
//         <Table aria-label="Product Table" className="w-full">
//           <TableHeader>
//             {cols.map((item) => (
//               <TableColumn key={item.name} className={item.style}>
//                 {item.name}
//               </TableColumn>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {data.map((item) => (
//               <TableRow key={item._id}>
//                 <TableCell className="flex items-center gap-2 w-[400px]">
//                   <User
//                     name={item.variant[0].variantName}
//                     description={item.catagoryResult[0].catagory}
//                     avatarProps={{
//                       src: item.variant[0].variantPic_1,
//                     }}
//                   />
//                 </TableCell>
//                 <TableCell className="w-[150px]">
//                   <p className="times">₹ {item.variant[0].variantPrice}</p>
//                 </TableCell>
//                 <TableCell className="w-[200px]">
//                   <p
//                     className={`${
//                       item.variant[0].active ? 'bg-[#14AE5C]' : 'bg-[#E33629]'
//                     } w-[200px] rounded-xl times text-center text-white py-1`}
//                   >
//                     {item.variant[0].active ? 'Active' : 'Inactive'}
//                   </p>
//                 </TableCell>
//                 <TableCell className="w-[100px]">
//                   <p className="times">{item.variant[0].foodType}</p>
//                 </TableCell>
//                 <TableCell className="w-[100px] pb-2 relative overflow-visible">
//                   <Dropdown>
//                     <DropdownTrigger>
//                       <Button className="size-4" variant="light">
//                         <ThreeDot />
//                       </Button>
//                     </DropdownTrigger>
//                     <DropdownMenu aria-label="Product Actions">
//                       <DropdownItem onPress={() => handleEdit(item)} key="edit">Edit Product</DropdownItem>
//                       <DropdownItem key="change">
//                         <NavLink to="#">Change Status</NavLink>
//                       </DropdownItem>
//                       <DropdownItem
//                         onClick={() => setDeleteProduct(item._id)}
//                         key="delete"
//                         className="text-danger"
//                         color="danger"
//                       >
//                         Delete Product
//                       </DropdownItem>
//                     </DropdownMenu>
//                   </Dropdown>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       ) : (
//         <NoProduct />
//       )}

//       {/* Edit Product Modal */}
//       {selectedProduct && (
//         <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
//           <ModalContent>
//             {(onClose) => (
//               <>
//                 <ModalHeader className="flex flex-col gap-1">Edit Product</ModalHeader>
//                 <ModalBody>
//                   <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
//                     <div>
//                       <label className="block times text-sm font-medium text-gray-700 mb-2">Product Name</label>
//                       <Controller
//                         name="productName"
//                         control={control}
//                         defaultValue=""
//                         render={({ field }) => <Input type="text" {...field} />}
//                       />
//                     </div>
//                     <div>
//                       <label className="block times text-sm font-medium text-gray-700 mb-2">Price</label>
//                       <Controller
//                         name="price"
//                         control={control}
//                         defaultValue=""
//                         render={({ field }) => <Input type="number" {...field} />}
//                       />
//                     </div>
//                     <div>
//                       <label className="block times text-sm font-medium text-gray-700 mb-2">Status</label>
//                       <Controller
//                         name="status"
//                         control={control}
//                         defaultValue=""
//                         render={({ field }) => <Input type="text" {...field} />}
//                       />
//                     </div>
//                     <div>
//                       <label className="block times text-sm font-medium text-gray-700 mb-2">Diet Type</label>
//                       <Controller
//                         name="diet"
//                         control={control}
//                         defaultValue=""
//                         render={({ field }) => <Input type="text" {...field} />}
//                       />
//                     </div>
//                   </form>
//                 </ModalBody>
//                 <ModalFooter className="flex gap-2">
//                   <Button type="submit" className="bg-blue-500 text-white" onPress={handleSubmit(onSubmit)}>
//                     Save Changes
//                   </Button>
//                   <Button variant="light" onPress={onClose}>
//                     Close
//                   </Button>
//                 </ModalFooter>
//               </>
//             )}
//           </ModalContent>
//         </Modal>
//       )}
//     </div>
//   );
// }

// export default Products;



import React, { useState } from 'react';
import { Spinner } from '@nextui-org/spinner';
import ThreeDot from '../svg/ThreeDot'
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import { useForm, Controller } from 'react-hook-form';

function Products({ data, setDeleteProduct }) {
  const cols = [
    { name: 'Products', style: 'w-[400px]' },
    { name: 'Price', style: 'w-[150px]' },
    { name: 'Status', style: 'w-[200px] pl-24' },
    { name: 'Dietry', style: 'w-[100px]' },
    { name: 'Actions', style: 'w-[100px] pl-8' },
  ];

  const navigate = useNavigate()

  const { control, handleSubmit, setValue, reset } = useForm();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setValue('productName', product.variant[0].variantName);
    setValue('price', product.variant[0].variantPrice);
    setValue('status', product.variant[0].active ? 'Active' : 'Inactive');
    setValue('diet', product.variant[0].foodType);
    onOpen();
  };

  const handleInputChange = (e, key, index = null, type = 'variant') => {
    if (index !== null) {
      const updatedArray = [...selectedProduct[type]];
      updatedArray[index] = {
        ...updatedArray[index],
        [key]: e.target.value,
      };
      setSelectedProduct({ ...selectedProduct, [type]: updatedArray });
    } else {
      setSelectedProduct({ ...selectedProduct, [key]: e.target.value });
    }
  };

  const addVariant = () => {
    setSelectedProduct({
      ...selectedProduct,
      variant: [
        ...selectedProduct.variant,
        {
          id: '',
          variantName: '',
          variantPrice: 0,
          variantPic_1: '',
          variantPic_2: '',
          variantPic_3: '',
          variantPic_4: '',
          variantDesc: '',
          foodType: '',
          active: true,
        },
      ],
    });
  };

  const removeVariant = (index) => {
    const updatedVariants = selectedProduct.variant.filter((_, i) => i !== index);
    setSelectedProduct({ ...selectedProduct, variant: updatedVariants });
  };

  const addBoxType = () => {
    setSelectedProduct({
      ...selectedProduct,
      boxSize: [
        ...selectedProduct.boxSize,
        {
          boxId: '',
          boxType: '',
          boxPrice: 0,
        },
      ],
    });
  };

  const removeBoxType = (index) => {
    const updatedBoxes = selectedProduct.boxSize.filter((_, i) => i !== index);
    setSelectedProduct({ ...selectedProduct, boxSize: updatedBoxes });
  };

  const onSubmit = (data) => {
    console.log('Updated product data:', selectedProduct);
    // Handle form submission, e.g., send a request to the server to update the product
    onOpenChange(false); // Close the modal after submission
  };

  const NoProduct = () => (
    <div className="flex flex-col justify-center items-center" role="status">
      <Spinner />
      <span className="times">
        Searching For Products - You can try other filters if this is taking too long
      </span>
    </div>
  );

  return (
    <div className="py-4 flex justify-center">
      {data.length > 0 ? (
        <Table aria-label="Product Table" className="w-full">
          <TableHeader>
            {cols.map((item) => (
              <TableColumn key={item.name} className={item.style}>
                {item.name}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="flex items-center gap-2 w-[400px]">
                  <User
                    name={item.variant[0].variantName}
                    description={item.catagoryResult[0].catagory}
                    avatarProps={{
                      src: item.variant[0].variantPic_1,
                    }}
                  />
                </TableCell>
                <TableCell className="w-[150px]">
                  <p className="times">₹ {item.variant[0].variantPrice}</p>
                </TableCell>
                <TableCell className="w-[200px]">
                  <p
                    className={`${
                      item.variant[0].active ? 'bg-[#14AE5C]' : 'bg-[#E33629]'
                    } w-[200px] rounded-xl times text-center text-white py-1`}
                  >
                    {item.variant[0].active ? 'Active' : 'Inactive'}
                  </p>
                </TableCell>
                <TableCell className="w-[100px]">
                  <p className="times">{item.variant[0].foodType}</p>
                </TableCell>
                <TableCell className="w-[100px] pb-2 relative overflow-visible">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button className="size-4" variant="light">
                        <ThreeDot />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Product Actions">
                      <DropdownItem onPress={() => navigate(`/edit-product/${item._id}`)} key="edit">Edit Product</DropdownItem>
                      <DropdownItem key="change">
                        <NavLink to="#">Change Status</NavLink>
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => setDeleteProduct(item._id)}
                        key="delete"
                        className="text-danger"
                        color="danger"
                      >
                        Delete Product
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <NoProduct />
      )}
    </div>
  );
}

export default Products;
