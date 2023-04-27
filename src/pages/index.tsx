import { Input } from "@/components/input";
import { TimeSpan } from "@/components/timespan";
import { calculateAge } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700", "800"] });

const DateFormSchema = z.object({
  day: z.coerce
    .number()
    .gt(0, { message: "This field is required" })
    .gte(1, { message: "Must be a valid day" })
    .lte(31, { message: "Must be a valid day" }),
  month: z.coerce
    .number()
    .gt(0, { message: "This field is required" })
    .gte(1, { message: "Must be a valid month" })
    .lte(12, { message: "Must be a valid month" }),
  year: z.coerce
    .number({
      invalid_type_error: "This field is required",
      required_error: "This field is required",
    })
    .gt(0, { message: "This field is required" })
    .lte(new Date().getFullYear(), { message: "Must be in the past" }),
});

export type DateForm = z.infer<typeof DateFormSchema>;

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DateForm>({
    resolver: zodResolver(DateFormSchema),
  });
  const [age, setAge] = useState<DateForm>();

  const onSubmit: SubmitHandler<DateForm> = ({ day, month, year }) => {
    setAge(calculateAge({ day, month, year }));
  };

  return (
    <div
      className={`${poppins.className} grid h-screen w-screen place-items-center bg-neutral-200`}
    >
      <div className="m-4 rounded-2xl rounded-br-[100px] bg-white p-8 sm:w-[550px]">
        <form className="flex gap-4 sm:gap-6">
          <Input
            label="day"
            placeholder="DD"
            {...register("day")}
            error={errors.day?.message}
          />
          <Input
            label="month"
            placeholder="MM"
            {...register("month")}
            error={errors.month?.message}
          />
          <Input
            label="year"
            placeholder="YYYY"
            {...register("year")}
            error={errors.year?.message}
          />
        </form>
        <div className="relative my-14 sm:my-6">
          <div className="h-px grow bg-slate-200" />
          <button
            className="absolute -top-8 right-[calc(50%-28px)] grid h-16 w-16 place-items-center rounded-full bg-purple-600 hover:bg-black sm:-top-6 sm:right-0 sm:h-14 sm:w-14"
            onClick={handleSubmit(onSubmit)}
          >
            <Image src="/icon-arrow.svg" width={24} height={24} alt="" />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <TimeSpan value={age?.year} unit="years" />
          <TimeSpan value={age?.month} unit="months" />
          <TimeSpan value={age?.day} unit="days" />
        </div>
      </div>
    </div>
  );
}
