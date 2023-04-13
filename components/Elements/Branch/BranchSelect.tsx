import React, { useEffect } from "react";
import { shallow } from "zustand/shallow";
import useBranchStore from "../../../lib/Branch/store";

interface iBranchSelect {
  selectedBranch: number | null;
  setBranch: (branchId: null | string) => void;
}
const BranchSelect = ({ selectedBranch, setBranch }: iBranchSelect) => {
  const [branches, getBranches] = useBranchStore(
    (state) => [state.branches, state.getBranches],
    shallow
  );

  useEffect(() => {
    getBranches();
  }, []);

  return (
    <div>
      <select
        value={selectedBranch ?? "0"}
        onChange={(event) =>
          setBranch(event.target.value === "0" ? null : event.target.value)
        }
      >
        <option value={0}>Sparte auswählen</option>)
        {branches.map((branch) => (
          <option key={branch.id} value={branch.id}>
            {branch.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BranchSelect;
