export * from './strings';

export const DEFAULT_META_DESCRIPTION = '';
export const DEFAULT_META_KEYWORDS = '';

export const DATE_ONLY = 'MM/DD/YYYY';
export const MID_DATE = 'MMMM Do YYYY';
export const FULL_DATE_TIME = 'MM/DD/YYYY, h:mm a';
export const TIME_ONLY = 'h:mm a';

// eslint-disable-next-line
export const REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// export const REGEX_PHONE_NUMBER = /^\+?[1-9]\d{8,20}$/;
// export const REGEX_PHONE_NUMBER = /^\+(?:[0-9]?)[0-9]{8,14}$/;
export const REGEX_PHONE_NUMBER = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const REGEX_NAME = /^.{1,50}$/;
export const WHITESPACE_REGEX = /(.|\s)*\S(.|\s)*/;
// eslint-disable-next-line
export const SPECIAL_CHARACTERS = /^((?!([$#%])).)*$/;
// eslint-disable-next-line
export const PASSWORD_REGEX = /^(?=.*[a-z].*)(?=.*[A-Z].*)(?=.*\d.*)[a-zA-Z\d`~!@#$%^&*()_+-=\[\]\{\}\\\|\'\"\;\:\/\?\.\>\,\<]{6,}$/;

// export const URL_REGEX = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
// eslint-disable-next-line
export const URL_REGEX = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

export const INT_REGEX = /^[0-9]*$/;
export const POSITIVE_INT_REGEX = /^[1-9][0-9]*$/;
export const FLOAT_REGEX = /^[+-]?([0-9]*[.])?[0-9]+$/;
export const POSITIVE_FLOAT_REGEX = /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/;
