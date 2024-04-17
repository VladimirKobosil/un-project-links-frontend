import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar, {modules, formats} from "./EditorToolBar";
import "react-quill/dist/quill.snow.css";

const Editor = ({value, handleChange}) => {
    return (
        <div className="text-editor">
            <EditorToolbar/>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={handleChange}
                placeholder={"Napište něco..."}
                modules={modules}
                formats={formats}
            />
        </div>
    );
};

export default Editor;