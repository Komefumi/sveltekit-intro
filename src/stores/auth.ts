import { writable } from 'svelte/store';
import type { BackendUserType } from '../types/backend';

export const user = writable<null | BackendUserType>(null);
