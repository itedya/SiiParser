using SiiParser;
using SiiParser.Attributes;

namespace SiiParserSCS.GameClasses
{
    [SiiUnit("accessory_chassis_data")]
    public class AccessoryChassisData : GameClass
    {
        [SiiAttribute("name")] public string Name { get; set; }

        [SiiAttribute("info")] public string Info { get; set; }

        [SiiAttribute("price")] public int Price { get; set; }

        [SiiAttribute("tank_size")] public float TankSize { get; set; }

        [SiiAttribute("adblue_tank_size")] public float AdBlueTankSize { get; set; }

        [SiiAttribute("powered_axle")] public bool[] PoweredAxle { get; set; }

        [SiiAttribute("powered_axle")] public bool[] LiftAbleAxle { get; set; }

        [SiiAttribute("steerable_axle")] public bool[] SteerableAxle { get; set; }
    }
}