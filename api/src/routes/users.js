const { Router } = require('express');
const { createUser, loginUser, GetUser, PutUser,PostBook } = require("../controllers/usersController");

const router = Router();


router.post('/signup', createUser);
router.post('/signin', loginUser);

router.get('/user/:id', GetUser)
router.put('/user/:id', PutUser)
router.post('/user/:email',PostBook)
module.exports = router
