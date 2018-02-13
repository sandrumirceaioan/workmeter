import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
      type: String,
      required: true
  },
  userName: {
      index: {
          unique: true
      },
      type: String,
      required: true
  },
  emailAddress: {
      index: {
          unique: true
      },
      type: String,
      required: true
  },
  invitationCode: {
      type: String,
      required: true
  },
  password: {
      type: String,
      required: true
  },
  userType: {
      type: String,
      required: true
  },
  userStatus: {
      type: Number
  },
  token: {
      type: String
  }
});
