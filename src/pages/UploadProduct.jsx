import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Input from '../components/Input';
import Button from '../components/Button';
import Cross from '../svg/Cross';

function UploadProduct() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [variants, setVariants] = useState([
        {
            varientId: "", variantName: "", variantDesc: "", variantPrice: 0, foodType: "", 
            variantPics: { variantPic_1: "", variantPic_2: "", variantPic_3: "", variantPic_4: "" },
            boxSize: [""],
            allIndiaDelivery: false
        }
    ]);

    
    const handleInputChange = (e, index, name) => {

        setVariants((prevVariants) => {
            const updatedVariants = [...prevVariants];
            updatedVariants[index][name] = e.target.value
            return updatedVariants;
        });

    }
    const [isSubmitting, setIsSubmitting] = useState(false);


    const uploadProduct = async (data) => {
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('catagory', data.catagory);
            formData.append('boxSize', JSON.stringify(['Big', 'Small', 'Large']));
            
            variants.forEach((variant, index) => {
                formData.append(`variantPic_1`, variant.variantPics.variantPic_1);
                formData.append(`variantPic_2`, variant.variantPics.variantPic_2);
                formData.append(`variantPic_3`, variant.variantPics.variantPic_3);
                formData.append(`variantPic_4`, variant.variantPics.variantPic_4);
                
                // Append each variant's details directly as JSON objects
                formData.append(`varient[${index}][variantName]`, variant.variantName);
                formData.append(`varient[${index}][variantDesc]`, variant.variantDesc);
                formData.append(`varient[${index}][variantPrice]`, variant.variantPrice);
                formData.append(`varient[${index}][foodType]`, variant.foodType);
            });
            
            console.log(formData)
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
            variantName: "", variantDesc: "", variantPrice: 0, foodType: "", 
            variantPics: { variantPic_1: "", variantPic_2: "", variantPic_3: "", variantPic_4: "" },
            boxSize: [""],
            allIndiaDelivery: false
        }]);
        reset();
    };

    const addVariant = () => {
        setVariants((prevVariants) => [
            ...prevVariants,
            {
                variantName: "", variantDesc: "", variantPrice: 0, foodType: "", 
                variantPics: { variantPic_1: "", variantPic_2: "", variantPic_3: "", variantPic_4: "" },
                boxSize: [""],
                allIndiaDelivery: false
            }
        ]);
    };

    const deleteVariant = (index) => {
        setVariants((prevVariants) => prevVariants.filter((_, i) => i !== index));
    };

    const handleImagePreview = (e, index, name) => {
        const file = e.target.files[0];
        if (file) {
            setVariants((prevVariants) => {
                const updatedVariants = [...prevVariants];
                updatedVariants[index].variantPics[name] = file;
                return updatedVariants;
            });
        }
    };

    const handleImgDelete = (index, name) => {
        setVariants((prevVariants) => {
            const updatedVariants = [...prevVariants];
            updatedVariants[index].variantPics[name] = '';
            return updatedVariants;
        });
    };


    return (
        <div className='flex flex-col items-center justify-center gap-4 py-8 mx-auto'>
            <form onSubmit={handleSubmit(uploadProduct)} encType="multipart/form-data">
                <div className='flex flex-col items-center gap-4 py-8'>
                    {variants.map((variant, index) => (
                        <div className='bg-[#d3d2d2] flex flex-col gap-2 p-8 rounded-xl' key={index}>
                            <div className='flex justify-center gap-4'>
                                {/* Image 1 */}
                                {!variant.variantPics.variantPic_1 ? (
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        {...register(`variantPic_1_${index}`, { required: 'Image 1 is required' })}
                                        onChange={(e) => handleImagePreview(e, index, 'variantPic_1')}
                                        className="w-52 h-40 object-cover"
                                    />
                                ) : (
                                    <div className="relative">
                                        <img
                                            src={URL.createObjectURL(variant.variantPics.variantPic_1)}
                                            alt="Preview"
                                            className="w-52 h-40 object-cover"
                                        />
                                        <p onClick={() => handleImgDelete(index, 'variantPic_1')}
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
                                        onChange={(e) => handleImagePreview(e, index, 'variantPic_2')}
                                        className="w-52 h-40 object-cover"
                                    />
                                ) : (
                                    <div className="relative">
                                        <img
                                            src={URL.createObjectURL(variant.variantPics.variantPic_2)}
                                            alt="Preview"
                                            className="w-52 h-40 object-cover"
                                        />
                                        <p onClick={() => handleImgDelete(index, 'variantPic_2')}
                                            className='absolute -top-4 right-0 cursor-pointer'><Cross /></p>
                                    </div>
                                )}
                                {errors[`variantPic_2_${index}`] && <p>{errors[`variantPic_2_${index}`].message}</p>}

                                {/* Image 3 */}
                                {!variant.variantPics.variantPic_3 ? (
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        {...register(`variantPic_3_${index}`)}
                                        onChange={(e) => handleImagePreview(e, index, 'variantPic_3')}
                                        className="w-52 h-40 object-cover"
                                    />
                                ) : (
                                    <div className="relative">
                                        <img
                                            src={URL.createObjectURL(variant.variantPics.variantPic_3)}
                                            alt="Preview"
                                            className="w-52 h-40 object-cover"
                                        />
                                        <p onClick={() => handleImgDelete(index, 'variantPic_3')}
                                            className='absolute -top-4 right-0 cursor-pointer'><Cross /></p>
                                    </div>
                                )}

                                {/* Image 4 */}
                                {!variant.variantPics.variantPic_4 ? (
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        {...register(`variantPic_4_${index}`)}
                                        onChange={(e) => handleImagePreview(e, index, 'variantPic_4')}
                                        className="w-52 h-40 object-cover"
                                    />
                                ) : (
                                    <div className="relative">
                                        <img
                                            src={URL.createObjectURL(variant.variantPics.variantPic_4)}
                                            alt="Preview"
                                            className="w-52 h-40 object-cover"
                                        />
                                        <p onClick={() => handleImgDelete(index, 'variantPic_4')}
                                            className='absolute -top-4 right-0 cursor-pointer'><Cross /></p>
                                    </div>
                                )}
                            </div>

                            {/* Variant Details */}
                            <div className='flex justify-between gap-4'>
                                <Input
                                    type='text'
                                    {...register(`variantName[${index}]`, { required: 'Variant Name is required' })}
                                    className='border-2 p-1'
                                    placeholder="Variant Name"
                                    onChange={(e) => handleInputChange(e, index, 'variantName')}
                                />
                                {errors[`variantName[${index}]`] && <p>{errors[`variantName[${index}]`].message}</p>}

                                <Input
                                    type='text'
                                    {...register(`variantDesc[${index}]`, { required: 'Variant Description is required' })}
                                    className='border-2 p-1'
                                    placeholder="Variant Description"
                                    onChange={(e) => handleInputChange(e, index, 'variantDesc')}
                                />
                                {errors[`variantDesc[${index}]`] && <p>{errors[`variantDesc[${index}]`].message}</p>}

                                <Input
                                    type='number'
                                    {...register(`variantPrice[${index}]`, { required: 'Variant Price is required' })}
                                    className='border-2 p-1'
                                    placeholder="Variant Price"
                                    onChange={(e) => handleInputChange(e, index, 'variantPrice')}
                                />
                                {errors[`variantPrice[${index}]`] && <p>{errors[`variantPrice[${index}]`].message}</p>}

                                <select
                                    {...register(`foodType[${index}]`, { required: 'Food Type is required' })}
                                    className="border-1 p-1"
                                    onChange={(e) => handleInputChange(e, index, 'foodType')}
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
                                    onChange={(e) => handleInputChange(e, index, 'foodType')}
                                >
                                    <option value="" disabled>Select an option</option>
                                    <option value="false">False</option>
                                    <option value="true">True</option>
                                </select>
                                {errors[`allIndiaDelivery[${index}]`] && <p>{errors[`allIndiaDelivery[${index}]`].message}</p>}
                            </div>

                            {/* Delete Variant Button */}
                            <Button onClick={() => deleteVariant(index)} className='bg-slate-400 p-1 rounded-full w-[300px] mx-auto'>
                                Delete
                            </Button>
                        </div>
                    ))}
                                <Input
                                    type='text'
                                    {...register(`catagory`, { required: 'Variant Catagory is required' })}
                                    className='border-2 p-1'
                                    placeholder="Catagory"
                                />
                                {errors[`catagory`] && <p>{errors[`catagory`].message}</p>}
                    <Button type='submit' className='bg-slate-400 p-4' disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </div>
            </form>
            <Button onClick={addVariant} className='border bg-slate-300 p-2'>
                ADD
            </Button>
        </div>
    );
}

export default UploadProduct;
