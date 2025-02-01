const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Poll = require("./models/Poll");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/votteit", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Create a new poll
app.post("/api/polls", async (req, res) => {
  const { question, options } = req.body;

  if (!question || !options || !Array.isArray(options) || options.length === 0) {
    return res.status(400).json({ message: "Invalid poll data. Question and at least one option are required." });
  }

  try {
    const newPoll = new Poll({
      question,
      options: options.map((optionText) => ({ text: optionText, votes: 0 })), // Initialize votes to 0
    });

    const savedPoll = await newPoll.save();
    res.status(201).json(savedPoll); // Send back the saved poll data
  } catch (error) {
    console.error("Error creating poll:", error);
    res.status(500).json({ message: "Server error creating poll." }); // More specific error message
  }
});


// Get all polls
app.get("/api/polls", async (req, res) => {
  try {
    const polls = await Poll.find();
    res.json(polls);
  } catch (error) {
    console.error("Error fetching polls:", error);
    res.status(500).json({ message: "Error fetching polls" });
  }
});

// Update poll votes
app.put("/api/polls/:id", async (req, res) => {
  const { id } = req.params;
  const { options } = req.body;

  if (!options || !Array.isArray(options)) {
    return res.status(400).json({ message: "Invalid vote data." });
  }

  try {
    const updatedPoll = await Poll.findByIdAndUpdate(
      id,
      { options }, // Directly update the options array.
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!updatedPoll) {
      return res.status(404).json({ message: "Poll not found." });
    }

    res.json(updatedPoll);
  } catch (error) {
    console.error("Error updating poll:", error);
    res.status(500).json({ message: "Server error updating poll." });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});