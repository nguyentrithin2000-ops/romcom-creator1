import {
  Badge,
  Button,
  Column,
  Heading,
  Icon,
  Input,
  RevealFx,
  Row,
  Text,
  Textarea,
} from "@once-ui-system/core";
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

const WORLD_EXAMPLES: { label: string; value: string }[] = [
  {
    label: "Học đường + lễ hội",
    value:
      "Trường THPT Hoa Hạ năm cuối. Câu lạc bộ truyền thông phải cứu lễ hội trường trong 7 ngày.",
  },
  {
    label: "Thành phố biển + mưa sao băng",
    value:
      "Thành phố biển Đà Linh đang vào mùa mưa sao băng, ai tỏ tình dưới mưa sao băng sẽ bị đồn khắp trường vào sáng hôm sau.",
  },
  {
    label: "Thành phố phép thuật",
    value: "Một thành phố phép thuật nơi mọi lời tỏ tình đều biến thành khế ước ma pháp tạm thời.",
  },
  {
    label: "Startup + gọi vốn",
    value:
      "Startup truyền thông số chuẩn bị gọi vốn Series A, cả team phải làm việc xuyên đêm suốt 1 tuần.",
  },
];

const HEROINE_NAME_EXAMPLES = ["An Nhiên", "Minh Thư", "Khánh Linh", "Hương Ly"];

const HEROINE_ARCHETYPE_EXAMPLES = [
  "Tsundere",
  "Kuudere",
  "Genki",
  "Yandere",
  "Lạnh lùng ngoài mặt nhưng cực kỳ tinh tế",
];

const FIRST_MEETING_EXAMPLES: { label: string; value: string }[] = [
  {
    label: "Kẹt thư viện + một chiếc ô",
    value: "Cả hai kẹt lại trong thư viện sau giờ học vì cơn mưa lớn, chỉ còn một chiếc ô.",
  },
  {
    label: "Va phải nhau ở hành lang",
    value: "Va phải nhau ở góc hành lang, sách vở rơi tung tóe, nhìn nhau ngượng ngùng.",
  },
  {
    label: "Cùng nhóm dự án, ở lại khuya",
    value: "Cùng được phân vào một nhóm làm dự án, phải ở lại trường đến khuya.",
  },
  {
    label: "Gọi nhầm đồ ở quán cà phê",
    value: "Gặp lần đầu ở quán cà phê, cả hai đều gọi nhầm đồ của nhau.",
  },
];

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
      <RevealFx delay={0} speed="fast">
        <Column gap="12">
          <Row fillWidth horizontal="between" vertical="center" gap="12" wrap>
            <Heading variant="heading-strong-l">Tạo thế giới romcom</Heading>
            <Badge
              icon="sparkles"
              border="brand-alpha-medium"
              background="brand-alpha-weak"
              onBackground="brand-strong"
              paddingX="12"
              paddingY="8"
            >
              <Text variant="label-strong-s">
                Bước {currentStep + 1}/{steps.length}
              </Text>
            </Badge>
          </Row>
          <Text variant="body-default-s" onBackground="neutral-weak">
            {getStepHelperText(currentStep)}
          </Text>
        </Column>
      </RevealFx>

      <RevealFx delay={0.05} speed="fast">
        <StepProgress steps={steps} currentStep={currentStep} />
      </RevealFx>

      <RevealFx delay={0.1} speed="fast">
        <Column
          fillWidth
          position="relative"
          overflow="hidden"
          gap="24"
          border="neutral-alpha-medium"
          background="surface"
          radius="l"
          padding="24"
          transition="micro-medium"
          shadow="s"
        >
          <Column gap="20" style={{ position: "relative", zIndex: 1 }}>
            {/* Step 0: Bối cảnh */}
            {currentStep === 0 && (
              <Column gap="16">
                <Column
                  gap="12"
                  border="brand-alpha-medium"
                  background="brand-alpha-weak"
                  radius="m"
                  padding="16"
                >
                  <Row gap="12" vertical="center">
                    <Column
                      background="surface"
                      border="brand-alpha-medium"
                      radius="m"
                      padding="12"
                    >
                      <Icon name="globe" size="m" onBackground="brand-strong" />
                    </Column>
                    <Column gap="2">
                      <Text variant="label-strong-s" onBackground="brand-strong">
                        Bối cảnh
                      </Text>
                      <Text variant="label-default-xs" onBackground="neutral-weak">
                        Thế giới nơi câu chuyện diễn ra
                      </Text>
                    </Column>
                  </Row>
                  <Textarea
                    id="world-description"
                    placeholder="Ví dụ: Trường học bên bờ biển với truyền thuyết mưa sao băng"
                    lines={4}
                    value={form.worldDescription}
                    onChange={(event) => onChangeForm("worldDescription", event.target.value)}
                  />
                  <Column gap="8">
                    <Text variant="label-default-xs" onBackground="neutral-weak">
                      Gợi ý nhanh
                    </Text>
                    <Row gap="8" wrap>
                      {WORLD_EXAMPLES.map(({ label, value }) => (
                        <Button
                          key={label}
                          variant="tertiary"
                          size="s"
                          onClick={() => onChangeForm("worldDescription", value)}
                        >
                          {label}
                        </Button>
                      ))}
                    </Row>
                  </Column>
                </Column>
              </Column>
            )}

            {/* Step 1: Hình mẫu nữ chính */}
            {currentStep === 1 && (
              <Column gap="16">
                <Column
                  gap="12"
                  border="accent-alpha-medium"
                  background="accent-alpha-weak"
                  radius="m"
                  padding="16"
                >
                  <Row gap="12" vertical="center">
                    <Column
                      background="surface"
                      border="accent-alpha-medium"
                      radius="m"
                      padding="12"
                    >
                      <Icon name="user" size="m" onBackground="accent-strong" />
                    </Column>
                    <Column gap="2">
                      <Text variant="label-strong-s" onBackground="accent-strong">
                        Tên nữ chính
                      </Text>
                      <Text variant="label-default-xs" onBackground="neutral-weak">
                        Nhân vật trung tâm
                      </Text>
                    </Column>
                  </Row>
                  <Input
                    id="heroine-name"
                    placeholder="An Nhiên"
                    value={form.heroineName}
                    onChange={(event) => onChangeForm("heroineName", event.target.value)}
                  />
                  <Column gap="8">
                    <Text variant="label-default-xs" onBackground="neutral-weak">
                      Gợi ý nhanh
                    </Text>
                    <Row gap="8" wrap>
                      {HEROINE_NAME_EXAMPLES.map((name) => (
                        <Button
                          key={name}
                          variant="tertiary"
                          size="s"
                          onClick={() => onChangeForm("heroineName", name)}
                        >
                          {name}
                        </Button>
                      ))}
                    </Row>
                  </Column>
                </Column>

                <Column
                  gap="12"
                  border="accent-alpha-medium"
                  background="accent-alpha-weak"
                  radius="m"
                  padding="16"
                >
                  <Row gap="12" vertical="center">
                    <Column
                      background="surface"
                      border="accent-alpha-medium"
                      radius="m"
                      padding="12"
                    >
                      <Icon name="sparkles" size="m" onBackground="accent-strong" />
                    </Column>
                    <Column gap="2">
                      <Text variant="label-strong-s" onBackground="accent-strong">
                        Mẫu tính cách
                      </Text>
                      <Text variant="label-default-xs" onBackground="neutral-weak">
                        Tsundere, Kuudere, Genki...
                      </Text>
                    </Column>
                  </Row>
                  <Input
                    id="heroine-archetype"
                    placeholder="Tsundere / Kuudere / Genki"
                    value={form.heroineArchetype}
                    onChange={(event) => onChangeForm("heroineArchetype", event.target.value)}
                  />
                  <Column gap="8">
                    <Text variant="label-default-xs" onBackground="neutral-weak">
                      Gợi ý nhanh
                    </Text>
                    <Row gap="8" wrap>
                      {HEROINE_ARCHETYPE_EXAMPLES.map((archetype) => (
                        <Button
                          key={archetype}
                          variant="tertiary"
                          size="s"
                          onClick={() => onChangeForm("heroineArchetype", archetype)}
                        >
                          {archetype}
                        </Button>
                      ))}
                    </Row>
                  </Column>
                </Column>

                <Column
                  gap="12"
                  border="brand-alpha-medium"
                  background="brand-alpha-weak"
                  radius="m"
                  padding="16"
                >
                  <Row gap="12" vertical="center">
                    <Column
                      background="surface"
                      border="brand-alpha-medium"
                      radius="m"
                      padding="12"
                    >
                      <Icon name="heart" size="m" onBackground="brand-strong" />
                    </Column>
                    <Column gap="2">
                      <Text variant="label-strong-s" onBackground="brand-strong">
                        Khoảnh khắc gặp gỡ
                      </Text>
                      <Text variant="label-default-xs" onBackground="neutral-weak">
                        Hai người gặp nhau trong tình huống nào?
                      </Text>
                    </Column>
                  </Row>
                  <Textarea
                    id="first-meeting"
                    placeholder="Hai người gặp nhau trong tình huống nào?"
                    lines={3}
                    value={form.firstMeeting}
                    onChange={(event) => onChangeForm("firstMeeting", event.target.value)}
                  />
                  <Column gap="8">
                    <Text variant="label-default-xs" onBackground="neutral-weak">
                      Gợi ý nhanh
                    </Text>
                    <Row gap="8" wrap>
                      {FIRST_MEETING_EXAMPLES.map(({ label, value }) => (
                        <Button
                          key={label}
                          variant="tertiary"
                          size="s"
                          onClick={() => onChangeForm("firstMeeting", value)}
                        >
                          {label}
                        </Button>
                      ))}
                    </Row>
                  </Column>
                </Column>
              </Column>
            )}

            {/* Step 2: Xác nhận */}
            {currentStep === 2 && (
              <Column gap="16">
                <Column
                  gap="12"
                  border="neutral-alpha-medium"
                  background="neutral-alpha-weak"
                  radius="m"
                  padding="16"
                >
                  <Row gap="12" vertical="center">
                    <Column
                      background="surface"
                      border="brand-alpha-medium"
                      radius="m"
                      padding="12"
                    >
                      <Icon name="globe" size="m" onBackground="brand-strong" />
                    </Column>
                    <Column gap="2">
                      <Text variant="label-strong-s" onBackground="neutral-strong">
                        Bối cảnh
                      </Text>
                    </Column>
                  </Row>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    {form.worldDescription || "—"}
                  </Text>
                </Column>
                <Row fillWidth gap="12" s={{ direction: "column" }}>
                  <Column
                    flex="1"
                    gap="8"
                    border="neutral-alpha-medium"
                    background="neutral-alpha-weak"
                    radius="m"
                    padding="16"
                  >
                    <Text variant="label-strong-s" onBackground="neutral-strong">
                      Nữ chính
                    </Text>
                    <Text variant="body-default-s" onBackground="neutral-weak">
                      {form.heroineName || "—"}
                    </Text>
                  </Column>
                  <Column
                    flex="1"
                    gap="8"
                    border="neutral-alpha-medium"
                    background="neutral-alpha-weak"
                    radius="m"
                    padding="16"
                  >
                    <Text variant="label-strong-s" onBackground="neutral-strong">
                      Mẫu tính cách
                    </Text>
                    <Text variant="body-default-s" onBackground="neutral-weak">
                      {form.heroineArchetype || "—"}
                    </Text>
                  </Column>
                </Row>
                <Column
                  gap="12"
                  border="neutral-alpha-medium"
                  background="neutral-alpha-weak"
                  radius="m"
                  padding="16"
                >
                  <Text variant="label-strong-s" onBackground="neutral-strong">
                    Khoảnh khắc gặp gỡ
                  </Text>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    {form.firstMeeting || "—"}
                  </Text>
                </Column>
              </Column>
            )}
          </Column>
        </Column>
      </RevealFx>

      <RevealFx delay={0.15} speed="fast">
        <Row fillWidth gap="16" s={{ direction: "column" }}>
          <Button
            variant="secondary"
            size="m"
            fillWidth
            prefixIcon="arrowLeft"
            onClick={onBack}
            style={{ flex: 1 }}
          >
            Quay lại
          </Button>

          {isLastStep ? (
            <Button
              variant="primary"
              size="m"
              fillWidth
              prefixIcon="rocket"
              onClick={onSubmit}
              style={{ flex: 1 }}
            >
              Bắt đầu chương 1
            </Button>
          ) : (
            <Button
              variant="primary"
              size="m"
              fillWidth
              prefixIcon="rocket"
              onClick={onNextStep}
              style={{ flex: 1 }}
            >
              Tiếp tục
            </Button>
          )}
        </Row>
      </RevealFx>
    </Column>
  );
}
