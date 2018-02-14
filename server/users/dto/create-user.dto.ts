export class CreateUserDto  {
    firstName: string;
    lastName: string;
    userName: string;
    emailAddress: string;
    invitationCode: string;
    password: string;
    userType?: string;
    token?: string;
    team?: any
  }