const { Router } = require('express');
const router = Router();

router.post("/signup", (req, res, next) => {
    res.send("I'm in POST signup");
});

module.exports = router;