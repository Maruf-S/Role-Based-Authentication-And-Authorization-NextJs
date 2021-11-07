import { User } from ".prisma/client";
import {hash,compare} from 'bcryptjs';
import prisma from "../db"
type UserWithRolesSimplified = {
    user:User,
    roles: Array<string>
}

export async function validateEmail(email:string):Promise<boolean>{
    let user = await prisma.user.findUnique({
        where:{
            email
        }
    });
    return user? false : true;
}
export async function hashPassword(password:string):Promise<string>{
    const hashedPassword = await hash(password,12);
    return hashedPassword;
}

export async function getUserByEmail(email:string):Promise<User | null>{
    let user = await prisma.user.findUnique({
        where:{
            email
        }
    });
    return user;
}
export async function verifyPassword(lPassword:string,password:string):Promise<boolean>{
     return await compare(lPassword,password);
}
export async function getUserRolesString(id:string): Promise<Array<string>>{
    let user = await prisma.user.findUnique({
        include: {
            roles: {
              include:{
                role:true
              }
            },
          },
        where:{
            id
        },
    });
    console.log("You tried to access a user that does not exist");
    if(!user) return [];

    let roles = user.roles.map(uAndRoles =>{
        return uAndRoles.role.role;
    })
    return roles;
}
