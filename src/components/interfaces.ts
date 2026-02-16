export interface ResponseConfig {
  message: string;
}

export type DataRes<T> = ResponseConfig & {
  data: T;
};

export type ListRes<T> = ResponseConfig & {
  data: T[];
};

export interface User {
  display_name: string;
  email: string;
  profile_url: string;
  uid: string;
  createdAt: number;
  accessToken?: string;
  refreshToken?: string;
}

export interface Doc {
  doc_id: string;
  doc_text: string;
  doc_name: string;
  uid: string;
  doc_created: number;
  lastUpdated: number;
  clientOnlyDoc?: boolean;
  deleted?: boolean;
}

// deprecatted for new api
export interface AuthResponseConfig extends ResponseConfig {
  credentials: User | null;
}

export interface docResponse extends ResponseConfig {
  docData: Doc[];
}
// depracatedd for new api

export interface singleDocResponse extends ResponseConfig {
  docData: Doc | null;
}

export type SortField = "doc_created" | "lastUpdated";
export type sortOrder = "asc" | "desc";
