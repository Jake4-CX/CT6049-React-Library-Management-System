import { Transition } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../../../api/categories";
import { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import ErrorComponent from "../../global/error";
import { FaTimes } from "react-icons/fa";

type FormValues = {
  categoryName: string,
  categoryDescription: string
}

const schema = z.object({
  categoryName: z.string()
    .min(1, { message: "Category name must be at least 1 character long" })
    .max(32, { message: "Category name must be at most 32 characters long" }),
  categoryDescription: z.string()
    .max(512, { message: "Category description must be at most 512 characters long" })
});

type CreateCategoryModalProps = {
  isOpen: boolean,
  closeCallback: (value: boolean) => void
}

const CreateCategoryModal: React.FC<CreateCategoryModalProps> = (props) => {

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationKey: "addCategory",
    mutationFn: createCategory,
    onSuccess: (data: AxiosResponse) => {
      toast.success("Successfully created category!");
      props.closeCallback(false);
      console.log("Success: ", data);

      queryClient.invalidateQueries([`bookCategories`]);
      queryClient.invalidateQueries([`bookCategoryStatistics`]);
    },
    onError: (error: AxiosError) => {
      toast.error("Error creating category!");
      console.error("Error creating category: ", error);
    }
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("Form data: ", data);

    mutate({
      categoryName: data.categoryName,
      categoryDescription: data.categoryDescription
    });
  }

  return (
    <Transition
      show={props.isOpen}
      enter="transition-opacity duration-150"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="flex fixed inset-0 z-10 justify-center items-center bg-gray-900/5 backdrop-blur-sm"
    >
      <div onClick={() => props.closeCallback(false)} className="fixed inset-0"></div>
      <Transition.Child
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="shadow-lg w-11/12 h-fit md:w-[32rem] z-20 text-gray-500 rounded-xl"
      >

        <div className="bg-gray-50 px-6 flex rounded-t-xl">
          <div className="w-full flex justify-between items-center mb-3 mt-4">
            <h1 className="text-base font-medium leading-none text-gray-700">Create Category</h1>
            <button onClick={() => (props.closeCallback(false))}>
              <FaTimes className="h-5 w-5 text-[#6d6f71] hover:text-[#6d6f71]/80 opacity-75 duration-300" />
            </button>
          </div>
        </div>

        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div className="sm:mt-0 sm:text-left w-full">
            <div className="mt-2">

              {
                <form className="w-full space-y-3">
                  <ErrorComponent errors={Object.values(errors).filter(Boolean) as FieldError[]} />
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="categoryName" className="text-sm font-medium tracking-tight">Category Name</label>
                    <input type="text" id="categoryName" className="w-full h-10 px-4 py-2 rounded-lg bg-gray-50 border-gray-100 border-[1px] focus:border-gray-200 outline-none focus:outline-none transition-all" {...register("categoryName")} />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="categoryDescription" className="text-sm font-medium tracking-tight">Category Description</label>
                    <textarea id="categoryDescription" className="w-full h-36 px-4 py-2 rounded-lg bg-gray-50 border-gray-100 border-[1px] focus:border-gray-200 outline-none focus:outline-none transition-all" maxLength={512} {...register("categoryDescription")}></textarea>
                  </div>
                </form>
              }

            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-xl">
          <button onClick={handleSubmit(onSubmit)} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none transition duration-300 sm:ml-3 sm:w-auto sm:text-sm">
            {
              isLoading ?
                <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                : (
                  "Create Category"
                )
            }
          </button>
          <button onClick={() => props.closeCallback(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none transition duration-300 sm:mt-0 sm:w-auto sm:text-sm">
            Cancel
          </button>
        </div>

      </Transition.Child>
    </Transition>
  )
}

export default CreateCategoryModal;