import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './useHooks';
import {
  usersErrorSelector, usersLoadingSelector, usersSelector
} from '../../store/users/slice/users.slice';
import { getUsers } from '../../store/users/thunks/users.thunks';

const useGetUsers = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(usersSelector);
  const loading = useAppSelector(usersLoadingSelector);
  const error = useAppSelector(usersErrorSelector);

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch]);

  return { users, loading, error };
}

export default useGetUsers;