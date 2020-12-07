import { DateTime } from 'luxon';

const transformDate = (entries) => entries.map((entry) => {
  const date = DateTime.fromISO(entry.date);

  return {
    ...entry,
    date,
  };
});

export default transformDate;
