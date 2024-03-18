// user.model.ts
export interface User {
  name: string;
  email: string;
  password: string;
}


export interface AuthLogin {
  email: string;
  password: string;
}

export interface AuthSignup {
  username: string;
  email: string;
  password: string;
  affiliate: string;
}

export interface AuthResponse {
  json: {
    token: string;
    id: string;
    username: string;
    afiliado: string;
    is_admin: string;
  }
}
