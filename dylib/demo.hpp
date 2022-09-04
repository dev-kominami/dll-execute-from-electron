//
//  demo.hpp
//
//  Created by takashi kominami on 2022/09/04.
//

#ifndef demo_hpp
#define demo_hpp

#include <stdio.h>

#endif /* demo_hpp */

extern "C" __declspec(dllexport) void test_print(const char *message);
extern "C" __declspec(dllexport) void register_callback(void (*callback)(const char *message));
extern "C" __declspec(dllexport) int test_add_int(const int now, const int num);
