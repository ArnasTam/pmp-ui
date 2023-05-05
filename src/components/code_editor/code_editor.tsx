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
}

const CodeEditor: FC<CodeEditorProps> = ({ initialValue, onChange }) => (
  <AceEditor
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
