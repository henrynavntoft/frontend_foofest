import FlowLayout from "@/components/FlowLayout";
import { useRouter } from "next/router";
import { Button, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import TentCard from "@/components/TentCard";
import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import Anchor from "@/components/Anchor";

export default function Accomodations() {
  const [selectedValue, setSelectedValue] = useState("");
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    console.log(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
    console.log(event.target.checked);
  };

  const router = useRouter();
  function handleNext() {
    router.push("/guests");
  }

  return (
    <FlowLayout>
      <h1>Step 2</h1>
      <p>This is the content for Step 2.</p>
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={handleCheckboxChange} />}
        label="Green Option / 249-"
      />

      <RadioGroup value={selectedValue} onChange={handleChange}>
        <label>
          <div
            className={`${
              selectedValue !== "set-up-tent" && selectedValue === "own-tent"
                ? "bg-pink-100"
                : ""
            } ${selectedValue === "set-up-tent" ? "bg-slate-200" : ""}`}
          >
            {/* we need to create a style to use istead of the "bg-pink-100", so that everything looks "deactivated" */}
            <FormControlLabel
              value="set-up-tent"
              control={<Radio />}
              label="Rent a tent"
            />
            <TentCard></TentCard>
            {/* {selectedValue === "set-up-tent" && <TentCard />} */}
          </div>
        </label>

        <FormControlLabel
          value="own-tent"
          control={<Radio />}
          label="No, I'm bringing my own tent"
          className={selectedValue === "own-tent" ? "bg-slate-200" : ""}
        />
      </RadioGroup>

      <Button variant="outlined" onClick={handleNext}>
        Go to guest
      </Button>
      <Anchor
        href="/guests/"
        className="border border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500"
      >
        GO TO GUESTS
      </Anchor>
    </FlowLayout>
  );
}
