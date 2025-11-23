import mongoose from "mongoose";

const ProposalSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  related: { type: String, required: true, enum: ["Lead", "Customer"] },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  date: { type: Date, default: Date.now },
  openTill: { type: Date, required: true },
  discountType: { type: String, enum: ['Before Tax', 'After Tax', 'No Discount'], default: 'No Discount' },
  status: { type: String, enum: ['Draft', 'Sent', 'Open', 'Revised', 'Declined', 'Accepted'], default: 'Draft' },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zipCode: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  sendtoclient : {type : Boolean,required : true},
  packages: [{
    id : {type : mongoose.Schema.Types.ObjectId,required : true,ref:"TravelPackage"},
  }],

  subTotal: { type: Number, required: true },
  discount: { type: String, required: true },
  total: { type: String, required: true }
}, { timestamps: true });

export const ProposalModel = mongoose.model("Proposal", ProposalSchema);
