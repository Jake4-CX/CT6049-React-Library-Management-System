import { Transition } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { HiTrash } from "react-icons/hi";
import { z } from "zod";
import { getAuthors } from "../../../api/authors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategories } from "../../../api/categories";
import { AxiosError, AxiosResponse } from "axios";
import { createBook } from "../../../api/books";
import toast from "react-hot-toast";
import ErrorComponent from "../../global/error";
import { FaTimes } from "react-icons/fa";

type FormValues = {
  bookName: string,
  bookISBN: string,
  bookDescription: string,
  bookQuantity: number,
  bookAuthorId: number,
  bookCategoryId: number
}

const schema = z.object({
  bookName: z.string()
    .min(1, "Book name is required")
    .max(64, "Book name must be less than 64 characters long."),
  bookISBN: z.string()
    .min(1, "Book ISBN is required")
    .max(32, "Book ISBN must be less than 32 characters long."),
  bookDescription: z.string()
    .min(1, "Book description is required")
    .max(512, "Book description must be less than 512 characters long."),
  bookQuantity: z.coerce.number()
    .min(0, "Book quantity must be greater than or equal to 0"),
  bookAuthorId: z.string()
    .min(1, "Book author is required"),
  bookCategoryId: z.string()
    .min(1, "Book category is required")
});

type CreateBookModalProps = {
  isOpen: boolean,
  closeCallback: (value: boolean) => void
}

const CreateBookModal: React.FC<CreateBookModalProps> = (props) => {

  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const bookAuthors = useQuery({
    queryKey: ["bookAuthors"],
    queryFn: async () => {

      const cache: BookAuthor[] | undefined = queryClient.getQueryData(["bookAuthors"]);

      if (cache) {
        return cache;
      }

      const bookAuthors = ((await getAuthors()).data).authors as BookAuthor[];

      return bookAuthors;
    }
  });

  const bookCategories = useQuery({
    queryKey: ["bookCategories"],
    queryFn: async () => {

      const cache: BookCategory[] | undefined = queryClient.getQueryData(["bookCategories"]);

      if (cache) {
        return cache;
      }

      const bookCategories = ((await getCategories()).data).categories as BookCategory[];

      return bookCategories;
    }
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: "createBook",
    mutationFn: createBook,
    onSuccess: (data: AxiosResponse) => {
      toast.success("Successfully created book!");
      props.closeCallback(false);
      console.log("Success: ", data);
    },
    onError: (error: AxiosError) => {
      toast.error("Error creating book!");
      console.error("Error creating book: ", error);
    }
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("Form data: ", data);

    mutate({
      bookName: data.bookName,
      bookISBN: data.bookISBN,
      bookDescription: data.bookDescription,
      bookQuantity: data.bookQuantity,
      bookAuthorId: data.bookAuthorId,
      bookCategoryId: data.bookCategoryId,
      bookPublishedDate: new Date()
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
            <h1 className="text-lg font-medium leading-none text-gray-700">Create Book</h1>
            <button onClick={() => (props.closeCallback(false))}>
              <FaTimes className="h-5 w-5 text-[#6d6f71] hover:text-[#6d6f71]/80 opacity-75 duration-300" />
            </button>
          </div>
        </div>

        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div className="sm:mt-0 sm:text-left w-full">
            <div className="mt-2">

              {
                (!bookCategories.isLoading) && (!bookAuthors.isLoading) ? (
                  <form className="w-full space-y-3">
                    <ErrorComponent errors={Object.values(errors).filter(Boolean) as FieldError[]} />
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="bookName" className="text-sm font-medium tracking-tight">Book Name</label>
                      <input type="text" id="bookName" className="w-full h-10 px-4 py-2 rounded-lg bg-gray-50 border-gray-100 border-[1px] focus:border-gray-200 outline-none focus:outline-none transition-all" {...register("bookName")} />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="bookISBN" className="text-sm font-medium tracking-tight">Book ISBN</label>
                      <input type="text" id="bookISBN" className="w-full h-10 px-4 py-2 rounded-lg bg-gray-50 border-gray-100 border-[1px] focus:border-gray-200 outline-none focus:outline-none transition-all" {...register("bookISBN")} />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="bookDescription" className="text-sm font-medium tracking-tight">Book Description</label>
                      <textarea id="bookDescription" className="w-full h-20 px-4 py-2 rounded-lg bg-gray-50 border-gray-100 border-[1px] focus:border-gray-200 outline-none focus:outline-none transition-all" maxLength={512} {...register("bookDescription")}></textarea>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="bookQuantity" className="text-sm font-medium tracking-tight">Book Quantity</label>
                      <input type="number" step={1} min={0} id="bookQuantity" className="w-full h-10 px-4 py-2 rounded-lg bg-gray-50 border-gray-100 border-[1px] focus:border-gray-200 outline-none focus:outline-none transition-all" {...register("bookQuantity")} />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="bookAuthorId" className="text-sm font-medium tracking-tight">Book Author</label>
                      <select id="bookAuthor" className="w-full h-10 px-4 py-2 rounded-lg bg-gray-50 border-gray-100 border-[1px] focus:border-gray-200 outline-none focus:outline-none transition-all" {...register("bookAuthorId")}>
                        {
                          bookAuthors.data && bookAuthors.data.map((author, index) => (
                            <option value={author.bookAuthorId} key={index}>{author.authorFirstName + " " + author.authorLastName}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label htmlFor="bookCategoryId" className="text-sm font-medium tracking-tight">Book Category</label>
                      <select id="bookCategory" className="w-full h-10 px-4 py-2 rounded-lg bg-gray-50 border-gray-100 border-[1px] focus:border-gray-200 outline-none focus:outline-none transition-all" {...register("bookCategoryId")}>
                        {
                          bookCategories.data && bookCategories.data.map((category, index) => (
                            <option value={category.bookCategoryId} key={index}>{category.categoryName}</option>
                          ))
                        }
                      </select>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="animate-pulse flex flex-col space-y-1">
                      <div className="h-10 bg-gray-300 rounded-lg"></div>
                      <div className="h-10 bg-gray-300 rounded-lg"></div>
                      <div className="h-20 bg-gray-300 rounded-lg"></div>
                      <div className="h-10 bg-gray-300 rounded-lg"></div>
                      <div className="h-10 bg-gray-300 rounded-lg"></div>
                      <div className="h-10 bg-gray-300 rounded-lg"></div>
                    </div>
                  </>
                )
              }

            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-xl">
          <button onClick={handleSubmit(onSubmit)} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none transition duration-300 sm:ml-3 sm:w-auto sm:text-sm">
            Create Book
          </button>
          <button onClick={() => props.closeCallback(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none transition duration-300 sm:mt-0 sm:w-auto sm:text-sm">
            Cancel
          </button>
        </div>

      </Transition.Child>
    </Transition>
  )
}

export default CreateBookModal;