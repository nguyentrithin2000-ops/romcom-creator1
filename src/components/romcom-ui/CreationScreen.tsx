import { Button, Column, Heading, Input, Row, Text, Textarea } from "@once-ui-system/core";
import type { CreationFormState } from "./types";
import { StepProgress } from "./StepProgress";

interface CreationScreenProps {
  steps: readonly string[];
  currentStep: number;
  form: CreationFormState;
  onChangeForm: (field: keyof CreationFormState, value: string) => void;
  onBack: () => void;
  onNextStep: () => void;
  onSubmit: () => void;
}

const getStepHelperText = (step: number) => {
  if (step === 0) {
    return "Mô tả bối cảnh chính để AI dựng chương mở đầu.";
  }

  if (step === 1) {
    return "Phác hoạ nữ chính để tuyến cảm xúc rõ ràng hơn.";
  }

  return "Rà soát thông tin và bắt đầu chương đầu tiên.";
};

export function CreationScreen({
  steps,
  currentStep,
  form,
  onChangeForm,
  onBack,
  onNextStep,
  onSubmit,
}: CreationScreenProps) {
  const isLastStep = currentStep >= steps.length - 1;

  return (
    <Column fillWidth gap="24">
      <Column gap="4">
        <Heading variant="heading-strong-l">Tạo thế giới romcom</Heading>
        <Text variant="body-default-s" onBackground="neutral-weak">
          {getStepHelperText(currentStep)}
        </Text>
      </Column>

      <StepProgress steps={steps} currentStep={currentStep} />

      <Column
        fillWidth
        gap="24"
        border="neutral-alpha-medium"
        background="surface"
        radius="l"
        padding="24"
      >
        <Textarea
          id="world-description"
          label="Bối cảnh"
          placeholder="Ví dụ: Trường học bên bờ biển với truyền thuyết mưa sao băng"
          lines={4}
          value={form.worldDescription}
          onChange={(event) => onChangeForm("worldDescription", event.target.value)}
        />

        <Row fillWidth gap="12" s={{ direction: "column" }}>
          <Input
            id="heroine-name"
            label="Tên nữ chính"
            placeholder="An Nhiên"
            value={form.heroineName}
            onChange={(event) => onChangeForm("heroineName", event.target.value)}
            style={{ flex: 1 }}
          />

          <Input
            id="heroine-archetype"
            label="Mẫu tính cách"
            placeholder="Tsundere / Kuudere / Genki"
            value={form.heroineArchetype}
            onChange={(event) => onChangeForm("heroineArchetype", event.target.value)}
            style={{ flex: 1 }}
          />
        </Row>

        <Textarea
          id="first-meeting"
          label="Khoảnh khắc gặp gỡ"
          placeholder="Hai người gặp nhau trong tình huống nào?"
          lines={3}
          value={form.firstMeeting}
          onChange={(event) => onChangeForm("firstMeeting", event.target.value)}
        />
      </Column>

      <Row fillWidth gap="16" s={{ direction: "column" }}>
        <Button variant="secondary" size="m" fillWidth onClick={onBack} style={{ flex: 1 }}>
          Quay lại
        </Button>

        {isLastStep ? (
          <Button variant="primary" size="m" fillWidth onClick={onSubmit} style={{ flex: 1 }}>
            Bắt đầu chương 1
          </Button>
        ) : (
          <Button variant="primary" size="m" fillWidth onClick={onNextStep} style={{ flex: 1 }}>
            Tiếp tục
          </Button>
        )}
      </Row>
    </Column>
  );
}
