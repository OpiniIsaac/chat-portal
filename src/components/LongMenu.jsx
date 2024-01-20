// LongMenu.jsx

import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import CreateGroupForm from "./CreateGroupForm";

const options = ["Create Group", "Settings"];

const ITEM_HEIGHT = 48;

export default function LongMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openGroupForm, setOpenGroupForm] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreateGroup = (formData) => {
    // Handle the creation of the group with formData
    console.log("Creating group with data:", formData);
  };

  const handleOpenGroupForm = () => {
    setOpenGroupForm(true);
    handleClose();
  };

  const handleCloseGroupForm = () => {
    setOpenGroupForm(false);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={openGroupForm ? undefined : "long-menu"}
        aria-expanded={openGroupForm ? undefined : "true"}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={!openGroupForm && Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === "Pyxis"} onClick={handleCreateGroup}>
            {option === "Create Group" ? (
              <span onClick={handleOpenGroupForm}>{option}</span>
            ) : (
              option
            )}
          </MenuItem>
        ))}
      </Menu>
      <CreateGroupForm open={openGroupForm} onClose={handleCloseGroupForm} onCreateGroup={handleCreateGroup} />
    </div>
  );
}
