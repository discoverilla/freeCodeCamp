---
id: 5900f4861000cf542c50ff99
title: 'Problema 282: A função de Ackermann'
challengeType: 5
forumTopicId: 301933
dashedName: problem-282-the-ackermann-function
---

# --description--

Para números inteiros não negativos $m$, $n$, a função de Ackermann $A(m, n)$ é definida da seguinte forma:

$$A(m, n) = \begin{cases} n + 1                 & \text{if $m = 0$}             \\\\
A(m - 1, 1)           & \text{if $m > 0$ and $n = 0$} \\\\ A(m - 1, A(m, n - 1)) & \text{if $m > 0$ and $n > 0$} \end{cases}$$

Por exemplo $A(1, 0) = 2$, $A(2, 2) = 7$ e $A(3, 4) = 125$.

Encontre $\displaystyle\sum_{n = 0}^6 A(n, n)$ e dê sua resposta mod ${14}^8$.

# --hints--

`ackermanFunction()` deve retornar `1098988351`.

```js
assert.strictEqual(ackermanFunction(), 1098988351);
```

# --seed--

## --seed-contents--

```js
function ackermanFunction() {

  return true;
}

ackermanFunction();
```

# --solutions--

```js
// solution required
```
