import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { getMongoUrl } from './config/environment';
import { RolesGuard } from './guard/role.guard';
import { UserModule } from './user/user.module';

@Module({
  imports: [

    // Config file .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Config mongoose
    MongooseModule.forRoot(getMongoUrl()),

    // Config passport
    PassportModule,
    JwtModule,

    // Another module
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule { }
