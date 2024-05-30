import { Controller, Get, Post, Param, Req, Res } from '@nestjs/common';
import { TreeService } from './tree.service';
import { Request, Response } from 'express';
@Controller('tree')
export class TreeController {
  constructor(private readonly treeService: TreeService) {}
  @Get(':id')
  async getTree(@Param('id') id: string) {
    return this.treeService.getTree(id);
  }
  @Post('new-tree')
  async createNewTree(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response<JSON>> {
    const { treeName } = await req.body;
    const tree = await this.treeService.addTree(treeName);
    return res.status(200).json(tree);
  }
  @Post('add-node')
  async addTreeNode(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response<JSON>> {
    const { treeName, nodeName, nodeParent } = await req.body;
    const tree = await this.treeService.addTreeNode({
      treeName,
      nodeName,
      parentName: nodeParent,
    });
    return res.status(200).json(tree);
  }
}
