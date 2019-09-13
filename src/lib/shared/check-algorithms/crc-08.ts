// Copyright (c) 2019 Robert Rypuła - https://github.com/robertrypula

import { CheckAlgorithmImplementation } from '@shared/model';

/*tslint:disable:no-bitwise*/

const CRC_08_LOOKUP_TABLE = `
  00,07,0e,09,1c,1b,12,15,38,3f,36,31,24,23,2a,2d,70,77,7e,79,6c,6b,62,65,48,4f,46,41,54,53,5a,5d,e0,e7,ee,e9,fc,fb,f2,
  f5,d8,df,d6,d1,c4,c3,ca,cd,90,97,9e,99,8c,8b,82,85,a8,af,a6,a1,b4,b3,ba,bd,c7,c0,c9,ce,db,dc,d5,d2,ff,f8,f1,f6,e3,e4,
  ed,ea,b7,b0,b9,be,ab,ac,a5,a2,8f,88,81,86,93,94,9d,9a,27,20,29,2e,3b,3c,35,32,1f,18,11,16,03,04,0d,0a,57,50,59,5e,4b,
  4c,45,42,6f,68,61,66,73,74,7d,7a,89,8e,87,80,95,92,9b,9c,b1,b6,bf,b8,ad,aa,a3,a4,f9,fe,f7,f0,e5,e2,eb,ec,c1,c6,cf,c8,
  dd,da,d3,d4,69,6e,67,60,75,72,7b,7c,51,56,5f,58,4d,4a,43,44,19,1e,17,10,05,02,0b,0c,21,26,2f,28,3d,3a,33,34,4e,49,40,
  47,52,55,5c,5b,76,71,78,7f,6a,6d,64,63,3e,39,30,37,22,25,2c,2b,06,01,08,0f,1a,1d,14,13,ae,a9,a0,a7,b2,b5,bc,bb,96,91,
  98,9f,8a,8d,84,83,de,d9,d0,d7,c2,c5,cc,cb,e6,e1,e8,ef,fa,fd,f4,f3`
  .split(',')
  .map(value => parseInt(value, 16));

export const getCrc08: CheckAlgorithmImplementation = (bytes: number[]): number[] => {
  // Code migrated to TypeScript from vanilla JavaScript implementation:
  // https://dev.flarecast.eu/stash/projects/SAND/repos/swagger-ui/browse/node_modules/crc/lib/crc8.js
  let crc = 0;

  for (let i = 0; i < bytes.length; i++) {
    crc = CRC_08_LOOKUP_TABLE[(crc ^ bytes[i]) & 0xff] & 0xff;
  }

  return [crc & 0xff];
};
