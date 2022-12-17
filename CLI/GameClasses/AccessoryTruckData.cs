using SiiParser;
using SiiParser.Attributes;

namespace SiiParserSCS.GameClasses
{
    [SiiUnit("accessory_truck_data")]
    public class AccessoryTruckData : GameClass
    {
        [SiiAttribute("info")]
        public string[] Info { get; set; }
    }
}