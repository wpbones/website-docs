import { NextApiRequest, NextApiResponse } from "next";
import pack from "../../package.json";

type Data = {
  version?: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ version: pack.version });
};
