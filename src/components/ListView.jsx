import { List, Stack, Typography } from "@mui/material";
import { useState } from "react";
import Loading from "./Loading";

export const ListView = ({ Component, data, onSelect }) => {
  const [selecting, setSelecting] = useState(false);
  const [selected, setSelected] = useState([]);
  if (!data)return (<Loading text="data" />);
  
  return (
    <List>
      {data.map((row, index) => {
        return (
          <Stack key={index} direction={'row'}>
            <input
              type="radio"
              id={index}
              onChange={(e) => {
                if (e.target.value) {
                  selected.push(data[parseInt(e.target.id)]);
                }else{
                    delete selected[data[parseInt(e.target.id)]]
                }
                if(onSelect)onSelect(selected)
                if(selected.length>0)setSelecting(true)
              }}
            />
            <div>
              <Component row={row} />
            </div>
          </Stack>
        );
      })}
      {selecting &&<Typography>Selected {selected.length}</Typography>}
    </List>
  );
};
