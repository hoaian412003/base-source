import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { getMongoUrl } from './config/environment';
import { PermissionGuard } from './guard/permission.guard';
import { ImageModule } from './modules/image/image.module';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [

    // Config file .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Config mongoose
    MongooseModule.forRoot(getMongoUrl(), {
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-autopopulate'));
        return connection;
      }
    }),

    // Config Passport, Jwt
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET
    }),

    // Another module
    UserModule,
    RoleModule,
    ImageModule
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: PermissionGuard },
  ],
})
export class AppModule { }
