const url = require('url')
const qs = require('querystring')

module.exports = {
  serverHandle: function (req, res) {
  	  const route = url.parse(req.url)
	  const path = route.pathname 
	  const params = qs.parse(route.query)

	  res.writeHead(200, {'Content-Type': 'text/plain'});
	  if(path ==='/'){
	  	res.write('Write in the url "/hello?name=YourName" , the app will welcome you. Little bonus if you find my name, you will have a short intro of myself')
	  }
	  else if (path === '/hello' && 'name' in params) {
	  	if(params['name']==='benoit'){
	  		res.write('Hello I am Benoit, I am french and live in Paris. I am in my final year in an engineering school')
	  	}
	    else res.write('Hello ' + params['name'])
	  } else {
	    res.write('Error 404. Message not found.')
	  }

	  res.end();
  } 
}