import * as React from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore, Folder, InsertDriveFile } from "@mui/icons-material";

// Recursive Tree Node
export function TreeNode({ node }) {
  const [open, setOpen] = React.useState(false);
  const hasChildren = node.children && node.children.length > 0;

  const handleClick = () => {
    if (hasChildren) setOpen((prev) => !prev);
    if (node.onClick) node.onClick(); // Optional: trigger navigation or callback
  };

  return (
    <>
      <ListItemButton onClick={handleClick} sx={{ pl: node.level * 2 }}>
        <ListItemIcon>
          {hasChildren ? <Folder /> : <InsertDriveFile />}
        </ListItemIcon>
        <ListItemText primary={node.label} />
        {hasChildren ? (open ? <ExpandLess /> : <ExpandMore />) : null}
      </ListItemButton>
      {hasChildren && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List disablePadding>
            {node.children.map((child, index) => (
              <TreeNode key={index} node={{ ...child, level: node.level + 1 }} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

// Main TreeView Component
export default function CustomTreeView({ data }) {
  return (
    <List>
      {data.map((node, index) => (
        <TreeNode key={index} node={{ ...node, level: 0 }} />
      ))}
    </List>
  );
}
