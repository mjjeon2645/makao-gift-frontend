import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-inline: calc((100% - 700px) / 2);
  padding-top: 12em;
`;

const Title = styled.article`
  p:first-child {
    color: #FCBF2C;
    font-size: 1.2em;
    font-weight: bold;
  }

  h2 {
    margin: 1.5em 0em;
  }

  h2 strong {
    display: block;
    font-size: 2em;
    font-weight: bold;
    margin-top: .2em;
  }

  p:last-child {
    font-weight: bold;
  }
`;

const Image = styled.img`
  width: 20em;
`;

export default function HomePage() {
  return (
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
  );
}
