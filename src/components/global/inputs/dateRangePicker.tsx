
type DateRangePickerProps = {
  date: {startDate: Date, endDate: Date},
  onDateChange: (date: {startDate: Date, endDate: Date}) => void
}

const DateRangePickerComponent: React.FC<DateRangePickerProps> = (props) => {

  return (
    <>
      <div className="flex flex-row justify-end items-center my-2 mr-2">
        <form className="flex flex-row items-center space-x-2">
          {/* DatePicker input (startDate) */}
          <input
            type="date"
            value={props.date.startDate.toISOString().split("T")[0]}
            onChange={(e) => handleStartDateChange(new Date(e.target.value))}
            className="w-28 h-8 rounded-md bg-gray-200 text-gray-600 text-sm font-medium tracking-tight px-1 border-[1px] focus:border-gray-300 outline-none transition-all cursor-pointer"
            max={props.date.endDate.toISOString().split("T")[0]}
            title="Start Date"
          />

          {/* To */}
          <span className="text-gray-500">to</span>

          {/* DatePicker input (endDate) */}
          <input
            type="date"
            value={props.date.endDate.toISOString().split("T")[0]}
            onChange={(e) => handleEndDateChange(new Date(e.target.value))}
            className="w-28 h-8 rounded-md bg-gray-200 text-gray-600 text-sm font-medium tracking-tight px-1 border-[1px] focus:border-gray-300 outline-none transition-all cursor-pointer"
            min={props.date.startDate.toISOString().split("T")[0]}
            title="End Date"
          />
        </form>
      </div>
    </>
  )

  async function handleStartDateChange(startDate: Date) {
    props.onDateChange({ startDate: startDate, endDate: props.date.endDate});
  }

  async function handleEndDateChange(endDate: Date) {
    props.onDateChange({ startDate: props.date.startDate, endDate: endDate });
  }
}

export default DateRangePickerComponent;