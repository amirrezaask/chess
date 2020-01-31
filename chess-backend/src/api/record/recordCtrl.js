export const asking = (req, res) => {
    const { socket: socketId, type } = req.body;
    const socketToKeyMap = req.app.get('socketToKey');
    const key = socketToKeyMap.get(socketId);
    const gameMap = req.app.get('game');
    const game = gameMap.get(key);

    if(!game.start) {
        console.dir(`The game is not running now`);
        return res.status(403).send({ error: `The game is not running now` });
    }

    const player = game._black === req.sessionID ? 'black': (game._white === req.sessionID ? 'white' : 'spectator');
    if(player === 'spectator') {
        console.dir(`You're just a spectator`);
        return res.status(403).send({ error: `You're just a spectator` });
    }

    const enemy = player === 'white' ? 'black' : 'white';

    const socketSet = req.app.get('session').get(game[`_${enemy}`]).get(key).get('/record');
    console.dir(socketSet);
    [ ...socketSet ].forEach(socket => {
        socket.emit('message', {
            type: 'notify',
            ask: type,
        })
    });
};

export const answering = (req, res) => {
    const { socket: socketId, type, answer } = req.body;
    const socketToKeyMap = req.app.get('socketToKey');
    const key = socketToKeyMap.get(socketId);
    const gameMap = req.app.get('game');
    const game = gameMap.get(key);

    if(!game.start) {
        console.dir(`The game is not running now`);
        return res.status(403).send({ error: `The game is not running now` });
    }

    const player = game._black === req.sessionID ? 'black': (game._white === req.sessionID ? 'white' : 'spectator');
    if(player === 'spectator') {
        console.dir(`You're just a spectator`);
        return res.status(403).send({ error: `You're just a spectator` });
    }

    const enemy = player === 'white' ? 'black' : 'white';

    const socketSet = req.app.get('session').get(game[`_${enemy}`]).get(key).get('/record');
    console.dir(socketSet);
    let message= '';
    if(answer) {
        message = 'Your request has been accepted';
    } else {
        message = `Your request has been declined`;
    }

    [ ...socketSet ].forEach(socket => {
        socket.emit('message', {
            type: 'notify',
            answer: type,
            message,
        })
    });
}