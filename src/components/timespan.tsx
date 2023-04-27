export const TimeSpan = ({
  value = "- -",
  unit,
}: {
  value: string | number | undefined;
  unit: "days" | "months" | "years";
}) => {
  return (
    <text className="text-5xl font-extrabold italic tracking-tight text-purple-600 sm:text-6xl">
      {value} <span className="text-black">{unit}</span>
    </text>
  );
};
