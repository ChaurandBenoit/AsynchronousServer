import { LevelDB } from "./leveldb"
import WriteStream from 'level-ws'

export class User {
  public username: string
  public email: string
  private password: string = ""

  constructor(username: string, email: string, password: string, passwordHashed: boolean = false) {
    this.username = username
    this.email = email

    if (!passwordHashed) {
      this.setPassword(password)
    } else this.password = password
  }

  static fromDb(data: any): User {
    // Parse db result and return a User
    //const [ , username]= data.
  }

  public setPassword(toSet: string): void {
    // Hash and set password
  }

  public getPassword(): string {
    return this.password
  }

  public validatePassword(toValidate: String): boolean {
    // return comparison with hashed password
  }
}

export class UserHandler {
  public db: any

  public get(username: string, callback: (err: Error | null, result?: User) => void) {
    this.db.get(`user:${username}`, function (err: Error, data: any) {
      if (err) throw callback(err)
      callback(null, User.fromDb(data))
    })
  }

  public save(user: User, callback: (err: Error | null) => void) {
    // TODO
    //this.db.put(`user:$(user.username)`, )
  }

  public delete(username: string, callback: (err: Error | null) => void) {
    // TODO
  }

  constructor(path: string) {
    this.db = LevelDB.open(path)
  }
}