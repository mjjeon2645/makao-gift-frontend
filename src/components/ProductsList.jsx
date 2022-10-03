export default function ProductsList() {
  // 이 페이지에 진입하며 useEffect로 상품목록을 fetch해와야 할 것 같다.
  // 상품 리스트가 없을 경우 '상품이 존재하지 않습니다.
  // 상품 리스트가 있을 경우 8개씩 해서 페이지네이션

  return (
    <div>
      <h3>인기선물을 한 자리에 모았어요</h3>
      <h3>상품이 존재하지 않습니다</h3>
    </div>
  );
}
