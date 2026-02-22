import { TypeFx } from "@once-ui-system/core";

interface TypewriterTextProps {
  text: string;
  animationKey: string;
}

export function TypewriterText({ text, animationKey }: TypewriterTextProps) {
  return (
    <TypeFx
      key={animationKey}
      words={text}
      trigger="instant"
      speed={16}
      delay={80}
      hold={0}
      loop={false}
      variant="body-default-l"
      onBackground="neutral-strong"
    />
  );
}
