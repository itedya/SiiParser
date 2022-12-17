using System.Numerics;
using SiiParser;
using SiiParser.Attributes;

namespace SiiParserSCS.GameClasses
{
    [SiiUnit("accessory_engine_data")]
    internal class AccessoryEngineData : GameClass
    {
        [SiiAttribute("info")]
        public string[] Info { get; set; }
        
        [SiiAttribute("torque")]
        public float Torque { get; set; }
        
        [SiiAttribute("torque_curve")]
        public Vector2 TorqueCurve { get; set; }
        
        [SiiAttribute("rpm_idle")]
        public float RpmIdle { get; set; }
        
        [SiiAttribute("rpm_limit")]
        public float RpmLimit { get; set; }
        
        [SiiAttribute("adblue_consumption")]
        public float AdblueConsumption { get; set; }
    }
}