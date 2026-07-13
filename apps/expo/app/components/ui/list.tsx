import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Text,
  TouchableOpacity,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { createAccordionStyles, defaultTheme } from '../../styles';
import type {
  AccordionCardProps,
  AccordionListProps,
  AccordionSubItem,
} from '../../../types/list';
import {
  clampProgress,
  enableLayoutAnimations,
  mergeTheme,
  normalizeInitialExpanded,
  toggleExpandedId,
  triggerAccordionLayoutAnimation,
} from '../../../lib/utils/list-util';

enableLayoutAnimations();

/* -------------------------------------------------------------------------
 * CircularProgress
 * A dependency-free progress ring built from two half-circle overlays.
 * This is a well-known pure-RN technique (no SVG required) that renders a
 * clean 0-100% ring using only View borders and rotation transforms.
 * For pixel-perfect rings, swap in `react-native-svg`'s <Circle /> via a
 * custom left-indicator renderer — see README "Custom progress ring".
 * ---------------------------------------------------------------------- */
interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  trackColor: string;
  fillColor: string;
  textColor: string;
  labelStyle?: StyleProp<ViewStyle>;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  size = 36,
  strokeWidth = 3,
  trackColor,
  fillColor,
  textColor,
}) => {
  const clamped = clampProgress(percentage);
  const rotation = (clamped / 100) * 360;
  const isOverHalf = clamped > 50;

  const circleBase: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  return (
    <View
      style={[
        circleBase,
        {
          borderWidth: strokeWidth,
          borderColor: trackColor,
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}
      accessible={false}
    >
      {/* Right half: covers rotation 0deg -> 180deg */}
      <View
        style={{
          position: 'absolute',
          width: size / 2,
          height: size,
          right: 0,
          overflow: 'hidden',
        }}
      >
        <View
          style={[
            circleBase,
            {
              borderWidth: strokeWidth,
              borderColor: fillColor,
              transform: [{ rotate: `${Math.min(rotation, 180)}deg` }],
            },
          ]}
        />
      </View>
      {/* Left half: only needed once we pass the 180deg mark */}
      {isOverHalf && (
        <View
          style={{
            position: 'absolute',
            width: size / 2,
            height: size,
            left: 0,
            overflow: 'hidden',
          }}
        >
          <View
            style={[
              circleBase,
              {
                borderWidth: strokeWidth,
                borderColor: fillColor,
                transform: [{ rotate: `${rotation - 180}deg` }],
              },
            ]}
          />
        </View>
      )}
      <Text
        style={{
          fontSize: size * 0.3,
          fontWeight: '700',
          color: textColor,
        }}
        maxFontSizeMultiplier={1.4}
      >
        {Math.round(clamped)}%
      </Text>
    </View>
  );
};

/* -------------------------------------------------------------------------
 * CheckBadge — completed-section indicator
 * ---------------------------------------------------------------------- */
const CheckBadge: React.FC<{
  size?: number;
  background: string;
  border: string;
  iconColor: string;
}> = ({ size = 36, background, border, iconColor }) => (
  <View
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.4,
      backgroundColor: background,
      borderWidth: 1.5,
      borderColor: border,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Text style={{ color: iconColor, fontSize: size * 0.5, fontWeight: '700' }}>
      ✓
    </Text>
  </View>
);

/* -------------------------------------------------------------------------
 * Chevron — animated rotation between collapsed (0deg) and expanded (180deg)
 * ---------------------------------------------------------------------- */
const Chevron: React.FC<{ expanded: boolean; color: string }> = ({
  expanded,
  color,
}) => {
  const rotateAnim = useRef(new Animated.Value(expanded ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: expanded ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [expanded, rotateAnim]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <Text style={{ fontSize: 16, color, fontWeight: '700' }}>⌄</Text>
    </Animated.View>
  );
};

/* -------------------------------------------------------------------------
 * AccordionItemRow — a single row in the expanded content area
 * ---------------------------------------------------------------------- */
const AccordionItemRow: React.FC<{
  item: AccordionSubItem;
  sectionId: string;
  onPress?: (sectionId: string, item: AccordionSubItem) => void;
  renderIcon?: AccordionListProps['renderIcon'];
  styles: ReturnType<typeof createAccordionStyles>;
  itemContainerOverride?: StyleProp<ViewStyle>;
  itemTextOverride?: StyleProp<ViewStyle>;
  accessibilityLabelPrefix?: string;
}> = ({
  item,
  sectionId,
  onPress,
  renderIcon,
  styles,
  itemContainerOverride,
  itemTextOverride,
}) => {
  const handlePress = useCallback(() => {
    item.onPress?.();
    onPress?.(sectionId, item);
  }, [item, onPress, sectionId]);

  const isPressable = Boolean(onPress || item.onPress);

  const content = (
    <>
      <View style={styles.itemIconHolder}>
        {renderIcon ? (
          renderIcon(item.icon, item)
        ) : (
          <Text style={styles.itemIconText}>{item.icon ?? '•'}</Text>
        )}
      </View>
      <View style={styles.itemTextColumn}>
        <Text style={[styles.itemText, itemTextOverride]}>{item.label}</Text>
        {item.description ? (
          <Text style={styles.itemDescriptionText}>{item.description}</Text>
        ) : null}
      </View>
    </>
  );

  if (!isPressable) {
    return (
      <View style={[styles.itemRow, itemContainerOverride]}>{content}</View>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.itemRow, itemContainerOverride]}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={item.label}
      hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
      activeOpacity={0.7}
    >
      {content}
    </TouchableOpacity>
  );
};

/* -------------------------------------------------------------------------
 * Default gradient renderer — a lightweight two-layer approximation that
 * needs no extra dependency. Consumers wanting a true gradient can pass
 * `renderGradient` backed by `expo-linear-gradient`. See README.
 * ---------------------------------------------------------------------- */
const defaultRenderGradient: NonNullable<AccordionListProps['renderGradient']> = (
  colors,
  style,
  children
) => (
  <View style={[style, { backgroundColor: colors[0] }]}>
    <View
      pointerEvents="none"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors[1],
        opacity: 0.55,
      }}
    />
    {children}
  </View>
);

/* -------------------------------------------------------------------------
 * AccordionCard — a single collapsible card
 * ---------------------------------------------------------------------- */
export const AccordionCard: React.FC<AccordionCardProps> = ({
  section,
  expanded,
  onToggle,
  onItemPress,
  theme,
  styleOverrides,
  accessibilityLabelPrefix,
  renderIcon,
  renderGradient,
  disableAnimation,
}) => {
  const styles = useMemo(() => createAccordionStyles(theme), [theme]);
  const hasProgress = typeof section.progress === 'number';
  const isComplete = section.complete === true || section.progress === 100;
  const showLeftIndicator = hasProgress || section.complete === true;

  const handlePress = useCallback(() => {
    triggerAccordionLayoutAnimation(disableAnimation);
    onToggle(section.id);
  }, [disableAnimation, onToggle, section.id]);

  const label = `${accessibilityLabelPrefix ? `${accessibilityLabelPrefix} ` : ''}${
    section.title
  }`;

  const gradientRenderer = renderGradient ?? defaultRenderGradient;

  return (
    <View style={[styles.cardWrapper, styleOverrides?.card]}>
      {gradientRenderer(
        [theme.colors.cardGradientStart, theme.colors.cardGradientEnd],
        styles.card,
        <>
          <TouchableOpacity
            style={[styles.header, styleOverrides?.header]}
            onPress={handlePress}
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityLabel={label}
            accessibilityState={{ expanded }}
            accessibilityHint={
              expanded ? 'Collapses this section' : 'Expands this section'
            }
          >
            {showLeftIndicator ? (
              <View
                style={[styles.leftIndicator, styleOverrides?.progressContainer]}
              >
                {isComplete ? (
                  <CheckBadge
                    background={theme.colors.checkBackground}
                    border={theme.colors.checkBorder}
                    iconColor={theme.colors.checkIcon}
                  />
                ) : (
                  <CircularProgress
                    percentage={clampProgress(section.progress)}
                    trackColor={theme.colors.progressTrack}
                    fillColor={theme.colors.progressFill}
                    textColor={theme.colors.progressText}
                  />
                )}
              </View>
            ) : null}

            <View style={styles.titleColumn}>
              <Text
                style={[styles.titleText, styleOverrides?.titleText]}
                numberOfLines={1}
              >
                {section.title}
              </Text>
              {section.subtitle ? (
                <Text
                  style={[styles.subtitleText, styleOverrides?.subtitleText]}
                  numberOfLines={1}
                >
                  {section.subtitle}
                </Text>
              ) : null}
            </View>

            <View style={styles.chevronWrap}>
              <Chevron expanded={expanded} color={theme.colors.chevron} />
            </View>
          </TouchableOpacity>

          {expanded && section.items && section.items.length > 0 ? (
            <View style={styles.content}>
              {section.items.map((item) => (
                <AccordionItemRow
                  key={item.id}
                  item={item}
                  sectionId={section.id}
                  onPress={onItemPress}
                  renderIcon={renderIcon}
                  styles={styles}
                  itemContainerOverride={styleOverrides?.itemContainer}
                  itemTextOverride={styleOverrides?.itemText}
                />
              ))}
            </View>
          ) : null}
        </>
      )}
    </View>
  );
};

/* -------------------------------------------------------------------------
 * AccordionList — the public component
 * ---------------------------------------------------------------------- */
export const AccordionList: React.FC<AccordionListProps> = ({
  data,
  initiallyExpanded,
  multiple = false,
  onToggle,
  onItemPress,
  theme: themeOverride,
  style,
  styleOverrides,
  accessibilityLabelPrefix,
  renderIcon,
  renderGradient,
  disableAnimation,
  gap,
}) => {
  const theme = useMemo(
    () => mergeTheme(defaultTheme, themeOverride),
    [themeOverride]
  );

  const [expandedIds, setExpandedIds] = useState<Set<string>>(() =>
    normalizeInitialExpanded(initiallyExpanded, multiple)
  );

  const handleToggle = useCallback(
    (id: string) => {
      setExpandedIds((current) => {
        const next = toggleExpandedId(current, id, multiple);
        onToggle?.(id, next.has(id));
        return next;
      });
    },
    [multiple, onToggle]
  );

  const spacing = gap ?? theme.spacing.md;

  return (
    <View style={[{ width: '100%' }, style]}>
      {data.map((section, index) => (
        <View
          key={section.id}
          style={index > 0 ? { marginTop: spacing } : undefined}
        >
          <AccordionCard
            section={section}
            expanded={expandedIds.has(section.id)}
            onToggle={handleToggle}
            onItemPress={onItemPress}
            theme={theme}
            styleOverrides={styleOverrides}
            accessibilityLabelPrefix={accessibilityLabelPrefix}
            renderIcon={renderIcon}
            renderGradient={renderGradient}
            disableAnimation={disableAnimation}
          />
        </View>
      ))}
    </View>
  );
};

export default AccordionList;

