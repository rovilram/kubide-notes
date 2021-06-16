import { Schema } from 'mongoose';

export const NoteSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  isFav: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
