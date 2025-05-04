import { Container } from '@mantine/core';
import { Background } from '@/components/Background/Background';
import { FooterBones } from '@/components/PHPBonesCommand/FooterBones';
import { Welcome } from '@/components/Welcome/Welcome';

export default function HomePage() {
  return (
    <>
      <Background />
      <Container mih="calc(100vh - 328px)" size="xl">
        <Welcome />
        <FooterBones />
      </Container>
    </>
  );
}
