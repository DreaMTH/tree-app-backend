import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type Node = {
  parent: string;
  nodeName: string;
};

export type TreeDocument = HydratedDocument<Tree>;
@Schema()
export class Tree {
  @Prop({ required: true })
  name: string;
  @Prop({
    type: [
      {
        parent: {
          type: String,
          required: true,
        },
        nodeName: {
          type: String,
          required: true,
          unique: true,
        },
      },
    ],
  })
  nodes: [];
}
export const TreeSchema = SchemaFactory.createForClass(Tree);
/*export const treeModel =
  mongoose.models.Tree || mongoose.model('Tree', treeSchema);*/
