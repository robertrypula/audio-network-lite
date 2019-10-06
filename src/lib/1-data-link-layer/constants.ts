// Copyright (c) 2019 Robert Rypuła - https://github.com/robertrypula

import { FrameConfigInitializerWithoutCheckAlgorithm, FrameCounter, FrameCounterSimple } from '@data-link-layer/model';
import { getBytesFromHex } from '@shared/utils';

export const FRAME_COUNTER_WITH_ZEROS: FrameCounter = {
  errorCorrectedInvalid: 0,
  errorCorrectedValid: 0,
  errorCorrectedValidFake: 0,
  invalid: 0,
  valid: 0,
  validFake: 0
};

export const FRAME_COUNTER_SIMPLE_WITH_ZEROS: FrameCounterSimple = { errorCorrected: 0, nonErrorCorrected: 0 };

export const GUARD_FACTOR = 0.25;

export const HEADER_2_BYTES_PAYLOAD_LENGTH_BETWEEN_1_AND_8_BYTES: FrameConfigInitializerWithoutCheckAlgorithm = {
  guardFactor: GUARD_FACTOR,
  headerLength: 2,
  payloadLengthBitSize: 3,
  payloadLengthOffset: 1
};

export const HEADER_2_BYTES_PAYLOAD_LENGTH_FIXED_AT_8_BYTES: FrameConfigInitializerWithoutCheckAlgorithm = {
  guardFactor: GUARD_FACTOR,
  headerLength: 2,
  payloadLengthBitSize: 0,
  payloadLengthFixed: 8
};

export const HEADER_3_BYTES_PAYLOAD_LENGTH_BETWEEN_1_AND_8_BYTES: FrameConfigInitializerWithoutCheckAlgorithm = {
  guardFactor: GUARD_FACTOR,
  headerLength: 3,
  payloadLengthBitSize: 3,
  payloadLengthOffset: 1
};

export const HEADER_3_BYTES_PAYLOAD_LENGTH_FIXED_AT_8_BYTES: FrameConfigInitializerWithoutCheckAlgorithm = {
  guardFactor: GUARD_FACTOR,
  headerLength: 3,
  payloadLengthBitSize: 0,
  payloadLengthFixed: 8
};

// TODO check import issue when it's not function
export const SCRAMBLE_SEQUENCE = (): number[] => getBytesFromHex('f9 cb 5d b3 ce 5a 88 5e e6 aa d3 3f bc 60 0e 8d b5');
