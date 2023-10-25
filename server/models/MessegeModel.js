import { mongoose } from "mongoose";
const { Schema } = mongoose;

const messegeSchema = new Schema({
  name: { type: String, required: true },
  text: {
    type: String,
    required: true,
  },
  date_created: {
    type: Date,
    default: () => Date.now(),
  },
  upvotes: {
    type: Number,
    default: 0,
  },
});
const MessegeModel = mongoose.model("Messege", messegeSchema);

export { MessegeModel };
