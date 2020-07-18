import React from "react";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

export default function ItemLabels({ labels }) {
  return (
    <div style={{ marginTop: "10px", width: "inherit" }}>
      <Autocomplete
        multiple
        id="tags-filled"
        size="small"
        options={labels.map((option: any) => option)}
        filterSelectedOptions={true}
        freeSolo
        value={labels.map((label: any) => label)}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant={option.variant}
              label={option.name}
              clickable
              {...getTagProps({ index })}
              size="small"
            />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Labels" />
        )}
      />
    </div>
  );
}
