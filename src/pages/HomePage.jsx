import styled from 'styled-components';

const Container = styled.div`


`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.article`
  
`;

const Image = styled.img`
  width: 15em;
`;

export default function HomePage() {
  return (
    <Container>
      <Wrapper>
        <Title>
          <p>무얼 선물할 지 고민이라면</p>
          <h2>
            <strong>특별한</strong>
            <strong>아이템을 전하세요</strong>
          </h2>
          <p>마카오 선물하기에서만 볼 수 있는 특별한 아이템</p>
        </Title>
        <Image src="https://user-images.githubusercontent.com/104840243/194700953-719880ec-ed57-4a89-b8b4-b069f6d0b1c2.png" alt="" />
      </Wrapper>
    </Container>
  );
}
