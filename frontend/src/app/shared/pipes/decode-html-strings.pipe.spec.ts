import { DecodeHtmlStringsPipe } from './decode-html-strings.pipe';

describe('DecodeHtmlStringsPipe', () => {
  it('create an instance', () => {
    const pipe = new DecodeHtmlStringsPipe();
    expect(pipe).toBeTruthy();
  });
});
