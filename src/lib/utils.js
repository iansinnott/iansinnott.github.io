import _format from 'date-fns/format';

// Flip curry
export const format = fmt => date => _format(date, fmt);

