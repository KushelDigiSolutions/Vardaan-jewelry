"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle, FiX } from "react-icons/fi";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    success: (msg) => addToast(msg, "success"),
    error: (msg) => addToast(msg, "error"),
    info: (msg) => addToast(msg, "info"),
    warning: (msg) => addToast(msg, "warning"),
  };

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <FiCheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />;
      case "error":
        return <FiAlertCircle className="w-5 h-5 text-red-600 shrink-0" />;
      case "warning":
        return <FiAlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />;
      case "info":
      default:
        return <FiInfo className="w-5 h-5 text-[#07512E] shrink-0" />;
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case "success":
        return "border-l-4 border-emerald-600";
      case "error":
        return "border-l-4 border-red-600";
      case "warning":
        return "border-l-4 border-amber-500";
      case "info":
      default:
        return "border-l-4 border-[#07512E]";
    }
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 w-full max-w-[360px] pointer-events-none">
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes toast-slide-in {
            from {
              transform: translateX(120%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          .toast-item {
            animation: toast-slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}} />
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`toast-item pointer-events-auto flex items-start gap-3 p-4 bg-white/95 backdrop-blur-md rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 ${getBorderColor(t.type)}`}
          >
            {getIcon(t.type)}
            <div className="flex-1 text-[14px] font-sans font-medium text-gray-800 leading-tight">
              {t.message}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-gray-400 hover:text-gray-600 cursor-pointer shrink-0 transition-colors"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
