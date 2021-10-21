export type Nullable<T> = T | null;

export interface UserApiInfo {
  page: number;
  results: string;
  seed: string;
  version: string | number;
  gender?: string;
  nat?: string;
}

export interface Location {
  city: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  country: string;
  postcode: number;
  state: string;
  street: {
    number: number;
    name: string;
  };
  timezone: {
    offset: string;
    description: string;
  };
}

export interface UserName {
  title: string;
  first: string;
  last: string;
}

export interface Login {
  md5: string;
  password: string;
  salt: string;
  sha1: string;
  sha256: string;
  username: string;
  uuid: string;
}
export interface UserData {
  cell: string;
  email: string;
  gender: string;
  id: { name: string; value: string };
  location: Location;
  name: UserName;
  login: Login;
  nat: string;
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  dob: {
    date: string;
    age: number;
  };
}

export interface Users {
  results: Nullable<UserData[]>;
  info: Nullable<UserApiInfo>;
}

export interface Filters {
  name: any;
  gender: string;
  nat: string;
}
