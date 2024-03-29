const { model, Schema } = require("mongoose");
const AccountSchema = new Schema(
    {
        accountNumber: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true
        },
        name: {
            type: String,
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



