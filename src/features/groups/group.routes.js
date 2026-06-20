const { Router } = require('express');
const groupController = require('./group.controller');
const validateSchema = require('../../middlewares/validate.middleware');
const { verifyToken } = require('../../middlewares/auth.middleware');
const { createGroupSchema, joinGroupSchema } = require('./group.validator');

const router = Router();

router.use(verifyToken); 

router.post('/', validateSchema(createGroupSchema), groupController.createGroup);
router.post('/join', validateSchema(joinGroupSchema), groupController.joinGroup);
router.get('/my-groups', groupController.getMyGroups);
router.get('/:id/invite-code', groupController.getInviteCode);
router.get('/:id/members', groupController.getMembers);
router.get('/:id/leaderboard', groupController.getLeaderboard);

module.exports = router;