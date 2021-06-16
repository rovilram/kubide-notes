import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { NoteSchema } from './schemes/note.schema';
import { ConfigModule } from '@nestjs/config';
import { Note } from './interfaces/note.interface';
import { CreateNoteDTO } from './dto/note.dto';

describe('NoteService', () => {
  let service: NoteService;
  let noteModel: mongoose.Model<Note>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forFeature([{ name: 'Note', schema: NoteSchema }]),
        MongooseModule.forRoot(process.env.MONGODB_URI_TEST),
      ],
      controllers: [NoteController],
      providers: [NoteService],
    }).compile();

    service = module.get<NoteService>(NoteService);
    noteModel = module.get(getModelToken('Note'));
  });

  beforeEach(async () => {
    await noteModel.deleteMany({});
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create new note', () => {
    test('title is not empty', async () => {
      const newNote: CreateNoteDTO = {
        title: 'Test title',
      };
      const createdNote = await service.createNote(newNote);
      expect(createdNote.title === newNote.title).toBe(true);
    });
    test('title is empty', async () => {
      const newNote: CreateNoteDTO = {
        title: '',
      };
      let throwError;
      try {
        await service.createNote(newNote);
      } catch (error) {
        throwError = error;
      }
      expect(throwError.message).toMatch(/Path `title` is required/);
    });
  });

  describe('Get', () => {
    let newNotesAdded: Note[];
    beforeEach(async () => {
      const newNotes = [
        {
          title: 'note #1',
          isFav: true,
        },
        {
          title: 'note #1',
        },
        {
          title: 'note #1',
          isFav: true,
        },
      ];

      newNotesAdded = await noteModel.insertMany(newNotes);
    });
    test('all Notes', async () => {
      const notes: Note[] = await service.getNotes();
      expect(notes.length).toBe(newNotesAdded.length);
    });
    test('all fav Notes', async () => {
      const favNotes: Note[] = await service.getFavs();
      expect(
        favNotes.length === newNotesAdded.filter((note) => note.isFav).length,
      ).toBe(true);
    });
    test('one Note with valid id', async () => {
      const note: Note = await service.getNote(newNotesAdded[0]._id);

      expect(note._id).toEqual(newNotesAdded[0]._id);
    });
    test('one Note with inexistent id', async () => {
      let throwError;
      try {
        await service.getNote('60c9e5b6b1da95ee869b0a91');
      } catch (error) {
        throwError = error;
      }
      expect(throwError.message).toMatch(/No hay notas con ID/);
    });
  });

  describe('toggle note fav', () => {
    let newNotesAdded: Note[];
    beforeEach(async () => {
      const newNotes = [
        {
          title: 'note #1',
        },
      ];

      newNotesAdded = await noteModel.insertMany(newNotes);
    });
    test('with correct id', async () => {
      const note: Note = await service.toggleFavNote(newNotesAdded[0]._id);

      expect(note.isFav).toEqual(!newNotesAdded[0].isFav);
    });
    test('with inexistent id', async () => {
      let throwError;
      try {
        await service.toggleFavNote('60c9e5b6b1da95ee869b0a91');
      } catch (error) {
        throwError = error;
      }
      expect(throwError.message).toMatch(/No hay notas con ID/);
    });
  });

  afterAll(() => {
    mongoose.disconnect();
  });
});
