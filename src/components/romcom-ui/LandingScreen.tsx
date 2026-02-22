import { Badge, Button, Card, Column, Grid, Heading, Row, Text } from "@once-ui-system/core";
import type { TemplateOption } from "./types";

interface LandingScreenProps {
  haoCam: number;
  templates: TemplateOption[];
  onQuickStart: () => void;
  onSelectTemplate: (templateId: string) => void;
}

export function LandingScreen({
  haoCam,
  templates,
  onQuickStart,
  onSelectTemplate,
}: LandingScreenProps) {
  return (
    <Column fillWidth gap="32">
      <Row fillWidth horizontal="between" vertical="center" gap="12" wrap>
        <Badge
          border="brand-alpha-medium"
          background="brand-alpha-weak"
          onBackground="brand-strong"
          paddingX="12"
          paddingY="8"
        >
          <Text variant="label-default-s">Bản demo tương tác</Text>
        </Badge>

        <Badge
          border="accent-alpha-medium"
          background="accent-alpha-weak"
          onBackground="accent-strong"
          paddingX="12"
          paddingY="8"
        >
          <Text variant="label-strong-s">Năng lượng: {haoCam}</Text>
        </Badge>
      </Row>

      <Column gap="12">
        <Heading variant="display-strong-s">
          Chuyện tình thanh xuân bi hài của tôi quả nhiên là AI làm
        </Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          Chọn mẫu hoặc bắt đầu nhanh để trải nghiệm luồng visual novel tương tác.
        </Text>
      </Column>

      <Row
        fillWidth
        border="neutral-alpha-medium"
        background="neutral-alpha-weak"
        radius="l"
        padding="20"
        gap="20"
        vertical="center"
        horizontal="between"
        s={{ direction: "column" }}
      >
        <Column gap="4">
          <Text variant="heading-strong-s">Bắt đầu nhanh</Text>
          <Text variant="body-default-s" onBackground="neutral-weak">
            Vào ngay màn tạo truyện với dữ liệu mẫu để thử nhịp chơi.
          </Text>
        </Column>

        <Button variant="primary" size="m" onClick={onQuickStart}>
          Bắt đầu nhanh
        </Button>
      </Row>

      <Column gap="16">
        <Column gap="8">
          <Heading variant="heading-strong-m">Chọn mẫu kịch bản</Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">
            Chọn một mẫu để điền sẵn bối cảnh mở đầu.
          </Text>
        </Column>

        <Grid columns={1} m={{ columns: 2 }} l={{ columns: 3 }} gap="16" fillWidth>
          {templates.map((template) => (
            <Card
              key={template.id}
              border="neutral-alpha-medium"
              background="surface"
              radius="l"
              padding="16"
              gap="16"
              fillHeight
              onClick={() => onSelectTemplate(template.id)}
            >
              <Column gap="12" fillWidth flex="1" style={{ minHeight: 0 }}>
                <Column gap="8">
                  <Text variant="label-strong-m">{template.title}</Text>
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    {template.subtitle}
                  </Text>
                </Column>

                <Text variant="body-default-s" onBackground="neutral-weak">
                  {template.summary}
                </Text>
              </Column>
            </Card>
          ))}
        </Grid>
      </Column>
    </Column>
  );
}
