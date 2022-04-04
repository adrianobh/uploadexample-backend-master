import City from "../models/banco/City";

class CityRepository {
  async find(data) {
    return City.findAll();
  }
  async store(data) {
    const { city, state } = data;
    return City.create({
      city,
      state,
    });
  }
}
export default new CityRepository();
