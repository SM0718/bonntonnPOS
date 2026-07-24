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
  Tabs,
  Tab,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableColumn
} from '@nextui-org/react';
import { 
  X, 
  Plus, 
  FileText, 
  Image as ImageIcon, 
  DollarSign,
  Tag,
  BookOpen,
  Percent,
  Calendar,
  File,
  Trash  } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EbooksUpload = () => {
  const [activeTab, setActiveTab] = useState('ebooks');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState(new Set());
  const [tagInput, setTagInput] = useState('');

  const getRandomId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  // Ebook Form Setup
  const defaultChapter = {
    id: getRandomId(),
    title: '',
    content: '',
    sampleContent: '',
    isPreview: false
  };

  const defaultEbook = {
    title: '',
    subtitle: '',
    description: '',
    category: '',
    language: '',
    level: '',
    thumbnail: null,
    ebookFile: null,
    sampleFile: null,
    price: 0,
    isFree: false,
    chapters: [defaultChapter],
    requirements: '',
    targetAudience: '',
    learningObjectives: '',
    isPublished: false,
    drmEnabled: false,
    allowedPrints: 0,
    allowedCopies: 0,
    reviewStatus: 'pending'
  };

  const { 
    register: ebookRegister, 
    handleSubmit: ebookHandleSubmit, 
    control: ebookControl, 
    reset: ebookReset, 
    setValue: ebookSetValue, 
    watch: ebookWatch 
  } = useForm({
    defaultValues: defaultEbook
  });

  const { 
    fields: chapterFields, 
    append: appendChapter, 
    remove: removeChapter 
  } = useFieldArray({
    control: ebookControl,
    name: "chapters"
  });

  // Coupon Form Setup
  const defaultCoupon = {
    code: '',
    discountType: 'percentage',
    discountValue: 0,
    maxUses: 0,
    minPurchase: 0,
    startDate: '',
    expiryDate: '',
    applicableItems: [{ id: getRandomId(), type: '', itemId: '', name: '' }],
    isActive: true,
    description: '',
    restrictions: '',
    singleUsePerUser: false,
    applyToSubscriptions: false
  };

  const { 
    register: couponRegister, 
    handleSubmit: couponHandleSubmit, 
    control: couponControl, 
    reset: couponReset, 
    setValue: couponSetValue, 
    watch: couponWatch 
  } = useForm({
    defaultValues: defaultCoupon
  });

  const { 
    fields: applicableItemsFields, 
    append: appendApplicableItem, 
    remove: removeApplicableItem 
  } = useFieldArray({
    control: couponControl,
    name: "applicableItems"
  });

  const [isEbookSubmitting, setIsEbookSubmitting] = useState(false);
  const [isCouponSubmitting, setIsCouponSubmitting] = useState(false);

  useEffect(() => {
    // Mock fetch categories
    setCategories([
      { id: '1', name: 'Cake Making' },
      { id: '2', name: 'Chocolate Making' },
      { id: '3', name: 'Fondanting' },
      { id: '4', name: 'Mochi' }
    ]);
  }, []);

  const handleMediaChange = (fieldPath, file) => {
    ebookSetValue(fieldPath, file);
  };

  const handleMediaDelete = (fieldPath) => {
    ebookSetValue(fieldPath, null);
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

  const resetEbookForm = () => {
    ebookReset();
    setTags(new Set());
    setTagInput('');
  };

  const resetCouponForm = () => {
    couponReset();
  };

  const onEbookSubmit = async (data) => {
    setIsEbookSubmitting(true);
    try {
      const formData = new FormData();
      
      // Basic ebook info
      formData.append('title', data.title);
      formData.append('subtitle', data.subtitle);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('language', data.language);
      formData.append('level', data.level);
      formData.append('price', data.price);
      formData.append('isFree', data.isFree);
      formData.append('requirements', data.requirements);
      formData.append('targetAudience', data.targetAudience);
      formData.append('learningObjectives', data.learningObjectives);
      formData.append('isPublished', data.isPublished);
      formData.append('drmEnabled', data.drmEnabled);
      formData.append('allowedPrints', data.allowedPrints);
      formData.append('allowedCopies', data.allowedCopies);
      formData.append('reviewStatus', data.reviewStatus);

      // Tags
      Array.from(tags).forEach((tag) => formData.append('tags[]', tag));

      // Media
      if (data.thumbnail) formData.append('thumbnail', data.thumbnail);
      if (data.ebookFile) formData.append('ebookFile', data.ebookFile);
      if (data.sampleFile) formData.append('sampleFile', data.sampleFile);

      // Chapters
      data.chapters.forEach((chapter, index) => {
        formData.append(`chapters[${index}][title]`, chapter.title);
        formData.append(`chapters[${index}][content]`, chapter.content);
        formData.append(`chapters[${index}][sampleContent]`, chapter.sampleContent);
        formData.append(`chapters[${index}][isPreview]`, chapter.isPreview);
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Ebook uploaded successfully!', {
        position: 'top-center',
        autoClose: 3000
      });
      resetEbookForm();
    } catch (error) {
      toast.error('Failed to upload ebook', {
        position: 'top-center',
        autoClose: 3000
      });
    } finally {
      setIsEbookSubmitting(false);
    }
  };

  const onCouponSubmit = async (data) => {
    setIsCouponSubmitting(true);
    try {
      const formData = new FormData();
      
      // Coupon info
      formData.append('code', data.code);
      formData.append('discountType', data.discountType);
      formData.append('discountValue', data.discountValue);
      formData.append('maxUses', data.maxUses);
      formData.append('minPurchase', data.minPurchase);
      formData.append('startDate', data.startDate);
      formData.append('expiryDate', data.expiryDate);
      formData.append('description', data.description);
      formData.append('restrictions', data.restrictions);
      formData.append('isActive', data.isActive);
      formData.append('singleUsePerUser', data.singleUsePerUser);
      formData.append('applyToSubscriptions', data.applyToSubscriptions);

      // Applicable items
      data.applicableItems.forEach((item, index) => {
        formData.append(`applicableItems[${index}][type]`, item.type);
        formData.append(`applicableItems[${index}][itemId]`, item.itemId);
        formData.append(`applicableItems[${index}][name]`, item.name);
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Coupon uploaded successfully!', {
        position: 'top-center',
        autoClose: 3000
      });
      resetCouponForm();
    } catch (error) {
      toast.error('Failed to upload coupon', {
        position: 'top-center',
        autoClose: 3000
      });
    } finally {
      setIsCouponSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="page-title">Upload Resources</h1>
          <Button
            color="danger"
            variant="flat"
            onClick={activeTab === 'ebooks' ? resetEbookForm : resetCouponForm}
            className="font-medium"
          >
            Discard Changes
          </Button>
        </div>
        
        <Tabs 
          aria-label="Resource Upload Tabs"
          selectedKey={activeTab}
          onSelectionChange={setActiveTab}
          className="mb-6"
          color="primary"
          variant="underlined"
          classNames={{
            tabList: "gap-6 w-full border-b border-surface-200 pb-0",
            tab: "px-0 h-12",
            cursor: "bg-primary",
            tabContent: "group-data-[selected=true]:text-primary font-semibold"
          }}
        >
          <Tab key="ebooks" title={
            <span className="flex items-center gap-2">
              <BookOpen size={18} />
              Upload Ebooks
            </span>
          }>
            <form onSubmit={ebookHandleSubmit(onEbookSubmit)} className="space-y-8 mt-6">
              {/* Ebook Information */}
              <Card className="card p-6">
                <h2 className="text-base font-semibold text-surface-900 mb-4">Ebook Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Controller
                    name="title"
                    control={ebookControl}
                    rules={{ required: 'Ebook title is required' }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Ebook Title"
                        placeholder="Enter ebook title"
                        className="w-full"
                      />
                    )}
                  />
                  <Controller
                    name="subtitle"
                    control={ebookControl}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Subtitle"
                        placeholder="Enter ebook subtitle"
                        className="w-full"
                      />
                    )}
                  />
                  <Controller
                    name="category"
                    control={ebookControl}
                    rules={{ required: 'Category is required' }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Category"
                        placeholder="Select category"
                        className="w-full"
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
                    control={ebookControl}
                    rules={{ required: 'Level is required' }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Level"
                        placeholder="Select level"
                        className="w-full"
                      >
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </Select>
                    )}
                  />
                  <Controller
                    name="language"
                    control={ebookControl}
                    rules={{ required: 'Language is required' }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Language"
                        placeholder="Select language"
                        className="w-full"
                      >
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Hindi">Hindi</SelectItem>
                      </Select>
                    )}
                  />
                  <Controller
                    name="price"
                    control={ebookControl}
                    rules={{ required: 'Price is required', min: 0 }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        label="Price ($)"
                        placeholder="Enter price"
                        className="w-full"
                        disabled={ebookWatch('isFree')}
                        startContent={<DollarSign size={16} />}
                      />
                    )}
                  />
                  <Controller
                    name="reviewStatus"
                    control={ebookControl}
                    rules={{ required: 'Review status is required' }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Review Status"
                        placeholder="Select review status"
                        className="w-full"
                      >
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </Select>
                    )}
                  />
                </div>
                <Controller
                  name="description"
                  control={ebookControl}
                  rules={{ required: 'Description is required' }}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      label="Ebook Description"
                      placeholder="Describe your ebook"
                      className="mt-4"
                      minRows={4}
                    />
                  )}
                />
                <Controller
                  name="isFree"
                  control={ebookControl}
                  render={({ field }) => (
                    <Checkbox
                      isSelected={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        if (e.target.checked) {
                          ebookSetValue('price', 0);
                        }
                      }}
                      className="mt-4"
                    >
                      Make this ebook free
                    </Checkbox>
                  )}
                />
              </Card>

              {/* Ebook Media */}
              <Card className="card p-6">
                <h2 className="text-base font-semibold text-surface-900 mb-4">Ebook Media</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Thumbnail</label>
                    {ebookWatch('thumbnail') ? (
                      <div className="relative">
                        <img
                          src={URL.createObjectURL(ebookWatch('thumbnail'))}
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
                    <label className="block text-sm font-medium mb-1">Ebook File (PDF)</label>
                    {ebookWatch('ebookFile') ? (
                      <div className="relative">
                        <div className="flex items-center gap-2 p-3 border border-surface-200 rounded-lg bg-surface-50">
                          <File size={24} className="text-primary" />
                          <span className="text-sm text-surface-700 truncate">{ebookWatch('ebookFile').name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleMediaDelete('ebookFile')}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleMediaChange('ebookFile', e.target.files[0])}
                      />
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Sample File (PDF)</label>
                    {ebookWatch('sampleFile') ? (
                      <div className="relative">
                        <div className="flex items-center gap-2 p-3 border border-surface-200 rounded-lg bg-surface-50">
                          <File size={24} className="text-primary" />
                          <span className="text-sm text-surface-700 truncate">{ebookWatch('sampleFile').name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleMediaDelete('sampleFile')}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleMediaChange('sampleFile', e.target.files[0])}
                      />
                    )}
                  </div>
                </div>
              </Card>

              {/* Chapters */}
              <Card className="card p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-base font-semibold text-surface-900 mb-0">Chapters</h2>
                  <Button
                    color="primary"
                    variant="flat"
                    onClick={() => appendChapter(defaultChapter)}
                    startContent={<Plus size={16} />}
                  >
                    Add Chapter
                  </Button>
                </div>
                <AnimatePresence>
                  {chapterFields.map((chapter, index) => (
                    <motion.div
                      key={chapter.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="border border-surface-200 rounded-xl p-5 mb-4 bg-surface-50"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-semibold text-surface-700">Chapter {index + 1}</h3>
                        <Button
                          isIconOnly
                          color="danger"
                          variant="light"
                          onClick={() => removeChapter(index)}
                        >
                          <X size={20} />
                        </Button>
                      </div>
                      <Controller
                        name={`chapters.${index}.title`}
                        control={ebookControl}
                        rules={{ required: 'Chapter title is required' }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            label="Chapter Title"
                            placeholder="Enter chapter title"
                            className="mb-4"
                          />
                        )}
                      />
                      <Controller
                        name={`chapters.${index}.content`}
                        control={ebookControl}
                        render={({ field }) => (
                          <Textarea
                            {...field}
                            label="Chapter Content"
                            placeholder="Enter chapter content"
                            className="mb-4"
                            minRows={4}
                          />
                        )}
                      />
                      <Controller
                        name={`chapters.${index}.sampleContent`}
                        control={ebookControl}
                        render={({ field }) => (
                          <Textarea
                            {...field}
                            label="Sample Content"
                            placeholder="Enter sample content for preview"
                            className="mb-4"
                            minRows={4}
                          />
                        )}
                      />
                      <Controller
                        name={`chapters.${index}.isPreview`}
                        control={ebookControl}
                        render={({ field }) => (
                          <Checkbox
                            isSelected={field.value}
                            onChange={field.onChange}
                            className="mb-4"
                          >
                            Free Preview Chapter
                          </Checkbox>
                        )}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </Card>

              {/* Additional Information */}
              <Card className="card p-6">
                <h2 className="text-base font-semibold text-surface-900 mb-4">Additional Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Controller
                    name="requirements"
                    control={ebookControl}
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
                    control={ebookControl}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        label="Target Audience"
                        placeholder="Who is this ebook for?"
                        minRows={4}
                      />
                    )}
                  />
                  <Controller
                    name="learningObjectives"
                    control={ebookControl}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        label="Learning Objectives"
                        placeholder="What will readers learn?"
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

              {/* Publish Settings */}
              <Card className="card p-6">
                <h2 className="text-base font-semibold text-surface-900 mb-4">Publish Settings</h2>
                <Controller
                  name="isPublished"
                  control={ebookControl}
                  render={({ field }) => (
                    <Checkbox
                      isSelected={field.value}
                      onChange={field.onChange}
                    >
                      Publish ebook immediately
                    </Checkbox>
                  )}
                />
              </Card>

              {/* Submit */}
              <div className="flex justify-end gap-4">
                <Button
                  color="danger"
                  variant="flat"
                  onClick={resetEbookForm}
                >
                  Discard Changes
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  isLoading={isEbookSubmitting}
                  size="lg"
                  className="btn-primary"
                >
                  {isEbookSubmitting ? 'Uploading...' : 'Upload Ebook'}
                </Button>
              </div>
            </form>
          </Tab>

          <Tab key="coupons" title={
            <span className="flex items-center gap-2">
              <Percent size={18} />
              Upload Coupons
            </span>
          }>
            <form onSubmit={couponHandleSubmit(onCouponSubmit)} className="space-y-8 mt-6">
              {/* Coupon Information */}
              <Card className="card p-6">
                <h2 className="text-base font-semibold text-surface-900 mb-4">Coupon Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Controller
                    name="code"
                    control={couponControl}
                    rules={{ required: 'Coupon code is required' }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Coupon Code"
                        placeholder="Enter coupon code (e.g., SUMMER25)"
                        className="w-full"
                        startContent={<Percent size={16} />}
                      />
                    )}
                  />
                  <Controller
                    name="discountType"
                    control={couponControl}
                    rules={{ required: 'Discount type is required' }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Discount Type"
                        placeholder="Select discount type"
                        className="w-full"
                      >
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                      </Select>
                    )}
                  />
                  <Controller
                    name="discountValue"
                    control={couponControl}
                    rules={{ required: 'Discount value is required', min: 0 }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        label={couponWatch('discountType') === 'percentage' ? 'Discount (%)' : 'Discount ($)'}
                        placeholder="Enter discount value"
                        className="w-full"
                        startContent={couponWatch('discountType') === 'percentage' ? <Percent size={16} /> : <DollarSign size={16} />}
                      />
                    )}
                  />
                  <Controller
                    name="maxUses"
                    control={couponControl}
                    rules={{ required: 'Max uses is required', min: 0 }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        label="Maximum Uses"
                        placeholder="Enter maximum number of uses (0 for unlimited)"
                        className="w-full"
                      />
                    )}
                  />
                  <Controller
                    name="minPurchase"
                    control={couponControl}
                    rules={{ min: 0 }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        label="Minimum Purchase ($)"
                        placeholder="Enter minimum purchase amount"
                        className="w-full"
                        startContent={<DollarSign size={16} />}
                      />
                    )}
                  />
                  <Controller
                    name="startDate"
                    control={couponControl}
                    rules={{ required: 'Start date is required' }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="date"
                        label="Start Date"
                        placeholder="Select start date"
                        className="w-full"
                        startContent={<Calendar size={16} />}
                      />
                    )}
                  />
                  <Controller
                    name="expiryDate"
                    control={couponControl}
                    rules={{ required: 'Expiry date is required' }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="date"
                        label="Expiry Date"
                        placeholder="Select expiry date"
                        className="w-full"
                        startContent={<Calendar size={16} />}
                      />
                    )}
                  />
                </div>
                <Controller
                  name="description"
                  control={couponControl}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      label="Coupon Description"
                      placeholder="Describe the coupon"
                      className="mt-4"
                      minRows={4}
                    />
                  )}
                />
                <Controller
                  name="restrictions"
                  control={couponControl}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      label="Restrictions"
                      placeholder="List any restrictions or conditions"
                      className="mt-4"
                      minRows={4}
                    />
                  )}
                />
                <div className="flex gap-4 mt-4">
                  <Controller
                    name="isActive"
                    control={couponControl}
                    render={({ field }) => (
                      <Checkbox
                        isSelected={field.value}
                        onChange={field.onChange}
                      >
                        Coupon Active
                      </Checkbox>
                    )}
                  />
                  <Controller
                    name="singleUsePerUser"
                    control={couponControl}
                    render={({ field }) => (
                      <Checkbox
                        isSelected={field.value}
                        onChange={field.onChange}
                      >
                        Single Use Per User
                      </Checkbox>
                    )}
                  />
                  <Controller
                    name="applyToSubscriptions"
                    control={couponControl}
                    render={({ field }) => (
                      <Checkbox
                        isSelected={field.value}
                        onChange={field.onChange}
                      >
                        Apply to Subscriptions
                      </Checkbox>
                    )}
                  />
                </div>
              </Card>

              {/* Applicable Items */}
              <Card className="card p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-base font-semibold text-surface-900 mb-0">Applicable Items</h2>
                  <Button
                    color="primary"
                    variant="flat"
                    onClick={() => appendApplicableItem({ id: getRandomId(), type: '', itemId: '', name: '' })}
                    startContent={<Plus size={16} />}
                  >
                    Add Item
                  </Button>
                </div>
                <Table aria-label="Applicable Items Table" className="mt-4">
                  <TableHeader>
                    <TableColumn>Type</TableColumn>
                    <TableColumn>Item ID</TableColumn>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Actions</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {applicableItemsFields.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Controller
                            name={`applicableItems.${index}.type`}
                            control={couponControl}
                            rules={{ required: 'Type is required' }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                placeholder="Select type"
                                className="w-full"
                              >
                                <SelectItem value="course">Course</SelectItem>
                                <SelectItem value="ebook">Ebook</SelectItem>
                                <SelectItem value="bundle">Bundle</SelectItem>
                              </Select>
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <Controller
                            name={`applicableItems.${index}.itemId`}
                            control={couponControl}
                            rules={{ required: 'Item ID is required' }}
                            render={({ field }) => (
                              <Input
                                {...field}
                                placeholder="Enter item ID"
                                className="w-full"
                              />
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <Controller
                            name={`applicableItems.${index}.name`}
                            control={couponControl}
                            rules={{ required: 'Name is required' }}
                            render={({ field }) => (
                              <Input
                                {...field}
                                placeholder="Enter item name"
                                className="w-full"
                              />
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            isIconOnly
                            color="danger"
                            variant="light"
                            onClick={() => removeApplicableItem(index)}
                          >
                            <X size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>

              {/* Submit */}
              <div className="flex justify-end gap-4">
                <Button
                  color="danger"
                  variant="flat"
                  onClick={resetCouponForm}
                >
                  Discard Changes
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  isLoading={isCouponSubmitting}
                  size="lg"
                  className="btn-primary"
                >
                  {isCouponSubmitting ? 'Uploading...' : 'Upload Coupon'}
                </Button>
              </div>
            </form>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default EbooksUpload;
