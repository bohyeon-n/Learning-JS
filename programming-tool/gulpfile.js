const gulp = require("gulp");
const babel = require("gulp-babel");
gulp.task("default", () => {
  // 걸프 작업을 여기에 씁니다.
  // 노드 소스
  gulp
    .src("es6/**/*.js")
    .pipe(
      babel({
        presets: ["env"]
      })
    )
    .pipe(gulp.dest("dist/"));
  // 브라우저 소스
  gulp
    .src("public/es6/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("public/dist/"));
});
gulp.task("default", () =>
  gulp
    .src("/es6/test.js")
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(gulp.dest("/dist/"))
);
// 걸프는 파이프라인 개념으로 작업을 처리한다.
// **는 서브디렉터리를 포함해 모든 디렉터리를 뜻하는 와일드카드이다.
// 따라서 이 소스 필터는 서브디렉터리 깊이에 관계없이 es6에 있는 모든 .js파일을 선택한다.
// 이 소스 파일을 바벨에 파이프로 연결한다. 바벨은 es6코드를 es5로 변형한다. 마지막 단계에서 컴파일된 es5코드를 dist디렉터리에 저장한다.
