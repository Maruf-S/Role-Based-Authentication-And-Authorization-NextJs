// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from '.prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/db';
import { validateEmail, hashPassword } from '../../../lib/utils/auth'
type Response = {
  error: string | null,
  data: any
}
type SignUpReq = { email:string, password:string ,roles:Array<number>}

export default async function handler(

  req: NextApiRequest,
  res: NextApiResponse<Response | null | undefined>, next: any

) {
  if (req.method == "POST") {
    let { email, password ,roles }:SignUpReq = req.body;
    return Promise.resolve().then(async function () {
      if (!await validateEmail(email)) {
        return res.status(200).json({ error: "This email is already taken.", data: {} })
      }
      let user = await prisma.user.create({
        include: {
          roles: {
            include:{
              role:true
            }
          },
        },
        data: {
          email, password: await hashPassword(password),
          roles: {
            create: [
              ...roles.map(roleId =>{
                return {
                  assignedBy: "Assigner FullName",
                  role: {
                    connect: {
                      id: roleId
                    }
                  }
                }
              }),
            ]
          },
        }
      });
      res.status(200).json({ error: null, data: user })
    }).catch(next)
  }

  return res.status(405).send(null);
}
