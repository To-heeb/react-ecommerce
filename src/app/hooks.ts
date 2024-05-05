import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// type DispatchFunc = () => AppDispatch
// export const useAppDispatch: DispatchFunc => useDispatch<AppDispatch>()

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<any>(); // fix using any


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector