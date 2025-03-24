import React from 'react';
import './ConsoleLog.css';

const ConsoleLog = ({ data, logs = [] }) => {
  return (
    <div className="json-display">
      <div className="json-display-header">
        <h3>Console Log</h3>
      </div>
      <div className="json-content console-log">
        {logs.length > 0 ? (
          <div className="log-container">
            {logs.map((log, index) => (
              <div key={index} className={`log-entry ${log.type}`}>
                <span className="timestamp">{log.timestamp}</span>
                <span className="log-type">[{log.type.toUpperCase()}]</span>
                <span className="log-message">{log.message}</span>
                {log.data && (
                  <pre className="log-data">{JSON.stringify(log.data, null, 2)}</pre>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty">
            <p>Hier siehst du was im Hintergrund passiert. Gib einen Firmennamen ein und es geht los.</p>
          </div>
        )}
        {data && (
          <div className="log-entry success">
            <span className="timestamp">{new Date().toLocaleTimeString()}</span>
            <span className="log-type">[RESPONSE]</span>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsoleLog;
