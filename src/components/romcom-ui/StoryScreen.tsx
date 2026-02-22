import {
  Button,
  Column,
  Heading,
  IconButton,
  Input,
  Row,
  Spinner,
  Text,
} from "@once-ui-system/core";
import { AffectionBar } from "./AffectionBar";
import { CharacterPortraitList } from "./CharacterPortraitList";
import { HeartbeatCounter } from "./HeartbeatCounter";
import { MemoryCard } from "./MemoryCard";
import { TypewriterText } from "./TypewriterText";
import type { CharacterProfile, StoryBeat } from "./types";

interface StoryScreenProps {
  beat: StoryBeat;
  characters: CharacterProfile[];
  selectedCharacterId: string | null;
  heartbeat: number;
  haoCam: number;
  customAction: string;
  isProcessing: boolean;
  chapterAnimationKey: string;
  isAffectionPanelOpen: boolean;
  onToggleAffectionPanel: () => void;
  onSelectCharacter: (characterId: string) => void;
  onSelectChoice: (choiceId: string) => void;
  onCustomActionChange: (value: string) => void;
  onSubmitCustomAction: () => void;
}

export function StoryScreen({
  beat,
  characters,
  selectedCharacterId,
  heartbeat,
  haoCam,
  customAction,
  isProcessing,
  chapterAnimationKey,
  isAffectionPanelOpen,
  onToggleAffectionPanel,
  onSelectCharacter,
  onSelectChoice,
  onCustomActionChange,
  onSubmitCustomAction,
}: StoryScreenProps) {
  const selectedCharacter =
    characters.find((character) => character.id === selectedCharacterId) ?? characters[0];

  return (
    <Column fillWidth gap="20">
      <Row fillWidth horizontal="between" vertical="center" gap="12" wrap>
        <Row gap="8" vertical="center">
          <Heading variant="heading-strong-m">Chương {beat.chapter}</Heading>
          <Text variant="label-default-s" onBackground="neutral-weak">
            {beat.title}
          </Text>
        </Row>

        <Row gap="8" vertical="center">
          <HeartbeatCounter value={heartbeat} />
          <Row
            border="accent-alpha-medium"
            background="accent-alpha-weak"
            onBackground="accent-strong"
            radius="full"
            paddingX="12"
            paddingY="8"
          >
            <Text variant="label-strong-m">Năng lượng: {haoCam}</Text>
          </Row>
          <IconButton
            icon="user"
            tooltip="Mở quan hệ nhân vật"
            variant="secondary"
            onClick={onToggleAffectionPanel}
          />
        </Row>
      </Row>

      <Row fillWidth gap="16" s={{ direction: "column" }}>
        <Column
          flex={8}
          fillWidth
          border="neutral-alpha-medium"
          background="surface"
          radius="l"
          padding="20"
          gap="20"
          style={{
            opacity: isProcessing ? 0.75 : 1,
            transition: "opacity 260ms ease",
            minHeight: "20rem",
          }}
        >
          <Column
            fillWidth
            border="neutral-alpha-medium"
            background="neutral-alpha-weak"
            radius="m"
            padding="16"
            gap="12"
            style={{
              transform: isProcessing ? "translateY(0.25rem)" : "translateY(0)",
              transition: "transform 220ms ease",
            }}
          >
            <Text variant="label-default-s" onBackground="neutral-weak">
              Người dẫn truyện
            </Text>
            {isProcessing ? (
              <Row gap="8" vertical="center">
                <Spinner size="s" ariaLabel="Đang xử lý lựa chọn" />
                <Text variant="body-default-m" onBackground="neutral-weak">
                  AI đang cập nhật diễn biến...
                </Text>
              </Row>
            ) : (
              <TypewriterText text={beat.narrator} animationKey={chapterAnimationKey} />
            )}
          </Column>

          <Column
            fillWidth
            border="neutral-alpha-medium"
            background="surface"
            radius="m"
            padding="16"
            gap="12"
          >
            <Text variant="label-default-s" onBackground="neutral-weak">
              Lựa chọn nhanh
            </Text>
            <Row fillWidth gap="8" s={{ direction: "column" }}>
              {beat.choices.map((choice) => (
                <Button
                  key={choice.id}
                  variant="secondary"
                  size="m"
                  fillWidth
                  disabled={isProcessing || heartbeat <= 0}
                  onClick={() => onSelectChoice(choice.id)}
                >
                  {choice.label}
                </Button>
              ))}
            </Row>
          </Column>

          <Column
            fillWidth
            border="neutral-alpha-medium"
            background="surface"
            radius="m"
            padding="16"
            gap="12"
          >
            <Text variant="label-default-s" onBackground="neutral-weak">
              Tự nhập hành động
            </Text>
            <Row fillWidth gap="8" s={{ direction: "column" }}>
              <Input
                id="custom-action"
                placeholder="Ví dụ: Rủ An Nhiên đi ngắm mưa sao băng"
                value={customAction}
                onChange={(event) => onCustomActionChange(event.target.value)}
                disabled={isProcessing || heartbeat <= 0}
                style={{ flex: 1 }}
              />
              <Button
                variant="primary"
                size="m"
                disabled={isProcessing || heartbeat <= 0 || customAction.trim().length === 0}
                onClick={onSubmitCustomAction}
              >
                Gửi
              </Button>
            </Row>
          </Column>
        </Column>

        <Column
          flex={4}
          fillWidth
          gap="16"
          position="sticky"
          top="16"
          s={{ hide: !isAffectionPanelOpen }}
          border="neutral-alpha-medium"
          background="surface"
          radius="l"
          padding="16"
          style={{ maxHeight: "calc(100dvh - 8rem)", overflowY: "auto" }}
        >
          <Text variant="heading-strong-s">Quan hệ nhân vật</Text>

          <CharacterPortraitList
            characters={characters}
            selectedCharacterId={selectedCharacterId}
            onSelectCharacter={onSelectCharacter}
          />

          <Column
            fillWidth
            border="neutral-alpha-medium"
            background="neutral-alpha-weak"
            radius="m"
            padding="12"
            gap="12"
          >
            {characters.map((character) => (
              <AffectionBar key={character.id} label={character.name} value={character.affection} />
            ))}
          </Column>

          <MemoryCard character={selectedCharacter} />
        </Column>
      </Row>
    </Column>
  );
}
