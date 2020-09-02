const { expect } = require('chai');
const timeStamp = require('../../src/hooks/time-stamp');


describe('\'time stamp\' hook', () => {
  it('Should add a timeObj to the field{name}', () => {
    const hookTest = timeStamp('testCol');
    const testCtx = { data: { role: null, testCol: null } };

    const test = hookTest(testCtx);

    expect(test.data.testCol).to.not.be.null;
    expect(test.data.testCol).to.be.a('date');
  });
});
