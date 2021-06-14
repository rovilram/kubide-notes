import { Module } from '@nestjs/common';
import { NoteModule } from './note/note.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

console.log(process.env.MONGODB_URI);

@Module({
  imports: [
    ConfigModule.forRoot(),
    NoteModule,
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:28017/test',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
