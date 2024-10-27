import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { Button } from "@mui/material";
import Settings from "@mui/icons-material/Settings";
import "react-circular-progressbar/dist/styles.css";
import "./Popup.css";

const Popup: React.FC = () => {
  const [counter, setCounter] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [totalConnectBtn, setTotalConnectBtn] = useState(0);

  const handleConnect = () => { 
    if (!isConnecting) {
      setIsConnecting(true);
      setCounter(0);

      const id = setInterval(() => {
        setCounter((prevCounter) => prevCounter + 1);
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const activeTab = tabs[0];
          chrome.scripting.executeScript({
            target: { tabId: activeTab.id! },
            func: sendConnectionRequest,
          });
        });
      }, Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId!);
      setIsConnecting(false);
      setIntervalId(null);
    }
  };

  const sendConnectionRequest = () => {
    const buttons = document.querySelectorAll("button");
    const connectButtons = Array.from(buttons).filter(
      (button) => button.innerText.toLowerCase().trim() === "connect"
    );

    connectButtons.forEach((button) => {
      if (button.innerText === "Connect") {
        button.click();
        const buttonList = document.querySelectorAll("button");
        const confirmBtn = Array.from(buttonList).find(
          (b) => b.innerText.trim() === "Send without a note"
        );
        if (confirmBtn) {
          confirmBtn.click();
        }
      }
    });
  };

  useEffect(() => {
    const setTotalConnectionButtonCount = () => {
      const buttons = document.querySelectorAll("button");
      const connectButtons = Array.from(buttons).filter(
        (button) => button.innerText.toLowerCase().trim() === "connect"
      );
      setTotalConnectBtn(connectButtons.length);
    };

    setTotalConnectionButtonCount();
  }, []);

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <div className="popup">
      <div className="popup-header">
        <h4>
          <span style={{ marginRight: "0.5rem" }}>LinkedIn AutoConnect</span>
          <Button
            sx={{
              marginLeft: "0.5rem",
              padding: "0.5rem",
              boxShadow: 2,
              "&:hover": {
                boxShadow: 4,
              },
              minWidth: 0,
              width: "auto",
            }}
          >
            <Settings sx={{ color: "#8c919e" }} />
          </Button>
        </h4>
      </div>
      <div className="popup-body">
        <h4>Invitations Sent</h4>
        <div className="counter-container">
          <div className="progress-circle">
            <CircularProgressbar
              value={Math.min((counter / totalConnectBtn) * 100, 100)}
              text={`${counter}`}
            />
          </div>
        </div>
        <button
          onClick={handleConnect}
          className={isConnecting ? "stop-button" : "start-button"}
        >
          {isConnecting ? "Stop Connection" : "Start Connection"}
        </button>
      </div>
    </div>
  );
};

export default Popup;
