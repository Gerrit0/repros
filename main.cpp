#include "gen/avro_2736.hh"
#include "gen/avro_2736_long.hh"
#include <fstream>
#include "avro/ValidSchema.hh"
#include "avro/Compiler.hh"

using OldFileUnion = avro_2736::_avro_2736_json_Union__0__;
using NewFileUnion = avro_2736_long::_avro_2736_long_json_Union__1__;

void reproduce_avro_2736_binary()
{
    auto oldSchema = avro::compileJsonSchemaFromFile("schemas/avro_2736.json");
    auto newSchema = avro::compileJsonSchemaFromFile("schemas/avro_2736_long.json");

    {

        avro_2736::BurstInfo oldBurstInfo;
        oldBurstInfo.demodId = 123;

        OldFileUnion oldEntry;
        oldEntry.set_BurstInfo(oldBurstInfo);

        auto outStream = avro::fileOutputStream("output.bin");
        auto encoder = avro::binaryEncoder();
        encoder->init(*outStream);
        avro::encode(*encoder, oldEntry);
        encoder->flush();
    }

    {
        auto inStream = avro::fileInputStream("output.bin");
        auto binDecoder = avro::binaryDecoder();
        auto decoder = avro::resolvingDecoder(oldSchema, newSchema, binDecoder);
        decoder->init(*inStream);

        NewFileUnion newEntry;
        avro::decode(*decoder, newEntry);

        std::cout << "(binary) expecting 123, got " << newEntry.get_BurstInfo().demodId.get_int() << '\n';
    }
}

void reproduce_avro_2736_json()
{
    auto oldSchema = avro::compileJsonSchemaFromFile("schemas/avro_2736.json");
    auto newSchema = avro::compileJsonSchemaFromFile("schemas/avro_2736_long.json");

    {

        avro_2736::BurstInfo oldBurstInfo;
        oldBurstInfo.demodId = 123;

        OldFileUnion oldEntry;
        oldEntry.set_BurstInfo(oldBurstInfo);

        auto outStream = avro::fileOutputStream("output.json");
        auto encoder = avro::jsonPrettyEncoder(oldSchema);
        encoder->init(*outStream);
        avro::encode(*encoder, oldEntry);
        encoder->flush();
    }

    {
        auto inStream = avro::fileInputStream("output.json");
        auto jsonDecoder = avro::jsonDecoder(newSchema);
        auto decoder = avro::resolvingDecoder(oldSchema, newSchema, jsonDecoder);
        decoder->init(*inStream);

        NewFileUnion newEntry;
        avro::decode(*decoder, newEntry);

        std::cout << "(json) expecting 123, got " << newEntry.get_BurstInfo().demodId.get_int() << '\n';
    }
}

int main()
{
    try
    {
        reproduce_avro_2736_binary();
        reproduce_avro_2736_json();
        puts("Done");
    }
    catch (const std::exception &e)
    {
        std::cerr << e.what() << '\n';
        return 1;
    }
}
