import * as express from 'express';
import * as path from 'path';
import { engines } from 'consolidate';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);

	// set view engine to html
	app.use(express.static(path.join(__dirname, 'dist')));
	app.set('views', __dirname + '/dist');
	app.set('view engine', 'html');
	app.setGlobalPrefix('/api');

  await app.listen(3000);
}
bootstrap();
