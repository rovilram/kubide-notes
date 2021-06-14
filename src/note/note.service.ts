import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNoteDTO } from './dto/note.dto';
import { Note } from './interfaces/note.interface';

@Injectable()
export class NoteService {
  constructor(@InjectModel('Note') private readonly noteModel: Model<Note>) {}

  async getNotes(): Promise<Note[]> {
    const notes = await this.noteModel.find();
    return notes;
  }

  async getNote(idNote: string): Promise<Note> {
    const note = await this.noteModel.findById(idNote);
    return note;
  }

  async createNote(createNoteDTO: CreateNoteDTO): Promise<Note> {
    const note = await this.noteModel.create(createNoteDTO);
    return await note.save();
  }

  async setFav(idNote: string): Promise<Note> {
    const note = await this.noteModel.findById(idNote);

    return await this.noteModel.findByIdAndUpdate(
      idNote,
      {
        isFav: !note.isFav,
      },
      { new: true },
    );
  }

  async getFavs(): Promise<Note[]> {
    const notes = this.noteModel.find({ isFav: true });
    return notes;
  }
}
