import * as mongoose from 'mongoose';

  export interface Workmeter extends mongoose.Document {
    workmeterTask: string;
    workmeterDuration: number;
    workmeterStoped: Date;
    created: Number;
    createdBy: string;
  }