import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Button, Card, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cross = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  );
function UploadProduct() {
    const getRandomId = () => {
        return Date.now().toString() + Math.random().toString(36).substr(2, 9);
    };

    const [tags, setTags] = React.useState(new Set());
    const [tag, setTag] = useState("");

    const defaultVariant = {
        id: getRandomId(),
        variantName: "",
        variantDesc: "",
        variantPrice: 0,
        foodType: "",
        variantPics: {
            variantPic_1: null,
            variantPic_2: null,
            variantPic_3: null,
            variantPic_4: null
        },
        allIndiaDelivery: false
    };

    const defaultBox = {
        boxId: getRandomId(),
        boxType: "",
        boxPrice: 0
    };

    const defaultTags = {
        name: ""
    };

    const { register, handleSubmit, control, reset, setValue, watch } = useForm({
        defaultValues: {
            catagory: '',
            storage: '',
            ingredients: '',
            allergens: '',
            size: '',
            allIndiaDelivery: false,
            variants: [defaultVariant],
            boxes: [defaultBox]
        }
    });

    const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({
        control,
        name: "variants"
    });

    const { fields: boxFields, append: appendBox, remove: removeBox } = useFieldArray({
        control,
        name: "boxes"
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [catagoryData, setCatagoryData] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('api/v1/catagory/get-catagory', {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                setCatagoryData(data.data);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error('Failed to load categories');
        }
    };

    const handleImageChange = (variantIndex, imageField, file) => {
        setValue(`variants.${variantIndex}.variantPics.${imageField}`, file);
    };

    const handleImageDelete = (variantIndex, imageField) => {
        setValue(`variants.${variantIndex}.variantPics.${imageField}`, null);
    };

    const resetForm = () => {
        reset({
            category: '',
            storage: '',
            ingredients: '',
            allergens: '',
            size: '',
            allIndiaDelivery: false,
            variants: [defaultVariant],
            boxes: [defaultBox],
            tags: [defaultTags]
        });
        setTags("")
        setTag("")
    };

    const addTag = (tag) => {
        setTags((prevTags) => new Set(prevTags).add(tag));
      };

    const upload = async (formData) => {
        setIsSubmitting(true);
        try {
            const productData = new FormData();
            console.log(formData, "--Form Data--")
            // Append basic product information
            productData.append('catagory', formData.catagory);
            productData.append('storage', formData.storage);
            productData.append('ingredients', formData.ingredients);
            productData.append('allergens', formData.allergens);
            productData.append('size', formData.size);
            productData.append('allIndiaDelivery', formData.allIndiaDelivery === 'true');
            Array.from(tags).forEach((tag) => productData.append("tags[]", tag));

            // Append variants
            formData.variants.forEach((variant, index) => {
                Object.keys(variant).forEach(key => {
                    if (key !== 'variantPics') {
                        productData.append(`variant[${index}][${key}]`, variant[key]);
                    }
                });

                // Append variant images
                Object.entries(variant.variantPics).forEach(([picKey, picValue]) => {
                    if (picValue) {
                        productData.append(picKey, picValue);
                    }
                });
            });

            // Append boxes
            formData.boxes.forEach((box, index) => {
                Object.entries(box).forEach(([key, value]) => {
                    productData.append(`boxSize[${index}][${key}]`, value);
                });
            });
            console.log(productData, "--Product Data--")
            const response = await fetch('api/v1/products/add-product', {
                method: 'POST',
                body: productData,
            });

            const result = await response.json();
            
            if (result.success) {
                toast.success("Product Uploaded Successfully", {
                    position: "top-center",
                    autoClose: 3000,
                    theme: "dark",
                })
                console.log(result)
                resetForm();
                setTags("")
                setTag("")
            } else {
                throw new Error(result.message || 'Failed to upload product');
            }
        } catch (error) {
            toast.error("Failed to upload product", {
                position: "top-center",
                autoClose: 3000,
                theme: "dark",
            })
            
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-2 py-8 mx-auto max-w-7xl px-4">
            <div className="w-full flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold trajan">Add New Product</h1>
                <Button 
                    onClick={resetForm} 
                    color="danger" 
                    variant="light"
                    className="text-xl times"
                >
                    Discard Changes
                </Button>
            </div>

            <form onSubmit={handleSubmit(upload)} className="w-full space-y-8">
                {/* Category Selection */}
                <div className="w-64">
                    <Controller
                        name="catagory"
                        control={control}
                        rules={{ required: 'Category is required' }}
                        render={({ field }) => (
                            <Select 
                                {...field}
                                label="Select Category"
                                size="sm"
                            >
                                {catagoryData.map(catagory => (
                                    <SelectItem key={catagory._id} value={catagory._id}>
                                        {catagory.catagory}
                                    </SelectItem>
                                ))}
                            </Select>
                        )}
                    />
                </div>

                {/* Variants Section */}
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl trajan">Variant Descriptions</h2>
                        <div className="flex gap-4">
                            <Button
                                type="submit"
                                color="primary"
                                variant="bordered"
                                className="times"
                                isLoading={isSubmitting}
                            >
                                Upload Product
                            </Button>
                            <Button
                                onClick={() => appendVariant(defaultVariant)}
                                color="primary"
                                variant="light"
                                className="times"
                            >
                                Add Variant
                            </Button>
                        </div>
                    </div>

                    {/* Variant Cards */}

                    {variantFields.map((variant, index) => (
                        <Card key={variant.id} className="p-6 relative bg-gray-50">
                            <button
                                onClick={() => removeVariant(index)}
                                className="absolute top-2 right-2"
                                type="button"
                            >
                                <Cross />
                            </button>

                            {/* Image Upload Section */}
                            <div className="grid grid-cols-4 gap-4 mb-6">
                                {[1, 2, 3, 4].map((num) => {
                                    const picKey = `variantPic_${num}`;
                                    const pic = watch(`variants.${index}.variantPics.${picKey}`);
                                    return (
                                        <div key={num} className="relative">
                                            {!pic ? (
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleImageChange(index, picKey, e.target.files[0])}
                                                    className="w-full"
                                                />
                                            ) : (
                                                <div className="relative">
                                                    <img
                                                        src={URL.createObjectURL(pic)}
                                                        alt={`Variant ${index + 1} Image ${num}`}
                                                        className="w-full h-40 object-cover rounded"
                                                    />
                                                    <button
                                                        onClick={() => handleImageDelete(index, picKey)}
                                                        type="button"
                                                        className="absolute -top-2 -right-2"
                                                    >
                                                        <Cross />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Variant Details */}
                            <div className="grid grid-cols-3 gap-4">
                                <Controller
                                    name={`variants.${index}.variantName`}
                                    control={control}
                                    rules={{ required: 'Variant name is required' }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            label="Variant Name"
                                        />
                                    )}
                                />

                                <Controller
                                    name={`variants.${index}.variantPrice`}
                                    control={control}
                                    rules={{ required: 'Price is required', min: 0 }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            type="number"
                                            label="Price"
                                        />
                                    )}
                                />

                                <Controller
                                    name={`variants.${index}.foodType`}
                                    control={control}
                                    rules={{ required: 'Food type is required' }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="Dietary Selection"
                                        >
                                            <SelectItem key="VEG">Vegetarian</SelectItem>
                                            <SelectItem key="NON-VEG">Non-Vegetarian</SelectItem>
                                            <SelectItem key="EGG">Contains Egg</SelectItem>
                                        </Select>
                                    )}
                                />
                            </div>

                            <Controller
                                name={`variants.${index}.variantDesc`}
                                control={control}
                                rules={{ required: 'Description is required' }}
                                render={({ field }) => (
                                    <Textarea
                                        {...field}
                                        label="Variant Description"
                                        className="mt-4"
                                    />
                                )}
                            />
                        </Card>
                    ))}
          
                    
                </div>

                {/* Additional Details Section */}
                <div className='flex flex-col gap-2'>
                <h2 className="text-2xl trajan">Additional Infromtaion</h2>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <Controller
                                name="storage"
                                control={control}
                                render={({ field }) => (
                                    <Textarea
                                        {...field}
                                        label="Storage Information"
                                        className="w-full"
                                    />
                                )}
                            />
                            <Controller
                                name="allergens"
                                control={control}
                                render={({ field }) => (
                                    <Textarea
                                        {...field}
                                        label="Allergens Information"
                                        className="w-full"
                                    />
                                )}
                            />
                        </div>
                        <div className="space-y-4">
                            <Controller
                                name="ingredients"
                                control={control}
                                render={({ field }) => (
                                    <Textarea
                                        {...field}
                                        label="Ingredients Information"
                                        className="w-full"
                                    />
                                )}
                            />
                            <Controller
                                name="size"
                                control={control}
                                render={({ field }) => (
                                    <Textarea
                                        {...field}
                                        label="Size Information"
                                        className="w-full"
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>

                {/* Box Sizes Section */}
                <div className='w-full flex items-start gap-4'>
                    <div className="w-full space-y-4">
                        <div className='flex justify-between items-end'>
                            <h2 className="text-2xl trajan">Box Sizes</h2>
                            <Button 
                                onClick={() => appendBox(defaultBox)} 
                                color="primary" 
                                variant="light" 
                                className="mt-2"
                                type="button"
                            >
                                Add Box
                            </Button>
                        </div>

                        <div className='h-[150px] flex flex-col gap-2 overflow-y-scroll'>
                            {boxFields.map((box, index) => (
                                <div key={box.id} className="flex items-center gap-4">
                                    <Controller
                                        name={`boxes.${index}.boxType`}
                                        control={control}
                                        rules={{ required: 'Box type is required' }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                size='sm'
                                                label="Box Type"
                                                className="w-1/2"
                                            />
                                        )}
                                    />
                                    <Controller
                                        name={`boxes.${index}.boxPrice`}
                                        control={control}
                                        rules={{ required: 'Box price is required', min: 0 }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                size='sm'
                                                type="number"
                                                label="Box Price"
                                                className="w-1/3"
                                            />
                                        )}
                                    />
                                    <button 
                                        onClick={() => removeBox(index)}
                                        type="button"
                                    >
                                        <Cross />
                                    </button>
                                </div>
                            ))}   
                        </div>
                        
                    </div>

                    <div className="w-full flex flex-col items-end space-y-4 my-3">
                        <div className='w-full flex flex-col items-end space-y-4'>
                            <p className="w-full text-2xl trajan">All India Availability</p>
                            <Controller
                                name="allIndiaDelivery"
                                control={control}
                                rules={{ required: 'All India Delivery is required' }}
                                render={({ field }) => (
                                    <Select 
                                        {...field}
                                        label="Select All India Delivery Availability"
                                        size="sm"
                                    >
                                        <SelectItem key="true" value="true">All India Available</SelectItem>
                                        <SelectItem key="false" value="false">Only In Kolkata</SelectItem>
                                    </Select>
                                )}
                            />
                        </div>


                        
                        {/* //Make the add tag div here */}
                    <div className="w-full flex flex-col items-end space-y-4 my-4">
                    <h2 className="w-full text-2xl trajan">Add Tags</h2>
                    <div className="flex gap-4 w-full items-center">
                    
                    <Input
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        label="Tag Name"
                        size="sm"
                        placeholder="Enter tag"
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && tag.trim()) {
                                addTag(tag.trim());
                                setTag("");
                                e.preventDefault();
                            }
                        }}
                        className="flex-grow"
                    />

                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            if (tag.trim()) {
                                addTag(tag.trim());
                                setTag("");
                            }
                        }}
                        color="primary"
                        variant="bordered"
                    >
                        Add
                    </Button>
                    </div>
                    <div className="w-full flex flex-wrap gap-2 mt-2">
                        {[...tags].map((tag) => (
                        <div
                            key={tag}
                            className="flex items-center px-3 py-1 bg-gray-200 rounded-full text-sm"
                        >
                            {tag}
                            <button
                            onClick={() => {
                                setTags((prevTags) => {
                                const newTags = new Set(prevTags);
                                newTags.delete(tag);
                                return newTags;
                                });
                            }}
                            className="ml-2"
                            >
                            <Cross />
                            </button>
                        </div>
                        ))}
                    </div>
                    </div>





                    </div>
                </div>
            </form>
        </div>
    );
}

export default UploadProduct;