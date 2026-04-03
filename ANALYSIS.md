# soyoung-lee.com 분석 결과

## 기술 스택 회전 방식
- 아이콘들이 수평으로 계속 회전하는 애니메이션 (무한 루프)
- 일정 시간 후 변경되는 방식이 아니라 **연속적으로 천천히 회전**
- CSS animation을 사용한 것으로 보임 (keyframes)

## 스크롤 스냅 방식
- 각 섹션이 명확하게 한 화면에 맞음
- 네비게이션 링크를 클릭하면 해당 섹션으로 부드럽게 스크롤
- 섹션 높이가 100vh 또는 그에 가까운 값으로 설정되어 있음

## 구현 계획
1. **기술 스택 회전**: CSS animation으로 무한 회전 구현
   - `animation: rotate 20s linear infinite;`
   - transform: translateX를 사용한 수평 이동

2. **스크롤 스냅**: 각 섹션을 정확히 한 화면에 맞도록 조정
   - 섹션 높이를 `min-h-screen` 유지
   - padding/margin 조정으로 네비게이션 높이 보정
