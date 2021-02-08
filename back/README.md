# Stack-Folio 프로젝트

## Stack

- NestJS
- PostgreSQL with TypeORM

---

## 컨테이너 환경에서 개발하기

현재 디렉터리에서 `docker-compose up --build`를 하면 컨테이너 환경에서 개발할 수 있다.

총 2개의 컨테이너가 생성이 된다 (server & postgres).

현재 디렉터리에 있는 코드를 server에 **bind-mount**해서 local에서 수정하면 컨테이너에 바로 반영이 된다. 또한, Local에 `npm install`로 `node_modules`를 생성하지 않아도 컨테이너 환경에서 생성된 `node_modules` 파일이 local에 mount된다.

최초 실행시 **db/data**라는 디렉터리가 (postgres의 모든 data) 자동 생성이 되면서 **db** 디렉터리에 있는 `init.sql`을 수행한다 (최초 1회만 수행). 만약 컨테이너 db를 초기화하고 싶다면 `db/data`를 지우고 `docker-compose up --build`로 시작하면 된다.

돌아가고 있는 postgres 컨테이너에 직접 접속해서 정보를 보고 싶다면 다른 터미널 창을 열어서 `docker ps`를 쳐서 postgres 컨테이너의 `CONTAINER ID`를 찾고 복사한다. 그리고 `docker exec -it <container-id> bash`를 입력하면 컨테이너 shell에 연결이 된다.

Shell로 연결이 되었으면 `psql -U postgres`로 접속해서 아래와 같이 본인이 원하는 postgres command를 수행하면된다.

```sql
-- Superuser로 접속
psql -U postgres
-- velog 데이터베이스로 연결
\c velog
-- Relation 정보 출력
\d
-- 원하는 쿼리 수행
SELECT email FROM users WHERE id = 'asdf';
-- 종료
\q
```

또는, 아래와 username과 database를 지정해서 접속할 수 있다.

```sql
-- Database 'velog'에 username 'dohan'으로 접속
psql -U dohan velog
-- 현재 연결 정보 출력
\conninfo
```

컨테이너를 종료하고 싶으면 SIGINT (ctrl + c) 신호를 보내면 된다.

## Reference

- `docker-compose up --build`: 컨테이터를 빌드하면서 시작
- `docker-compose up`: 빌드된 컨테이너를 시작
- `docker-compose up -d`: Detach mode로 시작 (background)
- `docker-compose ps`: 현재 컨테이터 상태를 출력
- `docker-compose down`: 컨테이터 종료

가장 쉬운 방법은 `docker-compose up --build`로 시작하고 종료한 뒤, 다시 시작하기 위해 `docker-compose down && docker-compose up --build`를 하면 된다.

항상 그렇지만 알 수 없는 이유로 안돌아갈 수도 있다..

## TODO

- Add follow/unfollow route handlers
