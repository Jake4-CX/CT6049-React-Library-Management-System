import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import DefaultLayout from "../../layouts/defaultLayout";
import { getAuthors } from "../../api/authors";
import { getCategories } from "../../api/categories";
import { createBook } from "../../api/books";
import { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ErrorComponent from "../../components/global/error";

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

type CreateBookPageProps = {
}

const CreateBookPage: React.FC<CreateBookPageProps> = (props) => {

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
    <DefaultLayout>
      <div className="w-full md:w-[44rem] xl:w-[56rem] space-y-3 bg-gray-200 p-4 rounded-lg">
        <div className="">
          <h1 className="text-lg font-bold">Add Book</h1>
          <p className="text-sm font-light tracking-tight">Some subheading text</p>
        </div>

        {/* Add Book Form. Requires: bookName, bookISBN, bookDescription, bookQuantity, bookAuthor(bookAuthorId), bookCategory(bookCategoryId) */}
        <div className="w-full flex flex-col">

          {
            (!bookCategories.isLoading) && (!bookAuthors.isLoading) ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <ErrorComponent errors={Object.values(errors).filter(Boolean) as FieldError[]} />
                <div className="flex flex-col space-y-1">
                  <label htmlFor="bookName" className="text-sm font-medium tracking-tight">Book Name</label>
                  <input type="text" id="bookName" className="w-full h-10 px-4 py-2 rounded-lg bg-white focus:outline-none" {...register("bookName")} />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="bookISBN" className="text-sm font-medium tracking-tight">Book ISBN</label>
                  <input type="text" id="bookISBN" className="w-full h-10 px-4 py-2 rounded-lg bg-white focus:outline-none" {...register("bookISBN")} />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="bookDescription" className="text-sm font-medium tracking-tight">Book Description</label>
                  <textarea id="bookDescription" className="w-full h-20 px-4 py-2 rounded-lg bg-white focus:outline-none" maxLength={512} {...register("bookDescription")}></textarea>
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="bookQuantity" className="text-sm font-medium tracking-tight">Book Quantity</label>
                  <input type="number" step={1} min={0} id="bookQuantity" className="w-full h-10 px-4 py-2 rounded-lg bg-white focus:outline-none" {...register("bookQuantity")} />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="bookAuthorId" className="text-sm font-medium tracking-tight">Book Author</label>
                  <select id="bookAuthor" className="w-full h-10 px-4 py-2 rounded-lg bg-white focus:outline-none" {...register("bookAuthorId")}>
                    {
                      bookAuthors.data && bookAuthors.data.map((author, index) => (
                        <option value={author.bookAuthorId} key={index}>{author.authorFirstName + " " + author.authorLastName}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="bookCategoryId" className="text-sm font-medium tracking-tight">Book Category</label>
                  <select id="bookCategory" className="w-full h-10 px-4 py-2 rounded-lg bg-white focus:outline-none" {...register("bookCategoryId")}>
                    {
                      bookCategories.data && bookCategories.data.map((category, index) => (
                        <option value={category.bookCategoryId} key={index}>{category.categoryName}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="flex flex-row justify-end space-x-2">
                  <button className="bg-green-500 hover:bg-green-600 duration-300 text-gray-100 px-3 py-1 rounded-lg text-xs md:text-sm font-medium ml-2">Add Book</button>
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
    </DefaultLayout>
  )
}

export default CreateBookPage;