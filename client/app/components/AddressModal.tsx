"use client";

export const AddressModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-100 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400">✕</button>
        
        <h2 className="text-xl font-bold mb-4">Please write your delivery address!</h2>
        <textarea 
          placeholder="Please share your complete address"
          className="w-full border rounded-lg p-3 h-24 focus:ring-2 focus:ring-red-500 outline-none"
        />
        
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-2 border rounded-lg font-bold">Cancel</button>
          <button className="flex-1 py-2 bg-[#1C1C1C] text-white rounded-lg font-bold">Deliver Here</button>
        </div>
      </div>
    </div>
  );
};