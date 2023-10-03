import React, { useEffect } from "react";

interface IProgressBarProps {
    progress: number;
    setProgress: React.Dispatch<React.SetStateAction<number>>;
}

const ProgressBar: React.FunctionComponent<IProgressBarProps> = ({
    progress,
    setProgress,
}) => {
    useEffect(() => {
        const interval = setInterval(() => {
            if (progress < 100) {
                setProgress(progress + 10);
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [progress]);

    return (
        <div className="progress-bar">
            <div
                className="progress"
                style={{
                    width: `${progress}%`,
                    padding: "20px",
                    color: "white",
                }}
            >
                {progress}%
            </div>
        </div>
    );
};

export default ProgressBar;
