import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
@Schema()
export class User {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true, unique: true })
  password: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
/*export const userModel =
  mongoose.models.Users || mongoose.model('Users', userSchema);*/
