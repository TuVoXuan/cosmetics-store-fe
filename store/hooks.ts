import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useContext } from "react";
import { SettingsContextValue, SettingsContext } from "../context/setting.context";
import { PathCategoryContext, PathCategoryContextValue } from "../context/path-category.context";
import { ProductDetailContext, ProductDetailContextValue } from "../context/product-detail.context";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useSettings = (): SettingsContextValue => useContext(SettingsContext);
export const usePathCategory = (): PathCategoryContextValue => useContext(PathCategoryContext);
export const useProductDetail = (): ProductDetailContextValue => useContext(ProductDetailContext);
