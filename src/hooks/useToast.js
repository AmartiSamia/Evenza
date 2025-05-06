import { useState } from 'react';

export const useToast = () => {
  const [toast, setToast] = useState(null);

  const showToast = ({ title, description, variant = 'default' }) => {
    setToast({ title, description, variant });
    setTimeout(() => setToast(null), 5000);
  };

  const Toast = () => {
    if (!toast) return null;

    const variantClasses = {
      default: 'bg-blue-100 text-blue-800',
      success: 'bg-green-100 text-green-800',
      destructive: 'bg-red-100 text-red-800',
    };

    return (
      <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg ${variantClasses[toast.variant]}`}>
        <h3 className="font-bold">{toast.title}</h3>
        <p>{toast.description}</p>
      </div>
    );
  };

  return { toast: showToast, Toast };
};