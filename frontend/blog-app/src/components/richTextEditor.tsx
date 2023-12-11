import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function RichTextEditor() {
  const [value, setValue] = useState("");

  return (
    <>
      <ReactQuill theme="snow" value={value} onChange={setValue} />

      {value && (
        <div className="mt-4">
            <h2 className="text-xl font-bold">Rendered HTML:</h2>
            <div className="bg-gray-100 p-4" dangerouslySetInnerHTML={{ __html: value }} />
            {value}
            
        </div>
        )}
    </>
  );
}

export default RichTextEditor;
