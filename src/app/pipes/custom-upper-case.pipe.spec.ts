import { CustomUpperCasePipe } from './custom-upper-case.pipe';

describe('CustomUpperCasePipe', () => {
  it('create an instance', () => {
    const pipe = new CustomUpperCasePipe();
    expect(pipe).toBeTruthy();
  });
});
