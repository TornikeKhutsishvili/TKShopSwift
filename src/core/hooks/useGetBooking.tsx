import { useEffect } from "react";
import { getBookings } from "../../store/booking/thunks/booking.thunks";
import { useAppDispatch, useAppSelector } from "./useHooks";
import { couriersErrorSelector, couriersLoadingSelector, couriersSelector } from "../../store/couriers/slice/couriers.slice";
import { usersSelector } from "../../store/users/slice/users.slice";

const useGetBooking = () => {
  const dispatch = useAppDispatch();
  const couriers = useAppSelector(couriersSelector);
  const users = useAppSelector(usersSelector);
  const loading = useAppSelector(couriersLoadingSelector);
  const error = useAppSelector(couriersErrorSelector);

  const courierID = couriers?.[0]?.id ?? "";
  const userID = users?.[0]?.id ?? "";

  useEffect(() => {
    if (!userID || !courierID) return;
    dispatch(getBookings({ userId: userID, courierId: courierID }));
  }, [courierID, dispatch, userID]);

  return { courierID, userID, loading, error };
}

export default useGetBooking;