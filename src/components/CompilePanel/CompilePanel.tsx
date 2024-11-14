import React, { useState } from 'react';
import { Button, CircularProgress, Alert } from '@mui/material';
import './CompilePanel.css';

interface CompilePanelProps {
    onTranspile: () => Promise<void>;
    tactCode: string;
    loading: boolean;
    error: string | null;
}

export const CompilePanel: React.FC<CompilePanelProps> = ({
    onTranspile,
    tactCode,
    loading,
    error
}) => {
    const [compileResult, setCompileResult] = useState<any>(null);
    const [compileError, setCompileError] = useState<string | null>(null);
    const [compiling, setCompiling] = useState(false);

    const handleCompile = async () => {
        if (!tactCode) {
            setCompileError('Please transpile the code first');
            return;
        }

        setCompiling(true);
        setCompileError(null);

        try {
            const response = await fetch('http://localhost:8000/compile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: tactCode }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Compilation failed');
            }

            setCompileResult(data);
        } catch (err) {
            setCompileError(err instanceof Error ? err.message : 'Compilation failed');
        } finally {
            setCompiling(false);
        }
    };

    return (
        <div className="compile-panel">
            <div className="button-group">
                <Button
                    variant="contained"
                    onClick={onTranspile}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : 'Transpile'}
                </Button>
                <Button
                    variant="contained"
                    onClick={handleCompile}
                    disabled={compiling || !tactCode}
                >
                    {compiling ? <CircularProgress size={24} /> : 'Compile'}
                </Button>
            </div>

            {error && (
                <Alert severity="error" className="panel-alert">
                    {error}
                </Alert>
            )}

            {compileError && (
                <Alert severity="error" className="panel-alert">
                    {compileError}
                </Alert>
            )}

            {compileResult && (
                <div className="compilation-result">
                    <h3>Compilation Successful</h3>
                    {Object.entries(compileResult.files).map(([filename, content]) => (
                        <div key={filename}>
                            <h4>{filename}</h4>
                            <pre>{content as string}</pre>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};