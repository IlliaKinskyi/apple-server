import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import {
  FindOneResponse,
  GetBestsellersResponse,
  GetByNameRequest,
  GetByNameResponse,
  GetNewResponse,
  PaginateAndFilterResponse,
  SearchRequest,
  SearchResponse,
} from './types';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @ApiOkResponse({ type: PaginateAndFilterResponse })
  @UseGuards(AuthenticatedGuard)
  @Get()
  paginateAndFilter(@Query() query) {
    return this.itemsService.paginateAndFilter(query);
  }

  @ApiOkResponse({ type: FindOneResponse })
  @UseGuards(AuthenticatedGuard)
  @Get('find/:id')
  getOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }

  @ApiOkResponse({ type: GetBestsellersResponse })
  @UseGuards(AuthenticatedGuard)
  @Get('bestsellers')
  getBestsellers() {
    return this.itemsService.bestsellers();
  }

  @ApiOkResponse({ type: GetNewResponse })
  @UseGuards(AuthenticatedGuard)
  @Get('new')
  getNew() {
    return this.itemsService.new();
  }

  @ApiOkResponse({ type: SearchResponse })
  @ApiBody({ type: SearchRequest })
  @UseGuards(AuthenticatedGuard)
  @Post('search')
  search(@Body() { search }: { search: string }) {
    return this.itemsService.searchByString(search);
  }

  @ApiOkResponse({ type: GetByNameResponse })
  @ApiBody({ type: GetByNameRequest })
  @UseGuards(AuthenticatedGuard)
  @Post('name')
  getByName(@Body() { name }: { name: string }) {
    return this.itemsService.findOneByName(name);
  }
}
