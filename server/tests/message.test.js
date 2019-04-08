const expect = require('expect');
const {generateMessage} = require('./../utils/message');
describe('test generateMessage function', () => {
  it('should generate message object', () => {
    var fromVal = "xmskxmskxs", textVal = "xijxjsnuj8dnsjn"
    var res = generateMessage(fromVal, textVal);
    expect(res.from).toBe(fromVal)
    expect(res.text).toBe(textVal)
    expect(res.createdAt).toBeA('number')
  });
});
