const express = require('express');

const controller = {
    sendHello: (req, res) => {
        const msg = `Hello! ${new Date()}`;
        res.json({ msg });
    }
};

module.exports = controller;