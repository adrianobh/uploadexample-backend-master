import Address from "../models/banco/Address";

class AddressRepository {
  async findUser() {
    return Address.findAll({});
  }
  async store(data) {
    const { city_id, street, district, complement, zip_code } = data;
    return Address.create({
      city_id,
      street,
      district,
      complement,
      zip_code,
    });
  }

  async update(data) {
    const { city_id, street, district, complement, zip_code, address_id } =
      data;
    return Address.update(
      {
        city_id,
        street,
        district,
        complement,
        zip_code,
      },
      {
        where: {
          id: address_id,
        },
      }
    );
  }
}
export default new AddressRepository();
