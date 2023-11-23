import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/redux/store";
import { verifyUser } from "../app/redux/slice/userSlicer";
import ThankYou from "../components/molecules/UserVerification/ThankYou";
import ScreenLoading from "../components/molecules/UserVerification/ScreenLoading";

export default function UserVerification() {
  const params = useParams();
  const id = parseInt(params.id!);
  const dispatch = useDispatch<AppDispatch>();
  const [isFetch, setIsFetch] = useState<boolean>(false);
  const verifyUserResp = useSelector(
    (state: RootState) => state.user.verifyUserResp
  );

  useEffect(() => {
    if (!isFetch) {
      console.log(id);
      setIsFetch(true);
      dispatch(verifyUser(id));
    }
  }, [isFetch, dispatch, id]);

  return (
    <>
      {Object.keys(verifyUserResp!).length > 0 &&
      verifyUserResp?.statusCode === 200 ? (
        <ThankYou />
      ) : (
        <ScreenLoading />
      )}
    </>
  );
}
