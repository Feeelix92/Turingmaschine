// src/Tiptap.jsx
import "./styles.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { CodeEditorProps } from "../../interfaces/CommonInterfaces";

const Tiptap = (props: CodeEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `<pre><code className={"language-json"}>
        {
         "band":{
            "input":[1,"B",1,"B",0]
         },
         "spezifikationen":{
            "alphabet":[0,1],
            "states":["q1","q2"],
            "startState":["q1"],
            "endState":["q2"]
         },
         "table":{
            "q1":{
               "1":["q1","R",0],
               "0":["q1","R"],
               "B":["q2","N"]
            }
         }
      }
      </code></pre>`,
  });

  return (

      <div>
        <div id="defaultModal"
             className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex"
             aria-modal="true" role="dialog">
          <div className="relative p-4 w-full max-w-7xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-start p-4 rounded-t border-b dark:border-gray-600">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Codeeditor
                </h3>
                <button type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-toggle="defaultModal" onClick={props.toggleEditor}>
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                       xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-6 space-y-6 text-left">
                <EditorContent editor={editor} />
              </div>
              <div className="flex items-center justify-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button data-modal-toggle="defaultModal" type="button" onClick={props.toggleEditor}
                        className="bg-thm-primary">speichern
                </button>
                <button data-modal-toggle="defaultModal" type="button" onClick={props.toggleEditor}
                        className="bg-thm-secondary">abrechen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
};

export default Tiptap;
