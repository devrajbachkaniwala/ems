export class Env {
  static get apiUrl(): string {
    return process.env.API_SERVER_URL || 'http://localhost:3001/graphql';
  }

  static get authUrl(): string {
    return process.env.AUTH_SERVER_URL || 'http://localhost:3000';
  }

  static get accessSalt(): string {
    return (
      process.env.ACCESS_SALT ||
      '62d81e529467e255ed4911c3925591cec7a5c1d54cdefc749a22e9ae82c402a3d44b84e6e659ca6e01eda9e921cdd17b303b181cdfea2ac0af5ea758bc191930'
    );
  }

  static get refreshSalt(): string {
    return (
      process.env.REFRESH_SALT ||
      '1ff7523195fcd04b5d1ee0b00998ecad6c575775b1fe8cfd0312d59bdaccf9e8d8508013582f5178bd36529db4783177ee432aebebd6cb5e3cf4f5777e27ae12'
    );
  }
}
