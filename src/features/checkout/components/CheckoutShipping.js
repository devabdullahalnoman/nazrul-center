"use client";

export default function CheckoutShipping({ formData, setFormData, onNext }) {
  const isValid = formData.address.length > 5 && formData.phone.length >= 11;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-nazrul-sand ml-1">Shipping Address</label>
          <textarea 
            className="w-full p-4 bg-white border border-nazrul-sand/20 rounded-xl outline-none text-sm min-h-30" 
            placeholder="House, Road, Area, City..."
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-nazrul-sand ml-1">Phone</label>
          <input 
            className="w-full p-4 bg-white border border-nazrul-sand/20 rounded-xl outline-none text-sm" 
            placeholder="01XXXXXXXXX"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>
      </div>
      <button 
        onClick={onNext} 
        disabled={!isValid}
        className="w-full bg-nazrul-ink text-white py-6 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-nazrul-terracotta transition-all disabled:opacity-30"
      >
        Select Payment Method
      </button>
    </div>
  );
}