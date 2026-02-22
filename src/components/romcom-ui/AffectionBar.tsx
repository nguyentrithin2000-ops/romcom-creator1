import { type Colors, Column, Row, Text } from "@once-ui-system/core";

interface AffectionBarProps {
  label: string;
  value: number;
}

const clamp = (value: number) => Math.max(0, Math.min(100, value));

export function AffectionBar({ label, value }: AffectionBarProps) {
  const level = clamp(value);

  const tone: {
    name: string;
    fill: Colors;
    badgeBorder: Colors;
    badgeBackground: Colors;
    badgeOnBackground: Colors;
  } = {
    name: "",
    fill: "neutral-medium",
    badgeBorder: "neutral-alpha-medium",
    badgeBackground: "neutral-alpha-weak",
    badgeOnBackground: "neutral-strong",
  };

  if (level < 34) {
    level < 34
      ? {
          name: "Căng thẳng",
          fill: "danger-solid-medium",
          badgeBorder: "danger-alpha-medium",
          badgeBackground: "danger-alpha-weak",
          badgeOnBackground: "danger-strong",
        }
      : level < 67
        ? {
            name: "Trung lập",
            fill: "info-solid-medium",
            badgeBorder: "info-alpha-medium",
            badgeBackground: "info-alpha-weak",
            badgeOnBackground: "info-strong",
          }
        : {
            name: "Rung động",
            fill: "accent-solid-medium",
            badgeBorder: "accent-alpha-medium",
            badgeBackground: "accent-alpha-weak",
            badgeOnBackground: "accent-strong",
          };
  }

  return (
    <Column fillWidth gap="8">
      <Row fillWidth horizontal="between" vertical="center" gap="8">
        <Text variant="label-strong-m">{label}</Text>
        <Text variant="label-default-m" onBackground="neutral-weak">
          {level}%
        </Text>
      </Row>

      <Column
        fillWidth
        border="neutral-alpha-medium"
        background="neutral-alpha-weak"
        radius="full"
        overflow="hidden"
        style={{ height: "0.6rem" }}
      >
        <Column
          radius="full"
          background={tone.fill}
          style={{
            width: `${level}%`,
            transition: "width 260ms ease",
            height: "100%",
          }}
        />
      </Column>

      <Row
        border={tone.badgeBorder}
        background={tone.badgeBackground}
        onBackground={tone.badgeOnBackground}
        radius="full"
        paddingX="8"
        paddingY="4"
      >
        <Text variant="label-default-xs">{tone.name}</Text>
      </Row>
    </Column>
  );
}
