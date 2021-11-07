// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import userAuth from "../middleware/userAuth";
// import {prisma} from "../../lib/db";

type Data = {
  name: string
}

function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req);
  res.status(200).json({ name: 'A protected API ROUTE' })
}

export default userAuth(handler); // This API Route requires authentication