import * as mongoose from 'mongoose';
import * as mongooseHidden from 'mongoose-hidden';

export const UsersSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userName:{
    type: String,
    unique: true
  },
  emailAddress: {
    type: String,
    unique: true
  },
  invitationCode: String,
  password: String,
  userType: String,
  userStatus: Number,
  created: {
    type: Date,
    default: new Date()
  }
}).plugin(mongooseHidden({
    defaultHidden: {password: true}
}));
