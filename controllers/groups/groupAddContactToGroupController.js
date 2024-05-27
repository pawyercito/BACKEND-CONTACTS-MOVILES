// controllers/groups/addContactToGroupController.js
const Group = require('../../models/Group');
const Contact = require('../../models/Contact');

exports.addContactToGroup = async (req, res) => {
  try {
    const { groupId, contactIds } = req.body; // contactIds is now an array
    
    // Find the group by its ID
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ msg: 'Group not found' });
    }

    // Find the contacts by their IDs
    const contacts = await Contact.find({ _id: { $in: contactIds } });

    // Add the contacts to the group's contacts array
    group.contacts.push(...contacts);

    // Save the updated group
    await group.save();

    res.status(200).json({ msg: 'Contacts added to the group successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error adding contacts to the group' });
  }
};