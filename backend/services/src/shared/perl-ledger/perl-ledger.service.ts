import { Injectable, Logger } from "@nestjs/common";
import { ethers } from 'ethers';
import { ConfigService } from "@nestjs/config";
import { PerlLedgerConfig } from "../dto/perlLedger.config";
import { ParameterStoreService } from "../util/parameterStore.service";
import perlLedgerContract from './PerlLedgerV1.json';
import { PerlLedgerTransferDto } from "../dto/perlLedgerTransfer.dto";

@Injectable()
export class PerlLedgerService {
  private contract: ethers.Contract;

  constructor(
    private logger: Logger,
    private parameterStoreService: ParameterStoreService,
    configService: ConfigService
  ) {
    const config = configService.get<PerlLedgerConfig>('distributedLedger');
    console.log('[PerlLedgerService] Config received %j', config);

    const provider = new ethers.JsonRpcProvider(config.providerURL);
    const wallet = new ethers.Wallet(config.walletPrivateKey, provider);
    this.contract = new ethers.Contract(config.contractAddress, perlLedgerContract.abi as any, wallet)

    logger.log('Constructor initialized', 'PerlLedgerService');
  }

  async createLedgerRecord(transfer: PerlLedgerTransferDto): Promise<string> {
    let hash;
    try {
      this.logger.debug('Request received', 'createLedgerRecord', transfer);
      const isLedgerEnabled = await this.parameterStoreService.getParameter('PERL_LEDGER_ENABLED') === 'true';

      if (!isLedgerEnabled){
        this.logger.log('PERL Ledger DISABLED, skipping.', 'createLedgerRecord');
        return hash;
      }

      const { serialNo, requestRef, status, creditAmount } = transfer;
      const txResponse = await this.contract.addCarbonTransfer(serialNo, requestRef, status, creditAmount);
      await txResponse.wait();

      hash = txResponse.hash;
      this.logger.debug('Response received', 'createLedgerRecord', txResponse);
    } catch (error) {
      this.logger.error('Error occured', 'createLedgerRecord', error);
    }

    return hash;
  }
}
