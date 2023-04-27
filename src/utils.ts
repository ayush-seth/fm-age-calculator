import { DateForm } from "./pages";

export const calculateAge = ({ day, month, year }: DateForm) => {
  const today = new Date();
  const birthDate = new Date(year, month - 1, day);

  let ageInYears = today.getFullYear() - birthDate.getFullYear();
  let ageInMonths = today.getMonth() - birthDate.getMonth();
  let ageInDays = today.getDate() - birthDate.getDate();

  if (ageInMonths < 0 || (ageInMonths === 0 && ageInDays < 0)) {
    ageInYears--;
    ageInMonths += 12;
  }

  if (ageInDays < 0) {
    const daysInMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();
    ageInDays += daysInMonth;
    ageInMonths--;
  }

  return { year: ageInYears, month: ageInMonths, day: ageInDays };
};
