import { Controller, Body, Param, Get, Post, Put, Query, UseGuards, Request, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBody, ApiCreatedResponse, ApiParam, ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { getUserId } from 'src/auth/utils/common';
import { User } from 'src/auth/dto/user.decorator';

@Controller('order')
@ApiTags('orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiOperation({
    operationId: 'indexOrder',
    summary: 'Get list of transactions',
    description: 'Get list of transactions for the user',
  })
  findAll(@User() user: any) {
    const userId = getUserId(user?.username);
    return this.orderService.findAll(userId);
  }

  @Get('/detail/:id')
  @ApiOperation({
    operationId: 'readOrder',
    summary: 'Read order',
    description: 'Get transaction detail',
  })
  @ApiParam({
    name: "id"
  })
  findOne(@Param('id') orderId) {
    return this.orderService.findOne(orderId);
  }
  
  @Post()
  @ApiOperation({
    operationId: 'createOrder',
    summary: 'Create order',
    description: 'Create new order',
  })
  @ApiBody({ type: CreateOrderDto })
  @ApiCreatedResponse({
    type: CreateOrderDto,
    description: 'Create order'
  })
  create(@Body() dto: CreateOrderDto, @User() user: any, @Req() req: any) {
    const userId = getUserId(user?.username);
    const order = this.orderService.add(dto, userId);
    setTimeout(() => {
      this.orderService.doPayment(order, userId);
    }, 3000);

    return order;
  }

  @ApiOperation({
    operationId: 'cancelOrder',
    summary: 'Cancel order',
    description: 'Cancel order with created and confirmed status',
  })
  @Put('cancel/:nmbr')
  @ApiParam({
    name: "nmbr"
  })
  @ApiCreatedResponse({
    description: 'Cancel order successfull.'
  })
  cancel(@Param('nmbr') nmbr) {
    return this.orderService.cancel(nmbr);
  }

  @Get('/fetch-order')
  @ApiOperation({
    operationId: 'fetchOrder',
    summary: 'Fetch order',
    description: 'Fetch new data of orders',
  })
  async fetchListOrder(@Query() params: any) {
    return await this.orderService.fetchListOrder(params);
  }
}
