import { createAction,props } from '@ngrx/store';

export const addCart = createAction('AddCart', props<{ value: any }>());
export const deleteCart = createAction('DeleteCart', props<{ stt: number }>());