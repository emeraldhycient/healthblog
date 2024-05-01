import {
  Button,
  CategoryBadge,
  DashSelect,
  ImageUpload as ImageUploadComponent,
  Input,
} from "@src/components/ui";
import { useAuthStore, usePostContentStore } from "@src/lib/state";
import { useCreateArticle } from "@src/services/mutations";
import { useGetCategories } from "@src/services/queries";
import { CreateArticleProps } from "@src/types";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export const PublishConfirmation = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateArticleProps>({
    mode: "onChange",
  });
  const { postContent } = usePostContentStore();
  const { data: initialCategories } = useGetCategories();
  const { username } = useAuthStore();

  const { mutate, isPending } = useCreateArticle(username);

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

  const onSubmit = (data: CreateArticleProps) => {
    const formData = new FormData();
    formData.append("content", postContent);
    formData.append("category", JSON.stringify(selectedCategories));
    formData.append("title", data.title);
    if (selectedImage) {
      formData.append("cover_photo", selectedImage);
    }

    mutate(formData);
  };

  return (
    <div className="flex flex-col px-4 items-center justify-center mt-6">
      <div>
        <h3 className="font-medium mb-2 text-center">Publish Confirmation</h3>
        <p className="text-gray text-center">
          Kindly enter your post information to continue.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 w-full max-w-sm">
        <Input
          placeholder="Enter your post title"
          label="Title"
          {...register("title", { required: "Title is required" })}
          error={errors?.title?.message}
        />
        <DashSelect
          label="Category"
          placeholder={"Select Post Category"}
          error=""
          options={availableCategories}
          onChange={(e) => handleCategoryChange(e.target.value)}
        />
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
        <ImageUploadComponent onImageSelect={handleImageSelect} />
        <p className="text-gray text-[11px] mb-5 md:text-sm mt-8">
          Changes made here will affect how your story appears in public places
          like Phred’s homepage and in subscribers’ inboxes - not the contents
          of the story itself.
        </p>
        <Button className="w-full" loading={isPending} type="submit">
          Publish Now
        </Button>
      </form>
    </div>
  );
};
