export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `BigInt` 53 bit scalar type. Exactly like Int, except it allows larger values */
  BigInt: any;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Ad = {
  __typename?: 'Ad';
  categoryId: Scalars['String'];
  content?: Maybe<AdContent>;
  createdAt: Scalars['Timestamp'];
  id: Scalars['String'];
  images: Array<TypeImage>;
  /** User input price */
  inputPrice?: Maybe<Monetary>;
  lastPublishedAt?: Maybe<Scalars['Timestamp']>;
  /** System currency price */
  price?: Maybe<Monetary>;
  propertyValues: Array<AdPropertyValue>;
  status: AdStatus;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['Timestamp']>;
  userId: Scalars['String'];
  userPhoneId?: Maybe<Scalars['String']>;
};

export type AdContent = {
  __typename?: 'AdContent';
  content: Scalars['String'];
  format: AdContentFormat;
};

export enum AdContentFormat {
  Md = 'MD'
}

export type AdPropertyValue = {
  __typename?: 'AdPropertyValue';
  adId: Scalars['String'];
  createdAt: Scalars['Timestamp'];
  id: Scalars['String'];
  inputUnitId: Scalars['String'];
  inputValue: Scalars['String'];
  propertyId: Scalars['String'];
  type: TagValueType;
  unitId: Scalars['String'];
  updatedAt?: Maybe<Scalars['Timestamp']>;
  value: Scalars['String'];
};

export enum AdStatus {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Draft = 'DRAFT',
  Inactive = 'INACTIVE'
}

export enum ErrorCode {
  Duplication = 'DUPLICATION',
  EmailExists = 'EMAIL_EXISTS',
  Forbidden = 'FORBIDDEN',
  InternalServerError = 'INTERNAL_SERVER_ERROR',
  InvalidCredentials = 'INVALID_CREDENTIALS',
  InvalidInput = 'INVALID_INPUT',
  InvalidOldPassword = 'INVALID_OLD_PASSWORD',
  NewPasswordSameAsOld = 'NEW_PASSWORD_SAME_AS_OLD',
  NotFound = 'NOT_FOUND',
  PasswordDoesNotMatch = 'PASSWORD_DOES_NOT_MATCH',
  Unauthenticated = 'UNAUTHENTICATED',
  UsernameExists = 'USERNAME_EXISTS',
  UserEmailNotFound = 'USER_EMAIL_NOT_FOUND',
  Validation = 'VALIDATION',
  WeakPassword = 'WEAK_PASSWORD'
}

export type InputAddTag = {
  description?: InputMaybe<Scalars['String']>;
  iconId?: InputMaybe<Scalars['ID']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  parentId?: InputMaybe<Scalars['ID']>;
  shortName?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TagType>;
};

export type InputChangePassword = {
  newPassword: Scalars['String'];
  newPasswordRepeat: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type InputCreateAd = {
  categoryId: Scalars['String'];
  content?: InputMaybe<InputCreateAdContent>;
  currencyCode?: InputMaybe<Scalars['String']>;
  imageIds?: InputMaybe<Array<Scalars['String']>>;
  price?: InputMaybe<Scalars['BigInt']>;
  propertyValues?: InputMaybe<Array<InputCreateAdProperty>>;
  title?: InputMaybe<Scalars['String']>;
  userPhoneId?: InputMaybe<Scalars['String']>;
};

export type InputCreateAdContent = {
  content: Scalars['String'];
  format: AdContentFormat;
};

export type InputCreateAdProperty = {
  propertyId: Scalars['String'];
  unitId?: InputMaybe<Scalars['String']>;
  value: Scalars['String'];
};

export type InputRegister = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type InputResetPassword = {
  confirmNewPassword: Scalars['String'];
  newPassword: Scalars['String'];
  token: Scalars['String'];
};

export type InputSaveAd = {
  add?: InputMaybe<InputSaveAdAdd>;
  id: Scalars['String'];
  remove?: InputMaybe<InputSaveAdAdd>;
  set?: InputMaybe<InputSaveAdSet>;
};

export type InputSaveAdAdd = {
  imageIds?: InputMaybe<Array<Scalars['String']>>;
  propertyValues?: InputMaybe<Array<InputCreateAdProperty>>;
};

export type InputSaveAdSet = {
  content?: InputMaybe<InputCreateAdContent>;
  currencyCode?: InputMaybe<Scalars['String']>;
  imageIds?: InputMaybe<Array<Scalars['String']>>;
  price?: InputMaybe<Scalars['BigInt']>;
  propertyValues?: InputMaybe<Array<InputCreateAdProperty>>;
  title?: InputMaybe<Scalars['String']>;
  userPhoneId?: InputMaybe<Scalars['String']>;
};

export type Jwt = {
  __typename?: 'JWT';
  /** User id */
  id: Scalars['String'];
  /**
   * A JSON Web Token used for authentication.
   * 			The server expects it in the Bearer token format,
   * 			which is in the Authorization header.
   */
  token: Scalars['String'];
};

export type Monetary = {
  __typename?: 'Monetary';
  currencyCode: Scalars['String'];
  value: Scalars['BigInt'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addPhone: UserPhone;
  addTag: Tag;
  changePassword: Jwt;
  createAd: Ad;
  forgotPassword: Scalars['Boolean'];
  login: Jwt;
  logout: Scalars['Boolean'];
  register: Jwt;
  resetPassword: Scalars['Boolean'];
  saveAd: Ad;
  uploadImage: TypeImage;
  verifyEmail: Scalars['Boolean'];
};


export type MutationAddPhoneArgs = {
  phone: Scalars['String'];
};


export type MutationAddTagArgs = {
  input: InputAddTag;
};


export type MutationChangePasswordArgs = {
  input: InputChangePassword;
};


export type MutationCreateAdArgs = {
  input: InputCreateAd;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLogoutArgs = {
  deviceToken?: InputMaybe<Scalars['String']>;
};


export type MutationRegisterArgs = {
  input: InputRegister;
};


export type MutationResetPasswordArgs = {
  input: InputResetPassword;
};


export type MutationSaveAdArgs = {
  input: InputSaveAd;
};


export type MutationUploadImageArgs = {
  file: Scalars['Upload'];
};


export type MutationVerifyEmailArgs = {
  token: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Returns false if user already exists */
  checkEmail: Scalars['Boolean'];
  /** Returns false if user already exists */
  checkUsername: Scalars['Boolean'];
  errorCodes: Array<ErrorCode>;
  me?: Maybe<User>;
  testItem?: Maybe<TestItem>;
  testItems: Array<TestItem>;
  validatePasswordResetToken: Scalars['Boolean'];
};


export type QueryCheckEmailArgs = {
  email: Scalars['String'];
};


export type QueryCheckUsernameArgs = {
  username: Scalars['String'];
};


export type QueryTestItemArgs = {
  id: Scalars['String'];
};


export type QueryValidatePasswordResetTokenArgs = {
  token: Scalars['String'];
};

export type Tag = {
  __typename?: 'Tag';
  createdAt: Scalars['Timestamp'];
  description?: Maybe<Scalars['String']>;
  icon?: Maybe<TypeImage>;
  iconId?: Maybe<Scalars['ID']>;
  id: Scalars['String'];
  name: Scalars['String'];
  parent?: Maybe<Tag>;
  parentId?: Maybe<Scalars['ID']>;
  shortName?: Maybe<Scalars['String']>;
  status: TagStatus;
  symbol?: Maybe<Scalars['String']>;
  type: TagType;
  updatedAt?: Maybe<Scalars['Timestamp']>;
};

export enum TagStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export enum TagType {
  Category = 'CATEGORY',
  Property = 'PROPERTY',
  Unit = 'UNIT',
  Value = 'VALUE'
}

export enum TagValueType {
  Date = 'DATE',
  Float = 'FLOAT',
  Integer = 'INTEGER',
  String = 'STRING',
  TagId = 'TAG_ID'
}

export type TestItem = {
  __typename?: 'TestItem';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type TypeImage = {
  __typename?: 'TypeImage';
  color?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  contentType: Scalars['String'];
  createdAt: Scalars['Timestamp'];
  hash: Scalars['String'];
  height: Scalars['Int'];
  id: Scalars['String'];
  length?: Maybe<Scalars['Int']>;
  originalName?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Timestamp']>;
  url: Scalars['String'];
  width: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Timestamp'];
  email: Scalars['String'];
  id: Scalars['String'];
  isEmailVerified: Scalars['Boolean'];
  lastLoginAt?: Maybe<Scalars['Timestamp']>;
  role: UserRole;
  updatedAt?: Maybe<Scalars['Timestamp']>;
  username: Scalars['String'];
};

export type UserPhone = {
  __typename?: 'UserPhone';
  createdAt: Scalars['Timestamp'];
  id: Scalars['String'];
  phone: Scalars['String'];
  status: UserPhoneStatus;
  updatedAt?: Maybe<Scalars['Timestamp']>;
  userId: Scalars['String'];
};

export enum UserPhoneStatus {
  Deleted = 'DELETED',
  Unknown = 'UNKNOWN',
  Verified = 'VERIFIED'
}

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}
