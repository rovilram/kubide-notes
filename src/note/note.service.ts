import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose /*{ Model, Mongoose }*/ from 'mongoose';
import { CreateNoteDTO } from './dto/note.dto';
import { Note } from './interfaces/note.interface';

@Injectable()
export class NoteService {
  constructor(
    @InjectModel('Note') private readonly noteModel: mongoose.Model<Note>,
  ) {}

  async getNotes(): Promise<Note[]> {
    const notes = await this.noteModel.find();
    return notes;
  }

  async getNote(idNote: string): Promise<Note> {
    const note = await this.noteModel.findById(idNote);
    if (!note) throw new BadRequestException(`No hay notas con ID: ${idNote}`);
    return note;
  }

  async createNote(createNoteDTO: CreateNoteDTO): Promise<Note> {
    try {
      const note = await this.noteModel.create(createNoteDTO);
      if (!note) throw new BadRequestException('nota no creada');
      return await note.save();
    } catch (err) {
      throw new BadRequestException(`Error al crear nota:${err.message}`);
    }
  }

  async toggleFavNote(idNote: string): Promise<Note> {
    const note = await this.noteModel.findById(idNote);
    if (!note) throw new BadRequestException(`No hay notas con ID: ${idNote}`);
    return await this.noteModel.findByIdAndUpdate(
      idNote,
      {
        isFav: !note.isFav,
      },
      { new: true, useFindAndModify: false },
    );
  }

  async getFavs(): Promise<Note[]> {
    const notes = this.noteModel.find({ isFav: true });
    return notes;
  }

  validateId(id): void {
    if (!mongoose.isValidObjectId(id))
      throw new BadRequestException('El id no es válido');
  }
}
