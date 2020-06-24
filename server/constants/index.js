// all constants to be used from one place to alleviate typos

// ROUTES
const API_USER = '/api/user'
const API_USER_ANON = '/api/user/anon'
const API_USER_LOGIN = '/api/user/login'
const API_USER_LOGOUT = '/api/user/logout'
const API_USER_VERIFY = '/api/user/verify'
const API_USER_RESET = '/api/user/reset'

// EVENTS
const CREATE_ACCOUNT_ANON = 'CREATE-ACCOUNT-ANON'
const CREATE_ACCOUNT = 'CREATE-ACCOUNT'
const LOGIN_ACCOUNT = 'LOGIN-ACCOUNT'
const LOGOUT_ACCOUNT = 'LOGOUT-ACCOUNT'
const VERIFY_ACCOUNT = 'VERIFY-ACCOUNT'
const VERIFIED_ACCOUNT = 'VERIFIED-ACCOUNT'
const UPDATED_ACCOUNT = 'UPDATED-ACCOUNT'
const DELETED_ACCOUNT = 'DELETED-ACCOUNT'
const RESET_ACCOUNT = 'RESET-ACCOUNT'

// GENERAL
const ANON = 'anon'
const ERROR = 'error'
const SUCCESS = 'success'

// ERRORS
const EMAIL_IN_USE = 'Email already in use.'
const PASSWORD_INCORRECT = 'Incorrect password.'
const ACCOUNT_MISSING = 'Account does not exist, please contact support.'
const ACCOUNT_UNVERIFIED = 'Account not verified, please verify first.'
const ACCOUNT_IN_RECOVERY = 'Account was recently put in recovery modes, please contact support'
const VERIFY_LINK_MISSING = 'Verify link does not exist, please contact support.'
const RECOVERY_LINK_MISSING = 'Recovery link does not exist, please contact support.'

// MESSAGES
const SUCCESS_CREATED_ACCOUNT = 'Success your Account is created'
const SUCCESS_LOGIN_ACCOUNT = 'Success Account login.'
const SUCCESS_UPDATED_ACCOUNT = 'Success Account updated.'
const SUCCESS_DELETED_ACCOUNT = 'Success Account deleted.'
const SUCCESS_VERIFIED_ACCOUNT = 'Success Account verified.'
const SUCCESS_RESET_ACCOUNT = 'Success a reset email has been sent.'
const SUCCESS_PASSWORD_RESET_ACCOUNT = 'Success a new password has been set, please re-login.'

//
module.exports = {
	vars: {
		ANON,
		ERROR,
		SUCCESS,
	},
	paths: {
		API_USER,
		API_USER_ANON,
		API_USER_LOGIN,
		API_USER_LOGOUT,
		API_USER_VERIFY,
		API_USER_RESET,
	},
	events: {
		CREATE_ACCOUNT,
		CREATE_ACCOUNT_ANON,
		LOGIN_ACCOUNT,
		LOGOUT_ACCOUNT,
		VERIFY_ACCOUNT,
		UPDATED_ACCOUNT,
		DELETED_ACCOUNT,
		VERIFIED_ACCOUNT,
		RESET_ACCOUNT,
	},
	messages: {
		SUCCESS_CREATED_ACCOUNT,
		SUCCESS_LOGIN_ACCOUNT,
		SUCCESS_UPDATED_ACCOUNT,
		SUCCESS_DELETED_ACCOUNT,
		SUCCESS_VERIFIED_ACCOUNT,
		SUCCESS_RESET_ACCOUNT,
		SUCCESS_PASSWORD_RESET_ACCOUNT,
	},
	errors: {
		EMAIL_IN_USE,
		ACCOUNT_MISSING,
		ACCOUNT_UNVERIFIED,
		ACCOUNT_IN_RECOVERY,
		VERIFY_LINK_MISSING,
		RECOVERY_LINK_MISSING,
		PASSWORD_INCORRECT,
	}
}
