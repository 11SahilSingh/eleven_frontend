import useStore from "../hooks/useStore";

const Toast = () => {
  const { toast } = useStore();
  if (!toast) return null;

  return (
    <div className="toast" role="status" aria-live="polite" key={toast.id}>
      {toast.message}
    </div>
  );
};

export default Toast;
