import { Icon, Row, Text } from "@once-ui-system/core";

interface HeartbeatCounterProps {
  value: number;
}

export function HeartbeatCounter({ value }: HeartbeatCounterProps) {
  return (
    <Row
      border="danger-alpha-medium"
      background="danger-alpha-weak"
      onBackground="danger-strong"
      radius="full"
      paddingX="12"
      paddingY="8"
      gap="8"
      vertical="center"
    >
      <Icon name="heart" size="s" onBackground="danger-strong" />
      <Text variant="label-strong-m">Hảo cảm:</Text>
      <Text variant="label-strong-m">{value}</Text>
    </Row>
  );
}
