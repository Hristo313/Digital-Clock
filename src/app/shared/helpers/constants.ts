export const TIME_FORMAT_PATTERNS = {
  DEFAULT_TIME_FORMAT: 'hh:mm:ss tt'
};

export const INPUT_TIME_FORMATS = [
  { format: 'hh:mm:ss tt', description: '12-hour format with leading zeros and AM/PM field' },
  { format: 'h:m:s tt', description: '12-hour format without leading zeros and AM/PM field' },
  { format: 'HH:mm:ss', description: '24-hour format with leading zeros' },
  { format: 'H:m:s', description: '24-hour format without leading zeros' },
  { format: 'mm:ss', description: 'format with leading zeros and without hours' },
  { format: 'm:s', description: 'format without leading zeros and hours' },
];