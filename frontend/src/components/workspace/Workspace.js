import {useState} from "react";
import WorkspacesBar from "./WorkspacesBar";

const Workspace = ({props}) => {
    const [currentWorkspace, setCurrentWorkspace] = useState("");

    return (
        <div className="workspaceWrapper">
            <WorkspacesBar setCurrentWorkspace={setCurrentWorkspace} />
            {currentWorkspace}
        </div>
    );
};

export default Workspace;
