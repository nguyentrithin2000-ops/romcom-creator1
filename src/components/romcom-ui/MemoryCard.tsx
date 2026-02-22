import { Column, Row, Text } from "@once-ui-system/core";
import { CharacterProfile } from "./types";

interface MemoryCardProps {
  character?: CharacterProfile;
}

export function MemoryCard({ character }: MemoryCardProps) {
  return (
    <Column
      fillWidth
      border="neutral-alpha-medium"
      background="surface"
      radius="l"
      padding="16"
      gap="14"
    >
      <Text variant="heading-strong-s">Ký ức đã ghi nhận</Text>

      {character ? (
        <Column gap="10">
          <Column gap="4">
            <Text variant="label-strong-m">{character.name}</Text>
            <Text variant="label-default-s" onBackground="neutral-weak">
              Ghi chú cảm xúc theo tiến trình hiện tại
            </Text>
          </Column>

          <Column gap="8">
            {character.memories.map((memory) => (
              <Row key={memory} gap="8" vertical="start">
                <Text variant="body-default-s" onBackground="brand-weak">
                  •
                </Text>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {memory}
                </Text>
              </Row>
            ))}
          </Column>
        </Column>
      ) : (
        <Text variant="body-default-s" onBackground="neutral-weak">
          Chọn một nhân vật để xem ký ức AI đã ghi nhớ.
        </Text>
      )}
    </Column>
  );
}
