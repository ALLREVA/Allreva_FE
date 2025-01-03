import { z } from 'zod';

const artistRequestSchema = z.object({
  spotifyArtistId: z.string(),
  name: z.string(),
});

export const userProfileSchema = z.object({
  email: z.string().email(),
  nickname: z
    .string()
    .min(1, { message: '닉네임을 입력해주세요' })
    .regex(/^[가-힣A-Za-z0-9\s]+$/, {
      message: '닉네임은 한글, 영문, 숫자만 입력 가능합니다',
    }),
  introduce: z.string().max(100, { message: '한줄소개는 100자 이내로 입력해주세요' }).nullable(),
  loginProvider: z.literal('KAKAO'),
  memberArtistRequests: z.array(artistRequestSchema),
  imageFile: z.instanceof(File).optional(),
});

export type ProfileSchemaType = z.infer<typeof userProfileSchema>;
