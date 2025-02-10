import toast from 'react-hot-toast';
import { Text } from 'rizzui';

export function showSuccessToastMessage(message: string): void {
  toast.success(<Text as="b">{message}</Text>);
}

export function showErrorToastMessage(message: string): void {
  toast.error(<Text as="b">{message}</Text>);
}
