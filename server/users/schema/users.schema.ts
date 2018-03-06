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
  token: String,
  created: String
}).plugin(mongooseHidden({
    defaultHidden: {password: true}
}));
