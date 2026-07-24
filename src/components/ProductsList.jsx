

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
  console.log(data)
  const cols = [
    { name: 'Products', style: 'w-[400px]' },
    { name: 'Price', style: 'w-[150px]' },
    { name: 'Status', style: 'w-[200px] pl-24' },
    { name: 'Dietry', style: 'w-[100px]' },
    { name: 'Actions', style: 'w-[100px] pl-8' },
  ];

  const navigate = useNavigate();

  const { control, handleSubmit, setValue, reset } = useForm();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Add pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate pagination indexes
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = data.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

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
    <div className="py-6 flex flex-col items-center">
      {data.length > 0 ? (
        <>
          <div className="w-full rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            <Table aria-label="Product Table" className="w-full">
              <TableHeader>
                {cols.map((item) => (
                  <TableColumn
                    key={item.name}
                    className={`${item.style} bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500`}
                  >
                    {item.name}
                  </TableColumn>
                ))}
              </TableHeader>
              <TableBody>
                {currentItems.map((item) => (
                  <TableRow
                    key={item._id}
                    className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors"
                  >
                    <TableCell className="flex items-center gap-2 w-[400px] py-3">
                      <User
                        name={item.variant[0].variantName}
                        description={item.catagoryResult[0].catagory}
                        avatarProps={{
                          src: item.variant[0].variantPic_1,
                        }}
                      />
                    </TableCell>
                    <TableCell className="w-[150px] py-3">
                      <p className="font-semibold times">₹ {item.variant[0].variantPrice}</p>
                    </TableCell>
                    <TableCell className="w-[200px] py-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium times ${
                          item.variant[0].active
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}
                      >
                        {item.variant[0].active ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell className="w-[100px] py-3">
                      <p className="times">{item.variant[0].foodType}</p>
                    </TableCell>
                    <TableCell className="w-[100px] py-3 pb-2 relative overflow-visible">
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
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between w-full mt-5 px-2">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-700">{firstIndex + 1}</span> to{' '}
              <span className="font-medium text-gray-700">{Math.min(lastIndex, data.length)}</span> of{' '}
              <span className="font-medium text-gray-700">{data.length}</span> entries
            </p>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-sm font-medium rounded-lg bg-surface-100 text-surface-600 hover:bg-surface-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`min-w-[32px] h-8 text-sm font-medium rounded-lg transition-colors ${
                    currentPage === index + 1
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-sm font-medium rounded-lg bg-surface-100 text-surface-600 hover:bg-surface-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <NoProduct />
      )}
    </div>
  );
}
export default Products;
