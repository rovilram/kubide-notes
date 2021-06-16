import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as mongoose from 'mongoose';
import { Note } from '../src/note/interfaces/note.interface';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let newNote;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('api server is working', () => {
    test('/ (GET)', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Hello World!');
    });
  });

  describe('add a new /note', () => {
    test('title is not empty', async () => {
      const res = await request(app.getHttpServer()).post('/note').send({
        title: 'new note',
      });
      expect(res.status).toBe(201);
    });

    test('title is empty', async () => {
      const res = await request(app.getHttpServer()).post('/note').send({
        title: '',
      });
      expect(res.status).toBe(400);
    });
  });

  describe('get a /note by id', () => {
    beforeAll(async () => {
      newNote = await request(app.getHttpServer()).post('/note').send({
        title: 'new note',
      });
    });
    test('with valid id', async () => {
      const res = await request(app.getHttpServer()).get(
        `/note/${newNote.body.note._id}`,
      );
      expect(res.status).toBe(200);
      expect(res.body.note._id).toBe(newNote.body.note._id);
    });

    test('with invalid id', async () => {
      const res = await request(app.getHttpServer()).get('/note/25');
      expect(res.status).toBe(400);
    });
  });

  describe('get all notes', () => {
    test('/note', async () => {
      const res = await request(app.getHttpServer()).get(`/note/`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.notes)).toBe(true);
    });
  });

  describe('toggle fav a /note by id', () => {
    test('with valid id', async () => {
      const res = await request(app.getHttpServer()).patch(
        `/note/fav/${newNote.body.note._id}`,
      );
      expect(res.status).toBe(200);
      expect(res.body.note.isFav).toBe(!newNote.body.note.isFav);
    });

    test('with invalid id', async () => {
      const res = await request(app.getHttpServer()).patch('/note/fav/25');
      expect(res.status).toBe(400);
    });
  });

  describe('get all favs notes', () => {
    test('/note/fav', async () => {
      const res = await request(app.getHttpServer()).get(`/note/fav`);
      expect(res.status).toBe(200);
      expect(res.body.favNotes.every((note: Note) => note.isFav)).toBe(true);
    });
  });
  afterAll(() => {
    app.close();
    mongoose.disconnect();
  });
});
