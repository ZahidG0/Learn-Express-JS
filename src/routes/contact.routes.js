const express = require("express");
const router = express.Router();

// Post Request For Contact Page
router.post("/contact", (req, res) => {
  console.log(req.body);
  res.send("This is the contact page");
});

// put Request For Edit-Contact
router.put("/edit-contact/:id", (req, res) => {
  console.log("Put request recived.");
  res.send("This is the edit contact page");
});

// Patch Request For Update-Contact
router.patch("/update-contact/:id", (req, res) => {
  console.log("Patch request recived.");
  res.send("This is the update contact page");
});

// Delete Request For Delete-Contact
router.delete("/delete-contact/:id", (req, res) => {
  console.log("Delete request recived.");
  res.send("This is the delete contact page");
});

// Route Parameters
router.get("/contact/:id", (req, res) => {
  const contactId = req.params.id;
  console.log(`Get request for contact with id: ${contactId}`);
  res.send(`This is the contact page for contact with id: ${contactId}`);
});

// Query Parameters
router.get("/search", (req, res) => {
  const query = req.query.q;
  console.log(`Search query: ${query}`);
  res.send(`This is the search page for query: ${query}`);
});

// Dynamic Route Handling
router.get("/user/:username", (req, res) => {
  const username = req.params.username;
  console.log(`Get request for user: ${username}`);
  res.send(`This is the user page for user: ${username}`);
});

module.exports = router;
