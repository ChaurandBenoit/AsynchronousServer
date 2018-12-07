import { LevelDb } from './leveldb'
import WriteStream from 'level-ws'

export class Metric {
  public timestamp: string
  public value: number

  constructor(ts: string, v: number) {
    this.timestamp = ts
    this.value = v
  }
}

export class MetricsHandler {
    public db: any 

    constructor(dbPath: string) {
      this.db = LevelDb.open(dbPath)
    }
   public save(key: number, metrics: Metric[], callback: (error: Error | null) => void) {
    // TypeError: level_ws_1.default is not a function
    metrics.forEach((m: Metric) => {
      this.db.put({ key: `metric:${key}${m.timestamp}`, value: m.value })
    })

    callback(null)
  }
  public get(key: string, callback: (err: Error | null, result?: Metric[]) => void) {
    const stream = this.db.createReadStream()
    var met: Metric[] = []
    stream.on('error', callback)
      .on('end', (err: Error) => {
        callback(null, met)
      })
      .on('data', (data: any) => {
        const [_, k, timestamp] = data.key.split(":")
        const value = data.value

        if (key != k) {
          console.log(`LevelDB error: ${data} does not match key ${key}`)
        } else {
          met.push(new Metric(timestamp, value))
        }
      })
     /*EncodingError: Unexpected end of JSON input
    at D:\Benoit\ECE\UX_UI\serveurAsy\AsynchronousServer\node_modules\encoding-down\index.js:124:17
    at D:\Benoit\ECE\UX_UI\serveurAsy\AsynchronousServer\node_modules\abstract-leveldown\abstract-iterator.js:29:14
    at D:\Benoit\ECE\UX_UI\serveurAsy\AsynchronousServer\node_modules\leveldown\iterator.js:45:7*/
  }

  public remove(key: any, callback: (error: Error | null) => void) {

      this.db.del(key, (err) => {
          if (err) console.log(err)
          this.db.close()
          callback(err)
      })
  }
}