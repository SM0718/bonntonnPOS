import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Button, 
  Card, 
  Input, 
  Select, 
  SelectItem, 
  Textarea,
  Checkbox,
  Chip,
  Divider
} from '@nextui-org/react';
import { 
  X, 
  Plus, 
  Video, 
  FileText, 
  Image as ImageIcon, 
  DollarSign,
  Clock,
  Tag,
  BookOpen
} from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourseUpload = () => {
  const getRandomId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState(new Set());
  const [tagInput, setTagInput] = useState('');

  const defaultLesson = {
    id: getRandomId(),
    title: '',
    description: '',
    videoFile: null,
    duration: 0,
    isPreview: false,
    resources: []
  };

  const defaultSection = {
    id: getRandomId(),
    title: '',
    description: '',
    lessons: [defaultLesson]
  };

  const defaultPriceTier = {
    id: getRandomId(),
    tierName: '',
    price: 0,
    features: []
  };

  const { 
    register, 
    handleSubmit, 
    control, 
    reset, 
    setValue, 
    watch 
  } = useForm({
    defaultValues: {
      title: '',
      subtitle: '',
      description: '',
      category: '',
      level: '',
      language: '',
      thumbnail: null,
      promoVideo: null,
      sections: [defaultSection],
      priceTiers: [defaultPriceTier],
      requirements: '',
      targetAudience: '',
      learningObjectives: '',
      isPublished: false,
      isFree: false
    }
  });

  const { 
    fields: sectionarsa, 
    fields: sectionFields, 
    append: appendSection, 
    remove: removeSection 
  } = useFieldArray({
    control,
    name: "sections"
  });

  const { 
    fields: priceTierFields, 
    append: appendPriceTier, 
    remove: removePriceTier 
  } = useFieldArray({
    control,
    name: "priceTiers"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Mock fetch categories
    setCategories([
      { id: '1', name: 'Cake Making' },
      { id: '2', name: 'Chocolate Making' },
      { id: '3', name: 'Fondenting' },
      { id: '4', name: 'Mochi' }
    ]);
  }, []);

  const handleMediaChange = (fieldPath, file) => {
    setValue(fieldPath, file);
  };

  const handleMediaDelete = (fieldPath) => {
    setValue(fieldPath, null);
  };

  const addTag = (tag) => {
    if (tag.trim()) {
      setTags((prev) => new Set(prev).add(tag.trim()));
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setTags((prev) => {
      const newTags = new Set(prev);
      newTags.delete(tag);
      return newTags;
    });
  };

  const resetForm = () => {
    reset();
    setTags(new Set());
    setTagInput('');
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      
      // Basic course info
      formData.append('title', data.title);
      formData.append('subtitle', data.subtitle);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('level', data.level);
      formData.append('language', data.language);
      formData.append('requirements', data.requirements);
      formData.append('targetAudience', data.targetAudience);
      formData.append('learningObjectives', data.learningObjectives);
      formData.append('isPublished', data.isPublished);
      formData.append('isFree', data.isFree);

      // Tags
      Array.from(tags).forEach((tag) => formData.append('tags[]', tag));

      // Media
      if (data.thumbnail) formData.append('thumbnail', data.thumbnail);
      if (data.promoVideo) formData.append('promoVideo', data.promoVideo);

      // Sections and Lessons
      data.sections.forEach((section, sIndex) => {
        formData.append(`sections[${sIndex}][title]`, section.title);
        formData.append(`sections[${sIndex}][description]`, section.description);
        
        section.lessons.forEach((lesson, lIndex) => {
          formData.append(`sections[${sIndex}][lessons][${lIndex}][title]`, lesson.title);
          formData.append(`sections[${sIndex}][lessons][${lIndex}][description]`, lesson.description);
          formData.append(`sections[${sIndex}][lessons][${lIndex}][duration]`, lesson.duration);
          formData.append(`sections[${sIndex}][lessons][${lIndex}][isPreview]`, lesson.isPreview);
          
          if (lesson.videoFile) {
            formData.append(`lessonVideo_${sIndex}_${lIndex}`, lesson.videoFile);
          }
          
          lesson.resources.forEach((resource, rIndex) => {
            if (resource.file) {
              formData.append(`lessonResource_${sIndex}_${lIndex}_${rIndex}`, resource.file);
            }
          });
        });
      });

      // Price Tiers
      data.priceTiers.forEach((tier, index) => {
        formData.append(`priceTiers[${index}][tierName]`, tier.tierName);
        formData.append(`priceTiers[${index}][price]`, tier.price);
        tier.features.forEach((feature, fIndex) => {
          formData.append(`priceTiers[${index}][features][${fIndex}]`, feature);
        });
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Course uploaded successfully!', {
        position: 'top-center',
        autoClose: 3000
      });
      resetForm();
    } catch (error) {
      toast.error('Failed to upload course', {
        position: 'top-center',
        autoClose: 3000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="page-title">Create New Course</h1>
          <Button
            color="danger"
            variant="flat"
            onClick={resetForm}
            className="font-medium"
          >
            Discard Changes
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <Card className="card p-6">
            <h2 className="text-base font-semibold text-surface-900 mb-4">Course Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Controller
                name="title"
                control={control}
                rules={{ required: 'Course title is required' }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Course Title"
                    placeholder="Enter course title"
                    fullWidth
                  />
                )}
              />
              <Controller
                name="subtitle"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Subtitle"
                    placeholder="Enter course subtitle"
                    fullWidth
                  />
                )}
              />
              <Controller
                name="category"
                control={control}
                rules={{ required: 'Category is required' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Category"
                    placeholder="Select category"
                  >
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
              <Controller
                name="level"
                control={control}
                rules={{ required: 'Level is required' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Level"
                    placeholder="Select level"
                  >
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </Select>
                )}
              />
              <Controller
                name="language"
                control={control}
                rules={{ required: 'Language is required' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Language"
                    placeholder="Select language"
                  >
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                  </Select>
                )}
              />
            </div>
            <Controller
              name="description"
              control={control}
              rules={{ required: 'Description is required' }}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Course Description"
                  placeholder="Describe your course"
                  className="mt-4"
                  minRows={4}
                />
              )}
            />
          </Card>

          {/* Media Uploads */}
          <Card className="card p-6">
            <h2 className="text-base font-semibold text-surface-900 mb-4">Course Media</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Course Thumbnail</label>
                {watch('thumbnail') ? (
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(watch('thumbnail'))}
                      alt="Thumbnail"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleMediaDelete('thumbnail')}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleMediaChange('thumbnail', e.target.files[0])}
                  />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Promotional Video</label>
                {watch('promoVideo') ? (
                  <div className="relative">
                    <video
                      src={URL.createObjectURL(watch('promoVideo'))}
                      className="w-full h-40 object-cover rounded-lg"
                      controls
                    />
                    <button
                      type="button"
                      onClick={() => handleMediaDelete('promoVideo')}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleMediaChange('promoVideo', e.target.files[0])}
                  />
                )}
              </div>
            </div>
          </Card>

          {/* Curriculum */}
          <Card className="card p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-semibold text-surface-900 mb-0">Course Curriculum</h2>
              <Button
                color="primary"
                variant="flat"
                onClick={() => appendSection(defaultSection)}
                startContent={<Plus size={16} />}
              >
                Add Section
              </Button>
            </div>
            
            <AnimatePresence>
              {sectionFields.map((section, sIndex) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="border border-surface-200 rounded-xl p-5 mb-4 bg-surface-50"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-semibold text-surface-700">Section {sIndex + 1}</h3>
                    <Button
                      isIconOnly
                      color="danger"
                      variant="light"
                      onClick={() => removeSection(sIndex)}
                    >
                      <X size={20} />
                    </Button>
                  </div>
                  
                  <Controller
                    name={`sections.${sIndex}.title`}
                    control={control}
                    rules={{ required: 'Section title is required' }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Section Title"
                        placeholder="Enter section title"
                        className="mb-4"
                      />
                    )}
                  />
                  <Controller
                    name={`sections.${sIndex}.description`}
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        label="Section Description"
                        placeholder="Describe this section"
                        className="mb-4"
                      />
                    )}
                  />

                  {/* Lessons */}
                  <div className="ml-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-sm font-medium text-surface-600">Lessons</h4>
                      <Button
                        size="sm"
                        color="primary"
                        variant="flat"
                        onClick={() => {
                          setValue(`sections.${sIndex}.lessons`, [
                            ...watch(`sections.${sIndex}.lessons`),
                            defaultLesson
                          ]);
                        }}
                        startContent={<Plus size={14} />}
                      >
                        Add Lesson
                      </Button>
                    </div>

                    {watch(`sections.${sIndex}.lessons`)?.map((lesson, lIndex) => (
                      <div key={lesson.id} className="border-l-2 border-primary-300 pl-4 mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="text-sm font-medium text-surface-600">Lesson {lIndex + 1}</h5>
                          <Button
                            isIconOnly
                            color="danger"
                            variant="light"
                            onClick={() => {
                              const newLessons = [...watch(`sections.${sIndex}.lessons`)];
                              newLessons.splice(lIndex, 1);
                              setValue(`sections.${sIndex}.lessons`, newLessons);
                            }}
                          >
                            <X size={16} />
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Controller
                            name={`sections.${sIndex}.lessons.${lIndex}.title`}
                            control={control}
                            rules={{ required: 'Lesson title is required' }}
                            render={({ field }) => (
                              <Input
                                {...field}
                                label="Lesson Title"
                                placeholder="Enter lesson title"
                              />
                            )}
                          />
                          <Controller
                            name={`sections.${sIndex}.lessons.${lIndex}.duration`}
                            control={control}
                            rules={{ required: 'Duration is required', min: 0 }}
                            render={({ field }) => (
                              <Input
                                {...field}
                                type="number"
                                label="Duration (minutes)"
                                placeholder="Enter duration"
                              />
                            )}
                          />
                        </div>

                        <Controller
                          name={`sections.${sIndex}.lessons.${lIndex}.description`}
                          control={control}
                          render={({ field }) => (
                            <Textarea
                              {...field}
                              label="Lesson Description"
                              placeholder="Describe this lesson"
                              className="mt-4"
                            />
                          )}
                        />

                        <div className="mt-4">
                          <label className="block text-sm font-medium mb-1">Lesson Video</label>
                          {watch(`sections.${sIndex}.lessons.${lIndex}.videoFile`) ? (
                            <div className="relative">
                              <video
                                src={URL.createObjectURL(watch(`sections.${sIndex}.lessons.${lIndex}.videoFile`))}
                                className="w-full h-40 object-cover rounded-lg"
                                controls
                              />
                              <button
                                type="button"
                                onClick={() => handleMediaDelete(`sections.${sIndex}.lessons.${lIndex}.videoFile`)}
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ) : (
                            <Input
                              type="file"
                              accept="video/*"
                              onChange={(e) => handleMediaChange(`sections.${sIndex}.lessons.${lIndex}.videoFile`, e.target.files[0])}
                            />
                          )}
                        </div>

                        <Controller
                          name={`sections.${sIndex}.lessons.${lIndex}.isPreview`}
                          control={control}
                          render={({ field }) => (
                            <Checkbox
                              isSelected={field.value}
                              onChange={field.onChange}
                              className="mt-4"
                            >
                              Free Preview Lesson
                            </Checkbox>
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </Card>

          {/* Pricing */}
          <Card className="card p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-semibold text-surface-900 mb-0">Pricing</h2>
              <Button
                color="primary"
                variant="flat"
                onClick={() => appendPriceTier(defaultPriceTier)}
                startContent={<Plus size={16} />}
              >
                Add Price Tier
              </Button>
            </div>

            <Controller
              name="isFree"
              control={control}
              render={({ field }) => (
                <Checkbox
                  isSelected={field.value}
                  onChange={field.onChange}
                  className="mb-4"
                >
                  Make this course free
                </Checkbox>
              )}
            />

            {!watch('isFree') && (
              <AnimatePresence>
                {priceTierFields.map((tier, index) => (
                  <motion.div
                    key={tier.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="border border-surface-200 rounded-xl p-5 mb-4 bg-surface-50"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-semibold text-surface-700">Price Tier {index + 1}</h3>
                      <Button
                        isIconOnly
                        color="danger"
                        variant="light"
                        onClick={() => removePriceTier(index)}
                      >
                        <X size={20} />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Controller
                        name={`priceTiers.${index}.tierName`}
                        control={control}
                        rules={{ required: 'Tier name is required' }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            label="Tier Name"
                            placeholder="e.g., Basic, Premium"
                          />
                        )}
                      />
                      <Controller
                        name={`priceTiers.${index}.price`}
                        control={control}
                        rules={{ required: 'Price is required', min: 0 }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="number"
                            label="Price ($)"
                            placeholder="Enter price"
                          />
                        )}
                      />
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">Features</label>
                      {watch(`priceTiers.${index}.features`)?.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-center gap-2 mb-2">
                          <Input
                            value={feature}
                            onChange={(e) => {
                              const newFeatures = [...watch(`priceTiers.${index}.features`)];
                              newFeatures[fIndex] = e.target.value;
                              setValue(`priceTiers.${index}.features`, newFeatures);
                            }}
                            placeholder="Enter feature"
                          />
                          <Button
                            isIconOnly
                            color="danger"
                            variant="light"
                            onClick={() => {
                              const newFeatures = [...watch(`priceTiers.${index}.features`)];
                              newFeatures.splice(fIndex, 1);
                              setValue(`priceTiers.${index}.features`, newFeatures);
                            }}
                          >
                            <X size={16} />
                          </Button>
                        </div>
                      ))}
                      <Button
                        size="sm"
                        color="primary"
                        variant="flat"
                        onClick={() => {
                          setValue(`priceTiers.${index}.features`, [
                            ...watch(`priceTiers.${index}.features`),
                            ''
                          ]);
                        }}
                      >
                        Add Feature
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </Card>

          {/* Additional Information */}
          <Card className="card p-6">
            <h2 className="text-base font-semibold text-surface-900 mb-4">Additional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Controller
                name="requirements"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Requirements"
                    placeholder="List any prerequisites or requirements"
                    minRows={4}
                  />
                )}
              />
              <Controller
                name="targetAudience"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Target Audience"
                    placeholder="Who is this course for?"
                    minRows={4}
                  />
                )}
              />
              <Controller
                name="learningObjectives"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Learning Objectives"
                    placeholder="What will students learn?"
                    minRows={4}
                  />
                )}
              />
            </div>
          </Card>

          {/* Tags */}
          <Card className="card p-6">
            <h2 className="text-base font-semibold text-surface-900 mb-4">Tags</h2>
            <div className="flex items-center gap-4 mb-4">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Enter tag"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && tagInput.trim()) {
                    e.preventDefault();
                    addTag(tagInput);
                  }
                }}
              />
              <Button
                color="primary"
                onClick={() => addTag(tagInput)}
                disabled={!tagInput.trim()}
              >
                Add Tag
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {[...tags].map((tag) => (
                <Chip
                  key={tag}
                  onClose={() => removeTag(tag)}
                  variant="flat"
                  color="success"
                >
                  {tag}
                </Chip>
              ))}
            </div>
          </Card>

          {/* Publish */}
          <Card className="card p-6">
            <h2 className="text-base font-semibold text-surface-900 mb-4">Publish Settings</h2>
            <Controller
              name="isPublished"
              control={control}
              render={({ field }) => (
                <Checkbox
                  isSelected={field.value}
                  onChange={field.onChange}
                >
                  Publish course immediately
                </Checkbox>
              )}
            />
          </Card>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <Button
              color="danger"
              variant="flat"
              onClick={resetForm}
            >
              Discard Changes
            </Button>
            <Button
              color="primary"
              type="submit"
              isLoading={isSubmitting}
              size="lg"
              className="btn-primary"
            >
              {isSubmitting ? 'Uploading...' : 'Upload Course'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseUpload;
