const { expect } = require('chai');
const userValidate = require('../../src/hooks/user-validate');


describe.only('\'user validate\' hook', () => {
  describe('Create()', () => {
    it('Should throw an error when no params are provided', () => {
      const ctxObject = { data: { } };

      expect(() => userValidate.create(ctxObject)).throws(Error, 'Missing params.');
    });
    it('Should pass when password and email are valid', () => {
      const ctxObject = { data: { email: 'email@email.com', password: 'password1234' } };

      const test = userValidate.create(ctxObject);
      expect(test).to.equal(ctxObject);
    });
    describe( 'email', () => {
      it('Should throw an error when no email is provided', () => {
        const ctxObject = { data: { password: 'password' } };

        expect(() => userValidate.create(ctxObject)).throws(Error, '"email" is not allowed to be empty');
      });
      it('Should throw an error when a invalid email is provided', () => {
        const ctxObject = { data: { password: 'password', email: 'email' } };

        expect(() => userValidate.create(ctxObject)).throws(Error, '"email" must be a valid email');
      });
    });
    describe('password', () => {
      it('Should throw an error when no password is provided', () => {
        const ctxObject = { data: { email: 'email@email.com' } };

        expect(() => userValidate.create(ctxObject)).throws(Error, '"password" is not allowed to be empty');
      });
      it('Should throw an error when a invalid password is provided', () => {
        const ctxObject = { data: { email: 'email@email.com', password: 'pass' } };

        expect(() => userValidate.create(ctxObject)).throws(Error, '"password" length must be at least 6 characters long');
      });
    });
  });
  describe('Patch()', () => {
    it('Should pass when either password or email is provided', () => {
      const ctxObjectEmail = { data: { email: 'email@email.com' } };
      const ctxObjectPass = { data: { password: 'password1234' } };

      const testEmail = userValidate.patch(ctxObjectEmail);
      const testPass = userValidate.patch(ctxObjectPass);

      expect(testEmail).to.equal(ctxObjectEmail);
      expect(testPass).to.equal(ctxObjectPass);
    });
  });
  describe('Recover()', () => {
    it('Should pass when a password is provided', () => {
      const ctxObjectPass = { data: { password: 'password1234' } };

      const testPass = userValidate.recover(ctxObjectPass);

      expect(testPass).to.equal(ctxObjectPass);
    });
    it('Should throw an error when a password is not provided', () => {
      const ctxObjectPass = { data: { } };

      expect(() => userValidate.recover(ctxObjectPass)).throws(Error, 'Missing params.');
    });
    it('Should throw an error when a password is not provided', () => {
      const ctxObjectPass = { data: { password: '' } };

      expect(() => userValidate.recover(ctxObjectPass)).throws(Error, '"password" is not allowed to be empty');
    });
  });
});
