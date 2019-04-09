const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./../utils/message');
describe('test generateMessage function', () => {
  it('should generate message object', () => {
    var fromVal = "xmskxmskxs", textVal = "xijxjsnuj8dnsjn"
    var res = generateMessage(fromVal, textVal);
    expect(res.from).toBe(fromVal)
    expect(res.text).toBe(textVal)
    expect(res.createdAt).toBeA('number')
  });
});
describe('test generateLocationMessage function', () => {
  it('should generate message object', () => {
    var fromVal = "snjasmajksajsnajs", lat = 2819281982.21902910, long = 2198219.209102910
    var res = generateLocationMessage(fromVal,lat, long);
    expect(res.from).toBe(fromVal)
    expect(res.url).toBe(`https://www.google.com/maps?q=${lat},${long}`)
    expect(res.createdAt).toBeA('number')
  });
});
