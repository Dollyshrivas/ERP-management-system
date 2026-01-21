const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        employeeName: { type: String, require: true},
        amount: { type: String, require: true},
        paymentMode: { type: String, require:true},
        remarks: {type: String, require: true},
    },
    {timestamps:true}
);

module.exports = mongoose.model("paymentschema", paymentSchema)