import expect from "expect.js";
import app from '../../index';

describe('Mocha Setup along with mochawseome coverage report ', () => {
    it('should just work', (done) => {
        expect(5).to.eql(5);
        done();
    });
});