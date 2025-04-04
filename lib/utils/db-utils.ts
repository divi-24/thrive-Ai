import { cache } from 'react';
import { db } from './db';

export const withDb = cache(async <T>(fn: () => Promise<T>): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}); 