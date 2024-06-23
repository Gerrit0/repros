class Foo {
  @NonEnumerable
  req = "";
  @NonEnumerable
  opt?: string;
}

function NonEnumerable(_cls: unknown, context: ClassFieldDecoratorContext) {
  context.addInitializer(function () {
    Object.defineProperty(this, context.name, {
      enumerable: false,
      configurable: true,
      writable: true,
    });
  });
}

for (const [key, desc] of Object.entries(
  Object.getOwnPropertyDescriptors(new Foo())
)) {
  console.log(key, desc.enumerable);
}
