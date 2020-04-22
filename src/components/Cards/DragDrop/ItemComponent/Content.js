import React from "react";
import Options from "components/Cards/DragDrop/ItemComponent/Options";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";

import Description from "components/Cards/DragDrop/ItemComponent/Description";
export default function Content({ content, cardID, itemID }) {
  return (
    <Box mb={2} className="card-item-content">
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Description content={content} cardID={cardID} itemID={itemID} />
        </Grid>
        <Grid container item xs={3}>
          <Divider orientation="vertical" flexItem />
          <Options />
        </Grid>
      </Grid>
    </Box>
  );
}