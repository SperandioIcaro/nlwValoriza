import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import{ UsersRepositories } from "../repositories/UsersRepositories"

interface IAuthentiocateRequest{
  email:string;
  password:  string;
}
class AuthenticateUserService{
  async execute({email, password}: IAuthentiocateRequest){
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user  = await usersRepositories.findOne({
      email
    });
    if(!user){
      throw new Error("Email/Password incorrect")
    }
    const passwordMatch = await  compare(password, user.password)
    if(!passwordMatch) {
      throw new Error("Email/Password incorrect")
    }
    const token = sign({
      email : user.email
    }, "8ea132778aef3810327b3a9e65b1002a", {
      subject:   user.id,
      expiresIn: "1d"
    });
    return token;
  }
}

export{ AuthenticateUserService}