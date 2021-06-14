import { Document } from 'mongoose';

export interface Note extends Document {
  readonly title: string;
  readonly isFav: boolean;
  readonly date: Date;
}
