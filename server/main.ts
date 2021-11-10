import { enableProdMode } from '@angular/core';
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';

enableProdMode();

const MockBrowser = require('mock-browser').mocks.MockBrowser;
const mock = new MockBrowser();

global['localStorage'] = mock.getWindow().localStorage;
global['window'] = mock.getWindow();
global['document'] = mock.getDocument();

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.setGlobalPrefix('api');
  await app.listen(4000);
}
bootstrap();
