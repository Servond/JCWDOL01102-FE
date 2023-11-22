import { VStack } from "@chakra-ui/react";
import SubProfileInfo from "../../molecules/MyDetails/SubProfileInfo";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";
import { useEffect } from "react";
import { fetchUserById_ } from "../../../app/redux/slice/User/user";

export default function DetailProfile() {
  const dispatch = useDispatch<AppDispatch>();
  const user2 = useSelector((state: RootState) => state.user2);
  useEffect(() => {
    dispatch(fetchUserById_(1));
  }, [dispatch]);

  if (user2.status === "pending" || user2.status === "idle")
    return <p>Loading...</p>;

  return (
    <VStack>
      <SubProfileInfo
        label={"Nama Lengkap"}
        value={user2?.user?.name ?? "a"}
        field='name'
      />
      <SubProfileInfo
        label={"Email"}
        value={user2?.user?.email ?? ""}
        field='email'
      />
      <SubProfileInfo
        label={"Nomor Handphone"}
        value={user2?.user?.phoneNumber ?? ""}
        field='phoneNumber'
      />
      <SubProfileInfo
        label={"Tanggal Lahir"}
        value={user2?.user?.birthdate ?? "Belum diisi"}
        field='birthdate'
      />
      <SubProfileInfo
        field='refferalCode'
        label={"Refferal Code"}
        value={user2?.user?.referralCode ?? "Belum diisi"}
        copyIcon={true}
      />
    </VStack>
  );
}
