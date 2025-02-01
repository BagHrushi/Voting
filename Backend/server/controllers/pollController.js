const Poll = require("../models/Poll");

// Create a new poll
exports.createPoll = async (req, res) => {
  try {
    const { question, options } = req.body;
    const formattedOptions = options.map(option => ({ text: option }));
    const newPoll = await Poll.create({ question, options: formattedOptions });
    res.status(201).json(newPoll);
  } catch (err) {
    res.status(500).json({ error: "Failed to create poll" });
  }
};

// Get all polls
exports.getPolls = async (req, res) => {
  try {
    const polls = await Poll.find();
    res.json(polls);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch polls" });
  }
};

// Vote for a poll option
exports.votePoll = async (req, res) => {
  try {
    const { pollId, optionIndex } = req.body;
    const poll = await Poll.findById(pollId);
    if (poll) {
      poll.options[optionIndex].votes++;
      await poll.save();
      res.json(poll);
    } else {
      res.status(404).json({ error: "Poll not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to vote" });
  }
};
