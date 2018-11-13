'use strict';
var isEmail = require('isemail');

module.exports = function(Contact) {

    Contact.getVerifyOptions = function() {
    	const defaultOptions = {
      	    type: 'email',
            from: 'noreply@example.com',
        };
       return Object.assign({}, this.settings.verifyOptions || defaultOptions)
     };

    function assertVerifyOptions(verifyOptions) {
        assert(verifyOptions.type, 'You must supply a verification type (verifyOptions.type)');
        assert(verifyOptions.type === 'email', 'Unsupported verification type');
        assert(verifyOptions.to, 'Must include verifyOptions.to when calling user.verify() ' + 
              'or the user must have an email property');
        assert(verifyOptions.from, 'Must include verifyOptions.from when calling user.verify()');
        assert(typeof verifyOptions.templateFn === 'function',
              'templateFn must be a function');
        assert(typeof verifyOptions.generateVerificationToken === 'function',
              'generateVerificationToken must be a function');
        assert(verifyOptions.mailer, 'A mailer function must be provided');
        assert(typeof verifyOptions.mailer.send === 'function', 'mailer.send must be a function ');
  }


};
