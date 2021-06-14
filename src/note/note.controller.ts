import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { CreateNoteDTO } from './dto/note.dto';

@Controller('note')
export class NoteController {
  @Get('/')
  getNotes(@Res() res) {
    return res.status(HttpStatus.OK).json({
      message: 'Recibidas todas las notas del usuario',
    });
  }

  @Post('/')
  createNote(@Res() res, @Body() createNoteDTO: CreateNoteDTO) {
    return res.status(HttpStatus.OK).json({
      message: `Añadida nueva nota`,
      note: createNoteDTO,
    });
  }

  @Patch('/fav/:idNote')
  setFavNote(@Res() res, @Param('idNote') idNote: string) {
    return res.status(HttpStatus.OK).json({
      message: `Marcada como favorita la nota con id ${idNote}`,
    });
  }
  @Get('/fav')
  getFavNotes(@Res() res) {
    return res.status(HttpStatus.OK).json({
      message: `Recibidas las notas favoritas del usuario`,
    });
  }
  @Get('/:idNote')
  getNote(@Res() res, @Param('idNote') idNote: string) {
    return res.status(HttpStatus.OK).json({
      message: `Recibida la nota con id ${idNote}`,
    });
  }
}
