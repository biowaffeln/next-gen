// see: https://github.com/sindresorhus/type-fest/blob/main/source/opaque.d.ts
declare const tag: unique symbol;

type Tagged<Token> = {
	readonly [tag]: Token;
};

export type Opaque<Type, Token = unknown> = Type & Tagged<Token>;
