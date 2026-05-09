import "../styles/Toast.css";
import { useToast } from "../context/ToastContext";

function Toast() {
  const { toast } = useToast();

  if (!toast) return null;

  return (
    <div className="toast">
      {toast}
    </div>
  );
}

export default Toast;