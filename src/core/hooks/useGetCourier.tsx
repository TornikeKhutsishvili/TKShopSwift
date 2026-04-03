import { useEffect } from "react";
import { couriersErrorSelector, couriersLoadingSelector, couriersSelector } from "../../store/couriers/slice/couriers.slice";
import { useAppDispatch, useAppSelector } from "./useHooks";
import { getCouriers } from "../../store/couriers/thunks/couriers.thunks";

const useGetCourier = () => {
  const dispatch = useAppDispatch();
  const couriers = useAppSelector(couriersSelector);
  const loading = useAppSelector(couriersLoadingSelector);
  const error = useAppSelector(couriersErrorSelector);

  useEffect(() => {
    dispatch(getCouriers())
  }, [dispatch]);

  return { couriers, loading, error };
}

export default useGetCourier;