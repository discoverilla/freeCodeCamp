---
id: 5900f4971000cf542c50ffa9
title: '問題 298: 選択的健忘'
challengeType: 5
forumTopicId: 301950
dashedName: problem-298-selective-amnesia
---

# --description--

ラリーとロビンが記憶ゲームをします。1 から 10 のうち無作為に選ばれた数が一度に 1 つずつ呼び出されます。 各プレイヤーは、以前の数を最大 5 つ記憶できます。 呼び出された数がプレイヤーの記憶にあれば、1 点が与えられます。 記憶になければ、プレイヤーは呼び出された数を自分の記憶に加え、もし記憶が一杯であれば他の数を 1 つ記憶から消します。

開始時、2 人のプレイヤーの記憶は空です。 両プレイヤーは、記憶になかった新しい数を必ず記憶に加えますが、どの数を消すかを決めるための戦略が異なります。ラリーの戦略は、最も長い間呼び出されなかった数を消すことです。 ロビンの戦略は、最も長く記憶にとどまっていた数を消すことです。

ゲームの例:

| ターン | 呼び出された番号 |     ラリーの記憶 | ラリーのスコア | ロビンの記憶     | ロビンのスコア |
| --- | -------- | ----------:| ------- | ---------- | ------- |
| 1   | 1        |          1 | 0       | 1          | 0       |
| 2   | 2        |        1,2 | 0       | 1,2        | 0       |
| 3   | 4        |      1,2,4 | 0       | 1,2,4      | 0       |
| 4   | 6        |    1,2,4,6 | 0       | 1,2,4,6    | 0       |
| 5   | 1        |    1,2,4,6 | 1       | 1,2,4,6    | 1       |
| 6   | 8        |  1,2,4,6,8 | 1       | 1,2,4,6,8  | 1       |
| 7   | 10       | 1,4,6,8,10 | 1       | 2,4,6,8,10 | 1       |
| 8   | 2        | 1,2,6,8,10 | 1       | 2,4,6,8,10 | 2       |
| 9   | 4        | 1,2,4,8,10 | 1       | 2,4,6,8,10 | 3       |
| 10  | 1        | 1,2,4,8,10 | 2       | 1,4,6,8,10 | 3       |

ラリーのスコアを $L$、ロビンのスコアを $R$ で表すものとし、50 ターン後の $|L-R|$ の期待値を求めなさい。 回答は、四捨五入して小数第 8 位まで求め、x.xxxxxxxx の形式にすること。

# --hints--

`selectiveAmnesia()` は `1.76882294` を返す必要があります。

```js
assert.strictEqual(selectiveAmnesia(), 1.76882294);
```

# --seed--

## --seed-contents--

```js
function selectiveAmnesia() {

  return true;
}

selectiveAmnesia();
```

# --solutions--

```js
// solution required
```
