//
//  demo.cpp
//
//  Created by takashi kominami on 2022/09/04.
//

#include "demo.hpp"

void test_print(const char *message)
{
    printf("%s", message);
}

void register_callback(void (*callback)(const char* message))
{
    callback("hello!! dylib");
}

int test_add_int(const int now, const int num) {
  return now + num;
} 
