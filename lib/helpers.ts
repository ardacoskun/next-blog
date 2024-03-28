import readingTime from "reading-time";
import { DateTime } from "luxon";

export const getReadingTime = (text: string, locale: string) => {
  const minute = readingTime(text).minutes;
  //Floor to 1 decimal place
  const minutesRounded = Math.floor(minute);
  const localeStrings: any = {
    de: {
      minute: "Minute",
      minutes: "Minuten",
    },
    en: {
      minute: "minute",
      minutes: "minutes",
    },
  };

  const minuteString = minutesRounded === 1 ? "minute" : "minutes";
  return `${minutesRounded} ${localeStrings[locale][minuteString]}`;
};

export const getRelativeDate = (date: string, locale: string) => {
  return DateTime.fromISO(date).setLocale(locale).toRelative();
};
