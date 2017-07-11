var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Ron';
    var text = 'Whats sup!'
    var rest = generateMessage(from, text);
    expect(rest).toInclude({from, text});
    expect(rest.createdAt).toBeA('number');
  });
});
