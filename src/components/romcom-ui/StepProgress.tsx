import { Column, ProgressBar, Row, Text } from "@once-ui-system/core";

interface StepProgressProps {
  steps: readonly string[];
  currentStep: number;
}

export function StepProgress({ steps, currentStep }: StepProgressProps) {
  const maxIndex = Math.max(steps.length - 1, 0);
  const safeIndex = Math.max(0, Math.min(currentStep, maxIndex));
  const progress = maxIndex === 0 ? 100 : (safeIndex / maxIndex) * 100;
  const stepCount = Math.max(steps.length, 1);

  return (
    <Column fillWidth gap="12">
      <Row fillWidth horizontal="between" vertical="center" gap="8">
        <Text variant="label-default-s" onBackground="neutral-weak">
          Tiến trình tạo truyện
        </Text>
        <Text variant="label-strong-s" onBackground="neutral-weak">
          Bước {safeIndex + 1}/{stepCount}
        </Text>
      </Row>

      <Row fillWidth gap="8" s={{ direction: "column" }}>
        {steps.map((step, index) => {
          const isActive = index === safeIndex;
          const isComplete = index < safeIndex;

          return (
            <Column
              key={step}
              fillWidth
              border={isActive ? "brand-alpha-medium" : "neutral-alpha-medium"}
              background={isActive || isComplete ? "brand-alpha-weak" : "neutral-alpha-weak"}
              radius="m"
              padding="12"
              gap="2"
              style={{
                flex: 1,
                transition: "all 220ms ease",
                opacity: isComplete || isActive ? 1 : 0.8,
              }}
            >
              <Text
                variant={isActive ? "label-strong-s" : "label-default-s"}
                onBackground={isActive ? "brand-strong" : "neutral-weak"}
              >
                Bước {index + 1}
              </Text>
              <Text variant="label-default-xs" onBackground="neutral-weak">
                {step}
              </Text>
            </Column>
          );
        })}
      </Row>

      <ProgressBar value={progress} min={0} max={100} barBackground="brand-solid-medium" />
    </Column>
  );
}
