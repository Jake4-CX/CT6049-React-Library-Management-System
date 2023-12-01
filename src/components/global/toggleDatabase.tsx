import { Switch } from '@headlessui/react'
import { useEffect, useState } from 'react';
import { removeLocalStoredTokens, removeLocalStoredUser } from '../../api/authentication';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { setTokens, setUser } from '../../redux/features/user-slice';
import { useNavigate } from 'react-router-dom';


const ToggleDatabaseComponent: React.FC = () => {

  const [database, setDatabase] = useState<"MongoDB" | "SQL">(localStorage.getItem("databaseType") as "MongoDB" | "SQL" || "MongoDB");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {

    if (localStorage.getItem("databaseType") === database) return;
    
    localStorage.setItem("databaseType", database);

    removeLocalStoredUser();
    removeLocalStoredTokens();
    dispatch(setUser(undefined));
    dispatch(setTokens(undefined));

    navigate(0);

  }, [database, dispatch, navigate]);


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