import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tree } from 'src/auth/models/treeModel';
import { TreeDto } from './treeDto/treeDto';

@Injectable()
export class TreeService {
  constructor(@InjectModel(Tree.name, 'tree') private treeModel: Model<Tree>) {}
  async getTree(treeName: string): Promise<Tree> {
    try {
      const tree = await this.treeModel.findOne({ name: treeName });
      if (!tree) {
        return null;
      }
      return tree;
    } catch (err) {
      console.error(err);
    } finally {
      console.log('Attempt to get tree');
    }
  }
  async addTree(treeName: string): Promise<Tree> {
    try {
      const doc = new this.treeModel({
        name: treeName,
        nodes: [{ nodeName: 'root', parent: 'root' }],
      });
      const tree = await doc.save();
      if (!tree) {
        return null;
      }
      return tree;
    } catch (err) {
      console.error(err);
    } finally {
      console.log('Attempt to create new tree');
    }
  }
  async addTreeNode(treeDto: TreeDto): Promise<Tree> {
    try {
      const doc = await this.treeModel.findOneAndUpdate(
        {
          name: treeDto.treeName,
        },
        {
          $push: {
            nodes: {
              parent: treeDto.parentName,
              nodeName: treeDto.nodeName,
            },
          },
        },
        { new: true },
      );
      if (!doc) {
        return null;
      }
      return doc;
    } catch (err) {
      console.error(err);
    } finally {
      console.log('Attempt to add tree node');
    }
  }
}
