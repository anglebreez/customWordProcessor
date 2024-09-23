import { Editor, EditorState, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css"; // Import default Draft.js styles
import React, { useState } from "react";
import { Document, Packer, Paragraph, Header, Footer } from "docx";
import "./App.css"; // our app styles
import { saveAs } from "file-saver";

function App() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const headerText = "boooooom our header text";
  const footerText = "boooooom our footer text"; // you can create  a state var and can show modal to take by user or make the div editable

  const downloadDoc = () => {
    const contentState = editorState.getCurrentContent(); // content state of editor
    const rawContentState = convertToRaw(contentState); // raw content of editor

    // paragraphs from the editor content
    const paragraphs = rawContentState.blocks.map(
      (block) => new Paragraph(block.text)
    );

    // code from docx library to have the header and editor text
    const doc = new Document({
      sections: [
        {
          headers: {
            default: new Header({ // this is our header
              children: [
                new Paragraph({
                  text: headerText,
                  alignment: "center",
                }),
              ],
            }),
          },
          footers: {
            default: new Footer({ // this is our footer
              children: [
                new Paragraph({
                  text: footerText,
                  alignment: "center",
                }),
              ],
            }),
          },
          children: [...paragraphs],
        },
      ],
    });

    // generate and download the DOCX file
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "document.docx");
    });
  };

  return (
    <div className="document-editor">
      <button className="btn" onClick={downloadDoc}>
        Download DOCX
      </button>
      <div className="editor-area">
        <div className="page-header">
          <p>{headerText}</p>
        </div>
        <Editor editorState={editorState} onChange={setEditorState} />
        <div className="page-footer">
          <p>{footerText}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
