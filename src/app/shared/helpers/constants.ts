export const TIME_FORMAT_PATTERNS = {
  TWELVE_HOURS_WITH_ZERO: 'hh',
  TWELVE_HOURS_WITHOUT_ZERO: 'h',
  TWENTY_FOUR_HOURS_WITH_ZERO: 'HH',
  TWENTY_FOUR_HOURS_WITHOUT_ZERO: 'H',
  MINUTES_WITH_ZERO: 'mm',
  MINUTES_WITHOUT_ZERO: 'm',
  SECONDS_WITH_ZERO: 'ss',
  SECONDS_WITHOUT_ZERO: 's',
  PERIOD_OF_DAY: 'tt',
  AM: 'AM',
  PM: 'PM',
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