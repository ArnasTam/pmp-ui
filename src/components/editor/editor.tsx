import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import React, { FC, useMemo } from 'react';
import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import ToolbarPlugin from 'src/components/editor/plugins/toolbar_plugin';

import EditorTheme from './themes/editor_theme';
import CodeHighlightPlugin from './plugins/code_highlight_plugin';

import './editor.scss';

const Placeholder = () => (
  <div className="editor-placeholder">Type here...</div>
);

interface EditorProps {
  isReadMode?: boolean;
  editorStateJson?: string;
  onChange?: (stateJson: string) => void;
}

const Editor: FC<EditorProps> = ({
  isReadMode = false,
  onChange,
  editorStateJson,
}) => {
  const editorConfig = useMemo<InitialConfigType>(
    () => ({
      namespace: 'TestEditor',
      editable: !isReadMode,
      theme: EditorTheme,
      editorState: editorStateJson,
      onError() {},
      nodes: [
        HeadingNode,
        ListNode,
        ListItemNode,
        QuoteNode,
        CodeNode,
        CodeHighlightNode,
        TableNode,
        TableCellNode,
        TableRowNode,
        AutoLinkNode,
        LinkNode,
      ],
    }),
    [isReadMode, editorStateJson],
  );

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div>
        {!isReadMode && <ToolbarPlugin />}
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={isReadMode ? <></> : <Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          {onChange && (
            <OnChangePlugin
              onChange={(state) => onChange(JSON.stringify(state?.toJSON()))}
            />
          )}
          <AutoFocusPlugin />
          <ListPlugin />
          <LinkPlugin />
          <CodeHighlightPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
};

export default Editor;
