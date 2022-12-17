using System.Collections.Generic;
using SiiParser;
using SiiParser.Attributes;

namespace SiiParserSCS.GameClasses
{
    [SiiUnit("accessory_transmission_data")]
    public class AccessoryTransmissionData : GameClass
    {
        [SiiAttribute("name")] public string Name { get; set; }

        [SiiAttribute("price")] public int Price { get; set; }

        [SiiAttribute("icon")] public string Icon { get; set; }

        [SiiAttribute("ratios_reverse[]")] public List<float> RatiosReverse { get; set; }
    }
}