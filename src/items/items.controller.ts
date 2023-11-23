import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @UseGuards(AuthenticatedGuard)
  @Get()
  paginateAndFilter(@Query() query) {
    return this.itemsService.paginateAndFilter(query);
  }
}
