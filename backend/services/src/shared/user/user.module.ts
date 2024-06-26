import { forwardRef, Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../shared/entities/user.entity';
import { UserService } from './user.service';
import { CaslModule } from '../../shared/casl/casl.module';
import { TypeOrmConfigService } from '../../shared/typeorm.config.service';
import configuration from '../../shared/configuration';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from '../company/company.module';
import { UtilModule } from '../util/util.module';
import { EmailHelperModule } from '../email-helper/email-helper.module';
import { FileHandlerModule } from '../file-handler/filehandler.module';
import { AsyncOperationsModule } from '../async-operations/async-operations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: [`.env.${process.env.NODE_ENV}`, `.env`]
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      imports: undefined
    }),
    TypeOrmModule.forFeature([User]),
    CaslModule,
    forwardRef(() => CompanyModule),
    forwardRef(() => EmailHelperModule),
    UtilModule,
    FileHandlerModule,
    AsyncOperationsModule,
  ],
  providers: [UserService, Logger],
  exports: [UserService]
})
export class UserModule {}
