import connectDB from "@/utils/connectDB";
import Seller from "@/models/sellers";

const handler = async (req, res) => {
    try{
        await connectDB();

        if (req.method==="GET"){
            const sellers = await Seller.find()
            res.status(200).json({status: 'success', data: sellers})
            return
        }

        if (req.method === "POST"){

            const name = req.body.name;
            console.log(name)
            
            if(!name){
                res.status(300).json({ message: "your data is invalid" })
                return;
            }

            // save in DB
            try{
                const seller= new Seller({name})
                await seller.save()
            }catch(err){
                console.log(err);
                res.status(500).json({message: "problem in saving data to DB"})
                return
            }
            res.status(201).json({ message: "successfully saved in DB" })




        }
    }catch(err){

        console.log({message: 'connection failed', details: err})
    }
};

export default handler;
