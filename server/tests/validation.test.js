const expect = require('expect');
const {isRealString} = require('./../utils/validation');
describe('test validation function', () => {
  it('should reject non-string values',()=>{
    var inputVal = 12
    var res = isRealString(inputVal);
    expect(res).toBe(false)
  })
  it('should reject only spaces strings',()=>{
    var inputVal = "    "
    var res = isRealString(inputVal);
    expect(res).toBe(false)
  })
  it('should accept strings with non-space characters',()=>{
    var inputVal = " amr galal   "
    var res = isRealString(inputVal);
    expect(res).toBe(true)
  })
});
