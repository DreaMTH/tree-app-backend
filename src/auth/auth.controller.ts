import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import * as jwt from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post('registration')
  async registration(@Req() req: Request, @Res() res: Response) {
    const { name, email, password } = await req.body;
    const user = await this.authService.registration({ name, email, password });
    console.log(user);
    const token = jwt.sign({ id: user.email }, 'token');
    return res.status(200).json({ user, token });
  }
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const { email, password } = await req.body;
    const user = await this.authService.login({ email, password });
    const token = jwt.sign({ id: user.email }, 'token');
    return res.status(200).json({ user, token });
  }
}
