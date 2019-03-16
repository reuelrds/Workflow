import { DecodeHtmlStringsPipe } from './decode-html-strings.pipe';

describe('DecodeHtmlStringsPipe', () => {

  let pipe: DecodeHtmlStringsPipe;

  beforeEach(() => {
    pipe = new DecodeHtmlStringsPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should render the HTML Entities correctly', () => {
    expect(pipe.transform('&#36;')).toContain('$');
  });
});
