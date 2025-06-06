import { forwardRef, Logger, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Company } from "../entities/company.entity";
import { CaslModule } from "../casl/casl.module";
import configuration from "../configuration";
import { TypeOrmConfigService } from "../typeorm.config.service";
import { CompanyService } from "./company.service";
import { UtilModule } from "../util/util.module";
import { ProgrammeLedgerModule } from "../programme-ledger/programme-ledger.module";
import { ProgrammeTransfer } from "../entities/programme.transfer";
import { EmailHelperModule } from "../email-helper/email-helper.module";
import { FileHandlerModule } from "../file-handler/filehandler.module";
import { CompanyMeta } from "../entities/companyMeta.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: [`.env.${process.env.NODE_ENV}`, `.env`],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      imports: undefined,
    }),
    TypeOrmModule.forFeature([Company, ProgrammeTransfer, CompanyMeta]),
    CaslModule,
    UtilModule,
    forwardRef(() => ProgrammeLedgerModule),
    FileHandlerModule,
    forwardRef(() => EmailHelperModule),
  ],
  providers: [CompanyService, Logger],
  exports: [CompanyService],
})
export class CompanyModule {}
