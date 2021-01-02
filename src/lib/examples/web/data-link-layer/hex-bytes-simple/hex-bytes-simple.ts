// Copyright (c) 2019-2021 Robert Rypuła - https://github.com/robertrypula

import {
  DataLinkLayer,
  DspConfig,
  DspMode,
  getBytesFromHex,
  getDspConfigsFromAllDspModes,
  getHexFromBytes,
  TxTimeTickState
} from '@'; // in your code it would be: ... from 'audio-network-reborn';
import * as domUtils from '@examples/web/dom-utils';
import * as fromTemplate from './hex-bytes-simple.template';

// TODO: this example doesn't use DataLinkLayerWrapper that handles
// TODO: all timers by the AudioNetworkReborn library itself
// TODO: -> example should be deleted or refactored soon

export class DataLinkLayerHexBytesSimpleWebExample {
  public dataLinkLayer: DataLinkLayer;
  public rxInterval: any;
  public txInterval: any;

  public constructor() {
    domUtils.getByTagName('html').classList.add('data-link-layer-hex-bytes-simple');
    domUtils.getById('audio-network-reborn-root').innerHTML = fromTemplate.mainHtml;
    this.initializeDspModeDropdown();
  }

  public onDspModeChange(dspMode: DspMode): void {
    this.initializeDataLinkLayer();
    if (dspMode) {
      this.dataLinkLayer.physicalLayer.setDspMode(dspMode);
      domUtils.getById('controls-wrapper').style.display = 'block';
      this.rxInterval && this.handleRxInterval();
      this.txInterval && this.handleTxInterval();
    } else {
      domUtils.getById('controls-wrapper').style.display = 'none';
      this.clearRxInterval();
      this.clearTxInterval();
      this.dataLinkLayer.physicalLayer.audioMonoIo.inputDisable();
      this.dataLinkLayer.physicalLayer.audioMonoIo.outputDisable();
      domUtils.getById('enable-receiver-button').style.display = 'block';
      domUtils.getById('waiting-for-data-frames-label').style.display = 'none';
      domUtils.getById('rx-data').innerHTML = '';
    }
  }

  public receiveEnable(): void {
    domUtils.getById('enable-receiver-button').style.display = 'none';
    domUtils.getById('waiting-for-data-frames-label').style.display = 'block';
    this.handleRxInterval();
  }

  public transmit(): void {
    const txBytes = getBytesFromHex(domUtils.getByIdInput('tx-data').value);

    this.dataLinkLayer.setTxBytes(txBytes);
    this.handleTxInterval();
  }

  protected clearRxInterval(): void {
    clearInterval(this.rxInterval);
    this.rxInterval = null;
  }

  protected clearTxInterval(): void {
    clearInterval(this.txInterval);
    this.txInterval = null;
  }

  protected handleRxInterval(): void {
    this.clearRxInterval();
    this.rxInterval = setInterval((): void => {
      let rxBytesCollection: number[][];

      this.dataLinkLayer.rxTimeTick(new Date().getTime());
      rxBytesCollection = this.dataLinkLayer.getRxBytesCollection();

      if (rxBytesCollection.length) {
        const div: HTMLElement = domUtils.createElement('div');

        div.innerHTML = rxBytesCollection.map((rxBytes: number[]): string => getHexFromBytes(rxBytes)).join(' | ');
        domUtils.getById('rx-data').appendChild(div);
      }
    }, this.dataLinkLayer.physicalLayer.getDspConfig().rxIntervalMilliseconds);
  }

  protected handleTxInterval(): void {
    this.clearTxInterval();
    if (this.dataLinkLayer.txTimeTick(new Date().getTime()) === TxTimeTickState.Symbol) {
      this.txInterval = setInterval((): void => {
        // Example code is bad - it's not waiting for guard interval to be finished
        this.dataLinkLayer.txTimeTick(new Date().getTime()) === TxTimeTickState.Guard && this.clearTxInterval();
      }, this.dataLinkLayer.physicalLayer.getDspConfig().txIntervalMilliseconds);
    }
  }

  protected initializeDataLinkLayer(): void {
    if (!this.dataLinkLayer) {
      // AudioNetworkReborn.audioMonoIoFactory.audioMonoIoCreateMode = AudioNetworkReborn.AudioMonoIoCreateMode.Stub;
      this.dataLinkLayer = new DataLinkLayer();
      domUtils.getById('sample-rate-label').innerHTML = fromTemplate.sampleRate(this.dataLinkLayer);
    }
  }

  protected initializeDspModeDropdown(): void {
    domUtils.getById('dsp-mode-dropdown').innerHTML =
      fromTemplate.dropdownOptionEmpty +
      getDspConfigsFromAllDspModes()
        .map((dspConfig: DspConfig): string => fromTemplate.dropdownOption(dspConfig))
        .join('');
  }
}
