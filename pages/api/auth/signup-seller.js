import Seller from "@/models/seller";
import { hash } from "bcryptjs";

const { default: connectDB } = require("@/utils/connectDB");

const handler = async (req, res) => {
  if (req.method !== "POST") return;

  const { firstName, lastName, password, email, shopName } = req.body;
  if (!firstName || !lastName || !password || !email || !shopName)
    return res.status(400).json({ status: "failed", message: "invalid data" });

  const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (!passRegex.test(password) || !emailRegex.test(email))
    return res.status(400).json({ status: "failed", message: "invalid data hre" });

  try {
    await connectDB();
  } catch (err) {
    res
      .status(500)
      .json({ status: "failed", message: "error in connecting DB" });
  }

  const alreadyExist = await Seller.findOne({ email: email });
  if (alreadyExist)
    return res
      .status(409)
      .json({ status: "failed", message: "this user already exist" });

  const hashedPassword = await hash(password, 12);
  const newSeller = await Seller.create({email, password: hashedPassword, firstName, lastName, shopName})

  res.status(200).json({staus: 'success', message: 'seller created!', data: newSeller})
  console.log('hello');
};

export default handler;
