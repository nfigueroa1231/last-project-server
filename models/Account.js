const { model, Schema } = require("mongoose");
const AccountSchema = new Schema(
    {
        accountType: {
            type: String,
            required: false
            
        },

        activeCollProcFlag: {
            type: String,
            required: false
        },

        billRouteType: {
            type: String,
            required: false,
        },
        cashOnlyFlag: {
            type: String,
            required: false,
        },
        delinquentAmount: {
            type: Number,
            required: false
        },
        email: {
            type: String,
            required: false
        },
        failedOver: {
            type: String,
            required: false
        },
        lastBillAmount: {
            type: Number,
            required: false
        },
        lastBillDate: {
            type: String,
            required: false
        },
        lastBillDueDate: {
            type: String,
            required: false
        },
        lastPayAmount: {
            type: Number,
            required: false
        },
        lastPayDate: {
            type: String,
            required: false
        },
        nextBillDate: {
            type: String,
            required: false
        },
        accountNumber: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: false
        },
        currentBalance: {
            type: Number,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        providerId: {
            type: Schema.Types.ObjectId,
            ref: "Provider"
        },
    },
    {
        timestamps: true,
    }
);
module.exports = model("Account", AccountSchema);


//multiple accounts










