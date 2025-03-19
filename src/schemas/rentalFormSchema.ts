import { z } from 'zod';

const requiredString = () => z.string().min(1, '필수 입력 항목입니다.');
const requiredStringArray = () => z.string().array().min(1, '필수 입력 항목입니다.');
const requiredNumber = () => z.number().positive('필수 입력 항목입니다.');
const requiredImage = () =>
  z
    .string()
    .nullable()
    .refine((value) => value !== null && value.length > 0, '파일을 업로드해야 합니다.');

export const rentalFormSchema = [
  z.object({
    imageUrl: requiredImage(),
    title: requiredString(),
    concertId: requiredNumber(),
    artistName: requiredString(),
    region: requiredString(),
    depositAccount: requiredString(),
  }),
  z.object({
    boardingArea: requiredString(),
    upTime: requiredString(),
    downTime: requiredString(),
    boardingDates: requiredStringArray(),
    busInfo: requiredString(),
    roundPrice: requiredNumber(),
    upTimePrice: requiredNumber(),
    downTimePrice: requiredNumber(),
  }),
  z.object({
    recruitmentCount: requiredNumber(),
    endDate: requiredString(),
    chatUrl: requiredString(),
    refundType: requiredString(),
    information: requiredString(),
  }),
];

export const busInfoSchema = z.object({
  busSize: requiredString(),
  busType: requiredString(),
  maxPassenger: requiredString(),
});

export type RentalFormSchemaType = z.infer<(typeof rentalFormSchema)[number]>;
export type BusInfoSchemaType = z.infer<typeof busInfoSchema>;

type UnionToKeys<T> = T extends T ? keyof T : never;
export type RentalFormKeys = UnionToKeys<RentalFormSchemaType>;
