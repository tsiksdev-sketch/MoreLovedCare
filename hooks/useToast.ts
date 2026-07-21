import { toast as sonnerToast } from "sonner";

type ToastOptions = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
};

export function toastSuccess(options: ToastOptions) {
  sonnerToast.success(options.description ? options.description.toString?.() : undefined, {
    description: options.description,
    action: options.onAction && options.actionLabel
      ? { label: options.actionLabel, onClick: options.onAction }
      : undefined,
  });
}

export function toastInfo(options: ToastOptions) {
  sonnerToast(options.description ? options.description.toString?.() : undefined, {
    description: options.description,
    action: options.onAction && options.actionLabel
      ? { label: options.actionLabel, onClick: options.onAction }
      : undefined,
  });
}

export function toastError(options: ToastOptions) {
  sonnerToast.error(options.description ? options.description.toString?.() : undefined, {
    description: options.description,
    action: options.onAction && options.actionLabel
      ? { label: options.actionLabel, onClick: options.onAction }
      : undefined,
  });
}