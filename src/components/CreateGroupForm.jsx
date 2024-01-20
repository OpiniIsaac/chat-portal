import React, { useState } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const CreateGroupForm = ({ open, onClose, onCreateGroup }) => {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateGroup = async () => {
    try {
     const creatorId= '65aa1a4bb8aa74d02f4cb807'
      const response = await axios.post("http://localhost:4000/api/v1/chat/groups", {
        name: groupName,
        creatorId,
      });

   

      onClose();
    } catch (error) {
      // Handle error (display an error message, log the error, etc.)
      console.error("Error creating group:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2>Create Group</h2>
        <TextField
          label="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          fullWidth
          name="name"
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <Button variant="contained" onClick={handleCreateGroup}>
          Create Group
        </Button>
      </Box>
    </Modal>
  );
};

export default CreateGroupForm;
