export const convertToRupiah = (price: number) => {
  return price
    .toLocaleString("id-ID", {
      currency: "IDR",
      style: "currency",
    })
    .replace(",00", "");
};
