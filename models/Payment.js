const { model, Schema } = require("mongoose");
const PaymentSchema = new Schema(
    {
        bankName: {
            type: String,
            required: true
        },
        bankAccount: {
            type: Number,
            required: true
        },
        banckRouting: {
            type: Number,
            required: true
        },
        bankType: {
            type: String,
            required: true
        },
        accountHolder: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    },
    {
        timestamps: true,
    }
);
module.exports = model("Payment", PaymentSchema);



