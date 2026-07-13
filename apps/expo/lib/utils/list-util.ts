import { LayoutAnimation, Platform, UIManager } from 'react-native';
import type { AccordionTheme, PartialAccordionTheme } from '../../types/list';

/**
 * Enables the Android LayoutAnimation opt-in flag. Safe to call multiple
 * times; RN ignores repeat calls. No-op on iOS/web where it's unnecessary
 * or unsupported.
 */
export function enableLayoutAnimations(): void {
  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

/** A gentle ease-in-ease-out spring config used for expand/collapse. */
export const ACCORDION_LAYOUT_ANIMATION = {
  duration: 260,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
  delete: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
};

export function triggerAccordionLayoutAnimation(disabled?: boolean): void {
  if (disabled) return;
  LayoutAnimation.configureNext(ACCORDION_LAYOUT_ANIMATION);
}

/** Clamps a progress value into the valid [0, 100] range, defaulting to 0. */
export function clampProgress(value: number | undefined): number {
  if (typeof value !== 'number' || Number.isNaN(value)) return 0;
  return Math.min(100, Math.max(0, value));
}

/** Normalizes the `initiallyExpanded` prop into a Set of ids. */
export function normalizeInitialExpanded(
  initiallyExpanded: string | string[] | undefined,
  multiple: boolean | undefined
): Set<string> {
  if (!initiallyExpanded) return new Set();
  const list = Array.isArray(initiallyExpanded)
    ? initiallyExpanded
    : [initiallyExpanded];
  if (!multiple) return new Set(list.slice(0, 1));
  return new Set(list);
}

/**
 * Given the current expanded-id set, returns the next set after toggling
 * `id`, respecting single- vs multiple-open-panel semantics.
 */
export function toggleExpandedId(
  current: Set<string>,
  id: string,
  multiple: boolean | undefined
): Set<string> {
  const isOpen = current.has(id);
  if (multiple) {
    const next = new Set(current);
    if (isOpen) next.delete(id);
    else next.add(id);
    return next;
  }
  return isOpen ? new Set() : new Set([id]);
}

/** Shallow-merges a partial theme over a base theme, one level deep per slice. */
export function mergeTheme(
  base: AccordionTheme,
  override?: PartialAccordionTheme
): AccordionTheme {
  if (!override) return base;
  return {
    colors: { ...base.colors, ...override.colors },
    spacing: { ...base.spacing, ...override.spacing },
    radii: { ...base.radii, ...override.radii },
    fontSizes: { ...base.fontSizes, ...override.fontSizes },
    shadow: { ...base.shadow, ...override.shadow },
  };
}