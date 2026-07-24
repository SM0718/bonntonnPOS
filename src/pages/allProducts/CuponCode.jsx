import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Input from "../../components/Input";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import {Spinner} from "@nextui-org/spinner";
import { toast } from 'react-toastify';

function CuponCode() {
  const [cuponCodes, setCuponCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCupon, setSelectedCupon] = useState(null);

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
      const response = await fetch(`https://bonnbackend.up.railway.app/api/v1/codes/update-code?cuponId=${selectedCupon._id}`, {
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
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const onSubmit = async (data) => {
    if (data.date) {
      const date = new Date(data.date);
      data.date = date.toISOString();
    }

    try {
      const response = await fetch(`https://bonnbackend.up.railway.app/api/v1/codes/create-code?name=${data.cuponCode.toUpperCase()}&minOrderValue=${data.minOrderValue}&expiryDate=${data.date}&discountPercentage=${data.discountPercentage}`, {
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
    setLoading(true);
    try {
      const response = await fetch("https://bonnbackend.up.railway.app/api/v1/codes/get-code", {
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
      setLoading(false);
    }
  };

  useEffect(() => {
    getCuponCodes();
  }, []);

  const deleteCode = async (cuponId, name) => {
    try {
      const response = await fetch(`https://bonnbackend.up.railway.app/api/v1/codes/delete-code?cuponId=${cuponId}`, {
        method: "DELETE"
      });

      if (response.ok) {
        console.log(await response.json());
        toast.success(`${name} Deleted Successfully`);
        getCuponCodes();
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
    <div className="w-full py-6 space-y-6">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onCreateOpen}
          className="btn-primary"
        >
          Create Coupon
        </button>
      </div>

      {/* Create Coupon Modal */}
      <Modal isOpen={isCreateOpen} onOpenChange={onCreateOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Coupon</ModalHeader>
              <ModalBody>
                <form onSubmit={handleCreateSubmit(onSubmit)} className="w-full space-y-4">
                  <div>
                    <label className="label-base">Coupon Code</label>
                    <Controller
                      name="cuponCode"
                      control={createControl}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          type="text"
                          className="input-base"
                          {...field}
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label className="label-base">Discount Percentage</label>
                    <Controller
                      name="discountPercentage"
                      control={createControl}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          type="text"
                          className="input-base"
                          {...field}
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label className="label-base">Minimum Order Value</label>
                    <Controller
                      name="minOrderValue"
                      control={createControl}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          type="number"
                          className="input-base"
                          {...field}
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label className="label-base">Select Date</label>
                    <Controller
                      name="date"
                      control={createControl}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          type="date"
                          min={getTodayDate()}
                          className="input-base"
                          {...field}
                        />
                      )}
                    />
                  </div>
                </form>
              </ModalBody>
              <ModalFooter className="flex items-center gap-3">
                <button type="button" className="btn-secondary" onPress={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" onClick={handleCreateSubmit(onSubmit)}>
                  Submit
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Edit Coupon Modal */}
      <Modal isOpen={isEditOpen} onOpenChange={onEditOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit Coupon</ModalHeader>
              <ModalBody>
                <form onSubmit={handleEditSubmit(onEditSubmit)} className="w-full space-y-4">
                  <div>
                    <label className="label-base">Coupon Code</label>
                    <Controller
                      name="cuponCode"
                      control={editControl}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          type="text"
                          className="input-base"
                          {...field}
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label className="label-base">Discount Percentage</label>
                    <Controller
                      name="discountPercentage"
                      control={editControl}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          type="text"
                          className="input-base"
                          {...field}
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label className="label-base">Minimum Order Value</label>
                    <Controller
                      name="minOrderValue"
                      control={editControl}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          type="number"
                          className="input-base"
                          {...field}
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label className="label-base">Select Date</label>
                    <Controller
                      name="date"
                      control={editControl}
                      defaultValue=""
                      render={({ field }) => (
                        <Input
                          type="date"
                          min={getTodayDate()}
                          className="input-base"
                          {...field}
                        />
                      )}
                    />
                  </div>
                </form>
              </ModalBody>
              <ModalFooter className="flex items-center gap-3">
                <button type="button" className="btn-secondary" onPress={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" onClick={handleEditSubmit(onEditSubmit)}>
                  Update
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Table */}
      <div className="card">
        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        ) : (
          <Table aria-label="Coupon Codes Table">
            <TableHeader>
              <TableColumn className="bg-surface-50 text-xs font-semibold text-surface-500 uppercase tracking-wide">Coupon Code</TableColumn>
              <TableColumn className="bg-surface-50 text-xs font-semibold text-surface-500 uppercase tracking-wide">Min Order Value</TableColumn>
              <TableColumn className="bg-surface-50 text-xs font-semibold text-surface-500 uppercase tracking-wide">Discount %</TableColumn>
              <TableColumn className="bg-surface-50 text-xs font-semibold text-surface-500 uppercase tracking-wide">Expiry Date</TableColumn>
              <TableColumn className="bg-surface-50 text-xs font-semibold text-surface-500 uppercase tracking-wide">Actions</TableColumn>
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
