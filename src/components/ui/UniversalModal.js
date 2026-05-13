"use client";
import { useEffect, useRef } from "react";

export function UniversalModal({ isOpen, onClose, title, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="modal modal-bottom sm:modal-middle backdrop:backdrop-blur-md"
      onClose={onClose}
    >
      <div className="modal-box bg-nazrul-base border border-nazrul-sand p-0 rounded-[40px] shadow-2xl max-w-3xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-8 bg-white border-b border-gray-50 sticky top-0 z-10">
          <h3 className="font-serif font-bold text-2xl text-nazrul-ink">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost text-nazrul-ink hover:text-nazrul-crimson"
          >
            ✕
          </button>
        </div>

        {/* Content Area */}
        <div className="p-8 text-nazrul-ink max-h-[75vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}
