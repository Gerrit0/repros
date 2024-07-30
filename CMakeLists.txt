cmake_minimum_required(VERSION 3.28)

set(CMAKE_CXX_STANDARD 20)

include(FetchContent)
FetchContent_Declare(
  avro
  GIT_REPOSITORY https://github.com/apache/avro
  GIT_TAG 42c54e68120bb5c2393954b5990a0aa3b3960510
  SOURCE_SUBDIR lang/c++
)
FetchContent_MakeAvailable(avro)

project(AVRO-2736)

macro(gen_schema file)
    add_custom_command (OUTPUT ${CMAKE_CURRENT_BINARY_DIR}/gen/${file}.hh
        COMMAND mkdir -p ${CMAKE_CURRENT_BINARY_DIR}/gen
        COMMAND avrogencpp
            -p avro
            -i ${CMAKE_CURRENT_SOURCE_DIR}/schemas/${file}.json
            -o ${CMAKE_CURRENT_BINARY_DIR}/gen/${file}.hh -n ${file}
        DEPENDS avrogencpp ${CMAKE_CURRENT_SOURCE_DIR}/schemas/${file}.json)
    add_custom_target (${file}_hh DEPENDS ${CMAKE_CURRENT_BINARY_DIR}/gen/${file}.hh)
endmacro()

gen_schema(avro_2736)
gen_schema(avro_2736_long)

add_executable(avro_2736 main.cpp)
add_dependencies(avro_2736 avro_2736_hh avro_2736_long_hh)
target_link_libraries(avro_2736 PRIVATE avrocpp_s)
target_include_directories(avro_2736 PRIVATE ${CMAKE_CURRENT_BINARY_DIR})
