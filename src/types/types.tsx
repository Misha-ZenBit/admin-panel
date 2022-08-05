export interface ICat {
  id: string;
  name: string;
  affirmations: string[];
  color?: string | undefined;
}

export interface IAff {
  id: string;
  answer: string;
  description: string;
}

export interface Auth {
  email: string;
  password: string;
}

export interface User {
  id: string;
  categories: string[];
}
