import { Injectable } from '@nestjs/common';
import { registrationDto } from './authDto/registrationDto';
import * as bcrypt from 'bcrypt';
import { loginDto } from './authDto/loginDto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './models/userModel';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name, 'main') private userModel: Model<User>) {}
  async registration(regData: registrationDto): Promise<User> {
    try {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(regData.password, salt);
      const doc = new this.userModel({
        name: regData.name,
        email: regData.email,
        password: passwordHash,
      });
      const user = await doc.save();
      if (!user) {
        return null;
      }
      return user;
    } catch (err) {
      console.error(err);
    } finally {
      console.log('Attempt to registration');
    }
  }
  async login(loginData: loginDto): Promise<User> {
    try {
      const user = await this.userModel.findOne({ email: loginData.email });
      const verificationPassword = await bcrypt.compare(
        loginData.password,
        user.password,
      );
      if (!verificationPassword) {
        console.log('badpassword');
        return null;
      }
      return user;
    } catch (err) {
      console.error(err);
    } finally {
      console.log('Attempt to login');
    }
  }
}
