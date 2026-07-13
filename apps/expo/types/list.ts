import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle, TextStyle } from 'react-native';

/**
 * A single row rendered inside an expanded accordion card.
 */
export interface AccordionSubItem {
  /** Stable unique id, used as the React key. */
  id: string;
  /**
   * Icon identifier. This is intentionally an opaque string so the
   * component has zero hard icon dependencies. Pass an emoji ("✉️"),
   * a single letter, or a name that your `renderIcon` implementation
   * understands (e.g. an `@expo/vector-icons` glyph name).
   */
  icon?: string;
  /** Primary label text, e.g. "Writing an Email". */
  label: string;
  /** Optional secondary line rendered under the label. */
  description?: string;
  /** Optional extra data passed through to onItemPress. */
  onPress?: () => void;
}

/**
 * A single collapsible card in the list.
 */
export interface AccordionSectionData {
  /** Stable unique id, used as the React key and for expand/collapse state. */
  id: string;
  /** Card title, e.g. "Listening Skills". */
  title: string;
  /** Optional secondary line under the title. */
  subtitle?: string;
  /**
   * Progress percentage between 0 and 100 (inclusive). When provided and
   * less than 100, a circular progress ring is rendered on the left of the
   * header. When exactly 100 (or omitted while `complete` is true) a
   * checkmark badge is rendered instead.
   */
  progress?: number;
  /**
   * Explicitly marks a section as complete, forcing the checkmark badge
   * regardless of `progress`. Useful when a section has no percentage
   * concept but is simply "done".
   */
  complete?: boolean;
  /** Rows rendered in the expanded content area. */
  items?: AccordionSubItem[];
}

/** Color tokens used throughout the component. */
export interface AccordionThemeColors {
  /** Gradient start color for the card background. */
  cardGradientStart: string;
  /** Gradient end color for the card background. */
  cardGradientEnd: string;
  /** Card border color (hairline). */
  cardBorder: string;
  /** Card drop shadow color. */
  cardShadow: string;
  /** Title text color. */
  titleText: string;
  /** Subtitle text color. */
  subtitleText: string;
  /** Chevron icon color. */
  chevron: string;
  /** Background of the completed checkmark badge. */
  checkBackground: string;
  /** Border color of the completed checkmark badge. */
  checkBorder: string;
  /** Checkmark glyph color. */
  checkIcon: string;
  /** Unfilled track color of the progress ring. */
  progressTrack: string;
  /** Filled arc color of the progress ring. */
  progressFill: string;
  /** Percentage label color inside the progress ring. */
  progressText: string;
  /** Background color of each inner content row. */
  itemBackground: string;
  /** Background color of the small icon holder inside a row. */
  itemIconBackground: string;
  /** Row label text color. */
  itemText: string;
  /** Row description text color. */
  itemDescriptionText: string;
  /** Divider color between stacked cards, if used. */
  divider: string;
}

export interface AccordionThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface AccordionThemeRadii {
  card: number;
  item: number;
  icon: number;
}

export interface AccordionThemeFontSizes {
  title: number;
  subtitle: number;
  item: number;
  itemDescription: number;
  progress: number;
}

export interface AccordionThemeShadow {
  shadowOpacity: number;
  shadowRadius: number;
  shadowOffsetY: number;
  elevation: number;
}

/** Full theme shape. Pass a `Partial<AccordionTheme>` to override any slice. */
export interface AccordionTheme {
  colors: AccordionThemeColors;
  spacing: AccordionThemeSpacing;
  radii: AccordionThemeRadii;
  fontSizes: AccordionThemeFontSizes;
  shadow: AccordionThemeShadow;
}

/** Deep-partial theme, used for the public `theme` prop. */
export type PartialAccordionTheme = {
  colors?: Partial<AccordionThemeColors>;
  spacing?: Partial<AccordionThemeSpacing>;
  radii?: Partial<AccordionThemeRadii>;
  fontSizes?: Partial<AccordionThemeFontSizes>;
  shadow?: Partial<AccordionThemeShadow>;
};

/** Per-element style override slots, layered on top of the theme-derived styles. */
export interface AccordionStyleOverrides {
  card?: StyleProp<ViewStyle>;
  header?: StyleProp<ViewStyle>;
  titleText?: StyleProp<TextStyle>;
  subtitleText?: StyleProp<TextStyle>;
  progressContainer?: StyleProp<ViewStyle>;
  itemContainer?: StyleProp<ViewStyle>;
  itemText?: StyleProp<TextStyle>;
}

export interface AccordionListProps {
  /** The sections to render. */
  data: AccordionSectionData[];
  /**
   * Id, or array of ids, that should start expanded. Ignored on re-renders;
   * only read once on mount (this is an "initial state" prop, not a
   * controlled prop).
   */
  initiallyExpanded?: string | string[];
  /** When true, more than one card may be expanded at once. Default: false. */
  multiple?: boolean;
  /** Fired whenever a card is expanded or collapsed. */
  onToggle?: (id: string, expanded: boolean) => void;
  /** Fired when a row inside an expanded card is pressed. */
  onItemPress?: (sectionId: string, item: AccordionSubItem) => void;
  /** Deep-partial theme override. Merged over the default theme. */
  theme?: PartialAccordionTheme;
  /** Style applied to the outer list container. */
  style?: StyleProp<ViewStyle>;
  /** Style overrides for individual sub-elements of every card. */
  styleOverrides?: AccordionStyleOverrides;
  /** Prefix used when building each card's accessibilityLabel. */
  accessibilityLabelPrefix?: string;
  /**
   * Custom icon renderer for section rows. Receives the `icon` string from
   * `AccordionSubItem` and must return a React node. Falls back to a plain
   * text glyph when omitted.
   */
  renderIcon?: (icon: string | undefined, item: AccordionSubItem) => ReactNode;
  /**
   * Optional custom gradient renderer, so consumers can drop in
   * `expo-linear-gradient` (or any gradient implementation) without this
   * package taking a hard dependency on it. Receives the resolved theme
   * gradient colors and must render `children` inside the gradient view.
   * Defaults to a lightweight layered-View approximation.
   */
  renderGradient?: (
    colors: [string, string],
    style: StyleProp<ViewStyle>,
    children: ReactNode
  ) => ReactNode;
  /** Disables the collapse/expand LayoutAnimation (e.g. for tests). */
  disableAnimation?: boolean;
  /** Space between stacked cards. Defaults to theme.spacing.md. */
  gap?: number;
}

export interface AccordionCardProps {
  section: AccordionSectionData;
  expanded: boolean;
  onToggle: (id: string) => void;
  onItemPress?: (sectionId: string, item: AccordionSubItem) => void;
  theme: AccordionTheme;
  styleOverrides?: AccordionStyleOverrides;
  accessibilityLabelPrefix?: string;
  renderIcon?: (icon: string | undefined, item: AccordionSubItem) => ReactNode;
  renderGradient?: AccordionListProps['renderGradient'];
  disableAnimation?: boolean;
}