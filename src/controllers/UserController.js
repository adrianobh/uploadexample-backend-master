import UserRepository from "../repositories/UserRepository";
import AddressRepository from "../repositories/AddressRepository";
import RoleRepository from "../repositories/RoleRepository";

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
class UserController {
  async index(req, res) {
    const { email, password } = req.body;
    try {
      const data = await UserRepository.findUser({ email, password });
      if (data) {
        return res.status(200).json({
          message: "Usuário encontrado com sucesso",
          data,
        });
      } else {
        return res
          .status(200)
          .json({ message: "Não existe nenhum usuarios cadastro" });
      }
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Não foi possivel encontrar um usuário" });
    }
  }

  async show(req, res) {
    const { id } = req.params;
    try {
      const data = await UserRepository.findByPk(id);
      if (data) {
        return res.status(200).json({
          message: "Usuário encontrado com sucesso",
          data,
        });
      }
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Não foi possivel encontrar um usuário" });
    }
  }

  async findAllPagination(req, res) {
    const { pageSize, currentPage, globalFilter } = req.query;
    try {
      const data = await UserRepository.findAllUsers({
        pageSize,
        currentPage,
        globalFilter,
      });
      if (data) {
        return res.status(200).json({
          message: "Usuário encontrado com sucesso",
          data,
        });
      } else {
        return res
          .status(200)
          .json({ message: "Não existe nenhum usuarios cadastro" });
      }
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Não foi possivel encontrar um usuário" });
    }
  }

  async LoginGoogle(req, res) {
    try {
      const { tokenId } = req.body;
      const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.CLIENT_ID,
      });
      const { name, email } = ticket.getPayload();

      const roleUser = await RoleRepository.findByName("Usuario");
      const user = await UserRepository.findOrCreate({
        email,
        name,
        role_id: roleUser.id,
      });
      return res.status(201).json({ user });
    } catch (err) {
    }
  }

  async create(req, res) {
    const {
      name,
      email,
      password,
      role_id,
      city_id,
      street,
      district,
      complement,
      zip_code,
    } = req.body;
    try {
      const findUser = await UserRepository.findByEmail(email);
      if (!findUser) {
        let createAddres = null;
        if (city_id || street || district || complement || zip_code) {
          createAddres = await AddressRepository.store({
            city_id,
            street,
            district,
            complement,
            zip_code,
          });
        }

        const data = await UserRepository.store({
          name,
          email,
          password,
          address_id: createAddres && createAddres.id ? createAddres.id : null,
          role_id,
        });
        if (data) {
          return res
            .status(200)
            .json({ message: "Usuário cadastrado com sucesso", data });
        }
      } else {
        return res.status(200).json({
          error: true,
          message: "Já existe um usuário com esse email cadastrado.",
        });
      }
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Não foi possivel cadastrar um usuários" });
    }
  }

  async update(req, res) {
    const {
      name,
      email,
      role_id,
      city_id,
      street,
      district,
      complement,
      zip_code,
      address_id,
    } = req.body;

    const { id } = req.params;
    try {
      let createAddres = null;
      if(address_id){
        if (city_id || street || district || complement || zip_code && address_id) {
          createAddres = await AddressRepository.update({
            city_id,
            street,
            district,
            complement,
            zip_code,
            address_id,
          });
        }
      }
        
      if(!address_id){
        if (city_id || street || district || complement || zip_code && address_id) {
          createAddres = await AddressRepository.store({
            city_id,
            street,
            district,
            complement,
            zip_code,
          });
        }
      }
      let data = [];
      if(createAddres && createAddres.id){
        data = await UserRepository.update({
          name,
          email,
          role_id,
          address_id: createAddres.id,
          id,
        });
      }else {
        data = await UserRepository.update({
          name,
          email,
          role_id,
          id,
        });
      }

        return res
          .status(200)
          .json({ message: "Usuário editado com sucesso", data });
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Não foi possivel cadastrar um usuários" });
    }
  }

  async updatePassword(req, res) {
    const { password } = req.body;
    const { id } = req.params;
    try {
      const data = await UserRepository.updatePassword({
        password,
        id,
      });
      if (data) {
        return res
          .status(200)
          .json({ data, message: "Usuário editado com sucesso", data });
      }
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Não foi possivel cadastrar um usuários" });
    }
  }

  async delete(req, res) {
    // Pegando id pelo parametros
    const { id } = req.params;
    try {
      // Chamanda a função destroy dentro do repositorio para exluir o status
      await UserRepository.destroy(id);

      return res.status(201).json({
        message: "Usuário deletado com sucesso",
        data: {},
      });
    } catch (err) {
      return res.status(401).json({
        message: "Não foi possivel deletar um usuário",
      });
    }
  }

  async findUserByRole(req, res) {
    const { role } = req.query;
    try {
      const data = await UserRepository.findUserRole({ role });
      if (data) {
        return res.status(200).json({
          message: "Usuários encontrado com sucesso",
          data,
        });
      } else {
        return res
          .status(200)
          .json({ message: "Não existe nenhum usuarios cadastro" });
      }
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Não foi possivel encontrar um usuário" });
    }
  }
}
export default new UserController();
