import * as React from "react";
import { Drawer, Box } from "@mui/material";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import {
  ExpandMore,
  ChevronRight,
  Dashboard,
  Folder,
  Settings,
} from "@mui/icons-material";

const drawerWidth = 240;

export default function NavigationDrawer() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{ overflow: "auto", p: 2 }}>
        <SimpleTreeView
          defaultCollapseIcon={<ExpandMore />}
          defaultExpandIcon={<ChevronRight />}
          defaultExpanded={["dashboard"]}
        >
          <TreeItem
            id="1"
            itemId="dashboard"
            label={
              <>
                <Dashboard /> Dashboard
              </>
            }
          />
          <TreeItem
            id="projects"
            itemId="projects"
            label={
              <>
                <Folder /> Projects
              </>
            }
          >
            <TreeItem itemId="p1" label="Project A" />
            <TreeItem id="p2" itemId="p2" label="Project B" />
          </TreeItem>
          <TreeItem
            id="settins"
            itemId="settings"
            label={
              <>
                <Settings /> Settings
              </>
            }
          >
            <TreeItem id="profile" itemId="profile" label="Profile" />
            <TreeItem id="security" itemId="security" label="Security" />
          </TreeItem>
        </SimpleTreeView>
      </Box>
    </Drawer>
  );
}
