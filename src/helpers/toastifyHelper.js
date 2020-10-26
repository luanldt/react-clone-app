import { toast } from 'react-toastify';

export const toastError = (error) => {
  let message = null;
  if (typeof error === 'object' && error.message) {
    ({ message } = error);
  }
  if (message !== null && typeof message !== 'undefined' && message !== '') {
    toast.error(message, {
      position: 'bottom-right',
    });
  }
};

export const toastSuccess = (message) => {
  if (message !== null && typeof message !== 'undefined' && message !== '') {
    toast.success(message, {
      position: 'bottom-right',
    });
  }
};
