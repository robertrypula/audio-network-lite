// Copyright (c) 2019 Robert Rypuła - https://github.com/robertrypula

import * as AudioNetworkLite from './index';
import { AudioMonoIoCreateMode, audioMonoIoFactory, DataLinkLayer } from './index';

describe('Index', () => {
  describe('Info', () => {
    it('should return version', () => {
      expect(AudioNetworkLite.version).toBeTruthy();
    });

    it('should return author', () => {
      expect(AudioNetworkLite.author).toBeTruthy();
    });

    it('should return githubUrl', () => {
      expect(AudioNetworkLite.githubUrl).toBeTruthy();
    });
  });

  it('should be dummy integration test that uses the lib code', () => {
    audioMonoIoFactory.audioMonoIoCreateMode = AudioMonoIoCreateMode.Stub;
    const dataLinkLayer = new DataLinkLayer();

    dataLinkLayer.setTxBytes([1, 2, 3]);
    expect(dataLinkLayer.txTimeTick()).toBe(true);
    expect(dataLinkLayer.txTimeTick()).toBe(true);
    expect(dataLinkLayer.txTimeTick()).toBe(true);
    expect(dataLinkLayer.txTimeTick()).toBe(true);
    expect(dataLinkLayer.txTimeTick()).toBe(true);
    expect(dataLinkLayer.txTimeTick()).toBe(true);
    expect(dataLinkLayer.txTimeTick()).toBe(false);

    dataLinkLayer.rxTimeTick();
    expect(dataLinkLayer.getRxBytesCollection()).toEqual(null);
  });
});
