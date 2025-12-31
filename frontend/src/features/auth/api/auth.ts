// src/lib/api/auth.ts
import ShopAPI from '@/shared/api/axios-instance';
import { SignInBody, SignUpBody } from '../schema/auth.schema';

export const signUp = async (payload: SignUpBody) => {
  const { data } = await ShopAPI.post('/auth/sign-up', payload);
  return data;
};

export const signIn = async (payload: SignInBody) => {
  const { data } = await ShopAPI.post('/auth/sign-in', payload);
  return data;
};