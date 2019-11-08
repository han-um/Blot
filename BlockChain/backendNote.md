# DB 경로
- .env 파일

# ORM
- 객체와 관계형 데이터베이스의 관계를 매핑 해주는 도구
- nodejs에서 mysql을 쉽게 다룰 수 있도록 도와주는 라이브러리
- RM(Object-Relational Mapping)로 분류
- 자바스크립트 코드로 mysql을 제어할 수 있음

## Sequelize에서 Model 
- Database공간의 Table의 Schema를 표현하는 수단
- define 메소드를 통해 모델 정의
    - timestamps : Sequelize는 테이블을 생성한 후 자동적으로 createdAt, updatedAt column을 생성한다.Database에 해당 테이블이 언제 생성되었고 가장 최근에 수정된 시간이 언제인지 추적할 수 있도록 해준다. 기능을 끄려면 false로 설정한다.
    - paranoid : paranoid가 true이면 deletedAt column이 table에 추가된다. 해당 row를 삭제시 실제로 데이터가 삭제되지 않고 deletedAt에 삭제된 날짜가 추가되며 deletedAt에 날짜가 표기된 row는 find작업시 제외된다. 즉 데이터는 삭제되지 않지만 삭제된 효과를 준다. timestamps 옵션이 true여야만 사용할 수 있다.

# Nosql 구조
- [프로젝트] 정보
    - 프젝명
    - 프젝 설명
    - [원문 문장] 객체 배열
        - 원문 내용
        - 구글 번역 문장
        - 문장 지분
        - [번역] 객체 배열
            - idx : 순번(이 원문 문장에 대한 몇번째 번역인가)
            - 번역 내용
            - 번역자ID
        - [좋아요] 객체 배열
            - trans_id : 번역 순번(몇번째 번역을 좋다고 평가했는가)
            - 평가자ID