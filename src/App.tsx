import React, { useState } from 'react';
import { TonConnectUIProvider, TonConnectButton } from '@tonconnect/ui-react';
import { Editor } from './components/Editor/Editor';
import { CompilePanel } from './components/CompilePanel/CompilePanel';
import { Navbar } from './components/Navbar/Navbar';
import { useTranspiler } from './hooks/useTranspiler';
import { Github, Code2, ArrowRight, Cpu, Boxes, ChevronRight } from 'lucide-react';
import { Button } from "./components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./components/ui/card"
import './styles/App.css';

function App() {
    const [showLanding, setShowLanding] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {
        solidityCode,
        tactCode,
        loading,
        error,
        setSolidityCode,
        transpileCode,
    } = useTranspiler();

    const toggleView = () => {
        setShowLanding(!showLanding);
    };

    return (
        <TonConnectUIProvider manifestUrl="/tonconnect-manifest.json">
            <div className={`app ${showLanding ? 'min-h-screen bg-gradient-to-b from-blue-100 to-white' : 'bg-blue-50 min-h-screen'}`}>
                {/* Navbar */}
                <nav className="bg-blue-800 text-white shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <span className="text-2xl font-bold text-yellow-300">Tonspiler</span>
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex items-center space-x-8">
                                {showLanding ? (
                                    <>
                                        <a href="#features" className="text-white hover:text-yellow-300 transition-colors">Features</a>
                                        <a href="#how-it-works" className="text-white hover:text-yellow-300 transition-colors">How It Works</a>
                                        <a href="#demo" className="text-white hover:text-yellow-300 transition-colors">Demo</a>
                                        <Button className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold" onClick={toggleView}>
                                            Try Transpiler
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold" onClick={toggleView}>
                                            Back to Landing
                                        </Button>
                                        <TonConnectButton />
                                    </>
                                )}
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                    <Github className="mr-2 h-4 w-4" />
                                    GitHub
                                </Button>
                            </div>

                            {/* Mobile menu button */}
                            <div className="md:hidden flex items-center">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    aria-expanded={isMenuOpen}
                                >
                                    <span className="sr-only">{isMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className="md:hidden bg-blue-700">
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {showLanding ? (
                                    <>
                                        <a href="#features" className="block px-3 py-2 text-white hover:text-yellow-300 hover:bg-blue-600 rounded-md">Features</a>
                                        <a href="#how-it-works" className="block px-3 py-2 text-white hover:text-yellow-300 hover:bg-blue-600 rounded-md">How It Works</a>
                                        <a href="#demo" className="block px-3 py-2 text-white hover:text-yellow-300 hover:bg-blue-600 rounded-md">Demo</a>
                                        <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold mt-2" onClick={toggleView}>
                                            Try Transpiler
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold" onClick={toggleView}>
                                            Back to Landing
                                        </Button>
                                        <div className="mt-2">
                                            <TonConnectButton />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </nav>

                {showLanding ? (
                    // Landing Page Content
                    <>
                        {/* Hero Section */}
                        <div className="relative overflow-hidden bg-blue-100">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                                <div className="text-center">
                                    <h1 className="text-4xl tracking-tight font-extrabold text-blue-900 sm:text-5xl md:text-6xl">
                                        <span className="block">Transform your</span>
                                        <span className="block text-yellow-500">Solidity to Tact</span>
                                    </h1>
                                    <p className="mt-3 max-w-md mx-auto text-base text-blue-800 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                                        The powerful transpiler that converts Solidity smart contracts into Tact code for the TON blockchain. Build with confidence, deploy with ease.
                                    </p>
                                    <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                                        <Button className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold" onClick={toggleView}>
                                            Get Started
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Features Section */}
                        <section id="features" className="py-16 bg-white">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="text-center">
                                    <h2 className="text-3xl font-extrabold text-blue-900">
                                        Powerful Features
                                    </h2>
                                    <p className="mt-4 text-xl text-blue-700">
                                        Everything you need to transform your Solidity contracts into Tact code
                                    </p>
                                </div>

                                <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
                                    <Card className="bg-blue-50 border-2 border-blue-200 shadow-lg">
                                        <CardHeader>
                                            <Code2 className="h-12 w-12 text-yellow-500 mb-4" />
                                            <CardTitle className="text-2xl font-bold text-blue-800">Smart Contract Conversion</CardTitle>
                                            <CardDescription className="text-blue-700 text-lg">
                                                Seamlessly convert your Solidity smart contracts to Tact code with high accuracy
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>

                                    <Card className="bg-blue-50 border-2 border-blue-200 shadow-lg">
                                        <CardHeader>
                                            <Cpu className="h-12 w-12 text-yellow-500 mb-4" />
                                            <CardTitle className="text-2xl font-bold text-blue-800">Optimized Output</CardTitle>
                                            <CardDescription className="text-blue-700 text-lg">
                                                Generate efficient and optimized Tact code ready for the TON blockchain
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>

                                    <Card className="bg-blue-50 border-2 border-blue-200 shadow-lg">
                                        <CardHeader>
                                            <Boxes className="h-12 w-12 text-yellow-500 mb-4" />
                                            <CardTitle className="text-2xl font-bold text-blue-800">Batch Processing</CardTitle>
                                            <CardDescription className="text-blue-700 text-lg">
                                                Convert multiple contracts at once with our powerful batch processing system
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>
                                </div>
                            </div>
                        </section>

                        {/* How It Works Section */}
                        <section id="how-it-works" className="py-16 bg-blue-100">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <h2 className="text-3xl font-extrabold text-blue-900 text-center mb-12">
                                    How It Works
                                </h2>
                                <div className="max-w-lg mx-auto grid gap-8">
                                    <div className="flex items-center space-x-4 bg-white p-6 rounded-lg shadow-md">
                                        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-yellow-500 flex items-center justify-center text-blue-900 font-bold text-xl">
                                            1
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-blue-800">Input Your Solidity Code</h3>
                                            <p className="mt-2 text-blue-700 text-lg">
                                                Paste your Solidity smart contract code into our transpiler
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 bg-white p-6 rounded-lg shadow-md">
                                        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-yellow-500 flex items-center justify-center text-blue-900 font-bold text-xl">
                                            2
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-blue-800">Automatic Analysis</h3>
                                            <p className="mt-2 text-blue-700 text-lg">
                                                Our transpiler analyzes the code structure and patterns
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4 bg-white p-6 rounded-lg shadow-md">
                                        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-yellow-500 flex items-center justify-center text-blue-900 font-bold text-xl">
                                            3
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-blue-800">Generate Tact Code</h3>
                                            <p className="mt-2 text-blue-700 text-lg">
                                                Receive optimized Tact code ready for the TON blockchain
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Demo Section */}
                        <section id="demo" className="py-16 bg-white">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <h2 className="text-3xl font-extrabold text-blue-900 text-center mb-12">
                                    Try It Out
                                </h2>
                                <div className="mt-12">
                                    <Card className="bg-blue-50 border-2 border-blue-200 shadow-lg">
                                        <CardContent className="p-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <h3 className="text-xl font-semibold mb-4 text-blue-800">Solidity Input</h3>
                                                    <div className="bg-gray-900 rounded-lg p-4 shadow-inner">
                                                        <pre className="text-green-400 text-sm">
                                                            {`contract SimpleStorage {
    uint256 private value;
    
    function setValue(uint256 _value) public {
        value = _value;
    }
    
    function getValue() public view returns (uint256) {
        return value;
    }
}`}
                                                        </pre>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h3 className="text-xl font-semibold mb-4 text-blue-800">Tact Output</h3>
                                                    <div className="bg-gray-900 rounded-lg p-4 shadow-inner">
                                                        <pre className="text-yellow-400 text-sm">
                                                            {`contract SimpleStorage {
    val value: Int as uint256;
    
    fun setValue(value: Int) {
        self.value = value;
    }
    
    fun getValue(): Int {
        return self.value;
    }
}`}
                                                        </pre>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-6 text-center">
                                                <Button className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold" onClick={toggleView}>
                                                    Try With Your Code
                                                    <ChevronRight className="ml-2 h-4 w-4" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </section>

                        {/* Footer */}
                        <footer className="bg-blue-800 text-white">
                            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div>
                                        <h3 className="text-2xl font-bold text-yellow-300">Tonspiler</h3>
                                        <p className="mt-4 text-blue-200 text-lg">
                                            Making blockchain development easier, one contract at a time.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-yellow-300">Quick Links</h3>
                                        <ul className="mt-4 space-y-2">
                                            <li><a href="#features" className="text-blue-200 hover:text-yellow-300 text-lg">Features</a></li>
                                            <li><a href="#how-it-works" className="text-blue-200 hover:text-yellow-300 text-lg">How It Works</a></li>
                                            <li><a href="#demo" className="text-blue-200 hover:text-yellow-300 text-lg">Demo</a></li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-yellow-300">Connect</h3>
                                        <div className="mt-4 flex space-x-4">
                                            <a href="#" className="text-blue-200 hover:text-yellow-300">
                                                <Github className="h-8 w-8" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 pt-8 border-t border-blue-700 text-center text-blue-200">
                                    <p>&copy; {new Date().getFullYear()} Tonspiler. All rights reserved.</p>
                                </div>
                            </div>
                        </footer>
                    </>
                ) : (
                    // Transpiler Content
                    <main className="main-content bg-blue-50 p-6">
                        <div className="max-w-7xl mx-auto">
                            <h1 className="text-3xl font-bold text-blue-900 mb-6">Solidity to Tact Transpiler</h1>
                            <p className="text-lg text-blue-700 mb-8">
                                Welcome to the Tonspiler! Paste your Solidity code below, and we'll convert it to Tact for you.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card className="bg-white rounded-lg shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-bold text-blue-900">Solidity Input</CardTitle>
                                        <CardDescription className="text-blue-700">
                                            Enter your Solidity smart contract code here
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Editor
                                            value={solidityCode}
                                            onChange={setSolidityCode}
                                            language="solidity"
                                            readOnly={loading}
                                        />
                                    </CardContent>
                                </Card>

                                <Card className="bg-white rounded-lg shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-bold text-blue-900">Tact Output</CardTitle>
                                        <CardDescription className="text-blue-700">
                                            Your transpiled Tact code will appear here
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Editor
                                            value={tactCode}
                                            onChange={() => { }}
                                            language="typescript"
                                            readOnly={true}
                                        />
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="mt-8">
                                <CompilePanel
                                    onTranspile={transpileCode}
                                    tactCode={tactCode}
                                    loading={loading}
                                    error={error}
                                />
                            </div>

                            {error && (
                                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                                    <h3 className="font-bold">Error:</h3>
                                    <p>{error}</p>
                                </div>
                            )}

                            <div className="mt-8 text-center">
                                <Button className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold" onClick={toggleView}>
                                    Back to Landing Page
                                </Button>
                            </div>
                        </div>
                    </main>
                )}
            </div>
        </TonConnectUIProvider>
    );
}

export default App;