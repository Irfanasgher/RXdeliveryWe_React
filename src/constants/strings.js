export const PASSWORD_WARNING =
  'Password must be longer than six characters and include one uppercase letter, one lowercase letter and one number';
export const EMAIL_OR_PHONE_PLACEHOLDER = 'Email';
export const PLEASE_LOGIN = 'Please login first!';
export const VERIFICATION_EMAIL_TEXT =
  'Verification email has been sent to your email address. Please verify your email and continue with sign in';
export const ACCOUNT_CREATED_TEXT = 'Your account is created. Please proceed with sign in';

//Options in Schedule
export const nextPickup = 'Next Pickup';
export const immediate = 'Immediate';
export const schedule = 'Schedule';

//Delivery Statuses
export const status = ['pending', 'accepted', 'arrived_pickup', 'picked_up', 'dropped_off', 'arrived_dropoff'];
export const inprogressStatus = ['pending', 'accepted', 'arrived_pickup', 'picked_up', 'arrived_dropoff'];
export const exceptionStatus = ['failed'];
//roles
export const roles = {
  systemAdmin: 'SystemAdmin',
  systemUser: 'SystemUser',
  tenantAdmin: 'TenantAdmin',
  tenantUser: 'TenantUser',
};
