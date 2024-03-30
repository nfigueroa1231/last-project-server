const { model, Schema } = require("mongoose");
const AccountSchema = new Schema(
    {
        accountNumber: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        currentBalance: {
            type: Number, 
            required: true
        },
        // phone: Number,

        // amount: {
        //     type: Number,
        //     required: true
        // },
        // adress: {
        //     type: String,
        //     required: true
        // },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        provider: {
            type: Schema.Types.ObjectId,
            ref: "Provider"
        },
        // dueDate: {
        //     type: Date,
        //     required: true
        // }

    },
    {
        timestamps: true,
    }
);
module.exports = model("Account", AccountSchema);



