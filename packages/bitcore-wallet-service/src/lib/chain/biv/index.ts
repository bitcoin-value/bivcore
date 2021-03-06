import { BitcoreLib, BitcoreLibValue } from '@sotatek-anhdao/crypto-wallet-core';
import _ from 'lodash';
import { IChain } from '..';
import { BtcChain } from '../btc';

const Errors = require('../../errors/errordefinitions');

export class BivChain extends BtcChain implements IChain {
  constructor() {
    super(BitcoreLibValue);
    this.feeSafetyMargin = 0.1;
  }

  validateAddress(wallet, inaddr, opts) {
    const A = BitcoreLibValue.Address;
    let addr: {
      network?: string;
      toString?: (cashAddr: boolean) => string;
    } = {};
    try {
      addr = new A(inaddr);
    } catch (ex) {
      throw Errors.INVALID_ADDRESS;
    }
    if (addr.network.toString() != wallet.network) {
      throw Errors.INCORRECT_ADDRESS_NETWORK;
    }
    if (!opts.noCashAddr) {
      if (addr.toString(true) != inaddr) throw Errors.ONLY_CASHADDR;
    }
    return;
  }
}
