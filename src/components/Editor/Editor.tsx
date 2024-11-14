// src/components/Editor/Editor.tsx
import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import './Editor.css';

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
    language: 'solidity' | 'typescript';
    readOnly?: boolean;
}

export const Editor: React.FC<EditorProps> = ({
    value,
    onChange,
    language,
    readOnly = false
}) => {
    const handleEditorChange = (value: string | undefined) => {
        onChange(value || '');
    };

    return (
        <div className="editor-wrapper">
            <MonacoEditor
                height="100%"
                language={language}
                theme="vs-dark"
                value={value}
                onChange={handleEditorChange}
                options={{
                    readOnly,
                    minimap: { enabled: false },
                    fontSize: 14,
                    wordWrap: 'on',
                    scrollBeyondLastLine: false,
                }}
            />
        </div>
    );
};