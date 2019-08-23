// Copyright (c) 2019 Robert Rypuła - https://github.com/robertrypula

import { CheckAlgorithm } from '../shared/model';
import {
  HEADER_2_BYTES_PAYLOAD_LENGTH_BETWEEN_1_AND_8_BYTES,
  HEADER_3_BYTES_PAYLOAD_LENGTH_BETWEEN_1_AND_8_BYTES,
  HEADER_3_BYTES_PAYLOAD_LENGTH_FIXED_AT_8_BYTES
} from './constants';
import { FrameModeToFrameConfigLookUp } from './model';

export const frameModeToFrameConfigLookUp: FrameModeToFrameConfigLookUp = {
  Header2BytesPayloadLengthBetween1And8BytesFletcher16: {
    checkAlgorithm: CheckAlgorithm.Fletcher16,
    ...HEADER_2_BYTES_PAYLOAD_LENGTH_BETWEEN_1_AND_8_BYTES
  },
  Header3BytesPayloadLengthBetween1And8BytesSha1: {
    checkAlgorithm: CheckAlgorithm.Sha1,
    ...HEADER_3_BYTES_PAYLOAD_LENGTH_BETWEEN_1_AND_8_BYTES
  },
  Header3BytesPayloadLengthFixedAt8BytesSha1: {
    checkAlgorithm: CheckAlgorithm.Sha1,
    ...HEADER_3_BYTES_PAYLOAD_LENGTH_FIXED_AT_8_BYTES
  }
};
