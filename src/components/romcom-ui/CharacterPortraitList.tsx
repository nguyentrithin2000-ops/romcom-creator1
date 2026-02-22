import { Avatar, Column, Row, Text } from "@once-ui-system/core";
import type { CharacterProfile } from "./types";

interface CharacterPortraitListProps {
  characters: CharacterProfile[];
  selectedCharacterId: string | null;
  onSelectCharacter: (characterId: string) => void;
}

export function CharacterPortraitList({
  characters,
  selectedCharacterId,
  onSelectCharacter,
}: CharacterPortraitListProps) {
  return (
    <Row fillWidth gap="8" wrap>
      {characters.map((character) => {
        const selected = character.id === selectedCharacterId;

        return (
          <Column
            key={character.id}
            border={selected ? "brand-alpha-medium" : "neutral-alpha-medium"}
            background={selected ? "brand-alpha-weak" : "neutral-alpha-weak"}
            onBackground={selected ? "brand-strong" : "neutral-weak"}
            radius="m"
            padding="12"
            gap="8"
            horizontal="center"
            cursor="interactive"
            style={{
              minWidth: "8rem",
              transition: "all 220ms ease",
            }}
            onClick={() => onSelectCharacter(character.id)}
          >
            <Avatar value={character.name} size="m" />
            <Text variant="label-strong-s">{character.name}</Text>
            <Text variant="label-default-xs" onBackground="neutral-weak" align="center">
              {character.archetype}
            </Text>
          </Column>
        );
      })}
    </Row>
  );
}
