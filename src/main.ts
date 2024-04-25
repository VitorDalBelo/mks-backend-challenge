import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
  .setTitle('API Filmes')
  .setDescription('API criada como parte do teste técnico da empresa MKS Desenvolvimento de Sistemas e Empreendimentos Ltda')
  .setVersion('1.0')
  .addSecurity('basic',{
    type:"http",
    scheme:'basic'
  })
  .addSecurity('JWT',{
    type:"http",
    scheme:"Bearer"
  })
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();