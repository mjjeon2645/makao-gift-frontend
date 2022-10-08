import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  background-color: #EEE;
`;

const Wrapper = styled.div`

`;

export default function ProductsBanner() {
  return (
    <Container>
      <Wrapper>
        <p>평범한 선물은 주기도 민망하다구요?</p>
        <strong>작정하고 준비한</strong>
        <h2>마카오톡 선물하기 아이템</h2>
        <p>마카오톡 선물하기에서만 볼 수 있는 특별템 기획전</p>
      </Wrapper>
    </Container>
  );
}
