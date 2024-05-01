import {
  Button,
  CategoryBadge,
  DashSelect,
  Input,
  ImageUpload as ImageUploadComponent,
} from "@src/components/ui";
import { useSubmitAdvert } from "@src/services/mutations";
import { useGetCategories } from "@src/services/queries";
import { Advert } from "@src/types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const AddAdvert = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Advert>({
    mode: "onChange",
  });
  const { data: initialCategories } = useGetCategories();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    if (initialCategories && Array.isArray(initialCategories)) {
      setAvailableCategories(
        initialCategories.map((category) => category.text)
      );
    }
  }, [initialCategories]);

  const handleCategoryChange = (selectedCategory: string) => {
    setSelectedCategories((prevCategories) => [
      ...prevCategories,
      selectedCategory,
    ]);
    setAvailableCategories((prevCategories) =>
      prevCategories.filter((category) => category !== selectedCategory)
    );
  };

  const handleRemoveCategory = (categoryToRemove: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.filter((category) => category !== categoryToRemove)
    );
    setAvailableCategories((prevCategories) => [
      ...prevCategories,
      categoryToRemove,
    ]);
  };

  const handleImageSelect = (image: File | null) => {
    setSelectedImage(image);
  };

  const { mutate, isPending } = useSubmitAdvert();

  const onSubmit = async (data: Advert) => {
    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("keyword", JSON.stringify(selectedCategories));
    formData.append("description", data.description);
    if (selectedImage) {
      formData.append("productImage", selectedImage);
    }
    formData.append("action_link", data.action_link);

    mutate(formData);
  };

  return (
    <div className="flex flex-col px-4 items-center justify-center mt-10">
      <div className="text-center max-w-sm">
        <h3 className="font-medium text-xl">Product Information</h3>
        <p className="text-sm">
          Kindly enter your product information to continue.
        </p>
      </div>
      <form className="mt-6 w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="What's the name of the product"
          label="Product Name"
          {...register("productName", { required: "Product name is required" })}
          error={errors?.productName?.message}
        />
        <div className="mb-4">
          <DashSelect
            label="Keywords"
            placeholder={"Select Keyword"}
            error=""
            options={availableCategories}
            onChange={(e) => handleCategoryChange(e.target.value)}
          />
        </div>
        {selectedCategories.length > 0 && (
          <div className="mt-2">
            <div className="flex flex-wrap">
              {selectedCategories.map((category) => (
                <div
                  key={category}
                  className="bg-gray-200 rounded-full px-2 py-1 m-1 flex items-center"
                >
                  <CategoryBadge
                    transparent={false}
                    color={"yellow"}
                    name={category}
                  />
                  <button
                    className="ml-1 focus:outline-none"
                    onClick={() => handleRemoveCategory(category)}
                  >
                    &#10005;
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        <Input
          placeholder="Write a brief description about you product"
          label="Description"
          {...register("description", {
            required: "Description is required",
          })}
          error={errors?.description?.message}
        />
        <div className="mb-3">
          <ImageUploadComponent onImageSelect={handleImageSelect} />
        </div>
        <Input
          placeholder="Link to purchase product"
          label="Action Link"
          {...register("action_link", {
            required: "Action Link is required",
          })}
          error={errors?.action_link?.message}
        />

        <Button className="w-full" type="submit" loading={isPending}>
          Proceed
        </Button>
      </form>
    </div>
  );
};
