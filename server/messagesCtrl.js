let allMessages = [];

module.exports = {
  getAllMessages(req, res) {
    res.status(200).send(allMessages);
  },

  createMessage(req, res) {
    const { username, message } = req.body;
    let newMessage = {
      username,
      message
    };
    // req.session = {}
    // req.session.history = []
    if (req.session.history) {
      req.session.history.push(newMessage);
    } else {
      req.session.history = [];
      req.session.history.push(newMessage);
    }

    allMessages.push(newMessage);
    res.status(200).send(allMessages);
  },
  history(req, res) {
    res.status(200).send(req.session.history);
  }
};
