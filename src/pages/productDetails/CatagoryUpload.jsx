
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input
} from '@nextui-org/react';

const CategoryUpload = () => {
  const Cross = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );

  const [pic, setPic] = useState(null);
  const [editPic, setEditPic] = useState(null);
  const [data, setData] = useState([]);
  const [reloadData, setReloadData] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
  const { 
    register, 
    handleSubmit, 
    reset, 
    setValue, 
    formState: { errors } 
  } = useForm();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://bonnbackend.up.railway.app/api/v1/catagory/get-catagory', {
          method: 'GET',
        });

        if (response.ok) {
          const categoryData = await response.json();
          console.log(categoryData)
          setData(categoryData.data);
        }
      } catch (error) {
        toast.error(error.message, {
          position: 'top-right',
          autoClose: 2000,
          theme: 'dark',
        });
      }
    }
    fetchData();
  }, [reloadData]);

  const deleteCategory = async (categoryId, category) => {
    try {
      const response = await fetch(`https://bonnbackend.up.railway.app/api/v1/catagory/delete-catagory?catagoryId=${categoryId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        if (response.status === 204) {
          toast.error(`${category} Linked With Product`, {
            position: 'top-right',
            autoClose: 2000,
            theme: 'dark',
          });
        } else {
          const data = await response.json();
          if (data.success === true) {
            setReloadData(!reloadData);
            toast.success(`${category} Deleted Successfully`, {
              position: 'top-right',
              autoClose: 2000,
              theme: 'dark',
            });
          }
        }
      }
    } catch (error) {
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 2000,
        theme: 'dark',
      });
    }
  };

  const addCategory = async (data) => {
    try {
      const catagoryData = new FormData();
      catagoryData.append('catagoryDesc', data.description);
      catagoryData.append('catagoryPic', pic);
      const response = await fetch(`https://bonnbackend.up.railway.app/api/v1/catagory/add-catagory?catagory=${data.catagory}`, {
        method: 'POST',
        body: catagoryData,
      });

      if (response.ok) {
        if (response.status === 204) {
          toast.info(`${data.catagory} Already Exist`, {
            position: 'top-right',
            autoClose: 2000,
            theme: 'dark',
          });
        } else {
          toast.success(`${data.catagory} Added Successfully`, {
            position: 'top-right',
            autoClose: 2000,
            theme: 'dark',
          });
          setReloadData(!reloadData);
        }
        setPic(null);
        reset();
        onOpenChange(false);
      }
    } catch (error) {
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 2000,
        theme: 'dark',
      });
    }
  };

  const handleEditClick = (item) => {
    setEditCategory(item);
    setEditModal(true);
    setValue('editCatagory', item.catagory);
    setValue('editDescription', item.catagoryDesc);
    setEditPic(item.catagoryPic);
  };

  const updateCategory = async (data) => {
    try {
      const catagoryData = new FormData();
      catagoryData.append('catagory', data.editCatagory);
      catagoryData.append('catagoryDesc', data.editDescription);
      if (editPic) catagoryData.append('catagoryPic', editPic);

      const response = await fetch(`https://bonnbackend.up.railway.app/api/v1/catagory/edit-catagory?id=${editCategory._id}`, {
        method: 'PUT',
        body: catagoryData,
      });

      if (response.ok) {
        toast.success(`${data.editCatagory} Updated Successfully`, {
          position: 'top-right',
          autoClose: 2000,
          theme: 'dark',
        });
        setReloadData(!reloadData);
        setEditModal(false);
      }
    } catch (error) {
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 2000,
        theme: 'dark',
      });
    }
  };

  const getSrc = (value) => {
    if (value instanceof Blob) {
      return URL.createObjectURL(value);
    }
    return value;
  };

  return (
    <div className="w-full py-8 relative">
      <div className="w-full flex justify-between mb-6">
        <h1 className="trajan text-2xl">Category Details</h1>
        <Button
          onPress={onOpen}
          className="bg-blue-600 text-white times"
        >
          Add New Category
        </Button>
      </div>

      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="center"
        className="max-w-md"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 times">Add Category</ModalHeader>
              <ModalBody>
                <form id="addCategoryForm" onSubmit={handleSubmit(addCategory)} className="space-y-4">
                  <Input
                    label="Category Name"
                    {...register('catagory', { required: 'Category is required' })}
                    isInvalid={!!errors.catagory}
                    errorMessage={errors.catagory?.message}
                    className='times'
                  />

                  <Input
                    label="Description"
                    {...register('description', { required: 'Category Description is required' })}
                    isInvalid={!!errors.description}
                    errorMessage={errors.description?.message}
                    className='times'
                  />

                  {!pic ? (
                    <Input
                      className='mt-4'
                      type="file"
                      accept="image/*"
                      onChange={(e) => setPic(e.target.files[0])}
                    />
                  ) : (
                    <div className="relative mt-4">
                      <img
                        src={URL.createObjectURL(pic)}
                        alt="Category Pic"
                        className="w-full h-40 object-cover rounded times"
                      />
                      <Button
                        isIconOnly
                        size="sm"
                        className="absolute -top-2 -right-2"
                        onClick={() => setPic(null)}
                      >
                        <Cross />
                      </Button>
                    </div>
                  )}
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" type="submit" form="addCategoryForm">
                  Add Category
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="w-full">
        <Table aria-label="Category management table">
          <TableHeader>
            <TableColumn className='times'>CATEGORY</TableColumn>
            <TableColumn className='times'>DESCRIPTION</TableColumn>
            <TableColumn className='times' align="center">ACTIONS</TableColumn>
          </TableHeader>
          <TableBody>
            {data.map(item => (
              <TableRow key={item._id}>
                <TableCell className="text-lg times">{item.catagory}</TableCell>
                <TableCell className='times'>{item.catagoryDesc}</TableCell>
                <TableCell className='times'>
                  <div className="flex justify-center gap-4">
                    <Button
                      color="primary"
                      variant="light"
                      onClick={() => handleEditClick(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      color="danger"
                      variant="light"
                      onClick={() => deleteCategory(item._id, item.catagory)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Modal 
        isOpen={editModal} 
        onOpenChange={(open) => setEditModal(open)}
        placement="center"
        className="max-w-md"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit Category</ModalHeader>
              <ModalBody>
                <form id="editCategoryForm" onSubmit={handleSubmit(updateCategory)} className="space-y-4">
                  <Input
                    label="Category Name"
                    {...register('editCatagory', { required: 'Category is required' })}
                    isInvalid={!!errors.editCatagory}
                    errorMessage={errors.editCatagory?.message}
                  />

                  <Input
                    label="Description"
                    {...register('editDescription', { required: 'Description is required' })}
                    isInvalid={!!errors.editDescription}
                    errorMessage={errors.editDescription?.message}
                  />

                  {!editPic ? (
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setEditPic(e.target.files[0])}
                    />
                  ) : (
                    <div className="relative">
                      <img
                        src={getSrc(editPic)}
                        alt="Category Pic"
                        className="w-full h-40 object-cover rounded"
                      />
                      <Button
                        isIconOnly
                        size="sm"
                        className="absolute -top-2 -right-2"
                        onClick={() => setEditPic(null)}
                      >
                        <Cross />
                      </Button>
                    </div>
                  )}
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" type="submit" form="editCategoryForm">
                  Update Category
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CategoryUpload;