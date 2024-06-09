import {
  BadRequestException,
  Controller,
  Get,
  StreamableFile,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { createReadStream } from 'fs';

@Controller('streams')
@ApiTags('streams')
export class StreamsController {
  @ApiOkResponse()
  @ApiBadRequestResponse({ type: BadRequestException })
  @Get()
  getStream(): StreamableFile {
    const file = createReadStream(
      '../../assets/Freaks_La_Monstrueuse_Parade_1932_VOSTFR.mp4',
    );
    return new StreamableFile(file);
  }
}
