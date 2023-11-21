import { createSlice } from "@reduxjs/toolkit";

interface Address {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  isDefault: boolean;
  addressName: string;
}

interface AddressListState {
  addressList: Address[];
  loading: boolean;
  error: string;
}

const addressList: Address[] = [
  {
    id: 1,
    name: "John Doe",
    address:
      "Bulaksumur, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281",
    phoneNumber: "123-456-7890",
    isDefault: true,
    addressName: "Home",
  },
  {
    id: 2,
    name: "Jane Smith",
    address:
      "Street: Jl Denai 21 B, Sumatera Utara, City: Sumatera Utara, State/province/area: Medan, Phone number: 0-61-735-2139, Zip code: 20226, Country calling code: +62, Country: Indonesia",
    phoneNumber: "555-123-4567",
    isDefault: false,
    addressName: "Work",
  },
  {
    id: 3,
    name: "Alice Johnson",
    address:
      "Bulaksumur, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281",
    phoneNumber: "444-555-6666",
    isDefault: false,
    addressName: "Other",
  },
  {
    id: 4,
    name: "Bob Brown",
    address:
      "Bulaksumur, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281",
    phoneNumber: "777-888-9999",
    isDefault: false,
    addressName: "Vacation Home",
  },
  {
    id: 5,
    name: "Eve Doe",
    address:
      "Bulaksumur, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281",
    phoneNumber: "111-222-3333",
    isDefault: false,
    addressName: "Cottage",
  },
];

const initialState: AddressListState = {
  addressList: addressList,
  loading: false,
  error: "",
};

const addressListSlice = createSlice({
  name: "addressList",
  initialState,
  reducers: {},
});

export default addressListSlice.reducer;
