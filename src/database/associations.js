const User = require('../features/users/user.model');
const Group = require('../features/groups/group.model');
const GroupMember = require('../features/groups/groupMember.model');
const Match = require('../features/matches/match.model');
const Prediction = require('../features/predictions/prediction.model');


User.hasMany(Group, { foreignKey: 'owner_id', as: 'ownedGroups' });
Group.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });

User.belongsToMany(Group, { through: GroupMember, foreignKey: 'user_id', as: 'groups' });
Group.belongsToMany(User, { through: GroupMember, foreignKey: 'group_id', as: 'members' });


User.hasMany(Prediction, { foreignKey: 'user_id', as: 'predictions' });
Prediction.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Match.hasMany(Prediction, { foreignKey: 'match_id', as: 'predictions' });
Prediction.belongsTo(Match, { foreignKey: 'match_id', as: 'match' });

module.exports = { User, Group, GroupMember, Match, Prediction };