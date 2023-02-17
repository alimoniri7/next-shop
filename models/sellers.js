import { Schema , model, models } from "mongoose";

const sellerSchema = new Schema({
    name: String,
    // firstName: String,
    // lastName: String,
    // companyName: String,
    // age: Number,
    // profession: String,
    // joinDate: String,
})

const Seller = models.seller || model("seller" , sellerSchema)

export default Seller