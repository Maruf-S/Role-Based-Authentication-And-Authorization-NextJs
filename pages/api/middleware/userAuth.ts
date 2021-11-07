import { NextApiRequest, NextApiResponse } from "next";
import {getSession} from 'next-auth/client'
const userAuth = (next:Function) => async(  req: NextApiRequest,
    res: NextApiResponse<any>) =>{
        try {
            let session = await getSession({ req });
            if(session){
                return next(req,res,session.user);
            }
            else{
                return res.status(401).json({error:"Unauthenticated user."})
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({error:"Server error."})
        }
}

export default userAuth;