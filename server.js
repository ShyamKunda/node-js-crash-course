import http from 'http';
import getUsers from './usersController.js';


const PORT = 8000;

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  };

// JSON middleware
const jsonMiddleware = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
};

// Route handler for GET /api/users
const getUsersHandler = (req, res) => {
    const users = getUsers();
    console.log(JSON.stringify(users))
    res.write(JSON.stringify(users));
    res.end();
};

const getUsersByIdHandler = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const targetId = req.url.split("/")[3];
    console.log(`Target Id : ${targetId}`)
    const users = getUsers();
    console.log(users);
    const targetUser  = users.filter(user => user.id == targetId);
    console.log(targetUser);
    res.write(JSON.stringify(targetUser));
    res.end()
}

const server = http.createServer(async (req, res) => {
    logger(req, res, () => {
        jsonMiddleware(req, res, () => {
            if (req.url === "/") {
                res.write("Hello world")
                res.end();
            } else if (req.url === '/api/users' && req.method === 'GET'){
                getUsersHandler(req, res)
            } else if (req.url.match(/\/api\/users\/([0-9]+)/) &&req.method === 'GET') {
                getUsersByIdHandler(req, res)
            }
        });
    });
    
    
    
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});