import { Switch } from '@headlessui/react'
import { useEffect, useState } from 'react';


const ToggleDatabaseComponent: React.FC = () => {

  const [database, setDatabase] = useState<"MongoDB" | "SQL">(localStorage.getItem("databaseType") as "MongoDB" | "SQL" || "MongoDB");

  useEffect(() => {
    localStorage.setItem("databaseType", database);
  }, [database]);


  return (
    <div className='w-full flex justify-end mt-3 lg:w-fit lg:mt-0 lg:justify-normal'>
      <Switch
        checked={database === "MongoDB"}
        onChange={() => setDatabase(database === "MongoDB" ? "SQL" : "MongoDB")}
        className={`${database === "MongoDB" ? 'bg-teal-900' : 'bg-teal-700'}
      relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-0`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${database === "MongoDB" ? 'translate-x-6' : 'translate-x-1'}
        inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </Switch>
    </div>
  )
}

export default ToggleDatabaseComponent;