import React, { useState, useRef, useEffect } from 'react';
import CompanyForm from './components/CompanyForm';
import ConsoleLog from './components/ConsoleLog';
import './App.css';

const App = () => {
    const [companyData, setCompanyData] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [splitRatio, setSplitRatio] = useState(0.5); // 50% als Standardwert
    const [consoleLogs, setConsoleLogs] = useState([]);

    const splitScreenRef = useRef(null);
    const leftPanelRef = useRef(null);
    const rightPanelRef = useRef(null);

    const addLog = (type, message, data = null) => {
        setConsoleLogs(prevLogs => [
            ...prevLogs,
            {
                type,
                message,
                data,
                timestamp: new Date().toLocaleTimeString()
            }
        ]);
    };

    const handleCompanyDataFetch = (data) => {
        addLog('success', 'Daten von Handelsregister.ai empfangen', data);
        setCompanyData(data);

        // Nach einer kurzen Verzögerung die Meldung über das Ausfüllen des Formulars anzeigen
        setTimeout(() => {
            addLog('info', 'Formular wird mit den erhaltenen Daten ausgefüllt');
        }, 300);
    };

    const handleTypingStart = () => {
        addLog('info', 'Benutzer gibt Firmennamen ein...');
    };

    const handleSearchStart = (query) => {
        addLog('pending', `Daten für "${query}" werden von Handelsregister.ai abgerufen...`);
    };

    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
        document.body.style.userSelect = 'none'; // Verhindert Textauswahl während des Ziehens
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        document.body.style.userSelect = '';
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !splitScreenRef.current) return;

        const containerRect = splitScreenRef.current.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const mouseX = e.clientX - containerRect.left;

        // Berechne den neuen Split-Ratio (zwischen 0.2 und 0.8)
        let newRatio = mouseX / containerWidth;
        newRatio = Math.max(0.2, Math.min(0.8, newRatio));

        setSplitRatio(newRatio);
    };

    // MouseUp-Event auch außerhalb des Dividers erkennen
    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div className="app">
            <div
                ref={splitScreenRef}
                className={`split-screen ${isDragging ? 'dragging' : ''}`}
                onMouseMove={isDragging ? handleMouseMove : undefined}
            >
                <div
                    ref={leftPanelRef}
                    className="split-screen-left"
                    style={{ flexBasis: `${splitRatio * 100}%` }}
                >
                    <CompanyForm
                        companyData={companyData}
                        onFetchCompanyData={handleCompanyDataFetch}
                        onTypingStart={handleTypingStart}
                        onSearchStart={handleSearchStart}
                    />
                </div>

                <div
                    className="split-screen-divider"
                    onMouseDown={handleMouseDown}
                >
                    <div className="divider-handle">
                        <div className="divider-handle-icon"></div>
                    </div>
                </div>

                <div
                    ref={rightPanelRef}
                    className="split-screen-right"
                    style={{ flexBasis: `${(1 - splitRatio) * 100}%` }}
                >
                    <ConsoleLog data={companyData} logs={consoleLogs} />
                </div>
            </div>
        </div>
    );
};

export default App;