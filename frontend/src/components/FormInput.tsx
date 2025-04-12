import React, { useState, useRef, useEffect } from "react";
import Imageupload from "../assets/img/imageupload.svg"; // adjust path if needed

import "./FormInput.css";

interface FormInputProps {
  onSubmit: (text: string, file?: File) => void;
}

const FormInput: React.FC<FormInputProps> = ({ onSubmit }) => {
  const [inputText, setInputText] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isComposing, setIsComposing] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize the textarea as content is typed
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputText]);

  // Focus the textarea when component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Only accept image files
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      setSelectedFile(file);

      // Create image preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearFileSelection = () => {
    setSelectedFile(null);
    setImagePreview(null);
  };

  const handleSubmit = () => {
    if (inputText.trim() || selectedFile) {
      onSubmit(inputText, selectedFile || undefined);
      setInputText("");
      clearFileSelection();

      // Reset height after submission
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }

      // Re-focus on the textarea after submission
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter without Shift key
    if (e.key === "Enter" && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="enhanced-form-container">
      <textarea
        ref={textareaRef}
        className="enhanced-text-input"
        placeholder="What would you like to check?"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        rows={1}
      />

      {imagePreview && (
        <div className="image-preview-container">
          <img
            src={imagePreview}
            alt="Selected file preview"
            className="image-preview"
          />
          <button
            className="remove-image"
            onClick={clearFileSelection}
            aria-label="Remove image"
          >
            ×
          </button>
        </div>
      )}

      <div className="enhanced-button-group">
        <div className="left-buttons">
          <label className="upload-button">
            <span className="icon">
              <img src={Imageupload} alt="imageupload" />
            </span>{" "}
            Click to upload screenshot or image
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>

          <div className="text-dropdown">
            <span>Text</span>
            <span className="dropdown-icon">▼</span>
          </div>
        </div>

        <button
          className={`quick-check-button ${
            !inputText.trim() && !selectedFile ? "disabled" : ""
          }`}
          onClick={handleSubmit}
          disabled={!inputText.trim() && !selectedFile}
        >
          Quick check
        </button>
      </div>
    </div>
  );
};

export default FormInput;
