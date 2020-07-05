// all constants to be used from one place to alleviate typos

// ROUTES
const API_USER = '/api/user'
const API_USER_ANON = '/api/user/anon'
const API_USER_LOGIN = '/api/user/login'
const API_USER_LOGOUT = '/api/user/logout'
const API_USER_VERIFY = '/api/user/verify'
const API_USER_RESET = '/api/user/reset'

const API_PROJECT_CREATE = '/api/project/create'
const API_PROJECTS = '/api/projects'
const API_PROJECT = (id=':project') => `/api/project/${id}`
const API_TASK_CREATE = '/api/task/create'
const API_TASKS = '/api/tasks'
const API_TASK = (id=':task') => `/api/task/${id}`

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

const CREATED_PROJECT = 'CREATED-PROJECT'
const UPDATED_PROJECT = 'UPDATED-PROJECT'
const DELETED_PROJECT = 'DELETED-PROJECT'
const UPDATE_PROGRESS_PROJECT = 'UPDATE-PROGRESS-PROJECT'

const CREATED_TASK = 'CREATED-TASK'
const UPDATED_TASK = 'UPDATED-TASK'
const DELETED_TASK = 'DELETED-TASK'

// GENERAL
const ANON = 'anon'
const ERROR = 'error'
const SUCCESS = 'success'

// ERRORS
const EMAIL_IN_USE = 'Email already in use.'
const PASSWORD_INCORRECT = 'Incorrect password.'
const ACCOUNT_MISSING = 'Account does not exist, please contact support.'
const ACCOUNT_UNVERIFIED = 'Account not verified, please verify first.'
const ACCOUNT_IN_RECOVERY = 'Account was recently put in recovery modes, please contact support.'
const VERIFY_LINK_MISSING = 'Verify link does not exist, please contact support.'
const RECOVERY_LINK_MISSING = 'Recovery link does not exist, please contact support.'
const TASK_NOT_FOUND = 'Task was not found.'
const PROJECT_NOT_FOUND = 'Project was not found.'
const MISSING_PROPERTY = 'Missing a property to update.'

// MESSAGES
const SUCCESS_CREATED_ACCOUNT = 'Success your Account is created.'
const SUCCESS_LOGIN_ACCOUNT = 'Success Account login.'
const SUCCESS_LOGOUT_ACCOUNT = 'Success Account logout.'
const SUCCESS_UPDATED_ACCOUNT = 'Success Account updated.'
const SUCCESS_DELETED_ACCOUNT = 'Success Account deleted.'
const SUCCESS_VERIFIED_ACCOUNT = 'Success Account verified.'
const SUCCESS_RESET_ACCOUNT = 'Success a reset email has been sent.'
const SUCCESS_PASSWORD_RESET_ACCOUNT = 'Success a new password has been set, please re-login.'

const SUCCESS_CREATED_PROJECT = 'Success your Project is created.'
const SUCCESS_UPDATED_PROJECT = 'Success your Project is updated.'
const SUCCESS_DELETED_PROJECT = 'Success your Project is deleted.'
const SUCCESS_FOUND_PROJECTS = 'Success Projects found: '

const SUCCESS_CREATED_TASK = 'Success your Task is created.'
const SUCCESS_UPDATED_TASK = 'Success your Task is updated.'
const SUCCESS_DELETED_TASK = 'Success your Task is deleted.'
const SUCCESS_FOUND_TASKS = 'Success Tasks found: '

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
		API_PROJECT_CREATE,
		API_PROJECTS,
		API_PROJECT,
		API_TASK_CREATE,
		API_TASKS,
		API_TASK,
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
		CREATED_PROJECT,
		UPDATED_PROJECT,
		DELETED_PROJECT,
		UPDATE_PROGRESS_PROJECT,
		CREATED_TASK,
		UPDATED_TASK,
		DELETED_TASK,
	},
	messages: {
		SUCCESS,
		SUCCESS_CREATED_ACCOUNT,
		SUCCESS_LOGIN_ACCOUNT,
		SUCCESS_LOGOUT_ACCOUNT,
		SUCCESS_UPDATED_ACCOUNT,
		SUCCESS_DELETED_ACCOUNT,
		SUCCESS_VERIFIED_ACCOUNT,
		SUCCESS_RESET_ACCOUNT,
		SUCCESS_PASSWORD_RESET_ACCOUNT,
		SUCCESS_CREATED_PROJECT,
		SUCCESS_UPDATED_PROJECT,
		SUCCESS_DELETED_PROJECT,
		SUCCESS_FOUND_PROJECTS,
		SUCCESS_CREATED_TASK,
		SUCCESS_UPDATED_TASK,
		SUCCESS_DELETED_TASK,
		SUCCESS_FOUND_TASKS,
	},
	errors: {
		EMAIL_IN_USE,
		ACCOUNT_MISSING,
		ACCOUNT_UNVERIFIED,
		ACCOUNT_IN_RECOVERY,
		VERIFY_LINK_MISSING,
		RECOVERY_LINK_MISSING,
		PASSWORD_INCORRECT,
		TASK_NOT_FOUND,
		PROJECT_NOT_FOUND,
		MISSING_PROPERTY
	}
}
