const http = require('http');
const url = require('url');
const server = http.createServer();
let messages = [
  { 'id': 4, 'user': 'alex trebek', 'message': 'answer in the form of a question' },
  { 'id': 2, 'user': 'bob loblaw', 'message': 'check out my law blog' },
  { 'id': 3, 'user': 'lorem ipsum', 'message': 'dolor set amet' }
];

server.listen(3000, () => {
  console.log('the http server is lsitening to port 3000');
});

getAllMessages = (response) => {
  response.writeHead(200, {'Content-type': 'text/plain' });
  response.write(JSON.stringify(messages));
  response.end();
}

server.on('request', (request, response) => {
  if (request.method === 'GET') {
    getAllMessages(response);
  }

  else if (request.method === 'POST') {
    let newMessage = messages[0];

    request.on('data', (data) => {
      newMessage = Object.assign(newMessage, JSON.parse(data));
    });

    request.on('end', () => {
      addMessage(newMessage, response);
    });
  }
});

addMessage = (newMessage, response) => {
  response.writeHead(200, {'Content-type': 'text/plain' });
  response.write(JSON.stringify(newMessage));
  response.end();
}