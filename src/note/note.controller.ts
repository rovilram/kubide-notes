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
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get('/')
  async getNotes(@Res() res) {
    const notes = await this.noteService.getNotes();
    return res.status(HttpStatus.OK).json({
      message: 'Recibidas todas las notas del usuario',
      notes,
    });
  }

  @Post('/')
  async createNote(@Res() res, @Body() createNoteDTO: CreateNoteDTO) {
    const note = await this.noteService.createNote(createNoteDTO);

    return res.status(HttpStatus.CREATED).json({
      message: `Añadida nueva nota`,
      note,
    });
  }

  @Get('/fav')
  async getFavNotes(@Res() res) {
    const favNotes = await this.noteService.getFavs();
    return res.status(HttpStatus.OK).json({
      message: `Recibidas las notas favoritas del usuario`,
      favNotes,
    });
  }
  @Patch('/fav/:idNote')
  async toggleFavNote(@Res() res, @Param('idNote') idNote: string) {
    this.noteService.validateId(idNote);

    const note = await this.noteService.toggleFavNote(idNote);

    return res.status(HttpStatus.OK).json({
      message: note.isFav
        ? `Marcada como favorita la nota con id ${idNote}`
        : `Desmarcada como favorita la nota con id ${idNote}`,
      note,
    });
  }
  @Get('/:idNote')
  async getNote(@Res() res, @Param('idNote') idNote: string) {
    this.noteService.validateId(idNote);

    const note = await this.noteService.getNote(idNote);

    return res.status(HttpStatus.OK).json({
      message: `Recibida la nota con id ${idNote}`,
      note,
    });
  }
}
