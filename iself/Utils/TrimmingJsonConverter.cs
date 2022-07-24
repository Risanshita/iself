using System.Text.Json;
using System.Text.Json.Serialization;

namespace iself.Utils
{
    public class TrimmingJsonConverter : JsonConverterFactory
    {
        public override bool CanConvert(Type type)
        {
            return type == typeof(string);
        }

        public override JsonConverter CreateConverter(Type type, JsonSerializerOptions options)
        {
            return new StringTrimConverter();
        }
    }

    public class StringTrimConverter : JsonConverter<string>
    {
        public override void Write(Utf8JsonWriter writer, string str, JsonSerializerOptions options)
        {
            writer.WriteStringValue((str)?.Trim()); //US date style
        }

        public override string Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            //Don't need to  implement this unless you're using this to deserialize too
            return reader.GetString()?.Trim();
        }
    }
}
