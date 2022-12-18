using System.Text.RegularExpressions;
using SiiParser.Enums;

namespace SiiParser.TokenTypes
{
    public class NamespaceTokenType : ITokenType
    {
        public Regex Regex { get; }
        public string Identifier { get; }
        public bool IsValueType { get; }

        public NamespaceTokenType()
        {
            this.Regex = new Regex(
                "(?<=(country_data|" +
                "accessory_addon_data|accessory_addon_int_data|accessory_addon_int_ui_data|accessory_addon_tank_data|accessory_addon_trailer_cables_data|accessory_cabin_data|accessory_cargo_data|accessory_chassis_data|accessory_data|accessory_engine_data|accessory_horn_addon_data|accessory_interior_data|accessory_paint_job_data|accessory_rim_data|accessory_sound_data|accessory_trailer_body_data|accessory_transmission_data|accessory_truck_data|accessory_wheel_data|cargo_data|cargo_def|cargo_model_match|company_def|company_permanent|glass_pane_data|journey_events_cutscene|journey_events_road_event|package_version_info|sound_data|sound_data_voice_navigation|sound_engine_data|sound_noise_data|trailer|trailer_cable_data|trailer_configuration|trailer_def|transmission_names|vehicle_accessory|vehicle_addon_accessory|vehicle_paint_job_accessory|vehicle_wheel_accessory|wiper_data) : )[a-zA-Z0-9_.]+(?=\n)");
            this.Identifier = TokenType.Namespace;
            this.IsValueType = false;
        }
    }
}