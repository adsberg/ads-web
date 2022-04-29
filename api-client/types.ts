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
  content?: Maybe<AdContent>;
  createdAt: Scalars['Timestamp'];
  expiresAt?: Maybe<Scalars['Timestamp']>;
  id: Scalars['String'];
  images: Array<TypeImage>;
  /** User input price */
  inputPrice?: Maybe<Monetary>;
  lastPublishedAt?: Maybe<Scalars['Timestamp']>;
  /** System currency price */
  price?: Maybe<Monetary>;
  status: AdStatus;
  tags: Array<Tag>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['Timestamp']>;
  user: PublicUser;
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

export type AdItem = {
  __typename?: 'AdItem';
  createdAt: Scalars['Timestamp'];
  expiresAt?: Maybe<Scalars['Timestamp']>;
  id: Scalars['String'];
  images: Array<TypeImage>;
  /** User input price */
  inputPrice?: Maybe<Monetary>;
  lastPublishedAt?: Maybe<Scalars['Timestamp']>;
  /** System currency price */
  price?: Maybe<Monetary>;
  status: AdStatus;
  tags: Array<Tag>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['Timestamp']>;
  userId: Scalars['String'];
};

export type AdPrototype = {
  __typename?: 'AdPrototype';
  createdAt: Scalars['Timestamp'];
  currencyCode?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  id: Scalars['String'];
  price?: Maybe<Scalars['BigInt']>;
  source: AdPrototypeSource;
  tags: Array<Tag>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['Timestamp']>;
};

export enum AdPrototypeSource {
  Okazii = 'OKAZII',
  Olx = 'OLX',
  Phonemore = 'PHONEMORE'
}

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

export type InputChangePassword = {
  newPassword: Scalars['String'];
  newPasswordRepeat: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type InputCreateAdContent = {
  content: Scalars['String'];
  format: AdContentFormat;
};

export type InputCreatePropertySchema = {
  allowCreate?: InputMaybe<Scalars['Boolean']>;
  defaultValueId?: InputMaybe<Scalars['ID']>;
  isUserInput: Scalars['Boolean'];
  max?: InputMaybe<Scalars['Float']>;
  maxFunction?: InputMaybe<PropertyValueFunction>;
  maxItems?: InputMaybe<Scalars['Int']>;
  min?: InputMaybe<Scalars['Float']>;
  minFunction?: InputMaybe<PropertyValueFunction>;
  minItems?: InputMaybe<Scalars['Int']>;
  pattern?: InputMaybe<Scalars['String']>;
  priority: Scalars['Int'];
  propertyId: Scalars['ID'];
  required?: InputMaybe<Scalars['Boolean']>;
  type: PropertyValueType;
  unitIds?: InputMaybe<Array<Scalars['ID']>>;
  valueIds?: InputMaybe<Array<Scalars['ID']>>;
};

export type InputFindOrCreateTag = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  numberValue?: InputMaybe<Scalars['Float']>;
  priority?: InputMaybe<Scalars['Int']>;
  propertyId?: InputMaybe<Scalars['ID']>;
  shortName?: InputMaybe<Scalars['String']>;
  stringValue?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TagType>;
  unitId?: InputMaybe<Scalars['ID']>;
  wikiDataId?: InputMaybe<Scalars['String']>;
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
  content?: InputMaybe<InputCreateAdContent>;
  currencyCode?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  images?: InputMaybe<Array<Scalars['ID']>>;
  price?: InputMaybe<Scalars['BigInt']>;
  tags?: InputMaybe<Array<Scalars['ID']>>;
  title?: InputMaybe<Scalars['String']>;
  userPhoneId?: InputMaybe<Scalars['ID']>;
};

export type InputSaveAdPrototype = {
  currencyCode?: InputMaybe<Scalars['String']>;
  description: Scalars['String'];
  id: Scalars['String'];
  price?: InputMaybe<Scalars['BigInt']>;
  source: AdPrototypeSource;
  /** Tag ids */
  tags: Array<Scalars['String']>;
  title: Scalars['String'];
};

export type InputUpdatePropertySchema = {
  allowCreate?: InputMaybe<Scalars['Boolean']>;
  defaultValueId?: InputMaybe<Scalars['ID']>;
  id: Scalars['ID'];
  isUserInput?: InputMaybe<Scalars['Boolean']>;
  max?: InputMaybe<Scalars['Float']>;
  maxFunction?: InputMaybe<PropertyValueFunction>;
  maxItems?: InputMaybe<Scalars['Int']>;
  min?: InputMaybe<Scalars['Float']>;
  minFunction?: InputMaybe<PropertyValueFunction>;
  minItems?: InputMaybe<Scalars['Int']>;
  pattern?: InputMaybe<Scalars['String']>;
  priority?: InputMaybe<Scalars['Int']>;
  required?: InputMaybe<Scalars['Boolean']>;
  unitIds?: InputMaybe<Array<Scalars['ID']>>;
  valueIds?: InputMaybe<Array<Scalars['ID']>>;
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
  changePassword: Jwt;
  createPropertySchema: PropertySchema;
  deleteTag: Scalars['Boolean'];
  findOrCreateTag: Tag;
  forgotPassword: Scalars['Boolean'];
  login: Jwt;
  logout: Scalars['Boolean'];
  register: Jwt;
  resetPassword: Scalars['Boolean'];
  saveAd: Ad;
  saveAdPrototype: AdPrototype;
  updatePropertySchema: PropertySchema;
  uploadImage: TypeImage;
  verifyEmail: Scalars['Boolean'];
};


export type MutationAddPhoneArgs = {
  phone: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  input: InputChangePassword;
};


export type MutationCreatePropertySchemaArgs = {
  input: InputCreatePropertySchema;
};


export type MutationDeleteTagArgs = {
  id: Scalars['String'];
};


export type MutationFindOrCreateTagArgs = {
  input: InputFindOrCreateTag;
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


export type MutationSaveAdPrototypeArgs = {
  input: InputSaveAdPrototype;
};


export type MutationUpdatePropertySchemaArgs = {
  input: InputUpdatePropertySchema;
};


export type MutationUploadImageArgs = {
  file: Scalars['Upload'];
};


export type MutationVerifyEmailArgs = {
  token: Scalars['String'];
};

export type PropertySchema = {
  __typename?: 'PropertySchema';
  allowCreate?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['Timestamp'];
  defaultValueId?: Maybe<Scalars['ID']>;
  id: Scalars['String'];
  isUserInput: Scalars['Boolean'];
  max?: Maybe<Scalars['Float']>;
  maxFunction?: Maybe<PropertyValueFunction>;
  maxItems?: Maybe<Scalars['Int']>;
  min?: Maybe<Scalars['Float']>;
  minFunction?: Maybe<PropertyValueFunction>;
  minItems?: Maybe<Scalars['Int']>;
  pattern?: Maybe<Scalars['String']>;
  priority: Scalars['Int'];
  propertyId: Scalars['ID'];
  required?: Maybe<Scalars['Boolean']>;
  type: PropertyValueType;
  unitIds?: Maybe<Array<Scalars['ID']>>;
  updatedAt?: Maybe<Scalars['Timestamp']>;
  valueIds?: Maybe<Array<Scalars['ID']>>;
};

export enum PropertyValueFunction {
  CurrentYear = 'CURRENT_YEAR',
  Minus1Year = 'MINUS1YEAR'
}

export enum PropertyValueType {
  Date = 'DATE',
  Number = 'NUMBER',
  String = 'STRING'
}

export type PublicUser = {
  __typename?: 'PublicUser';
  createdAt: Scalars['Timestamp'];
  id: Scalars['String'];
  lastLoginAt?: Maybe<Scalars['Timestamp']>;
  updatedAt?: Maybe<Scalars['Timestamp']>;
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Returns false if user already exists */
  checkEmail: Scalars['Boolean'];
  /** Returns false if user already exists */
  checkUsername: Scalars['Boolean'];
  errorCodes: Array<ErrorCode>;
  findAd: Array<AdItem>;
  findTags: Array<Tag>;
  getAd?: Maybe<Ad>;
  getPropertySchema?: Maybe<PropertySchema>;
  getTag?: Maybe<Tag>;
  me?: Maybe<User>;
  publicFindAd: Array<AdItem>;
  suggestAdProps: Array<Tag>;
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


export type QueryFindAdArgs = {
  allTagIds?: InputMaybe<Array<Scalars['ID']>>;
  anyTagIds?: InputMaybe<Array<Scalars['ID']>>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  limit: Scalars['Int'];
  maxPrice?: InputMaybe<Scalars['BigInt']>;
  minPrice?: InputMaybe<Scalars['BigInt']>;
  offset?: InputMaybe<Scalars['Int']>;
  omitIds?: InputMaybe<Array<Scalars['ID']>>;
  omitStatus?: InputMaybe<Array<AdStatus>>;
  status?: InputMaybe<Array<AdStatus>>;
  userId?: InputMaybe<Scalars['ID']>;
};


export type QueryFindTagsArgs = {
  ids?: InputMaybe<Array<Scalars['ID']>>;
  limit: Scalars['Int'];
  offset?: InputMaybe<Scalars['Int']>;
  omitIds?: InputMaybe<Array<Scalars['ID']>>;
  omitTypes?: InputMaybe<Array<Scalars['ID']>>;
  query?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TagType>;
};


export type QueryGetAdArgs = {
  id: Scalars['ID'];
};


export type QueryGetPropertySchemaArgs = {
  id: Scalars['ID'];
};


export type QueryGetTagArgs = {
  id: Scalars['ID'];
};


export type QueryPublicFindAdArgs = {
  allTagIds?: InputMaybe<Array<Scalars['ID']>>;
  anyTagIds?: InputMaybe<Array<Scalars['ID']>>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  limit: Scalars['Int'];
  maxPrice?: InputMaybe<Scalars['BigInt']>;
  minPrice?: InputMaybe<Scalars['BigInt']>;
  offset?: InputMaybe<Scalars['Int']>;
  omitIds?: InputMaybe<Array<Scalars['ID']>>;
  userId?: InputMaybe<Scalars['ID']>;
};


export type QuerySuggestAdPropsArgs = {
  description?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
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
  numberValue?: Maybe<Scalars['Float']>;
  property?: Maybe<Tag>;
  propertyId?: Maybe<Scalars['ID']>;
  schema?: Maybe<PropertySchema>;
  /** Admin only */
  searchText?: Maybe<Scalars['String']>;
  shortName?: Maybe<Scalars['String']>;
  status: TagStatus;
  stringValue?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  type: TagType;
  unit?: Maybe<Tag>;
  unitId?: Maybe<Scalars['ID']>;
  updatedAt?: Maybe<Scalars['Timestamp']>;
};

export enum TagStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export enum TagType {
  Property = 'PROPERTY',
  Tag = 'TAG',
  Unit = 'UNIT'
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
