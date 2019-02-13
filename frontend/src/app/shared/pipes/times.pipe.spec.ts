import { TimesPipe } from './times.pipe';

/**
 * Test suites for TimesPipe
 */

describe('Testing TimesPipe', () => {
  let pipe: TimesPipe;

  // instansiate a new Pipe Object before each test
  beforeEach(() => {
    pipe = new TimesPipe();
  });

  /**
   * Success Tests
   */
  // Testing initially that it loads successfully
  it('should create an instasnce', () => {
    expect(pipe).toBeTruthy();
  });

  // A
  it('should transform 10 to "[1,...,10]"', () => {
    expect(pipe.transform(10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });


  /**
   * Breaking tests
   */

  // it shouldn't allow a string to be passed
  it('should throw an error when a string is passed', () => {
    expect(() => pipe.transform('error')).toThrow(new Error('Invalid Input: Expected a \'number\'. Got a \'string\''));
  });

  // the value should be greater than 1
  it('should throw an error when a number less than 1 is passed', () => {
    expect(() => pipe.transform(-1)).toThrow(new Error('Invalid Input: Expected value to be greater than or equal to 1'));
  });

  it('should return 0 back when it is passed', () => {
    expect(pipe.transform(0)).toBe(0);
  });

  // the value shouldn't be null or undefined
  it('should return null back when it is passed', () => {
    expect(pipe.transform(null)).toBeNull();
  });
  it('should return undefied back when it is passed', () => {
    expect(pipe.transform(undefined)).toBeUndefined();
  });
});
