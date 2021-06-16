import { Module } from '@nestjs/common';
import { NoteModule } from './note/note.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const getMongoURI = (): string => {
  const mongoUri =
    process.env.MONGODB_URI || 'mongodb://localhost:27017/kubide';
  const mongoUriTest =
    process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/kubide-test';

  return process.env.NODE_ENV === 'test' ? mongoUriTest : mongoUri;
};

console.log('Base de datos cargada en', getMongoURI());

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NoteModule,
    MongooseModule.forRoot(getMongoURI()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
