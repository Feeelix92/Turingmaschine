// src/Tiptap.jsx
import "./styles.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { CodeEditorProps } from "../../interfaces/CommonInterfaces";

const Tiptap = (props: CodeEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `<pre><code classNameName="language-json">
        ////// Band //////
        input: 1,B,1,B,0
        ////// Spezifikationen //////
        alphabet: {0,1}
        states: {q1, q2}
        startState: q1
        endState: q2
        ////// Tabelle //////
        table:
          q1: {
            1: {q1, R, 0},
            0: {q1, R},
            B: {q2, N}
          }
      </code></pre>`,
  });

  return (
    <div
      className="modal fade fixed top-40 left-0 w-4/12 h-full outline-none overflow-x-hidden overflow-y-auto"
      id="exampleModalCenteredScrollable"
      tabIndex={-1}
      aria-labelledby="exampleModalCenteredScrollable"
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable relative w-auto pointer-events-none">
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5
              className="text-xl font-medium leading-normal text-gray-800"
              id="exampleModalCenteredScrollableLabel"
            >
              Code-Editor
            </h5>
            <button
              type="button"
              className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body relative p-4">
            <EditorContent editor={editor} />
          </div>
          <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
            <button onClick={props.toggleEditor}>Close</button>
            <button onClick={props.toggleEditor}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tiptap;
