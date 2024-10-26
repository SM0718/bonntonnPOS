import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Input from '../components/Input';
import Button from '../components/Button';
import Cross from '../svg/Cross';
import Plus from '../svg/Plus';

function UploadProduct() {

    const getRandomId = () => {
        const date = new Date()
        return date.getTime() + date.getMilliseconds() + date.getSeconds()
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [variants, setVariants] = useState([
        {
            id: getRandomId(),
            variantName: "", variantDesc: "", variantPrice: 0, foodType: "",
            variantPics: { variantPic_1: "", variantPic_2: "", variantPic_3: "", variantPic_4: "" },
            allIndiaDelivery: false
        }
    ]);

    const [boxes, setBoxes] = useState([
        {
            boxId: getRandomId(),
            boxType: "",
            boxPrice: 0
        }
    ]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleBoxInputChange = (e, id, name) => {
        const { value } = e.target;

        setBoxes((prevBoxes) => 
            prevBoxes.map((box) => 
                box.boxId === id ? { ...box, [name]: value } : box
            )
        );
        
        console.log(boxes)
    };

    const handleBoxDelete = (e, id) => {
        e.preventDefault();
        if(boxes.length > 1) {
            const data = [...boxes]
            const updatedBoxes = data.filter(item => item.boxId !== id)
            reset({ boxes: updatedBoxes });
            setBoxes(updatedBoxes)
        }
        
    };

    const addBox = (e) => {
        e.preventDefault();
        setBoxes((prevBoxes) => [
            ...prevBoxes,
            {
                boxId: getRandomId(),
                boxType: "",
                boxPrice: 0
            }
        ]);
    };

    const handleInputChange = (e, id, name) => {
        const { value } = e.target;
        setVariants((prevVariants) => 
            prevVariants.map((variant) => 
                variant.id === id ? { ...variant, [name]: value } : variant
            )
        );

        console.log(variants)
    };
    
    

    const uploadProduct = async (data) => {
        setIsSubmitting(true);
        // console.log(variants)
        try {
            const formData = new FormData();
            formData.append('catagory', data.catagory);

            boxes.forEach((box, index) => {
                formData.append(`boxSize[${index}][boxId]`, box.boxId)
                formData.append(`boxSize[${index}][boxType]`, box.boxType)
                formData.append(`boxSize[${index}][boxPrice]`, box.boxPrice)
            })

            variants.forEach((variant, index) => {
                formData.append(`variantPic_1`, variant.variantPics.variantPic_1);
                formData.append(`variantPic_2`, variant.variantPics.variantPic_2);
                formData.append(`variantPic_3`, variant.variantPics.variantPic_3);
                formData.append(`variantPic_4`, variant.variantPics.variantPic_4);
                console.log(formData);
                // Append each variant's details directly as JSON objects
                formData.append(`variant[${index}][id]`, variant.id);
                formData.append(`variant[${index}][variantName]`, variant.variantName);
                formData.append(`variant[${index}][variantDesc]`, variant.variantDesc);
                formData.append(`variant[${index}][variantPrice]`, variant.variantPrice);
                formData.append(`variant[${index}][foodType]`, variant.foodType);
            });

            // console.log(formData);
            const response = await fetch('api/v1/products/add-product', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            console.log('Printing Result', result);
        } catch (error) {
            console.error('Error uploading product:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setVariants([{
            id: getRandomId(),
            variantName: "", variantDesc: "", variantPrice: 0, foodType: "",
            variantPics: { variantPic_1: "", variantPic_2: "", variantPic_3: "", variantPic_4: "" },
            allIndiaDelivery: false
        }]);
        reset();
    };

    const addVariant = (e) => {
        e.preventDefault();
        setVariants((prevVariants) => [
            ...prevVariants,
            {
                id: getRandomId(),
                variantName: "", 
                variantDesc: "", 
                variantPrice: 0, 
                foodType: "", 
                variantPics: { variantPic_1: "", variantPic_2: "", variantPic_3: "", variantPic_4: "" },
                allIndiaDelivery: false
            }
        ]);
    };

    const deleteVariant = (e, id) => {
        e.preventDefault();
        if(variants.length > 1) {
            const data = [...variants]
            const updatedVariants = data.filter(item => item.id !== id)
            reset({ variants: updatedVariants });
            setVariants(updatedVariants)
        }
        
    };

    const handleImagePreview = (e, id, name) => {
        const file = e.target.files[0];
        if (file) {
            setVariants((prevVariants) => 
                prevVariants.map(variant => 
                    variant.id === id 
                        ? { ...variant, variantPics: { ...variant.variantPics, [name]: file } } 
                        : variant
                )
            );
        }
    };

    const handleImgDelete = (id, name) => {
        setVariants((prevVariants) => 
            prevVariants.map(variant => 
                variant.id === id 
                    ? { ...variant, variantPics: { ...variant.variantPics, [name]: '' } } 
                    : variant
            )
        );
    };

    return (
        <div className='flex flex-col items-center justify-center gap-2 py-8 mx-auto'>
            <Button onClick={addVariant} className='border bg-slate-300 p-2 rounded-xl'>
                ADD
            </Button>
            <form onSubmit={handleSubmit(uploadProduct)} encType="multipart/form-data">

                <div>
                    <div className='flex flex-col items-center gap-4 py-8'>
                        {variants.map((variant, index) => (
                            <div className='bg-[#d3d2d2] flex flex-col gap-2 p-8 rounded-xl' key={variant.id}>
                                <div className='flex flex-col justify-center gap-4'>
                                    <div className='flex justify-center gap-4'>
                                    {/* Image 1 */}
                                    {!variant.variantPics.variantPic_1 ? (
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            {...register(`variantPic_1_${index}`, { required: 'Image 1 is required' })}
                                            onChange={(e) => handleImagePreview(e, variant.id, 'variantPic_1')}
                                            className="w-52 h-40 object-cover"
                                        />
                                        ) : (
                                        <div className="relative w-52 bg-red-400">
                                            <img
                                                src={URL.createObjectURL(variant.variantPics.variantPic_1)}
                                                alt="Preview"
                                                className="w-52 h-40 object-cover"
                                            />
                                            <p onClick={() => handleImgDelete(variant.id, 'variantPic_1')}
                                                className='absolute -top-4 right-0 cursor-pointer'><Cross /></p>
                                        </div>
                                    )}
                                    {errors[`variantPic_1_${index}`] && <p>{errors[`variantPic_1_${index}`].message}</p>}

                                    {/* Image 2 */}
                                    {!variant.variantPics.variantPic_2 ? (
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            {...register(`variantPic_2_${index}`, { required: 'Image 2 is required' })}
                                            onChange={(e) => handleImagePreview(e, variant.id, 'variantPic_2')}
                                            className="w-52 h-40 object-cover"
                                        />
                                        ) : (
                                        <div className="relative">
                                            <img
                                                src={URL.createObjectURL(variant.variantPics.variantPic_2)}
                                                alt="Preview"
                                                className="w-52 h-40 object-cover"
                                            />
                                            <p onClick={() => handleImgDelete(variant.id, 'variantPic_2')}
                                                className='absolute -top-4 right-0 cursor-pointer'><Cross /></p>
                                        </div>
                                    )}
                                    {errors[`variantPic_2_${index}`] && <p>{errors[`variantPic_2_${index}`].message}</p>}

                                    {/* Image 3 */}
                                    {!variant.variantPics.variantPic_3 ? (
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            {...register(`variantPic_3_${index}`, { required: 'Image 3 is required' })}
                                            onChange={(e) => handleImagePreview(e, variant.id, 'variantPic_3')}
                                            className="w-52 h-40 object-cover"
                                        />
                                        ) : (
                                        <div className="relative">
                                            <img
                                                src={URL.createObjectURL(variant.variantPics.variantPic_3)}
                                                alt="Preview"
                                                className="w-52 h-40 object-cover"
                                            />
                                            <p onClick={() => handleImgDelete(variant.id, 'variantPic_3')}
                                                className='absolute -top-4 right-0 cursor-pointer'><Cross /></p>
                                        </div>
                                    )}
                                    {errors[`variantPic_3_${index}`] && <p>{errors[`variantPic_3_${index}`].message}</p>}

                                    {/* Image 4 */}
                                    {!variant.variantPics.variantPic_4 ? (
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            {...register(`variantPic_4_${index}`)}
                                            onChange={(e) => handleImagePreview(e, variant.id, 'variantPic_4')}
                                            className="w-52 h-40 object-cover"
                                        />
                                        ) : (
                                        <div className="relative">
                                            <img
                                                src={URL.createObjectURL(variant.variantPics.variantPic_4)}
                                                alt="Preview"
                                                className="w-52 h-40 object-cover"
                                            />
                                            <p onClick={() => handleImgDelete(variant.id, 'variantPic_4')}
                                                className='absolute -top-4 right-0 cursor-pointer'><Cross /></p>
                                        </div>
                                    )}
                                    {errors[`variantPic_4_${index}`] && <p>{errors[`variantPic_4_${index}`].message}</p>}
                                    </div>
                                    {/* Variant Details */}
                                    <div className='flex justify-between gap-4'>
                                        <Input
                                            type='text'
                                            {...register(`variantName[${index}]`, { required: 'Variant Name is required' })}
                                            className='border-2 p-1'
                                            placeholder="Variant Name"
                                            onChange={(e) => handleInputChange(e, variant.id, 'variantName')}
                                            value={variant.variantName}
                                        />
                                        {errors[`variantName[${index}]`] && <p>{errors[`variantName[${index}]`].message}</p>}

                                        <Input
                                            type='text'
                                            {...register(`variantDesc[${index}]`, { required: 'Variant Desc is required' })}
                                            className='border-2 p-1'
                                            placeholder="Variant Desc"
                                            onChange={(e) => handleInputChange(e, variant.id, 'variantDesc')}
                                        />
                                        {errors[`variantDesc[${index}]`] && <p>{errors[`variantDesc[${index}]`].message}</p>}

                                        <Input
                                        type='number'
                                        {...register(`variantPrice[${index}]`, { required: 'Variant Price is required' })}
                                        className='border-2 p-1'
                                        placeholder="Variant Price"
                                        onChange={(e) => handleInputChange(e, variant.id, 'variantPrice')}
                                    />
                                    {errors[`variantPrice[${index}]`] && <p>{errors[`variantPrice[${index}]`].message}</p>}

                                    <select
                                        {...register(`foodType[${index}]`, { required: 'Food Type is required' })}
                                        className="border-1 p-1"
                                        onChange={(e) => handleInputChange(e, variant.id, 'foodType')}
                                    >
                                        <option value="" disabled>Select an option</option>
                                        <option value="VEG">VEG</option>
                                        <option value="NON-VEG">NON-VEG</option>
                                        <option value="EGG">EGG</option>
                                    </select>
                                    {errors[`foodType[${index}]`] && <p>{errors[`foodType[${index}]`].message}</p>}

                                    <select
                                        {...register(`allIndiaDelivery[${index}]`, { required: 'Delivery Range is required' })}
                                        className="border-1 p-1"
                                        onChange={(e) => handleInputChange(e, variant.id, 'allIndiaDelivery')}
                                    >
                                        <option value="" disabled>Select an option</option>
                                        <option value="false">False</option>
                                        <option value="true">True</option>
                                    </select>
                                    {errors[`allIndiaDelivery[${index}]`] && <p>{errors[`allIndiaDelivery[${index}]`].message}</p>}
                            

                                        {/* Additional variant details */}
                                    </div>

                                    <Button onClick={(e) => deleteVariant(e, variant.id)} className='bg-slate-400 p-1 rounded-full w-[300px] mx-auto'>
                                        Delete
                                    </Button>
                                </div>
                                
                            </div>
                        ))}
                    
                        {/* Similar code for box fields */}

                        <Input
                            type='text'
                            {...register(`catagory`, { required: 'Category is required' })}
                            className='border-2 p-1'
                            placeholder="Category"
                        />
                        {errors[`catagory`] && <p>{errors[`catagory`].message}</p>}
                        <div className='flex flex-col gap-2'>
                        {
                            boxes.map((item, index) => 
                                <div className='flex gap-4' key={item.boxId}>
                                    <div className='flex gap-2'>
                                     <Input
                                            type='text'
                                            {...register(`boxType[${index}]`, { required: 'Box Type is required' })}
                                            className='border-2 p-1'
                                            placeholder="Box Type"
                                            onChange={(e) => handleBoxInputChange(e, item.boxId, 'boxType')}
                                            value={item.boxType}
                                        />
                                    {errors[`boxType[${index}]`] && <p>{errors[`boxType[${index}]`].message}</p>}

                                    <Input
                                            type='number'
                                            {...register(`boxPrice[${index}]`, { required: 'Box Price is required' })}
                                            className='border-2 p-1'
                                            placeholder="Box Price"
                                            onChange={(e) => handleBoxInputChange(e, item.boxId, 'boxPrice')}
                                            value={item.boxPrice}
                                        />
                                    {errors[`boxPrice[${index}]`] && <p>{errors[`boxPrice[${index}]`].message}</p>}
                                    </div>

                                    <div className='flex gap-2'>
                                        <Button onClick={(e) => handleBoxDelete(e, item.boxId)} className={'bg-red-200 rounded-full px-2 transition duration-500 hover:bg-red-400'}><Cross /></Button>
                                        <Button onClick={(e) => addBox(e)} className={'bg-green-200 rounded-full px-2 transition duration-500 hover:bg-green-400'}><Plus /></Button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                        <Button type='submit' className={`bg-slate-400 p-4 ${isSubmitting && 'cursor-wait'}`} disabled={isSubmitting}>
                            {isSubmitting ? 'Upload...' : 'Upload Product'}
                        </Button>
                    </div>
                    
                    
                </div>
            </form>
        </div>
    );
}

export default UploadProduct;
