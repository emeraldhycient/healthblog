import {
  Button,
  Input,
  ImageUpload as ImageUploadComponent,
  CategoryBadge,
  DashSelect,
} from "@src/components/ui";
import { useAuthStore } from "@src/lib/state";
import { useGlobalStore } from "@src/lib/state/global";
import { useCreateForum } from "@src/services/mutations";
import { useGetCategories } from "@src/services/queries";
import { CreateForum as ForumType } from "@src/types";
import { Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const CreateForum = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForumType>({ mode: "onChange" });
  const { username } = useAuthStore();

  const { data: initialCategories } = useGetCategories();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const handleImageSelect = (image: File | null) => {
    setSelectedImage(image);
  };

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

  const { isModalOpen, closeModal } = useGlobalStore();
  const { mutate, isPending, isSuccess } = useCreateForum(username);

  const onSubmit = async (data: ForumType) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("keyword", JSON.stringify(selectedCategories));
    formData.append("description", data.description);
    if (selectedImage) {
      formData.append("profile_image", selectedImage);
    }
    formData.append("maxMembers", data.maxMembers);

    mutate(formData);
  };

  // Close modal when isSuccess is true
  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess, closeModal]);

  return (
    <Modal
      className="bg-black"
      show={isModalOpen}
      dismissible
      onClose={closeModal}
    >
      <Modal.Body>
        <div className="flex my-[2rem] items-center justify-center ">
          <div className="w-full max-w-md">
            <h3 className="text-2xl md:text-center font-medium mb-4">
              Create Forum
            </h3>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <Input
                placeholder="What's the name of the forum?"
                label="Forum Name"
                {...register("title", { required: "Forum name is required" })}
                error={errors?.title?.message}
              />
              <Input
                type="number"
                placeholder="How many users can it contain?"
                label="Number of Users"
                {...register("maxMembers", {
                  required: "Number of users is required",
                  valueAsNumber: true,
                })}
                error={errors?.maxMembers?.message}
              />
              <Input
                placeholder="Write a brief description about you product"
                label="Description"
                {...register("description", {
                  required: "Description is required",
                })}
                error={errors?.description?.message}
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
              <div className="mb-3">
                <ImageUploadComponent onImageSelect={handleImageSelect} />
              </div>
              <Button className="w-full" type="submit" loading={isPending}>
                Create Now
              </Button>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
