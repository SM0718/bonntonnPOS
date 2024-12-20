import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Input from "../../components/Input";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import {Spinner} from "@nextui-org/spinner"; // Import the NextUI loading component
import { toast } from 'react-toastify';

function CuponCode() {
  const [cuponCodes, setCuponCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCupon, setSelectedCupon] = useState(null);
  
  // Separate useForm and useDisclosure for create and edit
  const { control: createControl, handleSubmit: handleCreateSubmit, reset: resetCreate } = useForm();
  const { control: editControl, handleSubmit: handleEditSubmit, reset: resetEdit, setValue } = useForm();
  
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onOpenChange: onCreateOpenChange } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onOpenChange: onEditOpenChange } = useDisclosure();

  const formatDateForInput = (isoDate) => {
    const date = new Date(isoDate);
    return date.toISOString().split('T')[0];
  };

  const handleEdit = (cupon) => {
    setSelectedCupon(cupon);
    setValue('cuponCode', cupon.name);
    setValue('minOrderValue', cupon.minOrderValue);
    setValue('date', formatDateForInput(cupon.expiryDate));
    setValue('discountPercentage', cupon.discountPercentage);
    onEditOpen();
  };

  const onEditSubmit = async (data) => {
    if (!selectedCupon) return;

    if (data.date) {
      const date = new Date(data.date);
      data.date = date.toISOString();
    }

    try {
      const response = await fetch(`https://bonntonn.up.railway.app/api/v1/codes/update-code?cuponId=${selectedCupon._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.cuponCode.toUpperCase(),
          minOrderValue: data.minOrderValue,
          expiryDate: data.date,
          discountPercentage: data.discountPercentage,
        }),
      });

      if (response.ok) {
        toast.success(`${data.cuponCode.toUpperCase()} Updated Successfully`);
        getCuponCodes();
        resetEdit();
        onEditOpenChange(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Add 1 because months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const onSubmit = async (data) => {
    if (data.date) {
      const date = new Date(data.date);
      data.date = date.toISOString();
    }

    try {
      const response = await fetch(`https://bonntonn.up.railway.app/api/v1/codes/create-code?name=${data.cuponCode.toUpperCase()}&minOrderValue=${data.minOrderValue}&expiryDate=${data.date}&discountPercentage=${data.discountPercentage}`, {
        method: 'POST',
      });

      if (response.ok) {
        if (response.status === 204) {
          toast.error(`${data.cuponCode.toUpperCase()} Already Exist`);
          resetCreate();
        } else {
          toast.success(`${data.cuponCode.toUpperCase()} Added Successfully`, {
            autoClose: 1000
          });
          console.log(await response.json());
          getCuponCodes();
          resetCreate();
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getCuponCodes = async () => {
    setLoading(true); // Set loading to true when fetching starts
    try {
      const response = await fetch("https://bonntonn.up.railway.app/api/v1/codes/get-code", {
        method: "GET"
      });

      if (response.ok) {
        const info = await response.json();
        setCuponCodes(info.data);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch coupon codes');
    } finally {
      setLoading(false); // Set loading to false after the fetch is complete
    }
  };

  useEffect(() => {
    getCuponCodes();
  }, []);

  const deleteCode = async (cuponId, name) => {
    try {
      const response = await fetch(`https://bonntonn.up.railway.app/api/v1/codes/delete-code?cuponId=${cuponId}`, {
        method: "DELETE"
      });

      if (response.ok) {
        console.log(await response.json());
        toast.success(`${name} Deleted Successfully`);
        getCuponCodes(); // Refresh the data after deletion
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete coupon code');
    }
  };

  const FormattedDate = ({ isoDateString }) => {
    const date = new Date(isoDateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
  };

  return (

    <div className="w-full py-4 relative">
      <div className="w-full flex justify-end">
        <Button onPress={onCreateOpen} className="w-[200px] py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700">
          Create Cupon
        </Button>
      </div>

      {/* Create Coupon Modal */}
      <Modal isOpen={isCreateOpen} onOpenChange={onCreateOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Cupon</ModalHeader>
              <ModalBody>
                <form onSubmit={handleCreateSubmit(onSubmit)} className="w-full mx-auto space-y-4 bg-white rounded">
                  {/* Your existing create form fields */}
                  <div>
                    <label className="block times text-sm font-medium text-gray-700 mb-2">Cupon Code</label>
                    <Controller
                      name="cuponCode"
                      control={createControl}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          type="text"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          {...field}
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label className="block times text-sm font-medium text-gray-700 mb-2">Discount Percentage</label>
                    <Controller
                      name="discountPercentage"
                      control={createControl}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          type="text"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          {...field}
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label className="block times text-sm font-medium text-gray-700 mb-2">Minimum Order Value</label>
                    <Controller
                      name="minOrderValue"
                      control={createControl}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          type="number"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          {...field}
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label className="block times text-sm font-medium text-gray-700 mb-2">Select Date</label>
                    <Controller
                      name="date"
                      control={createControl}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          type="date"
                          min={getTodayDate()}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          {...field}
                        />
                      )}
                    />
                  </div>

                  <ModalFooter className="w-full flex gap-6">
                    <Button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700">
                      Submit
                    </Button>
                    <Button className="w-full py-2 px-4 bg-[#F00] text-white font-semibold rounded-xl hover:bg-[#db4a4a]" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Edit Coupon Modal */}
      <Modal isOpen={isEditOpen} onOpenChange={onEditOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit Cupon</ModalHeader>
              <ModalBody>
                <form onSubmit={handleEditSubmit(onEditSubmit)} className="w-full mx-auto space-y-4 bg-white rounded">
                  <div>
                    <label className="block times text-sm font-medium text-gray-700 mb-2">Cupon Code</label>
                    <Controller
                      name="cuponCode"
                      control={editControl}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          type="text"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          {...field}
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label className="block times text-sm font-medium text-gray-700 mb-2">Discount Percentage</label>
                    <Controller
                      name="discountPercentage"
                      control={editControl}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          type="text"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          {...field}
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label className="block times text-sm font-medium text-gray-700 mb-2">Minimum Order Value</label>
                    <Controller
                      name="minOrderValue"
                      control={editControl}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          type="number"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          {...field}
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label className="block times text-sm font-medium text-gray-700 mb-2">Select Date</label>
                    <Controller
                      name="date"
                      control={editControl}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          type="date"
                          min={getTodayDate()}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          {...field}
                        />
                      )}
                    />
                  </div>

                  <ModalFooter className="w-full flex gap-6">
                    <Button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700">
                      Update
                    </Button>
                    <Button className="w-full py-2 px-4 bg-[#F00] text-white font-semibold rounded-xl hover:bg-[#db4a4a]" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="my-4">
        {loading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <Table aria-label="Coupon Codes Table">
            <TableHeader>
              <TableColumn>CUPON CODE</TableColumn>
              <TableColumn>MINIMUM ORDER VALUE</TableColumn>
              <TableColumn>DISCOUNT PERCENTAGE</TableColumn>
              <TableColumn>EXPIRY DATE</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {cuponCodes.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.minOrderValue}</TableCell>
                  <TableCell>{item.discountPercentage}</TableCell>
                  <TableCell><FormattedDate isoDateString={item.expiryDate} /></TableCell>
                  <TableCell>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button size="sm" variant="bordered">
                          Open Menu
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Actions">
                        <DropdownItem onPress={() => handleEdit(item)} key="edit">Edit code</DropdownItem>
                        <DropdownItem onClick={() => deleteCode(item._id, item.name)} key="delete" className="text-danger" color="danger">
                          Delete Code
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}

export default CuponCode;

