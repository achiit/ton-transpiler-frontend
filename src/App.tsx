// src/App.tsx
import React from 'react';
import { TonConnectUIProvider, TonConnectButton } from '@tonconnect/ui-react';
import { Editor } from './components/Editor/Editor';
import { CompilePanel } from './components/CompilePanel/CompilePanel';
import { Navbar } from './components/Navbar/Navbar';
import { useTranspiler } from './hooks/useTranspiler';
import './styles/App.css';

function App() {
    const {
        solidityCode,
        tactCode,
        loading,
        error,
        setSolidityCode,
        transpileCode,
    } = useTranspiler();

    return (
        <TonConnectUIProvider manifestUrl="/tonconnect-manifest.json">
            <div className="app">
                <Navbar>
                    <h1>TON Transpiler</h1>
                    <TonConnectButton />
                </Navbar>

                <main className="main-content">
                    <div className="editor-container">
                        <div className="editor-section">
                            <h2>Solidity Contract</h2>
                            <Editor
                                value={solidityCode}
                                onChange={setSolidityCode}
                                language="solidity"
                                readOnly={loading}
                            />
                        </div>

                        <div className="editor-section">
                            <h2>Tact Contract</h2>
                            <Editor
                                value={tactCode}
                                onChange={() => {}}
                                language="typescript"
                                readOnly={true}
                            />
                        </div>
                    </div>

                    <CompilePanel
                        onTranspile={transpileCode}
                        tactCode={tactCode}
                        loading={loading}
                        error={error}
                        // connected={true}
                    />
                </main>
            </div>
        </TonConnectUIProvider>
    );
}

export default App;