import { NextApiRequest, NextApiResponse } from "next";
const roleAuth = (roles:Array<String>,next:Function) => async(  req: NextApiRequest,
    res: NextApiResponse<any>,user:any) =>{
        try {
            if(roles.some(r=> user.roles.includes(r))){
                return next(req,res);
            }
            else{
                return res.status(403).json({error:"Unauthorized."})
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({error:"Server error."})
        }
}

export default roleAuth;