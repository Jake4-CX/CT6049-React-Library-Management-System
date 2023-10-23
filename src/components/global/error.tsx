import { type FieldError } from "react-hook-form";
import { BiSolidErrorCircle } from "react-icons/bi";

type ErrorComponentProps = {
  errors: FieldError[]
}

const ErrorComponent: React.FC<ErrorComponentProps> = (props) => {

  if (props.errors.length === 0) return null;

  const { errors } = props;

  return (
    <div className="flex flex-col bg-red-500 rounded-xl p-4 space-y-3 my-4">
      <div className="flex flex-row items-center space-x-3">
        <BiSolidErrorCircle className="text-white h-6 w-6" />
        <h2 className="text-white text-sm font-bold">Error</h2>
      </div>
      <ol className="list-decimal list-inside text-white text-sm">
        {
          errors.map((error, index) => {
            return (
              <li key={index}>{error.message}</li>
            )
          })
        }
      </ol>
    </div>
  )
}

export default ErrorComponent;