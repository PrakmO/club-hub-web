export interface Env {
  SERVICE_ACCOUNT_EMAIL: string;
  SERVICE_ACCOUNT_KEY: string;
  GCP_PROJECT_ID: string;
  USE_EMULATOR: string;
}

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];

// this is so stupid
export type RawFirestoreField = AtLeastOne<{
    integerValue: string;
    doubleValue: string;
    booleanValue: boolean;
    stringValue: string;
    referenceValue: string;
    mapValue: { fields: RawFirestoreFieldObject; };
    arrayValue: { values: RawFirestoreField[]; };
    nullValue: null;
    timestampValue: string;
}>;

export type RawFirestoreFieldObject = { [key: string]: RawFirestoreField };

export type FirestoreField = null | number | boolean | string | Date | FirestoreField[] | FirestoreFieldObject;

export type FirestoreFieldObject = { [key: string]: FirestoreField };

export interface FirestoreRestDocument {
  name: string;
  fields: RawFirestoreFieldObject;
  createTime: string;
  updateTime: string;
}

export interface AggregationQueryResponseItem {
  result: {
    aggregateFields: Record<string, RawFirestoreField>
  }
}

export type AggregationQueryResponse = [AggregationQueryResponseItem];

export interface QueryResponseItem {
  document?: FirestoreRestDocument,
  done: boolean
}

export type QueryResponse = QueryResponseItem[];

export enum OfficerPermission {
  Officers = 1,
  Members = 2,
  Meetings = 4,
  Messages = 8,
  Forms = 16,
  ClubDetails = 32
}

export enum ClubSignupType {
  // open to anyone
  Open,
  ApplicationRequired
}

export interface UserJwtPayload {
  name: string;
  email: string;
  email_verified: boolean;
  auth_time: number;
  user_id: string;
  firebase: {
    sign_in_provider: string;
    identities: {
      // TODO
    }
  };
  school?: string;
  interests?: number[];
  // school-wide role
  role?: string;
  // map of club id to permission bitmask
  officerOf: Record<string, OfficerPermission>
  memberOf?: string[];
}
