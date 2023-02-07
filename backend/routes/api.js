const express = require("express");
const router = express.Router();

const RoomControllers = require("../controllers/roomsController");

router.get("/getAllRoom", RoomControllers.getAllRoom);
router.get("/getRoom/:nameRoom", RoomControllers.getRoom);
router.post("/createRoom", RoomControllers.createRoom);
router.put("/editRoom/:id", RoomControllers.editRoom);
router.delete("/deleteRoom/:id", RoomControllers.deleteRoom);

module.exports = router;
