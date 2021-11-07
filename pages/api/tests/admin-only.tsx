// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import userAuth from "../middleware/userAuth";
import roleAuth from "../middleware/roleAuth";
import { Roles } from '../../../lib/data/roles';
function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.status(200).json({ name: 'A protected Admin only API ROUTE' })
}

export default userAuth(roleAuth([Roles.Admin],handler)); // This API Route requires authentication and authorization