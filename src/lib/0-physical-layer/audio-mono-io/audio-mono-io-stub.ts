// Copyright (c) 2019 Robert Rypuła - https://github.com/robertrypula

import { AudioMonoIoInterface } from '../model';

/*tslint:disable:no-console*/

const CONSOLE = false;

export class AudioMonoIoStub implements AudioMonoIoInterface {
  protected fftSize: number = 4096;
  protected sampleRate: number = 48000;

  public getFftSize(): number {
    CONSOLE && console.info('AudioMonoIoStub.getFftSize -> ' + this.fftSize);
    return this.fftSize;
  }

  public getSampleRate(): number {
    CONSOLE && console.info('AudioMonoIoStub.getSampleRate -> ' + this.sampleRate);
    return this.sampleRate;
  }

  public getFrequencyDomainData(currentTime: number): Float32Array {
    const length = 0.5 * this.fftSize;
    CONSOLE && console.info('AudioMonoIoStub.getFrequencyDomainData -> [arrayLength=' + length + ']', currentTime);
    return new Float32Array(length);
  }

  public inputDisable(): void {
    CONSOLE && console.info('AudioMonoIoStub.inputDisable');
  }

  public setFftSize(fftSize: number): void {
    CONSOLE && console.info('AudioMonoIoStub.setFftSize -> ' + fftSize);
    this.fftSize = fftSize;
  }

  public setPeriodicWave(frequency: number, currentTime: number): void {
    CONSOLE && console.info('AudioMonoIoStub.setPeriodicWave -> ' + frequency.toFixed(6), currentTime);
  }

  public outputDisable(): void {
    CONSOLE && console.info('AudioMonoIoStub.outputDisable');
  }
}