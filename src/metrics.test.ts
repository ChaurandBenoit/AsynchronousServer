/*import { expect } from 'chai'
var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});*/

/*import { expect } from 'chai'
import { Metric, MetricsHandler } from './metrics'
import { LevelDB } from "./leveldb"

const dbPath: string = 'db_test'
var dbMet: MetricsHandler

describe('Metrics', function () {
  before(function () {
    LevelDB.clear(dbPath)
    dbMet = new MetricsHandler(dbPath)
  })

  after(function () {
    dbMet.db.close()
  })

  	describe('#get', function () {
	  it('should get empty array on non existing group', function () {
	    dbMet.get("0", function (err: Error | null, result?: Metric[]) {
	      expect(err).to.be.null
	      expect(result).to.not.be.undefined
	      expect(result).to.be.an('array')
	      expect(result).to.be.empty
	    })
	  })
	})

	describe('#save', function(){
		const mectrics: Metric[]=[new Metric()]
		it('should save data', function(){

		})
		it('should update data', function(){

		})
	})

	describe('#delete',function(){
		it('should delete data', function(){

		})

		it('should not fail if data does not exist', function(){

		})
	})
})*/