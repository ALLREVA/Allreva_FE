import { z } from 'zod';

const requiredString = () => z.string().min(1, '필수 입력 항목입니다.');
const requiredImage = () =>
  z.instanceof(File).refine((val) => val !== null, {
    message: '파일을 업로드해야 합니다.',
  });

export const chatSchema = z.object({
  imageFile: requiredImage(),
  title: requiredString(),
  description: z.string(),
});

export type ChatSchemaType = z.infer<typeof chatSchema>;
