interface ValidationMessageProps {
  message?: string;
}

export const ValidationMessage = ({ message }: ValidationMessageProps) => {
  if (!message) return null;
  return <span className="error-msg">{message}</span>;
};
