import React, { useEffect, useState, useRef  } from 'react';
import { Spinner } from '@nextui-org/spinner';
import { NavLink, useParams } from 'react-router-dom';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
  Select,
  SelectItem,
  Card,
  Image,
  Textarea,
  Switch
} from '@nextui-org/react';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import Cross from '../../svg/Cross';
import { debounce } from 'lodash';

function EditProduct() {

  const inputRef = useRef(null);
  const getRandomId = () => {
    const date = new Date();
    return date.getTime() + date.getMilliseconds() + date.getSeconds();
  };

  const [catagoryData, setCatagoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [currentData, setCurrentData] = useState({
    catagory: "",
    allIndiaDelivery: false,
    variants: [],
    boxSize: [],
    storage: "", 
    allergens: "", 
    ingredients: "", 
    size: ""
  });
  const [tags, setTags] = useState(new Set())
  const [loading, setLoading] = useState(false)
  const { productId } = useParams();
  const { control, handleSubmit, reset, setValue, getValues, formState: { errors } } = useForm({
    defaultValues: {
      catagory: "",
      allIndiaDelivery: false,
      variants: [
        {
          id: getRandomId(),
          variantName: "",
          variantDesc: "",
          variantPrice: 0,
          foodType: "",
          variantPic_1: "",
          variantPic_2: "",
          variantPic_3: "",
          variantPic_4: ""
        }
      ],
      boxSize: [
        {
          boxId: getRandomId(),
          boxType: "",
          boxPrice: 0
        }
      ],
      storage: "", 
      allergens: "", 
      ingredients: "", 
      size: "",
      tags: [""],
    }
  });

  const getProduct = async () => {
    try {
      const response = await fetch(`/api/v1/products/product?productId=${productId}`, {
        method: "GET"
      });
  
      if (response.ok) {
        const data = await response.json();
        data.data.tags.forEach((tag, index) => setValue(`tags[${index}]`, tag));
        setTags(new Set(data.data.tags))
        const selectedItem = catagoryData.find(item => item._id === data.data.catagory);
        setSelectedCategory(selectedItem?.catagory);
        // Set all form values
        setValue("catagory", data.data.catagory);
        setValue("allIndiaDelivery", data.data.allIndiaDelivery);
        setValue("storage", data.data.storage);
        setValue("allergens", data.data.allergens);
        setValue("ingredients", data.data.ingredients);
        setValue("size", data.data.size);
        
        // Handle variants
        data.data.variant.forEach((item, index) => {
          setValue(`variants[${index}].id`, item.id);
          setValue(`variants[${index}].variantName`, item.variantName);
          setValue(`variants[${index}].variantDesc`, item.variantDesc);
          setValue(`variants[${index}].variantPrice`, item.variantPrice);
          setValue(`variants[${index}].foodType`, item.foodType);
          setValue(`variants[${index}].variantPic_1`, item.variantPic_1);
          setValue(`variants[${index}].variantPic_2`, item.variantPic_2);
          setValue(`variants[${index}].variantPic_3`, item.variantPic_3);
          setValue(`variants[${index}].variantPic_4`, item.variantPic_4);
        });
  
        // Handle box sizes
        data.data.boxSize.forEach((item, index) => {
          setValue(`boxSize[${index}].boxId`, item.boxId);
          setValue(`boxSize[${index}].boxPrice`, item.boxPrice);
          setValue(`boxSize[${index}].boxType`, item.boxType);
        });
  
        // Update currentData immediately after setting form values
        setCurrentData(getValues());
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/v1/catagory/get-catagory', {
          method: 'GET',
        });
  
        if (response.ok) {
          const data = await response.json();
          setCatagoryData(data.data); // Populating category data
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  
  useEffect(() => {
    if (catagoryData.length > 0) {
      getProduct();
    }
  }, [catagoryData, setValue]);

  const handleImgDelete = (id, name) => {
    const index = currentData.variants.findIndex(variant => variant.id === id);
    setValue(`variants[${index}].${name}`, '', { shouldValidate: true });
    setCurrentData(getValues());
  };

  const handleImagePreview = (e, id, name) => {
    const index = currentData.variants.findIndex(variant => variant.id === id);
    const file = e.target.files[0];
    if (file) {
      setValue(`variants[${index}].${name}`, file, { shouldValidate: true });
      setCurrentData(getValues());
    }
  }

  const addVariant = (e) => {
    e.preventDefault();
    const newVariant = {
      id: getRandomId(),
      variantName: "",
      variantDesc: "",
      variantPrice: 0,
      foodType: "",
      variantPic_1: "",
      variantPic_2: "",
      variantPic_3: "",
      variantPic_4: ""
    };

    setCurrentData(prevData => {
      const updatedVariants = [...prevData.variants, newVariant];
      setValue(`variants[${updatedVariants.length - 1}]`, newVariant, { shouldValidate: true });
  
      return {
        ...prevData,
        variants: updatedVariants
      };
    });
  };
  
  
  const deleteVariant = (id) => {
    const index = currentData.variants.findIndex(variant => variant.id === id);
    
    if (index !== -1 && currentData.variants.length > 1) {
      const updatedVariants = currentData.variants.filter(variant => variant.id !== id);
      setValue('variants', updatedVariants, { shouldValidate: true });
  
      setCurrentData(prevData => ({
        ...prevData,
        variants: updatedVariants
      }));
    }
  };
  
  const handleInputChange = (e, id, name) => {
    console.log(e, id, name)
    const index = currentData.variants.findIndex(variant => variant.id === id);
    setValue(`variants[${index}].${name}`, e.target.value, { shouldValidate: true });
    setCurrentData(getValues())
  }

  
  const handleSelectChange = (value) => {
    const selectedItem = catagoryData.find(item => item._id === value);
    if (selectedItem) {
      setSelectedCategory(selectedItem.catagory);
      setValue("catagory", selectedItem._id, { shouldValidate: true });
      setCurrentData(getValues());
    }
  };

  const addBox = (e) => {
    e.preventDefault();
    const newBox = {
      boxId: getRandomId(),
      boxType: "",
      boxPrice: 0
    };
  
    setCurrentData(prevData => {
      const updatedBoxSize = [...prevData.boxSize, newBox];
      setValue(`boxSize[${updatedBoxSize.length - 1}]`, newBox, { shouldValidate: true });
      return {
        ...prevData,
        boxSize: updatedBoxSize
      };
    });
  };
  

  const deleteBox = (e, id) => {
    
    e.preventDefault()
    const index = currentData.boxSize.findIndex(item => item.boxId === id);
    // console.log(currentData.boxSize)
    if (index !== -1 && currentData.boxSize.length > 1) {
      const updatedBox = currentData.boxSize.filter(item => item.boxId !== id);
      setValue('boxSize', updatedBox, { shouldValidate: true });
  
      setCurrentData(prevData => ({
        ...prevData,
        boxSize: updatedBox
      }));
    }
  };

  const handleBoxInputChange = (e, id, name) => {
    const index = currentData.boxSize.findIndex(item => item.boxId === id);
    if (index !== -1) {
      setValue(`boxSize[${index}].${name}`, e.target.value, { shouldValidate: true });
      setCurrentData(getValues()); // Ensure this updates state correctly
    }
  };

  const uploadChanges = async(data) => {
    setLoading(true)
    // console.log(data, "--Upload Changes--");

    const incompleteVariant = data.variants.some(variant => 
      Object.values(variant).some(value => value === "" || value === 0)
    );
    const incompleteBoxSize = data.boxSize.some(item => 
      Object.values(item).some(value => value === "" || value === 0)
    );
    
    if (incompleteVariant || incompleteBoxSize) {
      toast.error('Enter All Fields', {
        autoClose: 2000,
      });
      return;
    }

    const formData = new FormData();

    currentData.variants.forEach((variant, index) => {
      formData.append(`variant[${index}][id]`, variant.id);
      formData.append(`variant[${index}][variantName]`, variant.variantName);
      formData.append(`variant[${index}][variantDesc]`, variant.variantDesc);
      formData.append(`variant[${index}][variantPrice]`, variant.variantPrice);
      formData.append(`variant[${index}][foodType]`, variant.foodType);
    if (variant.variantPic_1) {
        formData.append(`variantPic_1_[${index}]`, variant.variantPic_1);
    }
    if (variant.variantPic_2) {
        formData.append(`variantPic_2_[${index}]`, variant.variantPic_2);
    }
    if (variant.variantPic_3) {
        formData.append(`variantPic_3_[${index}]`, variant.variantPic_3);
    }
    if (variant.variantPic_4) {
        formData.append(`variantPic_4_[${index}]`, variant.variantPic_4);
    }
  });

  formData.append('catagory', currentData.catagory);
  formData.append('allIndiaDelivery', currentData.allIndiaDelivery === "true");
  formData.append('storage', currentData.storage);
  formData.append('allergens', currentData.allergens);
  formData.append('ingredients', currentData.ingredients);
  formData.append('size', currentData.size);

  // Append boxes (non-file fields)
  currentData.boxSize.forEach((box, index) => {
      formData.append(`boxSize[${index}][boxId]`, box.boxId);
      formData.append(`boxSize[${index}][boxType]`, box.boxType);
      formData.append(`boxSize[${index}][boxPrice]`, box.boxPrice);
  });

  
  Array.from(tags).forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
  })
    console.log(formData)
    try {
      const response = await fetch(`/api/v1/products/edit-product?productId=${productId}`, {
        method: "POST",
        body: formData
      })

      if(response.ok) {
        toast.success("Product Updated Successfully", {
          autoClose: 1000
        })
        // console.log(await response.json())
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  };

  function isBlob(link) {
    try {
        const url = new URL(link);
        if (url.protocol === 'blob:') {
            return true;
        } else {
            if (url.protocol === 'http:' || url.protocol === 'https:') {
                return false;
            }
        }
    } catch (e) {
        return 'Invalid Link';
    }
}

  const handleExtraInfo = (e, name) => {
    setValue(name, e.target.value)
    setCurrentData(getValues())
  }
  
  useEffect(() => {
    // Update tags in the form and currentData when tags change
    const tagsArray = Array.from(tags); // Convert Set to Array
    tagsArray.forEach((tag, index) => setValue(`tags[${index}]`, tag));
    setCurrentData((prevData) => ({ ...prevData, tags: tagsArray }));
    // console.log(currentData?.tags)
  }, [tags]);

  // useEffect(() => {
  //   console.log(currentData)
  // }, [currentData]);
  

  return (
    <div className='w-full flex flex-col items-center py-8'>
      <h1 className='trajan text-[32px]'>Edit Product</h1>

     {currentData.variants?.length > 0 ? (<form onSubmit={handleSubmit(uploadChanges)} className='w-3/4 flex flex-col gap-4'>

      <div className='flex justify-between'>
         <div className='w-full flex flex-col gap-2'>

          <Dropdown size={"lg"} className="px-8">
            <DropdownTrigger>
              <Button className="w-[200px] times" variant="bordered">
                {selectedCategory}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Select Category"
              onAction={(key) => {
                handleSelectChange(key)
              }}
            >
              {catagoryData.map(item => (
                <DropdownItem className='times' key={item._id} textValue={item.catagory}>
                  {item.catagory}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

        </div>

        <div className='flex gap-4'>
        <Button type="submit" color="primary" variant="bordered" className='times' isLoading={loading? true : false}>Upload Changes</Button>
        <Button onClick={addVariant} color="primary" variant="light" className='text-[#285EFE] times'>Add Varient</Button>
        </div>
      </div>
       

        <div className='flex flex-col gap-4'>
          {currentData && currentData.variants?.map((item, index) => (
            <Card key={item.id} className='w-full bg-slate-200 px-4 py-8 relative'>
              <div className='flex justify-center gap-16'>
                {/* Image 1 */}
                <Controller
                  key={item.id}
                  name={`variantPic_1_${index}`}
                  control={control}
                  render={({ field }) => (
                    !item.variantPic_1 ? (
                      <Input
                        {...field}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImagePreview(e, item.id, 'variantPic_1')}
                        className="w-52 h-40 object-cover"
                      />
                    ) : (
                      <div className="relative rounded-sm">
                        <Image
                          src={isBlob(item.variantPic_1)? URL.createObjectURL(item.variantPic_1) : item.variantPic_1}
                          alt="Preview"
                          className="w-52 h-40 object-cover"
                        />
                        <p 
                          onClick={() => handleImgDelete(item.id, 'variantPic_1')}
                          className='absolute -top-4 right-0 cursor-pointer'>
                          <Cross />
                        </p>
                      </div>
                    )
                  )}
                />
                {errors[`variantPic_1_${index}`] && <p>{errors[`variantPic_1_${index}`].message}</p>}

                {/* Repeat for other image fields */}
                <Controller
                  name={`variantPic_2_${index}`}
                  control={control}
                  render={({ field }) => (
                    !item.variantPic_2 ? (
                      <Input
                        {...field}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImagePreview(e, item.id, 'variantPic_2')}
                        className="w-52 h-40 object-cover"
                      />
                    ) : (
                      <div className="relative rounded-sm">
                        <Image
                          src={isBlob(item.variantPic_2)? URL.createObjectURL(item.variantPic_2) : item.variantPic_2}
                          alt="Preview"
                          className="w-52 h-40 object-cover"
                        />
                        <p onClick={() => handleImgDelete(item.id, 'variantPic_2')}
                          className='absolute -top-4 right-0 cursor-pointer'>
                          <Cross />
                        </p>
                      </div>
                    )
                  )}
                />
                {errors[`variantPic_2_${index}`] && <p>{errors[`variantPic_2_${index}`].message}</p>}

                {/* Repeat for other image fields (3 and 4) similarly */}

                <Controller
                  name={`variantPic_3_${index}`}
                  control={control}
                  render={({ field }) => (
                    !item.variantPic_3 ? (
                      <Input
                        {...field}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImagePreview(e, item.id, 'variantPic_3')}
                        className="w-52 h-40 object-cover"
                      />
                    ) : (
                      <div className="relative rounded-sm">
                        <Image
                          src={isBlob(item.variantPic_3)? URL.createObjectURL(item.variantPic_3) : item.variantPic_3}
                          alt="Preview"
                          className="w-52 h-40 object-cover"
                        />
                        <p onClick={() => handleImgDelete(item.id, 'variantPic_3')}
                          className='absolute -top-4 right-0 cursor-pointer'>
                          <Cross />
                        </p>
                      </div>
                    )
                  )}
                />
                {errors[`variantPic_3_${index}`] && <p>{errors[`variantPic_3_${index}`].message}</p>}


                <Controller
                  name={`variantPic_4_${index}`}
                  control={control}
                  render={({ field }) => (
                    !item.variantPic_4 ? (
                      <Input
                        {...field}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImagePreview(e, item.id, 'variantPic_4')}
                        className="w-52 h-40 object-cover"
                      />
                    ) : (
                      <div className="relative rounded-sm">
                        <Image
                          src={isBlob(item.variantPic_4)? URL.createObjectURL(item.variantPic_4) : item.variantPic_4}
                          alt="Preview"
                          className="w-52 h-40 object-cover"
                        />
                        <p onClick={() => handleImgDelete(item.id, 'variantPic_4')}
                          className='absolute -top-4 right-0 cursor-pointer'>
                          <Cross />
                        </p>
                      </div>
                    )
                  )}
                />
                {errors[`variantPic_4_${index}`] && <p>{errors[`variantPic_4_${index}`].message}</p>}

              </div>

              <div className='w-5/6 mx-auto mt-8 flex items-center justify-between gap-8'>
                <Controller
                  name={`variantName_${index}`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      size='sm'
                      type="text"
                      label="Variant Name"
                      className="w-full"
                      value={item.variantName}
                      onChange={(e) => handleInputChange(e, item.id, "variantName")}
                    />
                  )}
                />

                <Controller
                  name={`variantDesc_${index}`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      size='sm'
                      type="text"
                      label="Variant Description"
                      className="w-full"
                      value={item.variantDesc}
                      onChange={(e) => handleInputChange(e, item.id, "variantDesc")}
                    />
                  )}
                />

                <Controller
                  name={`variantPrice_${index}`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      size='sm'
                      type="number"
                      label="Variant Price"
                      className="w-full"
                      value={item.variantPrice}
                      onChange={(e) => handleInputChange(e, item.id, "variantPrice")}
                    />
                  )}
                />

                <Dropdown size={"lg"} className="px-8">
            <DropdownTrigger>
              <Button className="w-[400px] times bg-[#f4f4f5]" variant="bordered">
                {currentData.variants[index]["foodType"]}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Select Category"
              onAction={(key) => {
                 const syntheticEvent = {
                  target: {
                    value: key
                  }
                };
                handleInputChange(syntheticEvent, item.id, "foodType");
              }}
            >
            
                <DropdownItem className='times' key="VEG" textValue={"VEG"}>
                  VEG
                </DropdownItem>
                <DropdownItem className='times' key="NON-VEG" textValue={"NON-VEG"}>
                NON-VEG
                </DropdownItem>
                <DropdownItem className='times' key="EGG" textValue={"EGG"}>
                  EGG
                </DropdownItem>
             
            </DropdownMenu>
          </Dropdown>

            <Switch onClick={(e) => console.log(e.target.value)} defaultSelected></Switch>
              </div>

              <p onChange={() => deleteVariant(item.id)}  className='absolute top-2 right-2 cursor-pointer'><Cross /></p>
            </Card>
          ))}
        </div>

        <div className='w-full flex flex-col gap-2'>
        <p className='times text-[24px]'>Additional Details</p>
        <div className='w-full flex gap-2'>
            <div className='w-full flex flex-col gap-2'>
          <Controller
                    name={"storage"}
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        size='md'
                        type="textarea"
                        label="Storage Info"
                        className="w-full"
                        value={currentData.storage}
                        onChange={(e) => handleExtraInfo(e, "storage")}
                      />
                    )}
                  />
                  <Controller
                    name={"allergens"}
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        size='md'
                        type="textarea"
                        label="Allergen Info"
                        className="w-full"
                        value={currentData.allergens}
                        onChange={(e) => handleExtraInfo(e, "allergens")}
                      />
                    )}
                  />
          </div>

           <div className='w-full flex flex-col gap-2'>
           <Controller
                    name={"ingredients"}
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        size='md'
                        type="textarea"
                        label="Ingredient List"
                        className="w-full"
                        value={currentData.ingredients}
                        onChange={(e) => handleExtraInfo(e, "ingredients")}
                      />
                    )}
                  />
                  <Controller
                    name={"size"}
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        size='md'
                        type="textarea"
                        label="Size Info"
                        className="w-full"
                        value={currentData.size}
                        onChange={(e) => handleExtraInfo(e, "size")}
                      />
                    )}
                  />
            </div>  
        </div>
             
                  
        </div>

        <div className='w-full flex items-start gap-4'>
          <div className='w-3/4 flex flex-col gap-2 my-2'>
          <div className='w-full flex justify-between'>
            <p className='times text-[24px]'>Packaging Details</p>
            
            <Button onClick={addBox} color="primary" variant="ghost">
                  Add Box
            </Button>
          </div>
          <div className='w-full h-[200px] overflow-y-scroll flex flex-col gap-2 my-2'>
            {
              currentData && currentData.boxSize?.map((item, index) => <div key={item.boxId} className='flex gap-2 items-center'>
                  
                  <Controller
                    name={`boxType_${index}`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        size='md'
                        type="text"
                        label="Box Type"
                        className="w-full"
                        value={item.boxType}
                        onChange={(e) => handleBoxInputChange(e, item.boxId, "boxType")}
                      />
                    )}
                  />

                  <Controller
                    name={`boxPrice_${index}`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        size='md'
                        type="text"
                        label="Box Price"
                        className="w-full"
                        value={item.boxPrice}
                        onChange={(e) => handleBoxInputChange(e, item.boxId, "boxPrice")}
                      />
                    )}
                  />

                    <Button
                      onClick={(e) => deleteBox(e, item.boxId)}
                      
                      variant="ghost"
                      className="text-black hover:text-red-600"
                    >
                      Delete
                    </Button>
                      

                </div>
                )
            }
          </div>
            
          </div>

          <div className='w-1/2'>
          <div className='w-full my-4 flex flex-col gap-2'>
          <p className='times text-[24px]'>All India Delivery</p>
          <Dropdown size={"lg"} className="px-8">
              <DropdownTrigger>
                <Button className="w-full py-6 times bg-[#f4f4f5]" variant="flat">
                  {currentData.allIndiaDelivery? "All India Available" : "Kolkata Only"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
              className='w-full'
                aria-label="Select All India Delivery"
                onAction={(key) => {
                  setValue("allIndiaDelivery", key)
                  setCurrentData(getValues())
                }}
              >
                  <DropdownItem className='w-[350px] times' key={true} textValue={"All India Available"}>
                    All India Available
                  </DropdownItem>
                  <DropdownItem className='w-[350px] times' key={false} textValue={"Kolkata Only"}>
                    Kolkata Only
                  </DropdownItem>
              
              </DropdownMenu>
            </Dropdown>        
          </div>

          <div className="w-full h-[200px] border border-gray-300 overflow-y-scroll rounded-lg p-4 shadow-md my-4">
      <p className="text-lg font-medium text-gray-800 mb-2 trajan">Tags</p>

      <Controller
        name="tags[]"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            size="md"
            type="text"
            label="Add a Tag"
            placeholder="Type a tag and press Enter"
            ref={inputRef}
            className="tag w-full border border-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onKeyDown={(e) => {
              if (e.key === "Enter" && inputRef.current.value.trim()) {
                setTags((prevTags) => {
                  const newTags = new Set(prevTags);
                  newTags.add(inputRef.current.value.trim());
                  return newTags;
                });
                inputRef.current.value = ""; // Clear the input field
                e.preventDefault();
              }
            }}
          />
        )}
      />

      {/* Tags Display */}
      <div className="w-full flex flex-wrap gap-2 mt-4 overflow-y-scroll max-h-[120px] bg-gray-50 rounded-md p-2 border border-gray-200">
        {currentData?.tags?.filter((item) => item.trim() !== "").length > 0 ? (
          currentData.tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium shadow-sm"
            >
              {tag}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setTags((prevTags) => {
                    const newTags = new Set(prevTags);
                    newTags.delete(tag);
                    return newTags;
                  });
                }}
                className="ml-2 text-gray-600 hover:text-gray-800 rounded-full focus:outline-none"
              >
                ✕
              </button>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 italic">No tags added yet.</p>
        )}
      </div>

      {/* Add Button */}
      <Button
        className="mt-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-gray-400"
        onClick={(e) => {
          const tagValue = inputRef.current.value.trim();

          if (tagValue) {
            setTags((prevTags) => {
              const newTags = new Set(prevTags);
              newTags.add(tagValue);
              return newTags;
            });
            inputRef.current.value = ""; // Clear the input field
          }

          e.preventDefault();
        }}
      >
        Add Tag
      </Button>
    </div>



          </div>

        </div>

        
      </form>) : (
      <div className="flex justify-center items-center h-40">
        <Spinner />
      </div>
    )}
    </div>
  );
}

export default EditProduct;


