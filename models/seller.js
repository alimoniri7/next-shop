import { Schema , model, models } from "mongoose";

const sellerSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    shopName: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: ()=> Date.now(),
        immutable: true
    },

})

const Seller = models.seller || model("seller" , sellerSchema)

export default Seller