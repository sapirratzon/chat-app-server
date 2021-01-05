var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()

let rooms = [{id: '1', name: 'First Room', lastMessage:'', visited: false, messages: []},
    {id: '2', name: 'Second Room', lastMessage:'', visited: false, messages: []}];

/**
 * Return the existing chat rooms
 */
router.post('/getChatRooms', (req, res) => {
    res.send(JSON.stringify(rooms)).status(200);
});

/**
 * Store message in the room's messages array
 */
router.post('/sendMessage', jsonParser, (req, res) => {
    let room = rooms.find(room => room.id === req.body.roomId);
    if (room) {
        room["messages"] = [...room["messages"], req.body.message];
        room["lastMessage"] = req.body.message.text;
        res.send(JSON.stringify(room["messages"])).status(200);
    } else
        res.send().status(401);
});

/**
 * Return all messages of room
 */
router.post('/getAllMessages', jsonParser, (req, res) => {
    const allMessages = rooms.find(room => room.id === req.body.roomId).messages;
    if (allMessages)
        res.send(JSON.stringify(allMessages)).status(200);
    else
        res.send().status(401);
});

module.exports = router;
