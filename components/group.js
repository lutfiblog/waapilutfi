const router = require('express').Router();
const { MessageMedia, Location } = require("whatsapp-web.js");
const request = require('request')
const vuri = require('valid-url');
const fs = require('fs');
  
router.post('/sendmessage/:chatname', async (req, res) => {
    let chatname = req.params.chatname;
    let message = req.body.message;

    if (chatname == undefined || message == undefined) {
        res.send({ status: "error", message: "please enter valid chatname and message" })
    } else {
        client.getChats().then((data) => {
            data.forEach(chat => {
                if (chat.id.server === "g.us" && chat.name === chatname) {
                    client.sendMessage(chat.id._serialized, message).then((response) => {
                        if (response.id.fromMe) {
                            res.send({ status: 'success', message: `Message successfully send to ${chatname}` })
                        }
                    });
                }
            });     
        });
    }
});


router.post('/sendlocation/:chatname', async (req, res) => {
    let chatname = req.params.chatname;
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;
    let desc = req.body.description;

    if (chatname == undefined || latitude == undefined || longitude == undefined) {
        res.send({ status: "error", message: "please enter valid phone, latitude and longitude" })
    } else {
        client.getChats().then((data) => {
            data.some(chat => {
                if (chat.id.server === "g.us" && chat.name === chatname) {
                    let loc = new Location(latitude, longitude, desc || "");
                    client.sendMessage(chat.id._serialized, loc).then((response) => {
                        if (response.id.fromMe) {
                            res.send({ status: 'success', message: `Message successfully send to ${chatname}` })
                        }
                    });
                    return true;
                }
            });     
        });
    }
});

module.exports = router;
