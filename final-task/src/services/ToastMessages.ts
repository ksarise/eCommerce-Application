import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

interface ToastifyOptions {
  text: string;
  duration?: number;
  gravity?: 'top' | 'bottom';
  position?: 'left' | 'center' | 'right';
  type?: 'positive' | 'negative';
}

enum BackgroundStyles {
  positive = 'linear-gradient(5deg, rgba(5,162,31,1) 51%, rgba(232,231,225,1) 100%)',
  negative = 'linear-gradient(5deg, rgba(255,38,0,1) 51%, rgba(255,215,0,1) 100%)',
}

export default function showToast({
  text,
  duration = 3000,
  gravity = 'top',
  position = 'right',
  type = 'positive',
}: ToastifyOptions) {
  const background = BackgroundStyles[type];

  Toastify({
    text,
    duration,
    gravity,
    position,
    style: { background },
  }).showToast();
}
