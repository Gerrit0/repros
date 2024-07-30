# AVRO-2736

This branch includes a reproduction for https://issues.apache.org/jira/browse/AVRO-2736

The resolving decoder does not handle JSON decoders correctly.

Run:

```bash
cmake -Bbuild -S.
./build/avro_2736
```

This will print:

```
(binary) expecting 123, got 123
Invalid operation. Schema requires: Union, got: Int
```

While it should print:

```
(binary) expecting 123, got 123
(json) expecting 123, got 123
```
