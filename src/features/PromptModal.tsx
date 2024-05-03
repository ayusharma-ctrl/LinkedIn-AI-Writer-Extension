import React, { useState } from "react";
import { Box, Modal, Typography } from "@mui/material";
import VectorIcon from 'assets/Vector.svg';
import InsertIcon from 'assets/Insert.svg';
import RegenerateIcon from 'assets/Regenerate.svg';

interface IPrompts {
    role: string,
    message: string,
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column'
};

const PromptModal = ({ open, handleClose }: { open: boolean; handleClose: () => void }) => {
    const [prompts, setPrompts] = useState<IPrompts[]>([]);
    const [userPrompt, setUserPrompt] = useState<string>("");

    // method to update states and render div accordingly
    const handleGenerate = () => {
        if (userPrompt && userPrompt?.length > 0) {
            const data = [
                {
                    role: "user",
                    message: userPrompt
                },
                {
                    role: "system",
                    message: "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
                }
            ]
            setPrompts(prev => [...prev, ...data]);
        }
        setUserPrompt("");
    }

    // method to add the AI response in a textbox
    const handleInsert = () => {
        const placeHolder = document.querySelector(".msg-form__placeholder");
        placeHolder?.remove();
        const textBox = document.querySelector(".msg-form__contenteditable");
        if (textBox) {
            textBox.textContent = prompts[prompts.length - 1]?.message;
            // update the position of cursor
            const range = document.createRange();
            range.selectNodeContents(textBox);
            range.collapse(false);
            const selection = window.getSelection();
            if (selection) {
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
        setUserPrompt("");
        setPrompts([]);
        handleClose();
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {
                    prompts && prompts.length > 0 && prompts.map((prompt, index) =>
                        <Typography
                            key={index}
                            sx={{ maxWidth: "max-content", alignSelf: prompt.role === "user" ? 'end' : 'start', fontSize: "14px", fontWeight: '400', color: "#666D80", bgcolor: prompt.role === "user" ? "#DFE1E7" : "#DBEAFE", padding: 1, paddingX: 2, marginBottom: 2, borderRadius: 2 }}
                        >
                            {prompt.message}
                        </Typography>
                    )
                }
                <input
                    type="text"
                    placeholder="Your prompt"
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    style={{ fontSize: "14px", borderRadius: "6px", marginBottom: 2 }}
                />

                {prompts && prompts.length === 0 ?
                    <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                        <button
                            type="button"
                            onClick={handleGenerate}
                            style={{ backgroundColor: "#3B82F6", color: "#fff", fontSize: "14px", fontWeight: "600", borderRadius: 4, padding: 6, marginTop: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', width: "112px", cursor: "pointer" }}
                        >
                            <img src={VectorIcon} alt="icon" style={{ width: "16px", height: "16px", marginRight: "8px" }} />
                            <span style={{ textAlign: "center" }}>Generate</span>
                        </button>
                    </div> :
                    <div style={{ display: 'flex', justifyContent: "flex-end", gap: 4 }}>
                        <button
                            type="button"
                            onClick={handleInsert}
                            style={{ color: "#666D80", border: "2px solid #666D80", fontSize: "14px", fontWeight: "600", borderRadius: 4, padding: 6, marginTop: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', width: "80px", cursor: "pointer", marginRight: 4 }}
                        >
                            <img src={InsertIcon} alt="icon" style={{ width: "16px", height: "16px", marginRight: "6px" }} />
                            <span>Insert</span>
                        </button>
                        <button
                            type="button"
                            style={{ backgroundColor: "#3B82F6", color: "#fff", fontSize: "14px", fontWeight: "600", borderRadius: 4, padding: 6, marginTop: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', width: "112px", cursor: "pointer" }}
                        >
                            <img src={RegenerateIcon} alt="icon" style={{ width: "16px", height: "16px", marginRight: "6px" }} />
                            <span>Regenerate</span>
                        </button>
                    </div>
                }
            </Box>
        </Modal>
    );
};

export default PromptModal;