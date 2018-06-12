# 박스 분할 APP

## 사용 언어
javascript ECMA5

## 동작 설명

- 구성은 빨간 박스와 프레임 및 4종류의 버튼( 시작, 분할, 중지/재시작, 삭제 )으로 구성이 된다.
- 빨간박스는 프레임안에서만 움직이게 되고 움직이는 방향은 45도 각도로 움직이게 된다.
- 시작 버튼을 누르면 빨간박스 하나가 움직이게 된다.
- 분할 버튼을 누르게 되면 빨간박스가 4분할로 분해되어서 각 45도 방향으로 움직이게 된다.
- 중지/재시작 버튼을 누르게 되면 멈췄다가 다시 있는 위치에서 움직이게 된다.
- 삭제 버튼을 누르게 되면 기존에 있는 모든 박스는 사라지고 다시 초기화가 이뤄진다.

## 폴더 구조

```
├── README.md                 - 리드미 파일
│
├── index.html                - html 파일
├── src/                      - 스크립트 폴더
│   ├── box.js                - 빨간 박스 관련 스크립트
│   ├── boxApp.js             - 박스 분할 app 을 담당하는 스크립트
│   ├── direction.js          - 방향을 정의한 스크립트
│   ├── frame.js              - 프레임 관련 스크립트
│   ├── index.js              - 시작 index 스크립트
└── └── util.js               - 유틸 관련 스크립트
```


## boxAppGenerator params

| name       | type      | required | default    |              description                      |
|------------|-----------|----------|------------|-----------------------------------------------|
| Box        | function  | ✔        | {}         | Box class                                     | 
| frame      | object    | ✔        | {}         | frame instance                                |
| maxDivide  | number    |          | 4          | maxium box divide count                       |


## boxApp init method params

| name       | type      | required | default    |              description                      |
|------------|-----------|----------|------------|-----------------------------------------------|
| left       | number    |          | 0          | Box init position left value                  | 
| top        | number    |          | 0          | Box init position top value                   | 
| width      | number    |          | 50         | Box width value                               |
| height     | number    |          | 50         | Box height value                              |
| color      | string    |          | "red"      | Box background color value                    |
| directionX | string    |          | "right"    | 초기 박스가 움직일 X 축 방향                        |
| directionY | string    |          | "bottom"   | 초기 박스가 움직일 Y 축 방향                        |
| speed      | number    |          | 10         | box speed value 작을수록 빠르다.                  |