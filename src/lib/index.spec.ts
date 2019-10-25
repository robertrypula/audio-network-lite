// Copyright (c) 2019 Robert Rypuła - https://github.com/robertrypula

import { libraryInfo } from '@';

describe('Index', () => {
  describe('Library info', () => {
    it('should return version', () => {
      expect(libraryInfo.version).toBeTruthy();
    });

    it('should return author', () => {
      expect(libraryInfo.author).toBeTruthy();
    });

    it('should return gitHub', () => {
      expect(libraryInfo.gitHub).toBeTruthy();
    });
  });
});
