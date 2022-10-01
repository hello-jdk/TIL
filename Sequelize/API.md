## Model

`Model`은 실제 DB의 테이블을 represents
모델의 instances는 DB의 row(행)을 represents

인스턴스는 `datavalues`의 property의 개념으로 작동한다.
예를 들어

```
instance.field; // 는 아래와 같이 작동
instance.get('field'); // 도 아래와 같이 작동
instance.getDataValue('field'); // getter setter 사용자 정의가 있을 경우 다름
```

// 더 필요하다면 [Sequelize#define](#https://sequelize.org/api/v6/class/src/sequelize.js~sequelize#instance-method-define) 참고

---

> option propertys는 중복되는게 많아서 직접 찾아보기

---

### create(Object `value`,Object `option`)

- 새로운 모델의 인스턴스를 builds 하고 calls save on it.

> `public static async create(values: object, options: object): Promise<Model>`

- parameter

1. value : 생성하려는 테이블의 객체
2. option : ...

- return
  1. `Promise<Model>`

---

### update(Object `vlaues`,Obejct `options`)

- 조건에 맞는 행 수정
- 모든 row

> `public static async update(values: object, options: object): Promise<Array<number, number>>`

- parameter

1. value : 업데이트 하려는 key-value
2. options : ...

- return

1. `Promise<Array<number,number>>` : 크기가 2인 숫자배열
   1. the number of affected rows
   2. the actual affected rows (only supported in postgres with option.returning true)

---

### destroy(Object `options`)

- 삭제하거나 deleteAt timestamp 설정 (if paranoid is enabled)
- 모든 row

`public static async destroy(options: object): Promise<number>`

- parameter

1. options : ...
   - force : deletedAt 사용하더라도 강제 삭제

- return

1. `Promise<number>` : 삭제된 row 수

---
