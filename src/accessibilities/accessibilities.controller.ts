import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccessibilitiesService } from './accessibilities.service';

@Controller('accessibilities')
@ApiTags('accessibilities')
export class AccessibilitiesController {
    constructor(private readonly accessibilitiesService: AccessibilitiesService) {}

    @Get()
    async getList() {
        return await this.accessibilitiesService.getList();
    }
}
