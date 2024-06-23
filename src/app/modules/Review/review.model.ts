import { Schema } from "mongoose";

const ReviewSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
  },
});
