import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Items } from './items.model';

@Module({
  imports: [SequelizeModule.forFeature([Items])],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsService],
})
export class ItemsModule {}
