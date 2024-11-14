// src/hooks/useTranspiler.ts
import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000';

export function useTranspiler() {
    const [solidityCode, setSolidityCode] = useState('');
    const [tactCode, setTactCode] = useState('');
    const [compiledCode, setCompiledCode] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const transpileCode = async () => {
        if (!solidityCode.trim()) {
            setError('Please enter Solidity code');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${API_URL}/transpile`, {
                code: solidityCode
            });

            if (response.data.success) {
                setTactCode(response.data.tact_code);
            } else {
                throw new Error('Transpilation failed');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Transpilation failed');
        } finally {
            setLoading(false);
        }
    };

    const compileCode = async () => {
        if (!tactCode.trim()) {
            setError('Please transpile the code first');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${API_URL}/compile`, {
                code: tactCode,
                filename: 'Contract'
            });

            if (response.data.success) {
                setCompiledCode(response.data.compiled_code);
            } else {
                throw new Error('Compilation failed');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Compilation failed');
        } finally {
            setLoading(false);
        }
    };

    return {
        solidityCode,
        tactCode,
        compiledCode,
        loading,
        error,
        setSolidityCode,
        transpileCode,
        compileCode
    };
}