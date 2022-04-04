import User from "../models/banco/User";
import Role from "../models/banco/Role";
import Address from "../models/banco/Address";
import City from "../models/banco/City";
import paginate from "../helpers/paginate";
import { Op } from "sequelize";

class UserRepository {
  async findOrCreate(data) {
    const { name, email, role_id } = data;
    return User.findOrCreate({
      where: { email },
      attributes: ["id", "name", "email", "role_id", "address_id"],
      include: [
        {
          model: Address,
          as: "address",
          include: {
            model: City,
            as: "city",
          },
        },
        {
          model: Role,
          as: "role",
        },
      ],
      defaults: {
        name,
        email,
        role_id,
        password: `${email}#orapronobis`,
      },
    });
  }
  async findUser(data) {
    const { email, password } = data;
    return User.findOne({
      attributes: ["id", "name", "email", "role_id", "address_id"],
      include: [
        {
          model: Address,
          as: "address",
          include: {
            model: City,
            as: "city",
          },
        },
        {
          model: Role,
          as: "role",
        },
      ],
      where: {
        email,
        password,
      },
    });
  }

  async findUserRole(data) {
    const { role } = data;
    return User.findAll({
      attributes: ["id", "name"],
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["id", "permission"],
          where: {
            permission: role,
          },
        },
      ],
    });
  }

  async findByEmail(data) {
    return User.findOne({
      attributes: ["name", "email"],
      where: {
        email: data,
      },
    });
  }

  async findByPk(id) {
    return await User.findByPk(id, {
      attributes: ["name", "email"],
      include: [
        {
          model: Address,
          as: "address",
          include: {
            model: City,
            as: "city",
          },
        },
        {
          model: Role,
          as: "role",
        },
      ],
    });
  }

  async findAllUsers(data) {
    const { pageSize = 10, currentPage = 1, globalFilter } = data;
    let where = {};
    if (globalFilter && globalFilter !== null) {
      where = {
        [Op.or]: {
          name: {
            [Op.like]: `${globalFilter}%`,
          },
          email: {
            [Op.like]: `${globalFilter}%`,
          },
        },
      };
    }
    const totalRows = await User.count({ where });
    const response = await User.findAll({
      attributes: ["id", "name", "email", "role_id"],
      include: {
        model: Role,
        as: "role",
      },
      where,
      ...paginate({ currentPage, pageSize }),
    });

    return {
      response,
      totalRows,
    };
  }
  async store(data) {
    const { email, password, name, address_id, role_id } = data;
    return User.create({
      email,
      password,
      name,
      address_id,
      role_id,
    });
  }

  async update(data) {
    const { id, email, name, role_id, address_id } = data;
    return User.update(
      {
        email,
        name,
        role_id,
        address_id: address_id && address_id
      },
      {
        where: { id },
      }
    );
  }

  async updatePassword(data) {
    const { id, password } = data;
    return await User.update(
      {
        password,
      },
      {
        where: { id },
      }
    );
  }

  async destroy(id) {
    return await User.destroy({
      where: {
        id,
      },
    });
  }
}
export default new UserRepository();
