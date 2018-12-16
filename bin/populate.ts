#!/usr/bin/env ts-node

import { Metric, MetricsHandler } from '../src/metrics'
import { UserHandler } from '../src/user'

const dbUser = new UserHandler('db/users')
const user1 = {
	'username' : 'Benoit',
	'email' : 'benoit@mail.fr',
	'password' : 'monPassWord'
}

const user2 = {
	'username' : 'Chaurand',
	'email' : 'chaurand@mail.fr',
	'password' : 'mdpHash'
}

dbUser.save(user1, (err: Error | null) =>{
	if (err) throw err
	console.log('User saved')
})

dbUser.save(user2, (err: Error | null) =>{
	if (err) throw err
	console.log('User saved')
})

const met1 = [
  new Metric(`${new Date('2013-11-04 14:00 UTC').getTime()}`, 12),
  new Metric(`${new Date('2013-11-04 14:15 UTC').getTime()}`, 10),
  new Metric(`${new Date('2013-11-04 14:30 UTC').getTime()}`, 8)
]

const met2 = [
  new Metric(`${new Date('2018-11-04 14:00 UTC').getTime()}`, 2),
  new Metric(`${new Date('2018-11-04 14:15 UTC').getTime()}`, 4),
  new Metric(`${new Date('2018-11-04 14:30 UTC').getTime()}`, 6)
]

const db = new MetricsHandler('./db/metrics')

db.save('Benoit', met1, (err: Error | null) => {
  if (err) throw err
  console.log('Data populated')
})

db.save('Chaurand', met2, (err: Error | null) => {
  if (err) throw err
  console.log('Data populated')
})