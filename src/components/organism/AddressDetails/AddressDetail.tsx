import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

export default function AddressDetail() {
  return (
    <FormControl>
      <FormLabel>Nama Penerima</FormLabel>
      <Input type='text' placeholder='Nama Penerima' name='receiverName' />
      <FormLabel>Nomor Handphone</FormLabel>
      <Input type='text' placeholder='Nomor Handphone' name='phoneNumber' />
      <FormLabel>Label Alamat</FormLabel>
      <Input type='text' placeholder='Label Alamat' name='addressLabel' />
      <FormLabel>Provinsi</FormLabel>
      <Input type='text' placeholder='Provinsi' name='province' />
      <FormLabel>Kota/Kabupaten</FormLabel>
      <Input type='text' placeholder='Kota/Kabupaten' name='city' />
      <FormLabel>Alamat Lengkap</FormLabel>
      <Input type='text' placeholder='Alamat Lengkap' name='address' />
      <Checkbox name='isDefault'>Jadikan Alamat Utama</Checkbox>

      <Checkbox name='agree'>
        Saya menyetujui{" "}
        {
          <Text color='primaryColor' display={"inline"}>
            Syarat & Ketentuan
          </Text>
        }{" "}
        serta Kebijakan Privasi pengaturan alamat
      </Checkbox>
      <Button width={"100%"} my={"15px"}>
        Simpan Alamat
      </Button>
    </FormControl>
  );
}
