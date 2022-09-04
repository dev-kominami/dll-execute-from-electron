# generate dylib for mac

## how to

### dylib generate

``` bash
g++ -dynamiclib -o libdylibexample.dylib dylibexample.c
```

### execute file generate

``` bash
g++ exec.c -lm libdylibexample.dylib
```

### execute

``` bash
./a.out
```
