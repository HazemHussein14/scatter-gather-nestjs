export interface SearchResult<T> {
  data: T[];
  errors: SearchError[];
}

export interface SearchError {
  provider: string;
  error: string;
}
