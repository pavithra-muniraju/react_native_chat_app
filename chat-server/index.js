import { Server } from "socket.io";

const io = new Server({
    cors: {
        origin: ['http://localhost:8081']
    }
});

const generateMessageId = () => Math.random().toString(36).substring(2,10);

let chatRooms = [
    {
        roomId: 'GL-01',
        roomName: 'General Chat',
        description: 'The chat room for any and everything',
        messages: [
            {
                id: 1,
                content: 'Welcome to general chat!',
                sent: 'N/A',
                user: 'Admin'
            },
            {
                id: 2,
                content: 'Big sale tomorrow at 3:27 pm.',
                sent: 'N/A',
                user: 'Admin'
            },
            {
                id: 3,
                content: 'Testing.',
                sent: 'N/A',
                user: 'Admin'
            },
        ]
    },
    {
        roomId: 'GL-02',
        roomName: 'Branding Chat',
        description: 'The chat room for Globomatic brands.',
        messages: [
            {
                id: 1,
                content: 'Welcome to the brand chat!',
                sent: 'N/A',
                user: 'Admin'
            },
            {
                id: 2,
                content: 'Automotive brand in introducing a new vehicle.',
                sent: 'N/A',
                user: 'Admin'
            },
        ]
    },
    {
        roomId: 'GL-03',
        roomName: 'Robotics Chat',
        description: 'The chat room for Robotics technology.',
        messages: [
            {
                id: 1,
                content: 'This chat is broken. Do not respond.',
                sent: 'N/A',
                user: 'Admin'
            },
        ]
    },
];

console.log("Chat Started");

io.on('connection', (socket)=> {
    console.log(`connect: ${socket.id}`, socket.request.headers);

    socket.on('disconnect', () => {
        console.log(`disconnect: ${socket.id}`);
    });

    socket.on('getRooms', ()=> {
        console.log(`returning room List: `, chatRooms);
        socket.emit('returnRooms', chatRooms);
    });

    socket.on('connectRoom', (id) => {
        let chosenRoom = chatRooms.filter((room) => room.roomId == id );
        socket.join(chosenRoom[0].roomName);
        console.log('joined room :', chatRooms[0].roomName);
        socket.emit('join room', chosenRoom[0].messages)
    });

    socket.on('newPost', (data) => {
        const { userMessage, room_id, sender, messageTime} = data;
        let selectedRoom = chatRooms.filter((room) => room.roomId == room_id);
        const addMessage = {
            id: generateMessageId(),
            content : userMessage,
            sent: messageTime,
            user: sender
        };
        console.log('New Post: ', addMessage);
        socket.to(selectedRoom[0].roomName);
        selectedRoom[0].messages.push(addMessage);

        io.to(selectedRoom[0].roomName).emit('newMessage', selectedRoom[0].messages);
        console.log('EMitted Msg :', addMessage)
    });
});

io.listen(3000)