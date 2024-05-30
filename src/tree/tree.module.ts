import { Module } from '@nestjs/common';
import { Tree, TreeSchema } from 'src/auth/models/treeModel';
import { TreeService } from './tree.service';
import { TreeController } from './tree.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Tree.name, schema: TreeSchema }],
      'tree',
    ),
    MongooseModule.forRoot(process.env.CONNECTION_STRING, {
      connectionName: 'tree',
    }),
  ],
  controllers: [TreeController],
  providers: [TreeService],
  exports: [],
})
export class TreeModule {}
