import { Button, Input } from "@src/components/ui";
import { useAuthStore } from "@src/lib/state";
import { useUpdateUser } from "@src/services/queries/useProfile";
import { UserProfileDTO } from "@src/types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const EditProfile = () => {
  const handleFileInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
  };
  const { fullname, username, bio } = useAuthStore();
  const { setValue, register, handleSubmit } = useForm<UserProfileDTO>();

  useEffect(() => {
    if (fullname && bio) {
      setValue("fullname", fullname ?? "");
      setValue("username", username ?? "");
      setValue("bio", bio ?? "");
    }
  }, [fullname, username]);

  const [isEditing, setIsEditing] = useState(false);
  const { mutate, isPending } = useUpdateUser();

  const handleUpdateInfo = async (data: UserProfileDTO) => {
    mutate(data);
  };

  return (
    <div className="flex flex-col max-w-4xl mt-10 md:flex-row justify-between">
      <div className="max-w-[100%] md:w-[50%]">
        <div className="mb-5">
          {isEditing ? (
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          ) : (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
        </div>
        <form onSubmit={handleSubmit(handleUpdateInfo)}>
          <Input
            placeholder={"What's your full name?"}
            label="Full Name"
            {...register("fullname", { disabled: !isEditing })}
          />
          <Input
            placeholder={"What's your nick name?"}
            label="Nick Name"
            {...register("username", { disabled: !isEditing })}
          />
          <div>
            <label htmlFor="Bio">Bio</label>
            <textarea
              placeholder="Tell us about yourself"
              {...register("bio", { disabled: !isEditing })}
              className="border border-borderColor rounded-lg w-full py-4 px-3 text-sm leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          {isEditing && (
            <Button type="submit" disabled={isPending} className="w-full mt-5">
              Update information
            </Button>
          )}
        </form>
      </div>
      <div className="mt-10 md:mt-0">
        <label htmlFor="profile" className="cursor-pointer">
          <img
            src="https://plus.unsplash.com/premium_photo-1706430115968-e4524fc70835?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Profile"
            className="rounded-full w-52 h-52"
          />
        </label>
        <input
          type="file"
          id="profile"
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            handleFileInputChange(e);
          }}
        />
      </div>
    </div>
  );
};
