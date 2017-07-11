var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Ron';
    var text = 'Whats sup!'
    var rest = generateMessage(from, text);
    expect(rest).toInclude({from, text});
    expect(rest.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
      var from = 'Ron';
      var latitude = '6';
      var longitude = '3';
      var url = 'http://www.google.com/maps?q=6,3';
      var rest = generateLocationMessage(from, latitude, longitude);
      expect(rest).toInclude({from});
      expect(rest.createdAt).toBeA('number');
    });
});
