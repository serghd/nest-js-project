import {
   Body,
   Controller,
   Get,
   Param,
   Post,
   UseGuards,
   UseInterceptors,
   UsePipes,
   ValidationPipe,
} from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { LoggingInterceptor } from '../conceptions/interceptor';
import { AuthGuard } from '../conceptions/guard';
import { CreateFlowersDto, UpdateFlowersDto } from '../dto/flowers.dto';
import { ParseIntPipe } from '../conceptions/pipe';
import { ApiBody, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('flowers')
@ApiSecurity('authorization-key')
@ApiTags('Flowers')
@UseGuards(AuthGuard)
@UsePipes(ValidationPipe)
@UseInterceptors(LoggingInterceptor)
export class FlowersController {
   constructor(private readonly flowersService: FlowersService) {}

   @Get()
   findAll() {
      return this.flowersService.findAll();
   }

   @Post('create')
   @ApiResponse({
      status: 201,
   })
   @ApiBody({
      type: CreateFlowersDto,
      description: 'Json structure for user object',
   })
   create(@Body() dto: CreateFlowersDto) {
      return this.flowersService.create(dto);
   }
   @Get('remove/:id')
   remove(@Param('id', ParseIntPipe) id: number) {
      return this.flowersService.remove(id);
   }

   @Post('update/:id')
   update(
      @Param('id', ParseIntPipe)
      id: number,
      @Body() dto: UpdateFlowersDto,
   ) {
      return this.flowersService.update(id, dto);
   }
}
