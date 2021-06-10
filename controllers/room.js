const errorHandler = require('../utils/errorHandler');

const Room = require('../models/Room');
const Conveniences = require('../models/Conveniences');
const RoomConveniences = require('../models/RoomConveniences');

async function transform_conveniences(conveniences, roomId) {
    // Transform the "conveniences" list to add to the "RoomConveniences" table
    let room_conveniences_list = [];
    conveniences.map(( item ) => {
        room_conveniences_list.push( {
            roomId: roomId,
            convenienceId: item._id
        })
    });
    return room_conveniences_list;
}

module.exports.createRoom = async function(req, res) {
    try {
        const { room, conveniences } = req.body;

        if (!room.type || room.type === "") {
            return res.status(401).json({
                success: false,
                massage: "В обьекте room поле type пустое."
            });
        }

        const roomNew = new Room({
            type: room.type,
            costPerDay: room.costPerDay,
            numberBerths: room.numberBerths,
            area: room.area,
            numberRooms: room.numberRooms,
            address: room.address,
        });

        let room_conveniences_list = await transform_conveniences(conveniences, roomNew._id);

        await roomNew.save();

        await RoomConveniences.create(room_conveniences_list);

        res.status(201).json({
            room: roomNew,
            conveniences: conveniences
        });
    } catch(e) {
        errorHandler(res, e);
    }
}

module.exports.updateRoom = async function(req, res) {
    try {
        const { room, conveniences } = req.body;

        if (!room.type || room.type === "") {
            return res.status(401).json({
                success: false,
                massage: "В обьекте room поле type пустое."
            });
        }

        if (!room._id || room._id === "") {
            return res.status(401).json({
                success: false,
                massage: "В обьекте room поле _id пустое."
            });
        }

        const roomUpdate = await Room.findOne({
            _id: room._id
        });

        if (!roomUpdate) {
            return res.status(404).json({
                success: false,
                massage: `Номер с id: ${room._id}, не найдено.`
            });
        }

        // update Room data
        roomUpdate.type = room.type;
        roomUpdate.costPerDay = room.costPerDay;
        roomUpdate.numberBerths = room.numberBerths;
        roomUpdate.area = room.area;
        roomUpdate.numberRooms = room.numberRooms;
        roomUpdate.address = room.address;

        let room_conveniences_list = await transform_conveniences(conveniences, room._id);

        await roomUpdate.save();

        await RoomConveniences.deleteMany({
            roomId: room._id
        });

        await RoomConveniences.create(room_conveniences_list);

        res.status(201).json({
            room: roomUpdate,
            conveniences: conveniences
        });
    } catch(e) {
        errorHandler(res, e);
    }
}

module.exports.deleteRoom = async function(req, res) {
    try {
        const { room } = req.body;

        if (!room._id || room._id === "") {
            return res.status(401).json({
                success: false,
                massage: "Поле _id пустое."
            });
        }

        const roomDelete = await Room.findOne({
            _id: room._id
        });

        if (!roomDelete) {
            return res.status(404).json({
                success: false,
                massage: `Номер с id: ${room._id}, не найдено.`
            });
        }

        await RoomConveniences.deleteMany({
            roomId: room._id
        });
        await roomDelete.delete();

        const rooms = await Room.find();

        res.status(201).json({ rooms });
    } catch(e) {
        errorHandler(res, e);
    }
}

module.exports.getRooms = async function(req, res) {
    try {
        const rooms = await Room.find();

        const roomConveniences = await RoomConveniences.find({}, 'roomId convenienceId -_id');;

        res.status(201).json({ rooms, roomConveniences });
    } catch(e) {
        errorHandler(res, e);
    }
}

module.exports.getRoom = async function(req, res) {
    try {
        const { roomId } = req.params;

        const room = await Room.findOne({
            _id: roomId
        });

        if (!room) {
            return res.status(404).json({
                success: false,
                massage: `Номер с id: ${room._id}, не найдено.`
            });
        }

        const room_convenience_list = await RoomConveniences.find({roomId});

        const roomConveniences = await Conveniences.find({
            _id: { $in: room_convenience_list.map((item ) => item.convenienceId) }
        });

        const conveniences = await Conveniences.find();

        res.status(201).json({
            room, conveniences, roomConveniences
        });
    } catch(e) {
        errorHandler(res, e);
    }
}
