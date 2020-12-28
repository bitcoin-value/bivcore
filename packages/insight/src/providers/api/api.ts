import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultProvider } from '../../providers/default/default';

import * as _ from 'lodash';

export interface ChainNetwork {
  chain: string;
  network: string;
}
export interface NetworkSettings {
  availableNetworks: ChainNetwork[];
  selectedNetwork: ChainNetwork;
}

const CurrentEnv = process.env.ENV || 'dev';

const EnvApiHosts: { [env: string]: { [chain: string]: string } } = {
  prod: {
    default: process.env.API_PREFIX || '/api',
  },
  dev: {
    default: process.env.API_PREFIX || '/api',
  },
};

const CurrentApiHosts = EnvApiHosts[CurrentEnv];

@Injectable()
export class ApiProvider {
  public defaultNetwork = {
    chain: this.defaults.getDefault('%CHAIN%'),
    network: this.defaults.getDefault('%NETWORK%'),
  };
  public networkSettings = {
    availableNetworks: [],
    selectedNetwork: this.defaultNetwork,
    chainNetworkLookup: {}
  };

  // TODO: check me
  public ratesAPI = {
    btc: 'https://bitpay.com/api/rates',
    biv: 'https://gk-dev-value-coin-admin.sotatek.com/api/price?api_key=d95f59e4-e489-4703-85d1-9ee0bd414b29&type=biv&currency=usd',
  };

  public bwsUrl = {
    urlPrefix: 'https://bws.bitpay.com/bws/api/v1/fiatrates/'
  };

  constructor(
    public httpClient: HttpClient,
    private defaults: DefaultProvider
  ) {
    this.getAvailableNetworks().subscribe(data => {
      const newNetworks = data
        .map(x => x.supported)
        .reduce((agg, arr) => [...agg].concat(arr), []);

      const chainNetworkLookup = {};
      for (const hostConfig of data) {
        for (const chainNetwork of hostConfig.supported) {
          const key = `${chainNetwork.chain}:${chainNetwork.network}`;
          chainNetworkLookup[key] = hostConfig.host;
        }
      }

      for (const { chain, network } of newNetworks) {
        const found = this.networkSettings.availableNetworks.find(
          available =>
            available.chain === chain && available.network === network
        );
        if (!found) {
          this.networkSettings.availableNetworks.push({ chain, network });
        }
      }

      this.networkSettings = {
        availableNetworks: this.networkSettings.availableNetworks,
        selectedNetwork: this.networkSettings.availableNetworks[0],
        chainNetworkLookup
      };
    });
  }

  public getAvailableNetworks(): Observable<
    Array<{ host: string; supported: ChainNetwork[] }>
  > {
    const hosts = CurrentApiHosts;
    return Observable.fromPromise(
      Promise.all(
        Object.keys(hosts).map(async chain => {
          const host = hosts[chain];
          const supported = await this.httpClient
            .get<ChainNetwork[]>(host + '/status/enabled-chains')
            .toPromise();
          return {
            host,
            supported
          };
        })
      )
    );
  }

  getHostForChain(chain: string) {
    return CurrentApiHosts[chain] || CurrentApiHosts.default;
  }

  public getUrlPrefix(chain, network): string {
    const defaultChain = chain || this.networkSettings.availableNetworks[0].chain;
    const defaultNetwork = network || this.networkSettings.availableNetworks[0].network;
    const key = `${defaultChain}:${defaultNetwork}`;
    const lookupHost = this.networkSettings.chainNetworkLookup[key];
    const prefix = lookupHost || this.getHostForChain(chain);
    return prefix;
  }

  public getUrl(params?: { chain?: string; network?: string }): string {
    let { chain, network } = params;
    chain = chain.toUpperCase() || this.networkSettings.selectedNetwork.chain.toUpperCase();
    network = network || this.networkSettings.selectedNetwork.network;
    const prefix: string = this.getUrlPrefix(chain, network);
    const apiPrefix = `${prefix}/${chain}/${network}`;
    return apiPrefix;
  }

  public getConfig(): ChainNetwork {
    const config = {
      chain: this.networkSettings.selectedNetwork.chain,
      network: this.networkSettings.selectedNetwork.network
    };
    return config;
  }

  public changeNetwork(network: ChainNetwork): void {
    const availableNetworks = this.networkSettings.availableNetworks;
    // Can't do the following because availableNetworks is loaded
    /*
     *const isValid = _.some(availableNetworks, network);
     *if (!isValid) {
     *  this.logger.error(
     *    'Invalid URL: missing or invalid COIN or NETWORK param'
     *  );
     *  return;
     *}
     */
    this.networkSettings = {
      availableNetworks,
      selectedNetwork: network,
      chainNetworkLookup: this.networkSettings.chainNetworkLookup || {}
    };
  }
}