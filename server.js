import http from 'http';
import getUsers from './usersController.js';


const PORT = 8000;

const server = http.createServer(async (req, res) => {

    if (req.url === "/") {
        res.setHeader('Content-Type', 'text/html');
        res.write("Hello world")
        res.end();
    } else if (req.url === '/api/users' && req.method === 'GET'){
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(getUsers()));
        res.end()
    } else if (req.url.match(/\/api\/users\/([0-9]+)/) &&req.method === 'GET') {
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
    
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});