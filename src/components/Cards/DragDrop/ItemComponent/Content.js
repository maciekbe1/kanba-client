import React from "react";
import Options from "components/Cards/DragDrop/ItemComponent/Options";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";

import Description from "components/Cards/DragDrop/ItemComponent/Description";
export default function Content({
  date,
  status,
  priority,
  content,
  cardID,
  itemID,
  onItemChange
}) {
  return (
    <Box mb={2} className="card-item-content">
      <Grid container spacing={3}>
        <Grid item xs={9} sm={7} md={8} lg={9}>
          <Description content={content} cardID={cardID} itemID={itemID} />
        </Grid>
        <Grid container item xs={3} sm={5} md={4} lg={3}>
          <Divider orientation="vertical" flexItem />
          <Options
            date={date}
            status={status}
            priority={priority}
            onItemChange={onItemChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
