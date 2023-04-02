import React, {useEffect} from 'react';
import shallow from 'zustand/shallow';
import useBranchStore from "../../../lib/Branch/store";



const BranchSelect = ({selectedBranch, setBranch}) => {
    const [
        loading,
        branches,
        getBranches,
    ] = useBranchStore((state) => [
        state.loading,
        state.branches,
        state.getBranches,
    ], shallow);

    useEffect(() => {
        if (branches.length <= 0) {
            getBranches();
        }
    });

    return (
        <div>
            <select value={selectedBranch} onChange={(event) => setBranch(event.target.value === "0" ? null : event.target.value)}>
                <option value={0}>Sparte auswählen</option>
                )
                {branches.map(branch => <option key={branch.id} value={branch.id}>{branch.name}</option>)}
            </select>
        </div>
    );
};

export default BranchSelect;
