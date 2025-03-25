export type city = {
  name: string;
  code: string;
};

import { z } from 'zod';

export const cityaddFormSchema = z.object({
  name: z.string().min(1, 'City Name is required'),
  code: z.string().min(2, 'City Code is requried'),
});
// export type addFormSchema = z.infer<typeof formSchema>;

export type PriceInfo = {
  id: number;
  price: number;
  supportTel: string;
};

export type Location = {
  name: string;
  code: string;
};

export type constants = {
  price: PriceInfo;
  locations: Location[];
};
