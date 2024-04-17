import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // Retrieve the secret from your environment variables
    });
    console.log("THE JWT SECRET KEY IS: "+process.env.JWT_SECRET);
  }

  async validate(payload: any): Promise<any> {    
    return { userId: payload.sub, email: payload.email }; // Return the minimum required fields
  }
}
