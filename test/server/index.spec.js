const { expect } = require('chai');
const server = require('../../server/');

describe('Message extractor', () => {

  it('Should returns correct message structure', (done) => {
    server().messageExtractor({
      unnecessaryInfo1: 'info', 
      token: 'test',
      type: 'comment',
      unnecessaryInfo2: 'info2',
      value: 'Some nice comment',
      unnecessaryInfo3: 2,
    }).then(message => {
      expect(message).to.deep.eq({
       token: 'test',
       type: 'comment',
       value: 'Some nice comment'
      });
      done();
    }); 
  });

  it('Should rejects with error info that msg is incomplete', (done) => {
    server().messageExtractor({
                              
    }).catch(err => {
            
    }); 
  });

});
