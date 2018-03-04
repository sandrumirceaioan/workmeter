import { Guard, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common'; 

@Guard()
export class AuthGuard implements CanActivate {
    canActivate(req, context: ExecutionContext): boolean {
        console.log('context: ', context);
        if (!req.headers['x-access-token']) throw new HttpException('Token missing!', HttpStatus.BAD_REQUEST);
        return true;
    }
}