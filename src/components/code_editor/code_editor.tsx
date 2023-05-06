import { jsx } from '@emotion/react/dist/emotion-react.cjs';
import React, { FC } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';

interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
  compilerId?: number;
}

const getModeByCompilerId = (compilerId?: number) => {
  if (compilerId === 63) return 'javascript';
  if (compilerId === 71) return 'python';
  if (compilerId === 51) return 'csharp';
  if (compilerId === 62) return 'java';
  if (compilerId === 76) return 'c_cpp';

  return undefined;
};

const CodeEditor: FC<CodeEditorProps> = ({
  initialValue,
  onChange,
  compilerId,
}) => (
  <AceEditor
    mode={getModeByCompilerId(compilerId)}
    width="100%"
    height="calc(60vh - 78px)"
    placeholder="Type your code here..."
    theme="github"
    name="Code Editor"
    onChange={(value) => onChange(value)}
    fontSize={14}
    value={initialValue}
    setOptions={{
      showGutter: true,
      showPrintMargin: true,
      highlightActiveLine: true,
      enableBasicAutocompletion: false,
      enableLiveAutocompletion: true,
      enableSnippets: false,
      showLineNumbers: true,
      tabSize: 2,
    }}
  />
);

export default CodeEditor;
