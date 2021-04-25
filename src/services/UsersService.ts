import { getCustomRepository, Repository } from "typeorm"
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository"

class UsersService {

    private usersRepository: Repository<User>;

    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository)
    }

    async findByEmail(email: string) {
        return await this.usersRepository.findOne({ email })
     }

    async create( email: string) {
    
        //verificar se usuario existe

        const userExists = await this.usersRepository.findOne({
            email
        })

        //se existir, retornar usuário

        if(userExists){
            return userExists;
        }

        // se não existir, salvar no DB novo usuário

        const user = this.usersRepository.create({email});

        await this.usersRepository.save(user);

        return user;
       
    }

}

export { UsersService };