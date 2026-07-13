import { StyleSheet } from 'react-native';
import type { AccordionTheme } from '../types/list';

/**
 * Default theme tuned to match the reference design: pale lavender/pink
 * card gradients, muted slate text, and a soft ambient shadow.
 */
 
export const defaultTheme: AccordionTheme = {
  colors: {
    cardGradientStart: '#F6F1FC',
    cardGradientEnd: '#FBF3F6',
    cardBorder: 'rgba(151, 121, 215, 0.16)',
    cardShadow: 'rgba(124, 96, 196, 0.18)',
    titleText: '#2B2540',
    subtitleText: '#8E8AA3',
    chevron: '#3A3550',
    checkBackground: '#EFEAFB',
    checkBorder: '#B9A9EE',
    checkIcon: '#6C4FD6',
    progressTrack: '#E7E1F5',
    progressFill: '#8C6FE8',
    progressText: '#6C4FD6',
    itemBackground: '#FFFFFF',
    itemIconBackground: '#F3EEFC',
    itemText: '#332D4B',
    itemDescriptionText: '#9A96AC',
    divider: 'rgba(151, 121, 215, 0.10)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 14,
    lg: 20,
    xl: 28,
  },
  radii: {
    card: 22,
    item: 16,
    icon: 14,
  },
  fontSizes: {
    title: 17,
    subtitle: 13,
    item: 15,
    itemDescription: 12,
    progress: 11,
  },
  shadow: {
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffsetY: 6,
    elevation: 4,
  },
};

/**
 * Builds a StyleSheet from a resolved theme. Called once per render with a
 * memoized theme object, so consumers get a fresh, override-aware stylesheet
 * without paying for StyleSheet.create on every keystroke.
 */
export function createAccordionStyles(theme: AccordionTheme) {
  const { colors, spacing, radii, fontSizes, shadow } = theme;

  return StyleSheet.create({
    list: {
      width: '100%',
    },
    cardWrapper: {
      borderRadius: radii.card,
      shadowColor: colors.cardShadow,
      shadowOpacity: shadow.shadowOpacity,
      shadowRadius: shadow.shadowRadius,
      shadowOffset: { width: 0, height: shadow.shadowOffsetY },
      elevation: shadow.elevation,
    },
    card: {
      borderRadius: radii.card,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      overflow: 'hidden',
    },
    cardGradientFallback: {
      backgroundColor: colors.cardGradientStart,
    },
    gradientOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.cardGradientEnd,
      opacity: 0.55,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.lg,
      minHeight: 56,
    },
    leftIndicator: {
      width: 36,
      height: 36,
      marginRight: spacing.md,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkBadge: {
      width: 36,
      height: 36,
      borderRadius: radii.icon,
      backgroundColor: colors.checkBackground,
      borderWidth: 1.5,
      borderColor: colors.checkBorder,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleColumn: {
      flex: 1,
      justifyContent: 'center',
    },
    titleText: {
      fontSize: fontSizes.title,
      fontWeight: '600',
      color: colors.titleText,
    },
    subtitleText: {
      fontSize: fontSizes.subtitle,
      color: colors.subtitleText,
      marginTop: 2,
    },
    chevronWrap: {
      width: 28,
      height: 28,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: spacing.sm,
    },
    content: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.lg,
      gap: spacing.sm,
    },
    itemRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.itemBackground,
      borderRadius: radii.item,
      paddingVertical: spacing.sm + 2,
      paddingHorizontal: spacing.sm + 2,
      marginTop: spacing.sm,
    },
    itemIconHolder: {
      width: 32,
      height: 32,
      borderRadius: radii.icon - 2,
      backgroundColor: colors.itemIconBackground,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.sm + 2,
    },
    itemIconText: {
      fontSize: 15,
    },
    itemTextColumn: {
      flex: 1,
    },
    itemText: {
      fontSize: fontSizes.item,
      color: colors.itemText,
      fontWeight: '500',
    },
    itemDescriptionText: {
      fontSize: fontSizes.itemDescription,
      color: colors.itemDescriptionText,
      marginTop: 1,
    },
    progressRingLabel: {
      fontWeight: '700',
    },
  });
}

export type AccordionStyles = ReturnType<typeof createAccordionStyles>;